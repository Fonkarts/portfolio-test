import type { ReactNode } from 'react'
import { cx } from '../../utils/classNames'
import './Tag.scss'

interface TagProps {
  children: ReactNode
  className?: string
}

export default function Tag({ children, className }: TagProps) {
  return <span className={cx('tag', className)}>{children}</span>
}
