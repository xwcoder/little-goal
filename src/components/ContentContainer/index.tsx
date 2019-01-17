import * as React from 'react'

import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing.unit * 3,
    paddingTop: 0
  }
}))

export default function ContentContainer ({ className = '', children }) {

  const classes = useStyles()

  return <div className={`${classes.container} ${className}`}>{children}</div>
}
