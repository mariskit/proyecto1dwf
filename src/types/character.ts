export interface CharacterLocation {
  name: string
  url: string
}

export interface Character {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown' | string
  species: string
  type: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown' | string
  origin: CharacterLocation
  location: CharacterLocation
  image: string
  episode: string[]
  url: string
  created: string
}

export interface ApiResponseInfo {
  count: number
  pages: number
  next: string | null
  prev: string | null
}

export interface ApiResponse {
  info: ApiResponseInfo
  results: Character[]
}

export type StatusFilter = 'all' | 'alive' | 'dead' | 'unknown'
export type GenderFilter = 'all' | 'female' | 'male' | 'genderless' | 'unknown'

