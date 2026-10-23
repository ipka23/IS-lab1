import { useEffect, useState } from 'react'
import { apiGet, apiSend, getSocketUrl } from './api.js'
import { GENRE_NAMES, PAGE_SIZE, RATING_NAMES, formatDate, personName, toMillions } from './constants.js'
import MovieForm from './MovieForm.jsx'
import MovieView from './MovieView.jsx'

const COLUMNS = [
  { field: 'id', title: 'ID', sortable: true },
  { field: 'name', title: 'Название', sortable: true },
  { field: 'coordinates', title: 'Координаты', sortable: false },
  { field: 'creationDate', title: 'Дата создания', sortable: true },
  { field: 'oscarsCount', title: 'Оскары', sortable: true },
  { field: 'budget', title: 'Бюджет, млн $', sortable: true },
  { field: 'totalBoxOffice', title: 'Общие сборы, млн $', sortable: true },
  { field: 'mpaaRating', title: 'Рейтинг', sortable: true },
  { field: 'director', title: 'Режиссёр', sortable: false },
  { field: 'screenwriter', title: 'Сценарист', sortable: false },
  { field: 'operator', title: 'Оператор', sortable: false },
  { field: 'length', title: 'Длина', sortable: true },
  { field: 'goldenPalmCount', title: 'Пальмы', sortable: true },
  { field: 'usaBoxOffice', title: 'Сборы США, млн $', sortable: true },
  { field: 'tagline', title: 'Слоган', sortable: true },
  { field: 'genre', title: 'Жанр', sortable: true },
]

function MoviesPage() {
  const [movies, setMovies] = useState([])
  const [total, setTotal] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(0)
  const [sortField, setSortField] = useState('id')
  const [sortDir, setSortDir] = useState('asc')

  const [filterField, setFilterField] = useState('name')
  const [filterInput, setFilterInput] = useState('')
  const [filterText, setFilterText] = useState('')

  const [reload, setReload] = useState(0)

  const [showCreate, setShowCreate] = useState(false)
  const [editMovie, setEditMovie] = useState(null)
  const [viewMovie, setViewMovie] = useState(null)
  const [idInput, setIdInput] = useState('')

  useEffect(() => {
    const params = new URLSearchParams({
      page: page,
      size: PAGE_SIZE,
      sortField: sortField,
      sortDir: sortDir,
      filterField: filterField,
      filterText: filterText,
    })
    setLoading(true)
    apiGet('/movies?' + params.toString())
      .then((data) => {
        if (data.items.length === 0 && page > 0) {
          setPage(page - 1)
          return
        }
        setMovies(data.items)
        setTotal(data.total)
        setError('')
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [page, sortField, sortDir, filterField, filterText, reload])

  useEffect(() => {
    const socket = new WebSocket(getSocketUrl())
    socket.onmessage = () => {
      setReload((r) => r + 1)
    }
    return () => socket.close()
  }, [])

  function sortBy(field) {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('asc')
    }
  }

  function applyFilter() {
    setPage(0)
    setFilterText(filterInput)
  }

  function clearFilter() {
    setFilterInput('')
    setFilterText('')
    setPage(0)
  }

  async function deleteMovie(movie) {
    if (!window.confirm('Удалить фильм «' + movie.name + '»?')) {
      return
    }
    try {
      await apiSend('DELETE', '/movies/' + movie.id)
      setReload(reload + 1)
    } catch (err) {
      alert(err.message)
    }
  }

  async function openById() {
    if (idInput === '') {
      return
    }
    try {
      const movie = await apiGet('/movies/' + idInput)
      setViewMovie(movie)
    } catch (err) {
      alert('Фильм с ID ' + idInput + ' не найден')
    }
  }

  function cellText(movie, field) {
    if (field === 'coordinates') {
      return '(' + movie.coordinates.x + '; ' + movie.coordinates.y + ')'
    }
    if (field === 'creationDate') {
      return formatDate(movie.creationDate)
    }
    if (field === 'director' || field === 'screenwriter' || field === 'operator') {
      return personName(movie[field])
    }
    if (field === 'budget' || field === 'usaBoxOffice') {
      return toMillions(movie[field])
    }
    if (field === 'genre') {
      return GENRE_NAMES[movie.genre]
    }
    if (field === 'mpaaRating') {
      return movie.mpaaRating ? RATING_NAMES[movie.mpaaRating] : '-'
    }
    if (movie[field] === null || movie[field] === undefined) {
      return '-'
    }
    return movie[field]
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div>
      <div className="toolbar">
        <button onClick={() => setShowCreate(true)}>Добавить фильм</button>

        <span>
          Фильтр:{' '}
          <select value={filterField} onChange={(e) => setFilterField(e.target.value)}>
            <option value="name">Название</option>
            <option value="tagline">Слоган</option>
          </select>{' '}
          <input
            value={filterInput}
            onChange={(e) => setFilterInput(e.target.value)}
            placeholder="часть текста"
          />{' '}
          <button onClick={applyFilter}>Найти</button>{' '}
          <button onClick={clearFilter}>Сбросить</button>
        </span>

        <span>
          ID:{' '}
          <input
            type="number"
            className="small-input"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
          />{' '}
          <button onClick={openById}>Открыть</button>
        </span>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {COLUMNS.map((column) => (
                <th
                  key={column.field}
                  className={column.sortable ? 'sortable' : ''}
                  onClick={() => column.sortable && sortBy(column.field)}
                >
                  {column.title}
                  {sortField === column.field && (sortDir === 'asc' ? ' ▲' : ' ▼')}
                </th>
              ))}
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                {COLUMNS.map((column) => (
                  <td key={column.field}>{cellText(movie, column.field)}</td>
                ))}
                <td className="actions">
                  <button onClick={() => setViewMovie(movie)}>Открыть</button>
                  <button onClick={() => setEditMovie(movie)}>Изменить</button>
                  <button onClick={() => deleteMovie(movie)}>Удалить</button>
                </td>
              </tr>
            ))}
            {movies.length === 0 && (
              <tr>
                <td colSpan={COLUMNS.length + 1}>{loading ? 'Загрузка...' : 'Фильмов нет'}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
          Назад
        </button>
        <span>
          Страница {page + 1} из {totalPages} (всего фильмов: {total})
        </span>
        <button disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>
          Вперёд
        </button>
      </div>

      {showCreate && (
        <MovieForm
          movie={null}
          onClose={() => setShowCreate(false)}
          onSaved={() => {
            setShowCreate(false)
            setReload(reload + 1)
          }}
        />
      )}

      {editMovie && (
        <MovieForm
          movie={editMovie}
          onClose={() => setEditMovie(null)}
          onSaved={() => {
            setEditMovie(null)
            setReload(reload + 1)
          }}
        />
      )}

      {viewMovie && <MovieView movie={viewMovie} onClose={() => setViewMovie(null)} />}
    </div>
  )
}

export default MoviesPage
