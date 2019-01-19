import * as React from 'react'
import { Fragment } from 'react'
import { connect } from 'react-redux'

import ContentContainer from '../ContentContainer'
import AppHeader from '../AppHeader'
import AppBarIconLink from '../AppBarIconLink'
import ActionList from '../ActionList'

import { pathTag } from '../../util'

function Action ({ goalList, match }) {

  const goalId = parseInt(match.params.id, 10)
  const goal = goalList.find((item) => item.id === goalId)

  if (!goal) {
    return null
  }

  const { title } = goal

  return (
    <Fragment>
      <AppHeader
        title={title}
        backButton={true}
      >
        <AppBarIconLink
          to={pathTag`/action/add/${goalId}`}
          variant="add"
        />
      </AppHeader>
      <ContentContainer>
        <ActionList goalId={goalId}/>
      </ContentContainer>
    </Fragment>
  )
}

export default connect(

  (state: any) => ({
    goalList: state.goal
  })

)(Action)
