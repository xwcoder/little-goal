import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import { blue } from '@material-ui/core/colors'

import Home from './pages/Home'
import GoalAdd from './pages/GoalAdd'
import Goal from './pages/Goal'
import GoalEdit from './pages/GoalEdit'
import ActionAdd from './pages/ActionAdd'
import Action from './pages/Action'
import Unit from './pages/Unit'

import { pathTag } from '../util'

const theme = createMuiTheme({

  typography: {
    useNextVariants: true
  },

  palette: {
    primary: blue
  }
})

function App ({ store }) {

  return (
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            <Route path={pathTag`/`} exact={true} component={Home} />
            <Route path={pathTag`/goal/add`} component={GoalAdd} />
            <Route path={pathTag`/goal/:id`} exact={true} component={Goal} />
            <Route path={pathTag`/goal/edit/:id`} component={GoalEdit} />
            <Route path={pathTag`/action/add/:id`} component={ActionAdd} />
            <Route path={pathTag`/action/list/:id`} component={Action} />
            <Route path={pathTag`/unit/list`} component={Unit} />
            <Route component={Home} />
          </Switch>
        </ThemeProvider>
      </Provider>
    </Router>
  )
}

export default hot(App)
