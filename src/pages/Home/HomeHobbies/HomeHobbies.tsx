import PixelIcon, { type PixelPattern } from '../../../components/PixelIcon/PixelIcon'
import type { Hobby } from '../../../types/home'
import './HomeHobbies.scss'

export interface HobbyView extends Hobby {
  pattern: PixelPattern
}

interface HomeHobbiesProps {
  hobbies: HobbyView[]
}

export default function HomeHobbies({ hobbies }: HomeHobbiesProps) {
  return (
    <ul className="home-hobbies">
      {hobbies.map((hobby) => (
        <li key={hobby.id} className="home-hobbies__item">
          <PixelIcon className="home-hobbies__icon" pattern={hobby.pattern} />
          <div className="home-hobbies__text">
            <h4 className="home-hobbies__label">{hobby.label}</h4>
            <p className="home-hobbies__description">{hobby.description}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
