import type { CSSProperties, ReactNode } from 'react'
import { cx } from '../../utils/classNames'
import './RevealPanel.scss'

interface RevealPanelProps {
  id: string
  isOpen: boolean
  title: string
  onClose: () => void
  children: ReactNode
  /** Id de l'élément qui contrôle le panneau (bouton de la carte) */
  labelledBy?: string
  /** Change à chaque nouveau contenu pour rejouer l'animation d'apparition */
  contentKey?: string
  closeLabel?: string
  className?: string
  /** Accepte `--reveal-left`, `--reveal-right` (point de départ horizontal) et `--reveal-gap` */
  style?: CSSProperties
}

/**
 * Panneau « fenêtre de terminal » révélé en deux temps :
 * 1. élargissement horizontal depuis la zone définie par --reveal-left / --reveal-right
 * 2. déploiement vertical du contenu, qui pousse la suite de la page vers le bas.
 */
export default function RevealPanel({
  id,
  isOpen,
  title,
  onClose,
  children,
  labelledBy,
  contentKey,
  closeLabel = 'Fermer le panneau',
  className,
  style,
}: RevealPanelProps) {
  return (
    <div
      id={id}
      role="region"
      aria-labelledby={labelledBy}
      className={cx('reveal-panel', isOpen && 'reveal-panel--open', className)}
      style={style}
      inert={!isOpen}
    >
      <div className="reveal-panel__bar">
        <span className="reveal-panel__dots" aria-hidden="true">
          <span className="reveal-panel__dot" />
          <span className="reveal-panel__dot" />
          <span className="reveal-panel__dot" />
        </span>
        <h3 className="reveal-panel__title">{title}</h3>
        <button className="reveal-panel__close" type="button" onClick={onClose} aria-label={closeLabel}>
          [x]
        </button>
      </div>

      <div className="reveal-panel__body">
        <div key={contentKey} className="reveal-panel__content">
          {children}
        </div>
      </div>
    </div>
  )
}
