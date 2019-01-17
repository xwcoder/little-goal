import * as React from 'react'
import { connect } from 'react-redux'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import AppHeader from '../AppHeader'
import ContentContainer from '../ContentContainer'
import GoalList from '../GoalList'
import AppBarIconLink from '../AppBarIconLink'

const useStyles = makeStyles((theme) => {

  return {
    contentContainer: {
      paddingTop: theme.spacing.unit * 3
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
    content = null
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
        {initState && <AppBarIconLink to="/goal/add" variant="add" />}
      </AppHeader>
      <ContentContainer
        className={classes.contentContainer}
      >
        {content}
      </ContentContainer>
    </Fragment>
  )
}

export default connect(
  (state: any) => ({
    initState: state.initState,
    goalCount: state.goal.length
  })
)(Home)
