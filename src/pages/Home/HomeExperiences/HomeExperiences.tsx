import Tag from '../../../components/Tag/Tag'
import type { Experience } from '../../../types/home'
import { cx } from '../../../utils/classNames'
import './HomeExperiences.scss'

export interface ExperienceView extends Experience {
  period: string
  duration: string
}

interface HomeExperiencesProps {
  experiences: ExperienceView[]
}

export default function HomeExperiences({ experiences }: HomeExperiencesProps) {
  return (
    <ol className="home-experiences">
      {experiences.map((experience) => (
        <li
          key={experience.id}
          className={cx('home-experiences__item', !experience.endDate && 'home-experiences__item--current')}
        >
          <p className="home-experiences__period">
            {experience.period}
            <span className="home-experiences__duration">{experience.duration}</span>
          </p>

          <h4 className="home-experiences__role">
            {experience.role}
            <span className="home-experiences__company"> @ {experience.company}</span>
          </h4>

          <p className="home-experiences__location">{experience.location}</p>
          <p className="home-experiences__description">{experience.description}</p>

          <ul className="home-experiences__highlights">
            {experience.highlights.map((highlight) => (
              <li key={highlight} className="home-experiences__highlight">
                {highlight}
              </li>
            ))}
          </ul>

          <ul className="home-experiences__tags" aria-label="Technologies utilisées">
            {experience.stack.map((tech) => (
              <li key={tech}>
                <Tag>{tech}</Tag>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}
