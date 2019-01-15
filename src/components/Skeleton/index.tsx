import * as React from 'react'
import { Fragment } from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({

  '@keyframes loading': {
    '0%': {
      backgroundPosition: 0
    },
    '100%': {
      backgroundPosition: '300%'
    }
  },

  skeletonLine: {
    marginTop: theme.spacing.unit * 2,
    height: theme.spacing.unit * 4,
    backgroundColor: '#ddd',
    borderRadius: 8,
    backgroundImage: 'linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '50%',
    animation: '$loading 1.6s infinite linear'
  }

}))

export default function Skeleton ({ count = 5 }) {

  const classes = useStyles()

  // tslint:disable-next-line:jsx-key
  const lines = Array(count).fill('').map((_, index) => <div key={index} className={classes.skeletonLine} />)

  return (
    <Fragment>
      {lines}
    </Fragment>
  )
}
