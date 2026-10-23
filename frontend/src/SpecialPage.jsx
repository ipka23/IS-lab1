import { useState } from 'react'
import { apiGet, apiSend } from './api.js'
import { formatDate, fromMillions, toMillions } from './constants.js'

function SpecialPage() {
  const [sum, setSum] = useState(null)
  const [latest, setLatest] = useState(null)
  const [boxOfficeValue, setBoxOfficeValue] = useState('')
  const [boxOfficeMovies, setBoxOfficeMovies] = useState(null)
  const [screenwriters, setScreenwriters] = useState(null)
  const [minLength, setMinLength] = useState('')
  const [oscars, setOscars] = useState('')
  const [awardResult, setAwardResult] = useState(null)
  const [error, setError] = useState('')

  async function loadSum() {
    try {
      const data = await apiGet('/special/golden-palm-sum')
      setSum(data.sum)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  async function loadLatest() {
    try {
      const data = await apiGet('/special/latest')
      setLatest(data)
      setError('')
    } catch (err) {
      setError('Фильмов пока нет')
    }
  }

  async function loadBoxOffice() {
    if (boxOfficeValue === '') {
      setError('Введите значение сборов')
      return
    }
    try {
      const data = await apiGet('/special/usa-box-office-greater?value=' + fromMillions(boxOfficeValue))
      setBoxOfficeMovies(data)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  async function loadScreenwriters() {
    try {
      const data = await apiGet('/special/screenwriters-without-oscars')
      setScreenwriters(data)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  async function award() {
    if (minLength === '' || oscars === '') {
      setError('Введите длину и количество Оскаров')
      return
    }
    try {
      const data = await apiSend(
        'POST',
        '/special/award-long-movies?minLength=' + minLength + '&oscars=' + oscars,
      )
      setAwardResult(data.updated)
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="special">
      {error && <p className="error">{error}</p>}

      <div className="special-block">
        <h3>1. Сумма золотых пальм у всех фильмов</h3>
        <button onClick={loadSum}>Посчитать</button>
        {sum !== null && <p>Сумма: {sum}</p>}
      </div>

      <div className="special-block">
        <h3>2. Фильм с самой поздней датой создания</h3>
        <button onClick={loadLatest}>Найти</button>
        {latest && (
          <p>
            {latest.name} (ID {latest.id}), создан {formatDate(latest.creationDate)}
          </p>
        )}
      </div>

      <div className="special-block">
        <h3>3. Фильмы со сборами в США больше заданных</h3>
        <input
          type="number"
          step="any"
          value={boxOfficeValue}
          onChange={(e) => setBoxOfficeValue(e.target.value)}
          placeholder="сборы, млн $"
        />{' '}
        <button onClick={loadBoxOffice}>Показать</button>
        {boxOfficeMovies && (
          <ul>
            {boxOfficeMovies.map((movie) => (
              <li key={movie.id}>
                {movie.name} (ID {movie.id}) — {toMillions(movie.usaBoxOffice)} млн $
              </li>
            ))}
            {boxOfficeMovies.length === 0 && <li>Таких фильмов нет</li>}
          </ul>
        )}
      </div>

      <div className="special-block">
        <h3>4. Сценаристы, у фильмов которых нет ни одного Оскара</h3>
        <button onClick={loadScreenwriters}>Показать</button>
        {screenwriters && (
          <ul>
            {screenwriters.map((person) => (
              <li key={person.id}>
                {person.name}
              </li>
            ))}
            {screenwriters.length === 0 && <li>Таких сценаристов нет</li>}
          </ul>
        )}
      </div>

      <div className="special-block">
        <h3>5. Наградить фильмы длиннее заданной длины</h3>
        <input
          type="number"
          value={minLength}
          onChange={(e) => setMinLength(e.target.value)}
          placeholder="длина больше"
        />{' '}
        <input
          type="number"
          value={oscars}
          onChange={(e) => setOscars(e.target.value)}
          placeholder="сколько Оскаров"
        />{' '}
        <button onClick={award}>Наградить</button>
        {awardResult !== null && <p>Награждено фильмов: {awardResult}</p>}
      </div>
    </div>
  )
}

export default SpecialPage
