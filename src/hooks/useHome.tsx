import { useCallback, useEffect, useState } from 'react'
import type {
  AppRepo,
  CardId,
  Experience,
  Hobby,
  HomeCard,
  Profile,
  StackCategory,
} from '../types/home'

// ---------------------------------------------------------------------------
// Source of truth — données fictives à remplacer par les vraies (ou un appel API)
// ---------------------------------------------------------------------------

const PROFILE: Profile = {
  firstName: 'Alex',
  lastName: 'Moreau',
  handle: 'alex-moreau',
  role: 'Développeur web full-stack',
  tagline: 'Je conçois des interfaces nettes et des API solides, pixel par pixel.',
  bio: "Passionné par le front-end et le design d'interface, j'accompagne les équipes produit de la maquette à la mise en production : architecture React, design systems, accessibilité et API Node.js.",
  location: 'Lyon, France',
  focus: 'React · TypeScript · Node',
  availability: 'Disponible pour de nouveaux projets',
  careerStart: '2017-09',
  photoUrl: undefined,
  links: [
    { label: 'Me contacter', href: 'mailto:alex.moreau@example.com', isPrimary: true },
    { label: 'GitHub', href: '#', isExternal: true },
    { label: 'LinkedIn', href: '#', isExternal: true },
    { label: 'CV (PDF)', href: '#' },
  ],
}

const CARDS: HomeCard[] = [
  {
    id: 'experiences',
    title: 'Expériences',
    summary: "Parcours, missions et équipes qui m'ont fait grandir.",
    filename: 'experiences.log',
  },
  {
    id: 'stack',
    title: 'Stack technique',
    summary: "Langages, frameworks et outils que j'utilise au quotidien.",
    filename: 'stack.json',
  },
  {
    id: 'apps',
    title: 'Apps',
    summary: 'Side projects et dépôts publics sur mon GitHub.',
    filename: '~/apps',
  },
  {
    id: 'hobbies',
    title: 'Hobbies',
    summary: 'Ce qui m’occupe quand je ne code pas (ou presque).',
    filename: 'hobbies.txt',
  },
]

const EXPERIENCES: Experience[] = [
  {
    id: 'pixelune',
    role: 'Lead développeur front-end',
    company: 'Studio Pixelune',
    location: 'Lyon · hybride',
    startDate: '2023-03',
    endDate: null,
    description:
      "Pilotage technique du front d'une plateforme SaaS de réservation utilisée par 400 établissements.",
    highlights: [
      'Mise en place d’un design system React documenté sous Storybook',
      'Score Lighthouse passé de 62 à 96 sur les pages clés',
      'Encadrement de 4 développeurs et rituels de code review',
    ],
    stack: ['React', 'TypeScript', 'SCSS', 'Vite', 'Storybook'],
  },
  {
    id: 'nordbyte',
    role: 'Développeur full-stack',
    company: 'Nordbyte',
    location: 'Lille',
    startDate: '2020-09',
    endDate: '2023-02',
    description: 'Développement d’outils internes de logistique et d’une API de suivi de colis.',
    highlights: [
      'Conception d’une API GraphQL consommée par 3 applications',
      'Migration progressive d’AngularJS vers React',
      'Mise en place des tests end-to-end en CI',
    ],
    stack: ['React', 'Node.js', 'GraphQL', 'PostgreSQL', 'Docker'],
  },
  {
    id: 'carre-blanc',
    role: 'Développeur front-end',
    company: 'Agence Carré Blanc',
    location: 'Paris',
    startDate: '2019-01',
    endDate: '2020-08',
    description: 'Intégration et développement de sites vitrines et e-commerce pour des marques lifestyle.',
    highlights: [
      'Intégration de plus de 20 sites responsive et accessibles',
      'Création d’un starter kit SCSS/BEM réutilisé par toute l’agence',
    ],
    stack: ['JavaScript', 'SCSS', 'Vue', 'Shopify'],
  },
  {
    id: 'cityweb',
    role: 'Développeur web — alternance',
    company: 'Cityweb Collectivités',
    location: 'Villeurbanne',
    startDate: '2017-09',
    endDate: '2018-12',
    description: 'Maintenance et évolution de portails citoyens pour des collectivités locales.',
    highlights: ['Refonte du formulaire de démarches en ligne (RGAA AA)'],
    stack: ['PHP', 'JavaScript', 'MySQL'],
  },
]

const STACK: StackCategory[] = [
  {
    id: 'front',
    label: 'Front-end',
    items: [
      { name: 'TypeScript', level: 5 },
      { name: 'React', level: 5 },
      { name: 'SCSS / BEM', level: 5 },
      { name: 'Next.js', level: 4 },
      { name: 'Vue', level: 3 },
      { name: 'Accessibilité', level: 4 },
    ],
  },
  {
    id: 'back',
    label: 'Back-end',
    items: [
      { name: 'Node.js', level: 4 },
      { name: 'NestJS', level: 3 },
      { name: 'GraphQL', level: 4 },
      { name: 'PostgreSQL', level: 3 },
      { name: 'Python', level: 2 },
    ],
  },
  {
    id: 'tools',
    label: 'Outils',
    items: [
      { name: 'Git', level: 5 },
      { name: 'Vite', level: 4 },
      { name: 'Vitest / Playwright', level: 4 },
      { name: 'Docker', level: 3 },
      { name: 'Figma', level: 3 },
    ],
  },
]

// Placeholders : à remplacer par les vrais dépôts GitHub
const APPS: AppRepo[] = [
  {
    id: 'pixel-board',
    name: 'pixel-board',
    description: 'Kanban minimaliste en pixel art, synchronisé en temps réel.',
    language: 'TypeScript',
    stars: 42,
    url: '#',
  },
  {
    id: 'meteo-cli',
    name: 'meteo-cli',
    description: 'La météo dans le terminal, avec des icônes ASCII.',
    language: 'Node.js',
    stars: 18,
    url: '#',
  },
  {
    id: 'budget-buddy',
    name: 'budget-buddy',
    description: 'Application de suivi de budget, hors-ligne et chiffrée.',
    language: 'React',
    stars: 27,
    url: '#',
  },
  {
    id: 'dotfiles',
    name: 'dotfiles',
    description: 'Ma configuration zsh, Neovim et Git, prête à installer.',
    language: 'Shell',
    stars: 9,
    url: '#',
  },
]

const HOBBIES: Hobby[] = [
  {
    id: 'gamedev',
    label: 'Game jams',
    description: 'Des petits jeux en pixel art créés en 48 h avec Godot.',
    icon: 'gamepad',
  },
  {
    id: 'climbing',
    label: 'Escalade',
    description: 'En salle l’hiver, en falaise dès que le soleil revient.',
    icon: 'mountain',
  },
  {
    id: 'photo',
    label: 'Photo argentique',
    description: 'Un vieux Pentax, des pellicules N&B et un labo dans la salle de bain.',
    icon: 'camera',
  },
  {
    id: 'coffee',
    label: 'Café de spécialité',
    description: 'Méthodes douces, balance de précision et beaucoup trop de matériel.',
    icon: 'cup',
  },
]

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

interface PanelState {
  /** Carte dont le contenu est affiché (conservée pendant l'animation de fermeture) */
  activeId: CardId | null
  isOpen: boolean
}

export function useHome() {
  const [panel, setPanel] = useState<PanelState>({ activeId: null, isOpen: false })

  const closePanel = useCallback(() => {
    setPanel((previous) => ({ ...previous, isOpen: false }))
  }, [])

  const toggleCard = useCallback(
    (id: CardId) => {
      if (panel.isOpen) {
        // Même carte : on ferme. Autre carte : on remplace simplement le contenu.
        setPanel(panel.activeId === id ? { activeId: id, isOpen: false } : { activeId: id, isOpen: true })
        return
      }

      // Panneau fermé : on positionne d'abord le panneau sous la bonne carte,
      // puis on l'ouvre au frame suivant pour que l'animation parte de cette carte.
      setPanel({ activeId: id, isOpen: false })
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPanel({ activeId: id, isOpen: true }))
      })
    },
    [panel],
  )

  useEffect(() => {
    if (!panel.isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closePanel()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [panel.isOpen, closePanel])

  return {
    profile: PROFILE,
    cards: CARDS,
    experiences: EXPERIENCES,
    stackCategories: STACK,
    apps: APPS,
    hobbies: HOBBIES,
    activeCardId: panel.activeId,
    isPanelOpen: panel.isOpen,
    toggleCard,
    closePanel,
  }
}
