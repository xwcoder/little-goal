import * as React from 'react'
import {
  Fragment,
  useState
} from 'react'
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import {
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  IconButton
} from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'

import Snackbar, { VariantType } from '../Snackbar'
import { useTableStyles } from '../styles'

interface SnackbarStateType {
  open: boolean
  message: string
  variant: VariantType
}

function UnitList (props) {

  const {
    unitList,
    goalList,
    del
  } = props

  const classes = useTableStyles()

  const initSnackbarState: SnackbarStateType = {
    open: false,
    message: '',
    variant: 'error'
  }

  const [snackbarState, setSnackbarState] = useState(initSnackbarState)

  function handleSnackbarClose () {
    setSnackbarState({
      ...snackbarState,
      open: false
    })
  }

  function handleDelete (e) {

    const id = parseInt(e.currentTarget.dataset.id, 10)
    const unit = unitList.find((item) => item.id === id)

    if (goalList.some((item) => item.unitId === id)) {

      setSnackbarState({
        ...snackbarState,
        open: true,
        message: `有目标在使用「${unit.text}」, 不能删除.`
      })

      return
    }

    del(id)
  }

  const rows = unitList.map((item) => (

    <CSSTransition
      key={item.id}
      timeout={300}
      classNames={{
        exit: classes.cellExit,
        exitActive: classes.cellExitActive
      }}
    >
      <TableRow key={item.id}>
        <TableCell>
          {item.text}
        </TableCell>
        <TableCell
          align="right"
        >
          <IconButton
            data-id={item.id}
            onClick={handleDelete}
          >
            <DeleteIcon
              className={classes.icon}
            />
          </IconButton>
        </TableCell>
      </TableRow>
    </CSSTransition>
  ))

  const ui = (
    <Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              className={classes.thcell}
            >
              计量单位
            </TableCell>
            <TableCell
              align="right"
              className={classes.thcell}
            >
              操作
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TransitionGroup
            component={null}
          >
            {rows}
          </TransitionGroup>
        </TableBody>
      </Table>
    </Fragment>
  )

  return (
    <Fragment>
      {ui}
      <Snackbar
        open={snackbarState.open}
        message={snackbarState.message}
        variant={snackbarState.variant}
        onClose={handleSnackbarClose}
        autoHideDuration={2e3}
      />
    </Fragment>
  )
}

export default connect(

  (state: any) => ({
    goalList: state.goal,
    unitList: state.unit
  }),

  (dispatch: any) => ({
    del (id) {
      return dispatch.unit.del(id)
    }
  })
)(UnitList)
