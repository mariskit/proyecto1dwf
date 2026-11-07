/**
 * Helper dictionary and functions to translate Rick and Morty API terms to Spanish
 * to match the exact UX/UI displayed in the reference specifications (proyecto-01.png).
 */

export const translateStatus = (status: string): string => {
  const normalized = status.toLowerCase()
  switch (normalized) {
    case 'alive':
      return 'Vivo'
    case 'dead':
      return 'Muerto'
    case 'unknown':
      return 'Desconocido'
    default:
      return status
  }
}

export const translateGender = (gender: string): string => {
  const normalized = gender.toLowerCase()
  switch (normalized) {
    case 'male':
      return 'Masculino'
    case 'female':
      return 'Femenino'
    case 'genderless':
      return 'Sin género'
    case 'unknown':
      return 'Desconocido'
    default:
      return gender
  }
}

export const translateSpecies = (species: string): string => {
  const normalized = species.toLowerCase()
  switch (normalized) {
    case 'human':
      return 'Humano'
    case 'alien':
      return 'Alien'
    case 'humanoid':
      return 'Humanoide'
    case 'poopybutthole':
      return 'Poopybutthole'
    case 'mythological creature':
      return 'Criatura mitológica'
    case 'animal':
      return 'Animal'
    case 'robot':
      return 'Robot'
    case 'cronenberg':
      return 'Cronenberg'
    case 'disease':
      return 'Enfermedad'
    case 'unknown':
      return 'Desconocido'
    default:
      return species
  }
}

export const translateLocationName = (name: string): string => {
  if (!name || name.toLowerCase() === 'unknown') return 'Desconocido'
  if (name.includes('Earth (C-137)')) return 'Tierra (C-137)'
  if (name.includes('Earth (Replacement Dimension)')) return 'Tierra (Reemplazo)'
  if (name.includes('Citadel of Ricks')) return 'Ciudadela de Ricks'
  if (name.includes('Post-Apocalyptic Earth')) return 'Tierra Post-Apocalíptica'
  if (name.includes('Worldender\'s lair')) return 'Guarida de Worldender'
  return name
}

