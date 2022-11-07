import React from 'react'
import * as Tone from 'tone'

import ToneGraph from '../utils/ToneGraph'

import Rack from './rack/Rack'

type WorkspaceState = {
  graph: ToneGraph
}

export const WorkspaceContext = React.createContext<WorkspaceState>({
  graph: new ToneGraph(),
})

export default function Workspace(): JSX.Element {
  const [state] = React.useState(function () {
    return {
      graph: new ToneGraph(),
    }
  })

  React.useEffect(function () {
    window.state = state

    Tone.context.lookAhead = 0

    function resume(): void {
      Tone.start().then(() => console.log('AudioContext started'))
      window.removeEventListener('keydown', resume)
      window.removeEventListener('pointerdown', resume)
    }

    window.addEventListener('keydown', resume)
    window.addEventListener('pointerdown', resume)
  })

  return (
    <WorkspaceContext.Provider value={state}>
      <Rack />
    </WorkspaceContext.Provider>
  )
}
