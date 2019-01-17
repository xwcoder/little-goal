import * as React from 'react'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
  icon: {
    fontSize: '1.25rem'
  }
}))

const variantIcon = {
  add: AddIcon,
  edit: EditIcon,
  del: DeleteIcon
}

export type VariantType = 'add' | 'edit' | 'del'

interface PropsType {
  variant: VariantType
  className?: string
  [propName: string]: any
}

export default function AppBarIcon ( props: PropsType) {

  const classes = useStyles()
  const { variant, className = '', ...others } = props
  const Icon = variantIcon[variant]

  return <Icon className={`${classes.icon} ${className}`} {...others} />
}
