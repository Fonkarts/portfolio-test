export type CardId = 'experiences' | 'stack' | 'apps' | 'hobbies'

export type HobbyIcon = 'gamepad' | 'mountain' | 'camera' | 'cup'

export type SkillLevel = 1 | 2 | 3 | 4 | 5

export interface ProfileLink {
  label: string
  href: string
  isPrimary?: boolean
  isExternal?: boolean
}

export interface Profile {
  firstName: string
  lastName: string
  handle: string
  role: string
  tagline: string
  bio: string
  location: string
  focus: string
  availability: string
  careerStart: string
  /** Chemin de la photo (ex. "/photo.jpg" placée dans /public). Vide = placeholder. */
  photoUrl?: string
  links: ProfileLink[]
}

export interface HomeCard {
  id: CardId
  title: string
  summary: string
  filename: string
}

export interface Experience {
  id: string
  role: string
  company: string
  location: string
  /** Format "YYYY-MM" */
  startDate: string
  /** Format "YYYY-MM", null = poste actuel */
  endDate: string | null
  description: string
  highlights: string[]
  stack: string[]
}

export interface StackItem {
  name: string
  level: SkillLevel
}

export interface StackCategory {
  id: string
  label: string
  items: StackItem[]
}

export interface AppRepo {
  id: string
  name: string
  description: string
  language: string
  stars: number
  url: string
}

export interface Hobby {
  id: string
  label: string
  description: string
  icon: HobbyIcon
}
