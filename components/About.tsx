import { Info as InfoIcon } from '@mui/icons-material'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import React from 'react'

export default function About(): JSX.Element {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = (): void => setOpen(true)

  const handleClose = (): void => setOpen(false)

  return (
    <>
      <ListItem disablePadding>
        <ListItemButton onClick={handleClickOpen}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText>about</ListItemText>
        </ListItemButton>
      </ListItem>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>ABOUT</DialogTitle>
        <DialogContent>
          <DialogContentText>perhaps yoisaki kanade&apos;s music will save someone one day.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
