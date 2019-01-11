import * as React from 'react'
import { Fragment } from 'react'
import { connect } from 'react-redux'

import AppHeader from '../AppHeader'
import ContentContainer from '../ContentContainer'
import ActionForm from '../ActionForm'

function AddAction ({ match }) {

  const id = parseInt(match.params.id, 10)

  return (
    <Fragment>
      <AppHeader
        title="向前一小步"
        backButton={true}
      />
      <ContentContainer>
        <ActionForm id={id} />
      </ContentContainer>
    </Fragment>
  )
}

export default connect(
  null,
  (dispatch) => ({

  })
)(AddAction)
