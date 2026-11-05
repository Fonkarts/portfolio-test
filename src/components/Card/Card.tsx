import type { CSSProperties } from 'react'
import PixelIcon, { type PixelPattern } from '../PixelIcon/PixelIcon'
import { cx } from '../../utils/classNames'
import './Card.scss'

interface CardProps {
  buttonId: string
  controlsId: string
  index: number
  title: string
  summary: string
  meta: string
  icon: PixelPattern
  isActive: boolean
  onSelect: () => void
  className?: string
}

/** Carte cliquable (pattern accordéon) : stateless, l'état vit dans la page. */
export default function Card({
  buttonId,
  controlsId,
  index,
  title,
  summary,
  meta,
  icon,
  isActive,
  onSelect,
  className,
}: CardProps) {
  const style = { '--card-delay': `${index * 90}ms` } as CSSProperties

  return (
    <article className={cx('card', isActive && 'card--active', className)} style={style}>
      <div className="card__header">
        <span className="card__index">{String(index + 1).padStart(2, '0')}</span>
        <PixelIcon className="card__icon" pattern={icon} />
      </div>

      <h3 className="card__title">
        <button
          id={buttonId}
          className="card__button"
          type="button"
          aria-expanded={isActive}
          aria-controls={controlsId}
          onClick={onSelect}
        >
          <span className="card__chevron" aria-hidden="true">
            &gt;
          </span>
          {title}
        </button>
      </h3>

      <p className="card__summary">{summary}</p>

      <div className="card__footer">
        <span>{meta}</span>
        <span className="card__action" aria-hidden="true">
          {isActive ? '[ fermer ]' : '[ ouvrir ]'}
        </span>
      </div>
    </article>
  )
}
