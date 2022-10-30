import { Box, Stack } from '@mui/material'

import KeyboardInput from './modules/KeyboardInput'
import Output from './modules/Output'

export const RackUnitSize = 120

export default function Rack(): JSX.Element {
  return (
    <Box component="main" padding={2}>
      <Stack direction="column" padding={0} spacing={2}>
        <Stack direction="row" padding={0} spacing={2}>
          <KeyboardInput />
          <Output />
        </Stack>
      </Stack>
    </Box>
  )
}
