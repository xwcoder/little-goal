import * as React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import {
  TextField,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { formatTime, noop } from '../../util'

const useStyles = makeStyles((theme) => ({

  selectControl: {
    minWidth: 120
  },

  submitButton: {
    marginTop: theme.spacing.unit * 4
  }
}))

function ActionForm (props) {

  const classes = useStyles()

  const {
    goalId,
    goalList,
    onSuccess = noop,
    create
  } = props

  const goal = goalList.find((item) => item.id === goalId)

  if (!goal) {
    return null
  }

  const [state, setState] = useState({
    amount: '',
    time: formatTime(new Date(), 'yyyy-MM-ddThh:mm')
  })

  const handleChange = (name) => (event) => {
    setState({
      ...state,
      [name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {

    event.preventDefault()
    const action = {
      goalId: goal.id,
      ...state,
      amount: parseInt(state.amount, 10)
    }

    await create(action)
    onSuccess()
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="目标"
        value={goal.title}
        fullWidth={true}
        margin="normal"
        inputProps={{
          disabled: true
        }}
      />
      <TextField
        label="完成量"
        placeholder="数量 比如: 1"
        value={state.amount}
        fullWidth={true}
        required={true}
        margin="normal"
        type="number"
        autoFocus={true}
        onChange={handleChange('amount')}
      />
      <div>
        <TextField
          label="完成时间"
          type="datetime-local"
          value={state.time}
          required={true}
          margin="normal"
          onChange={handleChange('time')}
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
  )
}

export default connect(

  (state: any) => ({
    goalList: state.goal
  }),

  (dispatch: any) => ({
    create (data) {
      return dispatch.action.create(data)
    }
  })

)(ActionForm)
