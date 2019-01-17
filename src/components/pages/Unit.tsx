import * as React from 'react'
import {
  Fragment,
  useState
} from 'react'

import { IconButton } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'

import AppHeader from '../AppHeader'
import ContentContainer from '../ContentContainer'
import UnitFormDialog from '../UnitFormDialog'
import UnitList from '../UnitList'

export default function Unit () {

  const [unitFormOpen, setUnitFormOpen] = useState(false)

  function handleUnitFormClose () {
    setUnitFormOpen(false)
  }

  function handleAddBtnClick () {
    setUnitFormOpen(true)
  }

  return (
    <Fragment>
      <AppHeader
        title="计量单位"
        backButton={true}
      >
        <IconButton
          onClick={handleAddBtnClick}
          color="inherit"
        >
          <AddIcon />
        </IconButton>
      </AppHeader>
      <ContentContainer>
        <UnitList />
      </ContentContainer>
      <UnitFormDialog
        open={unitFormOpen}
        handleClose={handleUnitFormClose}
      />
    </Fragment>
  )
}
