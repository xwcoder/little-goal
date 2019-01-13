import * as React from 'react'
import { Fragment, useState } from 'react'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/styles'
import {
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

const useStyles = makeStyles((theme) => ({
}))

function ActionListPage ({ goalList, history, match }) {

  const id = parseInt(match.params.id, 10)
  const goal = goalList.find((item) => item.id === id)

  if (!goal) {
    return null
  }

  const classes = useStyles()

  const { title } = goal

  return (
    <Fragment>
      <AppHeader
        title={goal.title}
        backButton={true}
      />
      <ContentContainer>
        hell world
      </ContentContainer>
    </Fragment>
  )
}

export default connect(

  (state: any) => ({
    goalList: state.goal
  })

)(ActionListPage)
