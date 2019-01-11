import * as React from 'react'
import { connect } from 'react-redux'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import AppHeader from '../AppHeader'
import GoalList from '../GoalList'
import Skeleton from '../Skeleton'
import AddGoalButton from '../AddGoalButton'

const useStyles = makeStyles((theme) => {

  return {
    contentContainer: {
      padding: theme.spacing.unit * 3
    },
    emptyContainer: {
      marginTop: theme.spacing.unit * 5,
      textAlign: 'center'
    },
    addLink: {
      display: 'inline-block',
      textDecoration: 'none'
    }
  }
})

function Home ({ initState, goalCount }) {

  const classes = useStyles()

  let content

  if (!initState ) {
    content = <Skeleton />
  } else if (goalCount === 0) {
    content = (
      <div className={classes.emptyContainer}>
        <Link to="/goal/add" className={classes.addLink}>
          <Button
            variant="outlined"
            color="primary"
          >
            定个小目标
          </Button>
        </Link >
      </div>
    )
  } else {
    content = <GoalList />
  }

  return (
    <Fragment>
      <AppHeader title="小目标">
        <AddGoalButton />
      </AppHeader>
      <div className={classes.contentContainer}>
        {content}
      </div>
    </Fragment>
  )
}

export default connect(
  (state: any) => ({
    initState: state.initState,
    goalCount: state.goal.length
  })
)(Home)
