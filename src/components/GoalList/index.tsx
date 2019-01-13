import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  List,
  ListItem,
  ListItemText
} from '@material-ui/core'

import { makeStyles } from '@material-ui/styles'

const useStyls = makeStyles((theme) => ({
  listItem: {
    border: '1px solid',
    borderColor: theme.palette.primary.light,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 1.5,
    borderRadius: 5,
    backgroundColor: theme.palette.primary.light
  }
}))

function GoalList ({ goalList }) {

  const classes = useStyls()

  const items = goalList.map((goal) => (
    <ListItem key={goal.id} className={classes.listItem}>
      <Link to={`/goal/${goal.id}`}>
        <ListItemText>
          {goal.title}
        </ListItemText>
      </Link>
    </ListItem>
  ))

  return (
    <List>
      {items}
    </List>
  )
}

export default connect(

  (state: any) => ({
    goalList: state.goal
  })

)(GoalList)
