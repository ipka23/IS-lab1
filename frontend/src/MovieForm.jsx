import { useEffect, useState } from 'react'
import { apiGet, apiSend } from './api.js'
import { GENRES, GENRE_NAMES, MAX_INT, RATINGS, RATING_NAMES, fromMillions, toMillions } from './constants.js'
import Modal from './Modal.jsx'

const EMPTY_FORM = {
  name: '',
  coordX: '',
  coordY: '',
  oscarsCount: '',
  budget: '',
  totalBoxOffice: '',
  mpaaRating: '',
  directorId: '',
  screenwriterId: '',
  operatorId: '',
  length: '',
  goldenPalmCount: '',
  usaBoxOffice: '',
  tagline: '',
  genre: 'ACTION',
}

function movieToForm(movie) {
  return {
    name: movie.name,
    coordX: movie.coordinates.x,
    coordY: movie.coordinates.y,
    oscarsCount: movie.oscarsCount,
    budget: toMillions(movie.budget),
    totalBoxOffice: movie.totalBoxOffice,
    mpaaRating: movie.mpaaRating || '',
    directorId: movie.director ? movie.director.id : '',
    screenwriterId: movie.screenwriter ? movie.screenwriter.id : '',
    operatorId: movie.operator ? movie.operator.id : '',
    length: movie.length,
    goldenPalmCount: movie.goldenPalmCount,
    usaBoxOffice: toMillions(movie.usaBoxOffice),
    tagline: movie.tagline,
    genre: movie.genre,
  }
}

function personById(id) {
  if (id === '') {
    return null
  }
  return { id: Number(id) }
}

function MovieForm({ movie, onClose, onSaved }) {
  const [form, setForm] = useState(movie ? movieToForm(movie) : EMPTY_FORM)
  const [persons, setPersons] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    apiGet('/persons')
      .then((data) => setPersons(data))
      .catch((err) => setError(err.message))
  }, [])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (form.name.trim() === '') {
      setError('Введите название')
      return
    }
    if (form.coordX === '' || Number(form.coordX) <= -404) {
      setError('Координата X должна быть больше -404')
      return
    }
    if (Number(form.coordY) > 851) {
      setError('Координата Y не может быть больше 851')
      return
    }
    if (form.operatorId === '') {
      setError('Выберите оператора')
      return
    }
    if (fromMillions(form.budget) > MAX_INT || fromMillions(form.usaBoxOffice) > MAX_INT) {
      setError('Бюджет и сборы в США не могут быть больше 2147 млн $')
      return
    }

    const body = {
      name: form.name,
      coordinates: { x: Number(form.coordX), y: Number(form.coordY) },
      oscarsCount: Number(form.oscarsCount),
      budget: fromMillions(form.budget),
      totalBoxOffice: Number(form.totalBoxOffice),
      mpaaRating: form.mpaaRating === '' ? null : form.mpaaRating,
      director: personById(form.directorId),
      screenwriter: personById(form.screenwriterId),
      operator: personById(form.operatorId),
      length: Number(form.length),
      goldenPalmCount: Number(form.goldenPalmCount),
      usaBoxOffice: fromMillions(form.usaBoxOffice),
      tagline: form.tagline,
      genre: form.genre,
    }

    try {
      if (movie) {
        await apiSend('PUT', '/movies/' + movie.id, body)
      } else {
        await apiSend('POST', '/movies', body)
      }
      onSaved()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Modal title={movie ? 'Изменить фильм (ID ' + movie.id + ')' : 'Новый фильм'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Название *
          <input name="name" value={form.name} onChange={handleChange} />
        </label>

        <label>
          Координата X * (больше -404)
          <input name="coordX" type="number" value={form.coordX} onChange={handleChange} />
        </label>

        <label>
          Координата Y (не больше 851)
          <input name="coordY" type="number" value={form.coordY} onChange={handleChange} />
        </label>

        <label>
          Количество Оскаров * (больше 0)
          <input name="oscarsCount" type="number" value={form.oscarsCount} onChange={handleChange} />
        </label>

        <label>
          Бюджет, млн $ * (больше 0)
          <input name="budget" type="number" step="any" value={form.budget} onChange={handleChange} />
        </label>

        <label>
          Общие сборы, млн $ * (больше 0)
          <input name="totalBoxOffice" type="number" step="any" value={form.totalBoxOffice} onChange={handleChange} />
        </label>

        <label>
          Рейтинг MPAA
          <select name="mpaaRating" value={form.mpaaRating} onChange={handleChange}>
            <option value="">не указан</option>
            {RATINGS.map((rating) => (
              <option key={rating} value={rating}>{RATING_NAMES[rating]}</option>
            ))}
          </select>
        </label>

        <label>
          Режиссёр
          <select name="directorId" value={form.directorId} onChange={handleChange}>
            <option value="">нет</option>
            {persons.map((person) => (
              <option key={person.id} value={person.id}>{person.name}</option>
            ))}
          </select>
        </label>

        <label>
          Сценарист
          <select name="screenwriterId" value={form.screenwriterId} onChange={handleChange}>
            <option value="">нет</option>
            {persons.map((person) => (
              <option key={person.id} value={person.id}>{person.name}</option>
            ))}
          </select>
        </label>

        <label>
          Оператор *
          <select name="operatorId" value={form.operatorId} onChange={handleChange}>
            <option value="">выберите</option>
            {persons.map((person) => (
              <option key={person.id} value={person.id}>{person.name}</option>
            ))}
          </select>
        </label>

        <label>
          Длина * (больше 0)
          <input name="length" type="number" value={form.length} onChange={handleChange} />
        </label>

        <label>
          Золотые пальмы * (больше 0)
          <input name="goldenPalmCount" type="number" value={form.goldenPalmCount} onChange={handleChange} />
        </label>

        <label>
          Сборы в США, млн $ * (больше 0)
          <input name="usaBoxOffice" type="number" step="any" value={form.usaBoxOffice} onChange={handleChange} />
        </label>

        <label>
          Слоган *
          <input name="tagline" value={form.tagline} onChange={handleChange} />
        </label>

        <label>
          Жанр *
          <select name="genre" value={form.genre} onChange={handleChange}>
            {GENRES.map((genre) => (
              <option key={genre} value={genre}>{GENRE_NAMES[genre]}</option>
            ))}
          </select>
        </label>

        {persons.length === 0 && (
          <p className="hint">Сначала добавьте людей на вкладке «Люди»: оператор обязателен.</p>
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

export default MovieForm
