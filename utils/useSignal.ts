import React from 'react'

import type * as Tone from 'tone'

export default function useSignal<T extends Tone.Unit.UnitName>(
  param: Tone.Signal<T>,
  refreshRate?: number,
): Tone.Unit.UnitMap[T] {
  const ref = React.useRef(param)
  const [value, setValue] = React.useState<Tone.Unit.UnitMap[T]>(param.value)

  React.useEffect(
    function () {
      const minDelta = refreshRate && (1 / refreshRate) * 1000
      let stop = false
      let lastTimestep: number | undefined = undefined

      function refresh(timestamp: number): void {
        const delta = timestamp - (lastTimestep ?? -Infinity)

        if (minDelta === undefined || delta >= minDelta) {
          lastTimestep = timestamp
          setValue(() => ref.current.value)
        }

        if (!stop) {
          window.requestAnimationFrame(refresh)
        }
      }

      window.requestAnimationFrame(refresh)

      return function () {
        stop = true
      }
    },
    [refreshRate],
  )

  return value
}
