import * as React from 'react'
import {
  Fragment,
  useEffect,
  useState
} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/styles'
import {
  Table,
  TableCell,
  TableHead,
  TableBody,
  TableRow,
  Button,
  IconButton,
  Typography
} from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'

import { TransitionGroup, CSSTransition } from 'react-transition-group'

import ContentContainer from '../ContentContainer'
import AppHeader from '../AppHeader'
import Skeleton from '../Skeleton'

import * as actionDao from '../../dao/action'
import { formatTime } from '../../util'

const useStyles = makeStyles((theme) => ({
  cell: {
    paddingLeft: theme.spacing.unit * 1.5,
    paddingRight: theme.spacing.unit * 1.5,

    '&:last-child': {
      paddingRight: theme.spacing.unit * 1.5
    }
  },
  emptyContainer: {
    marginTop: theme.spacing.unit * 5,
    textAlign: 'center'
  },
  cellExit: {
    opacity: 1,
    transition: 'all .3s ease-in'
  },
  cellExitActive: {
    opacity: 0
  }
}))

function UnitPage ({ goalList, match, del }) {
  // TODO to be continue

  const goalId = parseInt(match.params.id, 10)
  const goal = goalList.find((item) => item.id === goalId)
  const { title } = goal

  const classes = useStyles()

  const [state, setState] = useState({
    count: 0,
    list: [],
    loading: true
  })

  const { count, list, loading } = state

  async function getNextPage () {

    const actionCount = await actionDao.count(goalId)

    const items = await actionDao.query({
      goalId,
      start: list.length,
      limit: 20
    })

    if (count !== actionCount || items && items.length || loading === true) {
      setState({
        count: actionCount,
        loading: false,
        list: [...list, ...items]
      })
    }
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

  let ui = null

  if (loading) {
    ui = <Skeleton count={5} />
  } else if (!list.length) {
    ui = (
      <div
        className={classes.emptyContainer}
      >
        <Typography
          variant="body2"
        >
          什么都还没做
        </Typography>
        <Link
          to={`/action/add/${goalId}`}
        >
          <Button
            color="primary"
          >
            向前一小步
          </Button>
        </Link>
      </div>
    )
  } else {

    const rows = list.map((item) => (
      <CSSTransition
        key={item.id}
        timeout={300}
        classNames={{
          exit: classes.cellExit,
          exitActive: classes.cellExitActive
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
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      </CSSTransition>
    ))

    ui = (
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

  return (
    <Fragment>
      <AppHeader
        title={title}
        backButton={true}
      />
      <ContentContainer>
        {ui}
      </ContentContainer>
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

)(UnitPage)
