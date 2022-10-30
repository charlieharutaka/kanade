import React from 'react'

import AudioReactContext from './audio/AudioReactContext'
import Rack from './rack/Rack'

export default function Workspace(): JSX.Element {
  const [audioContext] = React.useState(() => {
    const ctx = new AudioContext()

    function resume(): void {
      ctx.resume().then(() => console.log('AudioContext resumed'))
      window.removeEventListener('keydown', resume)
      window.removeEventListener('pointerdown', resume)
    }

    window.addEventListener('keydown', resume)
    window.addEventListener('pointerdown', resume)

    return ctx
  })

  return (
    <AudioReactContext.Provider value={audioContext}>
      <Rack />
    </AudioReactContext.Provider>
  )
}
