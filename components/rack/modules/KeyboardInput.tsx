import { Card, CardContent, CardHeader, Chip, Divider, Grid, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'

import AudioReactContext from '../../audio/AudioReactContext'
import { midiNumberToFrequency, midiNumberToString } from '../../audio/Tuning'
import useKeyboardInput from '../../audio/useKeyboardInput'
import { RackUnitSize } from '../Rack'

export default function KeyboardInput(): JSX.Element {
  const audioCtx = useContext(AudioReactContext)
  const [cv, gate] = useKeyboardInput()
  const [[oscillatorNode, gainNode]] = useState(() => {
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()

    osc.connect(gain)
    gain.connect(audioCtx.destination)

    osc.start(0)
    gain.gain.setValueAtTime(0, 0)

    return [osc, gain] as const
  })

  React.useEffect(
    () => void (cv && oscillatorNode.frequency.setValueAtTime(midiNumberToFrequency(cv), audioCtx.currentTime)),
    [cv],
  )

  React.useEffect(
    () =>
      void (gate
        ? gainNode.gain.setValueAtTime(1, audioCtx.currentTime)
        : gainNode.gain.setValueAtTime(0, audioCtx.currentTime)),
    [gate],
  )

  return (
    <Card
      sx={{
        height: 2 * RackUnitSize,
        width: 2 * RackUnitSize,
      }}
    >
      <CardHeader title="KEYBOARD IN" />
      <Divider />
      <CardContent>
        <Grid alignItems="center" container>
          <Grid item xs={6}>
            <Typography>NOTE:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Chip
              color="primary"
              disabled={!gate}
              label={gate ? midiNumberToString(cv) : 'OFF'}
              sx={{ width: '100%' }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
