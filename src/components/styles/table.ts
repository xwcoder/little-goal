import { makeStyles } from '@material-ui/styles'

const useTableStyles = makeStyles((theme) => ({
  thcell: {
    '&:last-child': {
      paddingRight: 35
    }
  },
  cellExit: {
    opacity: 1,
    transition: 'all .3s ease-in'
  },
  cellExitActive: {
    opacity: 0
  },
  icon: {
    fontSize: '1.125rem'
  }
}))

export default useTableStyles
