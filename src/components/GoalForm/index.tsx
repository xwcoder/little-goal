import * as React from 'react'
import { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import UnitFormDialog from '../UnitFormDialog'
import {
  formatTime,
  noop,
  pathTag
} from '../../util'

const useStyles = makeStyles((theme) => ({

  selectControl: {
    minWidth: 120,
    marginBottom: 0
  },

  submitButton: {
    marginTop: theme.spacing.unit * 3
  },

  unitBtn: {
    padding: 4,
    marginLeft: 4,
    minWidth: 0,
    minHeight: 0,
    fontSize: 12,
    lineHeight: 1,
    fontWeight: 'normal',
    color: theme.palette.primary.light,
    textDecoration: 'none'
  },

  addBtn: {
    marginLeft: theme.spacing.unit * 1.5
  }
}))

function GoalForm (props) {

  const classes = useStyles()

  const {
    id,
    goalList,
    onSuccess = noop,
    create,
    update
  } = props

  const { unitList } = props

  const isEdit = typeof id !== 'undefined'
  let goal: any = {}

  if (isEdit) {
    goal = goalList.find((item) => item.id === id)
  }

  if (!goal || !unitList.length) {
    return null
  }

  const [state, setState] = useState({
    title: goal.title || '',
    amount: goal.amount || '',
    unitId: goal.unitId || unitList[0].id,
    startTime: formatTime(goal.startTime || new Date(), 'yyyy-MM-dd'),
    endTime: goal.endTime ? formatTime(goal.endTime, 'yyyy-MM-dd') : `${new Date().getFullYear()}-12-31`
  })

  const handleChange = (name) => (event) => {
    setState({
      ...state,
      [name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {

    event.preventDefault()

    const goalData = {
      ...goal,
      ...state,
      amount: parseInt(state.amount, 10),
      startTime: new Date(state.startTime).getTime(),
      endTime: new Date(state.endTime).getTime()
    }

    if (isEdit) {
      await update(goalData)
    } else {
      await create(goalData)
    }
    onSuccess()
  }

  const [open, setOpen] = useState(false)

  function handleUnitAddBtnClick () {
    setOpen(true)
  }

  function handleDialogClose () {
    setOpen(false)
  }

  function onUnitCreateSuccess (unitId) {
    // setOpen(false)
    setState({
      ...state,
      unitId
    })
  }

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <TextField
          label="标题"
          placeholder={`比如: ${new Date().getFullYear()}年读12本书`}
          value={state.title}
          fullWidth={true}
          required={true}
          autoFocus={true}
          margin="normal"
          onChange={handleChange('title')}
        />
        <TextField
          label="目标"
          placeholder="数量 比如: 12"
          value={state.amount}
          fullWidth={true}
          required={true}
          margin="normal"
          type="number"
          onChange={handleChange('amount')}
        />
        <Grid
          container={true}
          alignItems="flex-end"
        >
          <FormControl
            required={true}
            className={classes.selectControl}
            margin="normal"
          >
            <InputLabel>计量单位</InputLabel>
            <Select
              value={state.unitId}
              onChange={handleChange('unitId')}
            >
              {unitList.map((unit) => <MenuItem key={unit.id} value={unit.id}>{unit.text}</MenuItem>)}
            </Select>
          </FormControl>
          <Button
            className={`${classes.unitBtn} ${classes.addBtn}`}
            onClick={handleUnitAddBtnClick}
          >
            添加
          </Button>
          <Link
            to={pathTag`/unit/list`}
            className={classes.unitBtn}
          >
            管理
          </Link>
        </Grid>
        <div>
          <TextField
            label="开始日期"
            type="date"
            value={state.startTime}
            required={true}
            margin="normal"
            onChange={handleChange('startTime')}
          />
        </div>
        <div>
          <TextField
            label="结束日期"
            type="date"
            value={state.endTime}
            required={true}
            margin="normal"
            onChange={handleChange('endTime')}
          />
        </div>
        <Button
          className={classes.submitButton}
          type="submit"
          color="primary"
          variant="contained"
          fullWidth={true}
        >
          done
        </Button>
      </form>
      <UnitFormDialog
        open={open}
        handleClose={handleDialogClose}
        onSuccess={onUnitCreateSuccess}
      />
    </Fragment>
  )
}

export default connect(

  (state: any) => {

    return {
      goalList: state.goal,
      unitList: state.unit
    }
  },

  (dispatch: any) => ({
    create (goal) {
      return dispatch.goal.create(goal)
    },
    update (goal) {
      return dispatch.goal.update(goal)
    }
  })

)(GoalForm)
