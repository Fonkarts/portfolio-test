import { cx } from '../../utils/classNames'
import './SectionHeading.scss'

interface SectionHeadingProps {
  id: string
  index: string
  title: string
  description?: string
  className?: string
}

/** Titre de section (h2) préfixé d'un chevron de prompt. */
export default function SectionHeading({ id, index, title, description, className }: SectionHeadingProps) {
  return (
    <div className={cx('section-heading', className)}>
      <span className="section-heading__index">{index}</span>
      <h2 id={id} className="section-heading__title">
        <span className="section-heading__prompt" aria-hidden="true">
          &gt;
        </span>
        {title}
      </h2>
      {description && <p className="section-heading__description">{description}</p>}
    </div>
  )
}
