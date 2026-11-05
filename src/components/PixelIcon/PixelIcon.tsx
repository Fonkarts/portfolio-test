import { cx } from '../../utils/classNames'
import './PixelIcon.scss'

/** Motif ligne par ligne : "#" = pixel plein, tout autre caractère = vide. */
export type PixelPattern = readonly string[]

interface PixelIconProps {
  pattern: PixelPattern
  /** Texte alternatif ; sans titre, l'icône est décorative. */
  title?: string
  className?: string
}

export default function PixelIcon({ pattern, title, className }: PixelIconProps) {
  const width = Math.max(...pattern.map((row) => row.length))
  const height = pattern.length
  const pixels = pattern.flatMap((row, y) =>
    [...row].flatMap((cell, x) => (cell === '#' ? [{ x, y }] : [])),
  )

  return (
    <svg
      className={cx('pixel-icon', className)}
      viewBox={`0 0 ${width} ${height}`}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {pixels.map(({ x, y }) => (
        <rect key={`${x}-${y}`} className="pixel-icon__pixel" x={x} y={y} width={1} height={1} />
      ))}
    </svg>
  )
}
