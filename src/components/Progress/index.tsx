import * as React from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({

  track: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.primary.light,
    opacity: .1,
    pointerEvents: 'none',
    transformOrigin: 'left'
  }
}))

interface PropsType {
  value?: number
}

export default function Progress ({ value = 0 }: PropsType) {

  const classes = useStyles()

  return (
    <div
      style={{ transform: `scaleX(${value.toFixed(2)})` }}
      className={classes.track}
    />
  )
}
