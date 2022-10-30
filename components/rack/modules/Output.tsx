import { Card, CardContent, CardHeader, Divider } from '@mui/material'

import { RackUnitSize } from '../Rack'

export default function Output(): JSX.Element {
  return (
    <Card sx={{ height: 2 * RackUnitSize, width: 2 * RackUnitSize }}>
      <CardHeader title="OUTPUT" />
      <Divider />
      <CardContent>TODO</CardContent>
    </Card>
  )
}
