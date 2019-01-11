import * as React from 'react'
import { Fragment } from 'react'

import ContentContainer from '../ContentContainer'
import AppHeader from '../AppHeader'
import GoalForm from '../GoalForm'

export default function EditGoal ({ match }) {

  function onSuccess () {
    history.back()
  }

  const id = parseInt(match.params.id, 10)

  return (
    <Fragment>
      <AppHeader title="修改小目标" backButton={true} />
        <ContentContainer>
          <GoalForm id={id} onSuccess={onSuccess} />
        </ContentContainer>
    </Fragment>
  )
}
