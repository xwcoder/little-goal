import * as React from 'react'
import { Link } from 'react-router-dom'
import { IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import AppBarIcon, { VariantType } from '../AppBarIcon'

const useStyles = makeStyles({
  link: {
    color: 'inherit'
  }
})

interface PropTypes {
  to: string
  variant: VariantType
  [propName: string]: any
}

export default function AppBarIconLink (props: PropTypes) {

  const {
    to,
    variant,
    children,
    className,
    ...others
  } = props

  const classes = useStyles()

  return (
    <IconButton color="inherit">
      <Link
        to={to}
        className={`${classes.link} ${className}`}
        {...others}
      >
        <AppBarIcon variant={variant} />
      </Link>
    </IconButton>
  )
}
