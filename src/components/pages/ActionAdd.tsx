import * as React from 'react'
import { Fragment } from 'react'

import AppHeader from '../AppHeader'
import ContentContainer from '../ContentContainer'
import ActionForm from '../ActionForm'

export default function AddAction ({ history, match }) {

  const id = parseInt(match.params.id, 10)

  function onSuccess () {
    history.goBack()
  }

  return (
    <Fragment>
      <AppHeader
        title="向前一小步"
        backButton={true}
      />
      <ContentContainer>
        <ActionForm onSuccess={onSuccess} goalId={id} />
      </ContentContainer>
    </Fragment>
  )
}
