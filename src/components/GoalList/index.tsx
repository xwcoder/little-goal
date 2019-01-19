import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  List,
  ListItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Add as AddIcon } from '@material-ui/icons'

import Progress from '../Progress'

import { pathTag } from '../../util'

const useStyles = makeStyles((theme) => {

  return {

    listItem: {
      border: '1px solid',
      borderColor: theme.palette.primary.light,
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      marginBottom: theme.spacing.unit * 1.5,
      borderRadius: theme.shape.borderRadius,
      overflow: 'hidden'
    },

    link: {
      flex: 1,
      marginRight: theme.spacing.unit * 1.5,
      color: theme.palette.primary.dark,
      textDecoration: 'none',
      fontSize: '0.875rem'
    },

    actionAddLink: {
      color: theme.palette.primary.dark,
      fontSize: '0.875rem',
      lineHeight: '0.875rem'
    },

    icon: {
      fontSize: '1.125rem'
    }
  }
})

function GoalList ({ goalList }) {

  const classes = useStyles()

  const items = goalList.map((goal) => {

    const {
      id,
      title,
      completeAmount = 0,
      amount
    } = goal

    return (
      <ListItem key={id} className={classes.listItem}>
        <Progress
          value={(completeAmount / amount)}
        />
        <Link
          className={classes.link}
          to={pathTag`/goal/${id}`}
        >
          {title}
        </Link>
        <Link
          className={classes.actionAddLink}
          to={pathTag`/action/add/${id}`}
        >
          <AddIcon
            className={classes.icon}
          />
        </Link>
      </ListItem>
    )
  })

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
