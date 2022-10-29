import { Add as AddIcon, DarkMode as DarkModeIcon, LightMode as LightModeIcon } from '@mui/icons-material'
import {
  Box,
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Switch,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'
import React from 'react'

import { ColorModeContext } from './_app'

const currentYear = new Date().getFullYear()

export default function Home(): JSX.Element {
  const { setIsDark } = React.useContext(ColorModeContext)
  const theme = useTheme()
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => setIsDark(event.target.checked)
  return (
    <Box>
      <Drawer anchor="left" variant="permanent">
        <Toolbar>
          <Box paddingX={0} paddingY={2}>
            <Typography fontFamily="Fira Mono, monospace" fontWeight="bold" letterSpacing="8px" noWrap variant="h3">
              KANADE
            </Typography>
          </Box>
        </Toolbar>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText>Do stuff</ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
        <Stack direction="column-reverse" height="100%" paddingBottom={2}>
          <List>
            <ListItem secondaryAction={<Switch checked={theme.palette.mode === 'dark'} onChange={handleChange} />}>
              <ListItemIcon>{theme.palette.mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}</ListItemIcon>
              <ListItemText>25:00 mode</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>
                <Link
                  color={theme.palette.text.disabled}
                  href="https://www.github.com/charlieharutaka/kanade"
                  underline="hover"
                  variant="caption"
                >
                  by harutaka, {currentYear}
                </Link>
              </ListItemText>
            </ListItem>
          </List>
          <Divider />
        </Stack>
      </Drawer>
    </Box>
  )
}
