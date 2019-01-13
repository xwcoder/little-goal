import * as React from 'react'
import { Fragment } from 'react'

import ContentContainer from '../ContentContainer'
import AppHeader from '../AppHeader'
import GoalForm from '../GoalForm'

export default function AddGoal () {

  function onSuccess () {
    history.back()
  }

  return (
    <Fragment>
      <AppHeader title="定个小目标" backButton={true} />
        <ContentContainer>
          <GoalForm onSuccess={onSuccess} />
        </ContentContainer>
    </Fragment>
  )
}
