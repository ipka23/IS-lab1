export const GENRES = ['ACTION', 'WESTERN', 'ADVENTURE', 'THRILLER', 'FANTASY']
export const RATINGS = ['PG', 'R', 'NC_17']
export const COLORS = ['GREEN', 'RED', 'BLACK', 'BLUE', 'YELLOW']
export const COUNTRIES = ['UNITED_KINGDOM', 'SPAIN', 'INDIA']

export const COLOR_NAMES = {
  GREEN: 'Зелёный',
  RED: 'Красный',
  BLACK: 'Чёрный',
  BLUE: 'Синий',
  YELLOW: 'Жёлтый',
}

export const GENRE_NAMES = {
  ACTION: 'Боевик',
  WESTERN: 'Вестерн',
  ADVENTURE: 'Приключения',
  THRILLER: 'Триллер',
  FANTASY: 'Фэнтези',
}

export const RATING_NAMES = {
  PG: 'PG',
  R: 'R',
  NC_17: 'NC-17',
}

export const COUNTRY_NAMES = {
  UNITED_KINGDOM: 'Великобритания',
  SPAIN: 'Испания',
  INDIA: 'Индия',
}

export const PAGE_SIZE = 10

export function toMillions(dollars) {
  return dollars / 1000000
}

export function fromMillions(millions) {
  return Math.round(Number(millions) * 1000000)
}

export const MAX_INT = 2147483647

export function formatDate(date) {
  if (!date) {
    return ''
  }
  return String(date).slice(0, 19).replace('T', ' ')
}

export function personName(person) {
  if (!person) {
    return '-'
  }
  return person.name
}
