import { useEffect, useState } from 'react'
import { apiGet, apiSend } from './api.js'
import { COLOR_NAMES, COUNTRY_NAMES } from './constants.js'
import PersonForm from './PersonForm.jsx'

function PersonsPage({ active }) {
  const [persons, setPersons] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  function loadPersons() {
    setLoading(true)
    apiGet('/persons')
      .then((data) => {
        setPersons(data)
        setError('')
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }

  useEffect(() => {
    if (active) {
      loadPersons()
    }
  }, [active])

  async function deletePerson(person) {
    if (!window.confirm('Удалить человека «' + person.name + '»?')) {
      return
    }
    try {
      await apiSend('DELETE', '/persons/' + person.id)
      loadPersons()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div>
      <div className="toolbar">
        <button onClick={() => setShowForm(true)}>Добавить человека</button>
        <button onClick={loadPersons}>Обновить</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Цвет глаз</th>
              <th>Цвет волос</th>
              <th>Местоположение</th>
              <th>Вес</th>
              <th>Национальность</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {persons.map((person) => (
              <tr key={person.id}>
                <td>{person.id}</td>
                <td>{person.name}</td>
                <td>{person.eyeColor ? COLOR_NAMES[person.eyeColor] : '-'}</td>
                <td>{COLOR_NAMES[person.hairColor]}</td>
                <td>
                  {person.location
                    ? '(' + person.location.x + '; ' + person.location.y + ') ' + (person.location.name || '')
                    : '-'}
                </td>
                <td>{person.weight || '-'}</td>
                <td>{COUNTRY_NAMES[person.nationality]}</td>
                <td className="actions">
                  <button onClick={() => deletePerson(person)}>Удалить</button>
                </td>
              </tr>
            ))}
            {persons.length === 0 && (
              <tr>
                <td colSpan={8}>{loading ? 'Загрузка...' : 'Людей нет'}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <PersonForm
          onClose={() => setShowForm(false)}
          onSaved={() => {
            setShowForm(false)
            loadPersons()
          }}
        />
      )}
    </div>
  )
}

export default PersonsPage
