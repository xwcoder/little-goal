import * as React from 'react'
import {
  Error as ErrorIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon
} from '@material-ui/icons'
import { green, amber } from '@material-ui/core/colors'
import {
  IconButton,
  Snackbar,
  SnackbarContent
} from '@material-ui/core'

import { makeStyles } from '@material-ui/styles'

import { noop } from '../../util'

const useStyles = makeStyles((theme) => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: 'flex',
    aliginItems: 'center'
  }
}))

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
}

export type VariantType = 'success' | 'warning' | 'error' | 'info'
interface PropsType {
  open: boolean
  variant: VariantType
  autoHideDuration?: number
  onClose?: (event?, reason?) => void,
  message: string,
  className?: string
}

export default function ISnackbar ({
  open = false,
  variant,
  autoHideDuration = null,
  onClose = noop,
  message,
  className = ''
}: PropsType) {

  const classes = useStyles()
  const Icon = variantIcon[variant]

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <SnackbarContent
        className={`${classes[variant]} ${className}`}
        message={
          <span
            className={classes.message}
          >
            <Icon
              className={`${classes.icon} ${classes.iconVariant}`}
            />
            {message}
          </span>}
        action={[
          <IconButton
            key="close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon
              className={classes.icon}
            />
          </IconButton>
        ]}
      />
    </Snackbar>
  )
}
