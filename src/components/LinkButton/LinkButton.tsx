import type { ReactNode } from 'react'
import { cx } from '../../utils/classNames'
import './LinkButton.scss'

interface LinkButtonProps {
  href: string
  children: ReactNode
  variant?: 'solid' | 'ghost'
  isExternal?: boolean
  className?: string
}

export default function LinkButton({
  href,
  children,
  variant = 'ghost',
  isExternal = false,
  className,
}: LinkButtonProps) {
  return (
    <a
      className={cx('link-button', `link-button--${variant}`, className)}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
    >
      <span className="link-button__chevron" aria-hidden="true">
        &gt;
      </span>
      {children}
    </a>
  )
}
