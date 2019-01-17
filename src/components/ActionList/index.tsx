import * as React from 'react'
import {
  Fragment,
  useEffect,
  useState
} from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import {
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Button,
  IconButton
} from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import * as actionDao from '../../dao/action'
import { formatTime } from '../../util'
import { useTableStyles } from '../styles'

const useStyles = makeStyles((theme) => ({
  cell: {
    paddingLeft: theme.spacing.unit * 1.5,
    paddingRight: theme.spacing.unit * 1.5,

    '&:last-child': {
      paddingRight: theme.spacing.unit * 1.5
    }
  }
}))

function ActionList ({ goalId, del }) {

  const classes = useStyles()
  const tableClasses = useTableStyles()

  const [state, setState] = useState({
    count: 0,
    list: []
  })

  const { count, list } = state

  async function getNextPage () {

    const actionCount = await actionDao.count(goalId)

    const items = await actionDao.query({
      goalId,
      start: list.length,
      limit: 20
    })

    setState({
      count: actionCount,
      list: [...list, ...items]
    })
  }

  useEffect(() => {
    getNextPage()
  }, [goalId])

  async function handleDelete (e) {
    const btn = e.currentTarget
    const id = parseInt(btn.dataset.id, 10)

    await del(id)

    const nextList = [...list]
    const index = nextList.findIndex((item) => item.id === id)
    nextList.splice(index, 1)

    setState({
      ...state,
      list: nextList
    })
  }

  const rows = list.map((item) => (
    <CSSTransition
      key={item.id}
      timeout={300}
      classNames={{
        exit: tableClasses.cellExit,
        exitActive: tableClasses.cellExitActive
      }}
    >
      <TableRow key={item.id}>
        <TableCell
          scope="row"
          className={classes.cell}
        >
          {formatTime(item.time, 'yyyy-MM-dd hh:mm')}
        </TableCell>
        <TableCell
          className={classes.cell}
        >
          {item.amount}
        </TableCell>
        <TableCell
          align="center"
          className={classes.cell}
        >
          <IconButton
            onClick={handleDelete}
            data-id={item.id}
          >
            <DeleteIcon
              className={tableClasses.icon}
            />
          </IconButton>
        </TableCell>
      </TableRow>
    </CSSTransition>
  ))

  return (
    <Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              className={classes.cell}
            >
              日期
            </TableCell>
            <TableCell
              className={classes.cell}
            >
              数量
            </TableCell>
            <TableCell
              align="center"
              className={classes.cell}
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
      {
        count > list.length &&
        <Button
          color="primary"
          onClick={getNextPage}
        >
          更多
        </Button>
      }
    </Fragment>
  )
}

export default connect(

  (state: any) => ({
    goalList: state.goal
  }),

  (dispatch: any) => ({
    del (id) {
      return dispatch.action.del(id)
    }
  })

)(ActionList)
