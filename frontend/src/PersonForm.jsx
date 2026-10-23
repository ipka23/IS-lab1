import { useState } from 'react'
import { apiSend } from './api.js'
import { COLORS, COLOR_NAMES, COUNTRIES, COUNTRY_NAMES } from './constants.js'
import Modal from './Modal.jsx'

function PersonForm({ onClose, onSaved }) {
  const [form, setForm] = useState({
    name: '',
    eyeColor: '',
    hairColor: 'BLACK',
    weight: '',
    nationality: 'UNITED_KINGDOM',
    hasLocation: false,
    locationX: '',
    locationY: '',
    locationName: '',
  })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (form.name.trim() === '') {
      setError('Введите имя')
      return
    }
    if (form.weight !== '' && Number(form.weight) <= 0) {
      setError('Вес должен быть больше 0')
      return
    }
    if (form.hasLocation && form.locationY === '') {
      setError('Введите Y местоположения')
      return
    }

    let location = null
    if (form.hasLocation) {
      location = {
        x: Number(form.locationX),
        y: Number(form.locationY),
        name: form.locationName === '' ? null : form.locationName,
      }
    }

    const body = {
      name: form.name,
      eyeColor: form.eyeColor === '' ? null : form.eyeColor,
      hairColor: form.hairColor,
      weight: form.weight === '' ? null : Number(form.weight),
      nationality: form.nationality,
      location: location,
    }

    try {
      await apiSend('POST', '/persons', body)
      onSaved()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Modal title="Новый человек" onClose={onClose}>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Имя *
          <input name="name" value={form.name} onChange={handleChange} />
        </label>

        <label>
          Цвет глаз
          <select name="eyeColor" value={form.eyeColor} onChange={handleChange}>
            <option value="">не указан</option>
            {COLORS.map((color) => (
              <option key={color} value={color}>{COLOR_NAMES[color]}</option>
            ))}
          </select>
        </label>

        <label>
          Цвет волос *
          <select name="hairColor" value={form.hairColor} onChange={handleChange}>
            {COLORS.map((color) => (
              <option key={color} value={color}>{COLOR_NAMES[color]}</option>
            ))}
          </select>
        </label>

        <label>
          Вес (больше 0)
          <input name="weight" type="number" value={form.weight} onChange={handleChange} />
        </label>

        <label>
          Национальность *
          <select name="nationality" value={form.nationality} onChange={handleChange}>
            {COUNTRIES.map((country) => (
              <option key={country} value={country}>{COUNTRY_NAMES[country]}</option>
            ))}
          </select>
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={form.hasLocation}
            onChange={(e) => setForm({ ...form, hasLocation: e.target.checked })}
          />
          Указать местоположение
        </label>

        {form.hasLocation && (
          <>
            <label>
              Местоположение X
              <input name="locationX" type="number" step="any" value={form.locationX} onChange={handleChange} />
            </label>
            <label>
              Местоположение Y *
              <input name="locationY" type="number" value={form.locationY} onChange={handleChange} />
            </label>
            <label>
              Название места
              <input name="locationName" value={form.locationName} onChange={handleChange} />
            </label>
          </>
        )}

        {error && <p className="error">{error}</p>}

        <div className="form-buttons">
          <button type="submit">Сохранить</button>
          <button type="button" onClick={onClose}>Отмена</button>
        </div>
      </form>
    </Modal>
  )
}

export default PersonForm
