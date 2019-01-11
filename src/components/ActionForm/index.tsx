import * as React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import {
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
  Button
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import { UNIT_LIST } from '../../constants'
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
    id,
    goalList,
    onSuccess = noop,
    create,
    update
  } = props

  const goal = goalList.find((item) => item.id === id)

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

    console.log('action state-->', state)
    // onSuccess()
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="目标"
        value={goal.title}
        fullWidth={true}
        autoFocus={true}
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
    async create (goal) {
      await dispatch.goal.create(goal)
    },
    async update (goal) {
      await dispatch.goal.update(goal)
    }
  })

)(ActionForm)
