import { Card, CardContent, CardHeader, Chip, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import * as Tone from 'tone'

import useSignal from '../../../utils/useSignal'
import KeyboardMidiInput from '../../audio/KeyboardMidiInput'
import { RackUnitSize } from '../Rack'

export default function KeyboardInput(): JSX.Element {
  const [[input, osc]] = React.useState(function () {
    const input = new KeyboardMidiInput()
    const osc = new Tone.Oscillator(440, 'sine')
    const gain = new Tone.Gain(0)

    input.note.connect(osc.frequency)
    input.gate.connect(gain.gain)

    osc.connect(gain)
    gain.toDestination()

    return [input, osc, gain] as const
  })

  const note = useSignal(input.note)
  const gate = useSignal(input.gate)

  React.useEffect(
    function () {
      input.addEventListeners()
      osc.start()
      return function () {
        input.removeEventListeners()
        osc.stop()
      }
    },
    [input, osc],
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
              disabled={gate === 0}
              label={gate ? Tone.Frequency(note).toNote() : 'OFF'}
              sx={{ width: '100%' }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
