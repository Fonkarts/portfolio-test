import type { CSSProperties, ReactNode } from 'react'
import Card from '../../components/Card/Card'
import type { PixelPattern } from '../../components/PixelIcon/PixelIcon'
import PixelIcon from '../../components/PixelIcon/PixelIcon'
import { PIXEL_ICONS } from '../../components/PixelIcon/pixelIcons'
import RevealPanel from '../../components/RevealPanel/RevealPanel'
import SectionHeading from '../../components/SectionHeading/SectionHeading'
import { useHome } from '../../hooks/useHome'
import type { CardId } from '../../types/home'
import { formatDuration, formatPeriod } from '../../utils/date'
import HomeApps from './HomeApps/HomeApps'
import HomeExperiences from './HomeExperiences/HomeExperiences'
import HomeHero from './HomeHero/HomeHero'
import HomeHobbies from './HomeHobbies/HomeHobbies'
import HomeStack from './HomeStack/HomeStack'
import './Home.scss'

const PANEL_ID = 'home-panel'
const CURRENT_YEAR = new Date().getFullYear()

/** Nombre de colonnes de la grille de cartes selon le breakpoint (cf. Home.scss) */
const GRID_COLUMNS = [4, 2, 1] as const

const CARD_ICONS: Record<CardId, PixelPattern> = {
  experiences: PIXEL_ICONS.briefcase,
  stack: PIXEL_ICONS.code,
  apps: PIXEL_ICONS.windows,
  hobbies: PIXEL_ICONS.heart,
}

const getCardButtonId = (id: CardId) => `card-${id}`

/**
 * Calcule, pour chaque layout de grille, la colonne de la carte active (point de départ
 * de l'animation horizontale) et l'ordre CSS qui place le panneau juste sous sa rangée.
 */
function getPanelPlacement(index: number, total: number): CSSProperties {
  const variables: Record<string, number> = {}

  for (const columns of GRID_COLUMNS) {
    const lastIndexOfRow = Math.min(total, (Math.floor(index / columns) + 1) * columns) - 1
    variables[`--col-${columns}`] = index % columns
    // Les cartes ont un ordre pair (2, 4, 6…) : le panneau s'intercale avec un ordre impair
    variables[`--order-${columns}`] = (lastIndexOfRow + 1) * 2 + 1
  }

  return variables as CSSProperties
}

export default function Home() {
  const {
    profile,
    cards,
    experiences,
    stackCategories,
    apps,
    hobbies,
    activeCardId,
    isPanelOpen,
    toggleCard,
    closePanel,
  } = useHome()

  // --- Transformations des données pour les composants de plus bas niveau ---

  const technologiesCount = stackCategories.reduce((total, category) => total + category.items.length, 0)

  const cardMeta: Record<CardId, string> = {
    experiences: `${experiences.length} postes`,
    stack: `${technologiesCount} technos`,
    apps: `${apps.length} repos`,
    hobbies: `${hobbies.length} passions`,
  }

  const heroFacts = [
    { label: 'basé à', value: profile.location },
    { label: 'expérience', value: formatDuration(profile.careerStart, null) },
    { label: 'focus', value: profile.focus },
  ]

  const activeIndex = cards.findIndex((card) => card.id === activeCardId)
  const activeCard = activeIndex >= 0 ? cards[activeIndex] : undefined

  const renderPanelContent = (id: CardId): ReactNode => {
    switch (id) {
      case 'experiences':
        return (
          <HomeExperiences
            experiences={experiences.map((experience) => ({
              ...experience,
              period: formatPeriod(experience.startDate, experience.endDate),
              duration: formatDuration(experience.startDate, experience.endDate),
            }))}
          />
        )
      case 'stack':
        return <HomeStack categories={stackCategories} />
      case 'apps':
        return <HomeApps apps={apps} />
      case 'hobbies':
        return <HomeHobbies hobbies={hobbies.map((hobby) => ({ ...hobby, pattern: PIXEL_ICONS[hobby.icon] }))} />
    }
  }

  const handlePanelClose = () => {
    closePanel()
    if (activeCardId) document.getElementById(getCardButtonId(activeCardId))?.focus()
  }

  return (
    <div className="home">
      <HomeHero profile={profile} facts={heroFacts} />

      <main>
        <section className="home__explore" aria-labelledby="explore-title">
          <SectionHeading
            id="explore-title"
            index="01"
            title="Explorer"
            description="Cliquez sur une carte pour ouvrir le fichier correspondant."
          />

          <div className="home__cards">
            {cards.map((card, index) => (
              <Card
                key={card.id}
                className="home__card"
                buttonId={getCardButtonId(card.id)}
                controlsId={PANEL_ID}
                index={index}
                title={card.title}
                summary={card.summary}
                meta={cardMeta[card.id]}
                icon={CARD_ICONS[card.id]}
                isActive={isPanelOpen && card.id === activeCardId}
                onSelect={() => toggleCard(card.id)}
              />
            ))}

            <RevealPanel
              id={PANEL_ID}
              className="home__panel"
              isOpen={isPanelOpen}
              title={activeCard?.filename ?? ''}
              labelledBy={activeCard && getCardButtonId(activeCard.id)}
              contentKey={activeCard?.id}
              onClose={handlePanelClose}
              style={getPanelPlacement(Math.max(activeIndex, 0), cards.length)}
            >
              {activeCard && renderPanelContent(activeCard.id)}
            </RevealPanel>
          </div>
        </section>
      </main>

      <footer className="home__footer">
        <p className="home__copyright">
          © {CURRENT_YEAR} {profile.firstName} {profile.lastName}
        </p>
        <a className="home__back-to-top" href="#root">
          <PixelIcon className="home__back-to-top-icon" pattern={PIXEL_ICONS.chevron} />
          retour en haut
        </a>
      </footer>
    </div>
  )
}
