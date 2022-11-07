import { Card, CardContent, CardHeader, Chip, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import * as Tone from 'tone'

import useSignal from '../../../utils/useSignal'
import { WorkspaceContext } from '../../Workspace'
import KeyboardMidiInput from '../../audio/KeyboardMidiInput'
import { RackUnitSize } from '../Rack'

export default function KeyboardInput(): JSX.Element {
  const { graph } = React.useContext(WorkspaceContext)
  const [[input, osc, gain]] = React.useState(function () {
    const input = new KeyboardMidiInput()
    const osc = new Tone.Oscillator(440, 'sine')
    const gain = new Tone.Gain(0)

    return [input, osc, gain] as const
  })

  const note = useSignal(input.note)
  const gate = useSignal(input.gate)

  React.useEffect(
    function () {
      input.addEventListeners()

      graph.add(input.note)
      graph.add(input.gate)
      graph.add(osc.frequency)
      graph.add(gain.gain)
      graph.add(osc)
      graph.add(gain)
      graph.add(Tone.Destination)

      graph.connect(input.note, osc.frequency)
      graph.connect(input.gate, gain.gain)
      graph.connect(osc, gain)
      graph.connect(gain, Tone.Destination)

      osc.start()
      return function () {
        input.removeEventListeners()

        graph.disconnect(input.note, osc.frequency)
        graph.disconnect(input.gate, gain.gain)
        graph.disconnect(osc, gain)
        graph.disconnect(gain, Tone.Destination)

        graph.delete(input.note)
        graph.delete(input.gate)
        graph.delete(osc.frequency)
        graph.delete(gain.gain)
        graph.delete(osc)
        graph.delete(gain)
        graph.delete(Tone.Destination)

        osc.stop()
      }
    },
    [input, osc, gain, graph],
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
