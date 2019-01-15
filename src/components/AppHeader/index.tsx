import * as React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from '@material-ui/core'
import {
  ArrowBackIos as ArrowBackIcon
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  grow: {
    flexGrow: 1
  },
  link: {
    color: 'inherit'
  }
})

export default function AppHeader (props) {

  const classes = useStyles()

  const {
    title,
    backButton = false,
    children
  } = props

  function back () {
    history.back()
  }

  const BackButton = backButton ? (
    <IconButton
      color="inherit"
      onClick={back}
    >
      <ArrowBackIcon />
    </IconButton>
  ) : null

  return (
    <AppBar
      position="sticky"
    >
      <Toolbar>
        {BackButton}
        <Typography className={classes.grow} variant="h6" color="inherit">{title}</Typography>
        {children}
      </Toolbar>
    </AppBar>
  )
}
