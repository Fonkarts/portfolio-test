import Avatar from '../../../components/Avatar/Avatar'
import LinkButton from '../../../components/LinkButton/LinkButton'
import PixelIcon from '../../../components/PixelIcon/PixelIcon'
import { PIXEL_ICONS } from '../../../components/PixelIcon/pixelIcons'
import type { Profile } from '../../../types/home'
import './HomeHero.scss'

export interface HeroFact {
  label: string
  value: string
}

interface HomeHeroProps {
  profile: Profile
  facts: HeroFact[]
}

export default function HomeHero({ profile, facts }: HomeHeroProps) {
  const fullName = `${profile.firstName} ${profile.lastName}`

  return (
    <header className="home-hero">
      <div className="home-hero__topbar">
        <span className="home-hero__path">~/{profile.handle}</span>
        <span className="home-hero__status">{profile.availability}</span>
      </div>

      <div className="home-hero__layout">
        <div className="home-hero__content">
          <p className="home-hero__eyebrow">
            <PixelIcon className="home-hero__eyebrow-icon" pattern={PIXEL_ICONS.chevron} />
            {profile.role}
          </p>

          <h1 className="home-hero__title">
            {fullName}
            <span className="home-hero__cursor" aria-hidden="true">
              _
            </span>
          </h1>

          <p className="home-hero__tagline">{profile.tagline}</p>
          <p className="home-hero__bio">{profile.bio}</p>

          <dl className="home-hero__facts">
            {facts.map((fact) => (
              <div key={fact.label} className="home-hero__fact">
                <dt className="home-hero__fact-label">{fact.label}</dt>
                <dd className="home-hero__fact-value">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <ul className="home-hero__links">
            {profile.links.map((link) => (
              <li key={link.label}>
                <LinkButton
                  href={link.href}
                  variant={link.isPrimary ? 'solid' : 'ghost'}
                  isExternal={link.isExternal}
                >
                  {link.label}
                </LinkButton>
              </li>
            ))}
          </ul>
        </div>

        <Avatar
          className="home-hero__avatar"
          src={profile.photoUrl}
          alt={`Portrait de ${fullName}`}
          caption={profile.location}
        />
      </div>
    </header>
  )
}
