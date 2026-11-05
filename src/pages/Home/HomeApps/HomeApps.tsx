import LinkButton from '../../../components/LinkButton/LinkButton'
import Tag from '../../../components/Tag/Tag'
import type { AppRepo } from '../../../types/home'
import './HomeApps.scss'

interface HomeAppsProps {
  apps: AppRepo[]
}

export default function HomeApps({ apps }: HomeAppsProps) {
  return (
    <ul className="home-apps">
      {apps.map((app) => (
        <li key={app.id} className="home-apps__item">
          <article className="home-apps__repo">
            <h4 className="home-apps__name">{app.name}</h4>
            <p className="home-apps__description">{app.description}</p>
            <div className="home-apps__meta">
              <Tag>{app.language}</Tag>
              <span className="home-apps__stars" aria-label={`${app.stars} étoiles`}>
                ★ {app.stars}
              </span>
            </div>
            <LinkButton className="home-apps__link" href={app.url} isExternal>
              voir le repo
            </LinkButton>
          </article>
        </li>
      ))}
    </ul>
  )
}
