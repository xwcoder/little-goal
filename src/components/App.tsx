import './boots'
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

import Home from './pages/Home'
import GoalAdd from './pages/GoalAdd'
import Goal from './pages/Goal'
import GoalEdit from './pages/GoalEdit'
import ActionAdd from './pages/ActionAdd'
import Action from './pages/Action'

const theme = createMuiTheme({

  typography: {
    useNextVariants: true
  }
})

function App ({ store }) {

  return (
    <Router>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            <Route path="/" exact={true} component={Home} />
            <Route path="/goal/add" component={GoalAdd} />
            <Route path="/goal/:id" exact={true} component={Goal} />
            <Route path="/goal/edit/:id" component={GoalEdit} />
            <Route path="/action/add/:id" component={ActionAdd} />
            <Route path="/action/list/:id" component={Action} />
          </Switch>
        </ThemeProvider>
      </Provider>
    </Router>
  )
}

export default hot(App)
