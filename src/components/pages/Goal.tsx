import * as React from 'react'
import { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/styles'
import {
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText
} from '@material-ui/core'
import { Delete as DeleteIcon } from '@material-ui/icons'

import ContentContainer from '../ContentContainer'
import AppHeader from '../AppHeader'
import EditoGoalButton from '../EditGoalButton'

import { formatTime } from './../../util'

const useStyles = makeStyles((theme) => ({
  actionButton: {
    marginTop: theme.spacing.unit * 4
  },
  link: {
    display: 'block',
    textDecoration: 'none',
    color: 'inhiret'
  },
  allActionLink: {
    display: 'inline-block',
    marginTop: theme.spacing.unit,
    textDecoration: 'none',
    color: 'inhiret'
  }
}))

function Goal ({ goalList, unitList, history, match, del }) {

  const id = parseInt(match.params.id, 10)
  const goal = goalList.find((item) => item.id === id)

  if (!goal) {
    return null
  }

  const classes = useStyles()

  const unit = unitList.find((item) => item.id === goal.unitId)

  const {
    title,
    amount,
    completeAmount = 0,
    startTime,
    endTime
  } = goal

  const inputProps = {
    disabled: true
  }

  const completeView = `${completeAmount} (${(completeAmount / amount * 100).toFixed(2) }%)`
  const startTimeView = formatTime(startTime, 'yyyy-MM-dd')
  const endTimeView = formatTime(endTime, 'yyyy-MM-dd')

  const [open, setOpen] = useState(false)

  function handleOpen () {
    setOpen(true)
  }

  function handleClose () {
    setOpen(false)
  }

  async function handleDelete () {
    await del(id)
    history.goBack()
  }

  return (
    <Fragment>
      <AppHeader
        title={goal.title}
        backButton={true}
      >
        <EditoGoalButton id={id} />
        <IconButton color="inherit">
          <DeleteIcon onClick={handleOpen} />
        </IconButton>
      </AppHeader>
      <ContentContainer>
        <TextField
          label="标题"
          value={title}
          fullWidth={true}
          margin="normal"
          inputProps={inputProps}
        />
        <TextField
          label="目标"
          value={amount}
          fullWidth={true}
          margin="normal"
          inputProps={inputProps}
        />
        <TextField
          label="已完成"
          value={completeView}
          fullWidth={true}
          margin="normal"
          inputProps={inputProps}
        />
        <TextField
          label="计量单位"
          value={unit.text}
          margin="normal"
          inputProps={inputProps}
        />
        <div>
          <TextField
            label="开始日期"
            type="date"
            value={startTimeView}
            margin="normal"
            inputProps={inputProps}
          />
        </div>
        <div>
          <TextField
            label="结束日期"
            type="date"
            value={endTimeView}
            margin="normal"
            inputProps={inputProps}
          />
        </div>
        <Link
          to={`/action/add/${id}`}
          className={classes.link}
        >
          <Button
            className={classes.actionButton}
            color="primary"
            variant="contained"
            fullWidth={true}
          >
            向前一小步
          </Button>
        </Link>
        {
          completeAmount > 0 &&
          <Link
            to={`/action/list/${id}`}
            className={classes.allActionLink}
          >
            <Button
              color="primary"
            >
              全部完成项
            </Button>
          </Link>
        }
      </ContentContainer>
      <Dialog
        open={open}
      >
        <DialogTitle>放弃「{goal.title}」?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            最可怕的敌人，就是没有坚强的信念。——罗曼·罗兰
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={handleClose}
          >
            再坚持一下
          </Button>
          <Button
            color="primary"
            onClick={handleDelete}
          >
            删了吧
          </Button>
        </DialogActions>
      </Dialog>
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
      return dispatch.goal.del(id)
    }
  })

)(Goal)
