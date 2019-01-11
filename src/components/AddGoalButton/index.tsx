import * as React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/styles'
import { IconButton } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'

const useStyles = makeStyles({
  link: {
    color: 'inherit'
  }
})

export default function AddGoalButton () {

  const classes = useStyles()

  return (
    <IconButton color="inherit">
      <Link to="/goal/add" className={classes.link}>
        <AddIcon />
      </Link>
    </IconButton>
  )
}
