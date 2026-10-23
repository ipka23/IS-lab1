import { useState } from 'react'
import MoviesPage from './MoviesPage.jsx'
import PersonsPage from './PersonsPage.jsx'
import SpecialPage from './SpecialPage.jsx'

function App() {
  const [tab, setTab] = useState('movies')

  return (
    <div className="app">
      <h1>Фильмы</h1>

      <div className="tabs">
        <button className={tab === 'movies' ? 'active' : ''} onClick={() => setTab('movies')}>
          Фильмы
        </button>
        <button className={tab === 'persons' ? 'active' : ''} onClick={() => setTab('persons')}>
          Люди
        </button>
        <button className={tab === 'special' ? 'active' : ''} onClick={() => setTab('special')}>
          Специальные операции
        </button>
      </div>

      <div hidden={tab !== 'movies'}>
        <MoviesPage />
      </div>
      <div hidden={tab !== 'persons'}>
        <PersonsPage active={tab === 'persons'} />
      </div>
      <div hidden={tab !== 'special'}>
        <SpecialPage />
      </div>
    </div>
  )
}

export default App
