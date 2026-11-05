import type { CSSProperties } from 'react'
import { cx } from '../../utils/classNames'
import './PixelMeter.scss'

interface PixelMeterProps {
  value: number
  label: string
  max?: number
  className?: string
}

/** Jauge de niveau en blocs de pixels. */
export default function PixelMeter({ value, label, max = 5, className }: PixelMeterProps) {
  return (
    <span
      className={cx('pixel-meter', className)}
      role="meter"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={`${value} sur ${max}`}
    >
      {Array.from({ length: max }, (_, index) => (
        <span
          key={index}
          className={cx('pixel-meter__cell', index < value && 'pixel-meter__cell--filled')}
          style={{ '--cell-delay': `${index * 70}ms` } as CSSProperties}
        />
      ))}
    </span>
  )
}
