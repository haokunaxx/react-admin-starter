import { PropsWithChildren, memo, useMemo } from 'react'
import SliderPlayCss from './index.module.css'

interface SliderPlayProps {
  time?: number
  playWhenHovered?: boolean
}

export const SliderPlay = memo((props: PropsWithChildren<SliderPlayProps>) => {
  const { children, time = 10, playWhenHovered } = props

  const rowItemChildren = useMemo(() => children, [children])

  const rowStyles = { '--t': `${time}s` } as any

  const rowClassName = `${SliderPlayCss['slider-play-row']} ${
    playWhenHovered ? '' : SliderPlayCss['pause-when-hovered']
  }`

  return (
    <div className={SliderPlayCss['slider-play-wrapper']}>
      <div className={rowClassName} style={rowStyles}>
        <div className={SliderPlayCss['slider-play-row-item']}>
          {rowItemChildren}
        </div>
        <div className={SliderPlayCss['slider-play-row-item']}>
          {rowItemChildren}
        </div>
      </div>
    </div>
  )
})
