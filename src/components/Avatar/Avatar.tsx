import PixelIcon from '../PixelIcon/PixelIcon'
import { PIXEL_ICONS } from '../PixelIcon/pixelIcons'
import { cx } from '../../utils/classNames'
import './Avatar.scss'

interface AvatarProps {
  alt: string
  src?: string
  caption?: string
  placeholderLabel?: string
  className?: string
}

/** Photo de profil encadrée de coins pixelisés ; affiche un placeholder sans `src`. */
export default function Avatar({
  alt,
  src,
  caption,
  placeholderLabel = 'photo à venir',
  className,
}: AvatarProps) {
  return (
    <figure className={cx('avatar', className)}>
      <div className="avatar__frame">
        {src ? (
          <img className="avatar__image" src={src} alt={alt} />
        ) : (
          <div className="avatar__placeholder" role="img" aria-label={alt}>
            <PixelIcon className="avatar__placeholder-icon" pattern={PIXEL_ICONS.person} />
            <span className="avatar__placeholder-label">{placeholderLabel}</span>
          </div>
        )}
      </div>
      {caption && <figcaption className="avatar__caption">{caption}</figcaption>}
    </figure>
  )
}
