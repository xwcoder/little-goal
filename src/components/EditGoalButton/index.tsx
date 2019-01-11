import * as React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/styles'
import { IconButton } from '@material-ui/core'
import { Edit as EditIcon } from '@material-ui/icons'

const useStyles = makeStyles({
  link: {
    color: 'inherit'
  }
})

export default function EditGoalButton ({ id }) {

  const classes = useStyles()

  return (
    <IconButton color="inherit">
      <Link to={`/goal/edit/${id}`} className={classes.link}>
        <EditIcon />
      </Link>
    </IconButton>
  )
}
