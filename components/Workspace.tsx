import React from 'react'
import * as Tone from 'tone'

import Rack from './rack/Rack'

export default function Workspace(): JSX.Element {
  React.useEffect(() => {
    Tone.context.lookAhead = 0

    function resume(): void {
      Tone.start().then(() => console.log('AudioContext started'))
      window.removeEventListener('keydown', resume)
      window.removeEventListener('pointerdown', resume)
    }

    window.addEventListener('keydown', resume)
    window.addEventListener('pointerdown', resume)
  })

  return <Rack />
}
