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
import dynamic from 'next/dynamic'
import React from 'react'

import About from '../components/About'

import { ColorModeContext } from './_app'

const drawerWidth = 270

const Workspace = dynamic(() => import('../components/Workspace'), { ssr: false })
const currentYear = new Date().getFullYear()

export default function Home(): JSX.Element {
  const { setIsDark } = React.useContext(ColorModeContext)
  const theme = useTheme()
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = event => setIsDark(event.target.checked)

  return (
    <Box display="flex" height="100%" width="100%">
      <Drawer
        anchor="left"
        sx={{
          width: `${drawerWidth}px`,
        }}
        variant="permanent"
      >
        <Toolbar>
          <Box paddingX={0} paddingY={2}>
            <Typography fontWeight="bold" letterSpacing="8px" noWrap variant="h3">
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
              <ListItemText>stuff</ListItemText>
            </ListItemButton>
          </ListItem>
          <About />
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
      <Workspace />
    </Box>
  )
}
