import * as React from 'react'
import { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/styles'
import {
  TextField,
  Button
} from '@material-ui/core'

import ContentContainer from '../ContentContainer'
import AppHeader from '../AppHeader'
import EditoGoalButton from '../EditGoalButton'

const useStyles = makeStyles((theme) => ({
  actionButton: {
    marginTop: theme.spacing.unit * 4
  },
  link: {
    display: 'block',
    textDecoration: 'none',
    color: 'inhiret'
  }
}))

function Goal ({ goalList, unitList, match }) {

  const id = parseInt(match.params.id, 10)
  const goal = goalList.find((item) => item.id === id)

  if (!goal) {
    return null
  }

  const classes = useStyles()

  let unit = unitList.find((item) => item.id === goal.unitId)

  unit = unit || { id: goal.unitId, text: '本' } // TODO for test

  const {
    title,
    amount,
    startTime,
    endTime
  } = goal

  const inputProps = {
    disabled: true
  }

  return (
    <Fragment>
      <AppHeader
        title={goal.title}
        backButton={true}
      >
        <EditoGoalButton id={id} />
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
          label="目标"
          value={unit.text}
          margin="normal"
          inputProps={inputProps}
        />
        <div>
          <TextField
            label="开始日期"
            type="date"
            value={startTime}
            margin="normal"
            inputProps={inputProps}
          />
        </div>
        <div>
          <TextField
            label="结束日期"
            type="date"
            value={endTime}
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
      </ContentContainer>
    </Fragment>
  )
}

export default connect(

  (state: any) => ({
    goalList: state.goal,
    unitList: state.unit
  })

)(Goal)
