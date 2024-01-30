import { useMemo, useState } from 'react'
import { SliderPlay } from '.'

export const SliderPlayList = () => {
  const [list] = useState([
    'HTML',
    'CSS',
    'Javascript',
    'ES6',
    'Vue',
    'React',
    'React Native',
    'Umi',
    'Node.js',
    'Nest.js',
    'THREE.js'
  ])

  const RenderChildren = useMemo(
    () =>
      list.map((text) => (
        <span
          style={{
            display: 'inline-block',
            padding: '8px 12px',
            margin: '0 4px',
            color: '#fff',
            backgroundColor: '#2c82fd',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
          key={text}
        >
          {text}
        </span>
      )),
    [list]
  )

  const containerStyle = {
    width: '800px',
    height: '500px',
    margin: '0 auto',
    backgroundColor: '#222',
    overflow: 'hidden',
    maskImage:
      'linear-gradient(90deg, transparent, #fff 20%, #fff 80%, transparent)',
    WebkitMaskImage:
      'linear-gradient(90deg, transparent, #fff 20%, #fff 80%, transparent)'
  }

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#222',
        paddingTop: '100px'
      }}
    >
      <div style={containerStyle}>
        <SliderPlay time={24}>{RenderChildren}</SliderPlay>
      </div>
    </div>
  )
}
