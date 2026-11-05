import PixelMeter from '../../../components/PixelMeter/PixelMeter'
import type { StackCategory } from '../../../types/home'
import './HomeStack.scss'

interface HomeStackProps {
  categories: StackCategory[]
}

export default function HomeStack({ categories }: HomeStackProps) {
  return (
    <div className="home-stack">
      {categories.map((category) => (
        <section key={category.id} className="home-stack__category" aria-labelledby={`stack-${category.id}`}>
          <h4 id={`stack-${category.id}`} className="home-stack__label">
            {category.label}
          </h4>
          <ul className="home-stack__list">
            {category.items.map((item) => (
              <li key={item.name} className="home-stack__item">
                <span className="home-stack__name">{item.name}</span>
                <PixelMeter value={item.level} label={`Niveau en ${item.name}`} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
