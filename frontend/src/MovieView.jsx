import { COLOR_NAMES, COUNTRY_NAMES, GENRE_NAMES, RATING_NAMES, formatDate, toMillions } from './constants.js'
import Modal from './Modal.jsx'

function PersonInfo({ person }) {
  if (!person) {
    return <span>-</span>
  }
  return (
    <ul className="person-info">
      <li>ID: {person.id}</li>
      <li>Имя: {person.name}</li>
      <li>Цвет глаз: {person.eyeColor ? COLOR_NAMES[person.eyeColor] : '-'}</li>
      <li>Цвет волос: {COLOR_NAMES[person.hairColor]}</li>
      <li>Вес: {person.weight || '-'}</li>
      <li>Национальность: {COUNTRY_NAMES[person.nationality]}</li>
      <li>
        Местоположение:{' '}
        {person.location
          ? '(' + person.location.x + '; ' + person.location.y + ') ' + (person.location.name || '')
          : '-'}
      </li>
    </ul>
  )
}

function MovieView({ movie, onClose }) {
  return (
    <Modal title={'Фильм ' + movie.name} onClose={onClose}>
      <table className="view-table">
        <tbody>
          <tr><td>ID</td><td>{movie.id}</td></tr>
          <tr><td>Название</td><td>{movie.name}</td></tr>
          <tr><td>Координаты</td><td>x = {movie.coordinates.x}, y = {movie.coordinates.y}</td></tr>
          <tr><td>Дата создания</td><td>{formatDate(movie.creationDate)}</td></tr>
          <tr><td>Оскары</td><td>{movie.oscarsCount}</td></tr>
          <tr><td>Бюджет, млн $</td><td>{toMillions(movie.budget)}</td></tr>
          <tr><td>Общие сборы, млн $</td><td>{movie.totalBoxOffice}</td></tr>
          <tr><td>Рейтинг MPAA</td><td>{movie.mpaaRating ? RATING_NAMES[movie.mpaaRating] : '-'}</td></tr>
          <tr><td>Режиссёр</td><td><PersonInfo person={movie.director} /></td></tr>
          <tr><td>Сценарист</td><td><PersonInfo person={movie.screenwriter} /></td></tr>
          <tr><td>Оператор</td><td><PersonInfo person={movie.operator} /></td></tr>
          <tr><td>Длина</td><td>{movie.length}</td></tr>
          <tr><td>Золотые пальмы</td><td>{movie.goldenPalmCount}</td></tr>
          <tr><td>Сборы в США, млн $</td><td>{toMillions(movie.usaBoxOffice)}</td></tr>
          <tr><td>Слоган</td><td>{movie.tagline}</td></tr>
          <tr><td>Жанр</td><td>{GENRE_NAMES[movie.genre]}</td></tr>
        </tbody>
      </table>
      <div className="form-buttons">
        <button onClick={onClose}>Закрыть</button>
      </div>
    </Modal>
  )
}

export default MovieView
