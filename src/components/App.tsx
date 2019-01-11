import './boots'
import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

import Home from './pages/Home'
import AddGoal from './pages/AddGoal'
import Goal from './pages/Goal'
import EditGoal from './pages/EditGoal'
import AddAction from './pages/AddAction'

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
          <Route path="/" exact={true} component={Home} />
          <Route path="/goal/add" exact={true} component={AddGoal} />
          <Route path="/goal/d/:id" component={Goal} />
          <Route path="/goal/edit/:id" component={EditGoal} />
          <Route path="/action/add/:id" component={AddAction} />
        </ThemeProvider>
      </Provider>
    </Router>
  )
}

export default hot(App)
