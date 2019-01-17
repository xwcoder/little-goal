import * as React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField
} from '@material-ui/core'

import { noop } from '../../util'

interface PropsType {
  open: boolean
  handleClose: () => void
  onSuccess?: (id: number) => void,
  create: (text: string) => Promise<number>
}

function UnitFormDialog (props: PropsType) {

  const {
    open,
    handleClose,
    create,
    onSuccess = noop
  } = props

  const [text, setText] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange (e) {
    if (text !== e.target.value) {
      setErrorMsg('')
    }
    setText(e.target.value)
  }

  async function handleSubmit (e) {

    e.preventDefault()

    try {
      const id = await create(text)
      handleClose()
      setText('')
      onSuccess(id)
    } catch (e) {
      if (e && e.name === 'ConstraintError') {
        setErrorMsg(`已有计量单位: ${text}`)
      }
    }
  }

  return (
    <Dialog
      open={open}
    >
      <form
        onSubmit={handleSubmit}
      >
        <DialogTitle>添加计量单位</DialogTitle>
        <DialogContent>
          <DialogContentText
            color="error"
            variant="body2"
          >
            {errorMsg}
          </DialogContentText>
          <TextField
            autoFocus={true}
            required={true}
            value={text}
            placeholder="例如，km"
            margin="dense"
            label="计量单位"
            fullWidth={true}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={handleClose}
          >
            关闭
          </Button>
          <Button
            type="submit"
            color="primary"
          >
            添加
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default connect(
  null,
  (dispatch: any) => ({
    create (text) {
      return dispatch.unit.create({ text })
    }
  })
)(UnitFormDialog)
