import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './components/App'
import { store } from './store'

import { initDB } from './dao/db'
import * as unitDao from './dao/unit'
import * as goalDao from './dao/goal'
import * as actionDao from './dao/action'

async function init () {

  const startTime = Date.now()

  await initDB()

  const unitList: any = await unitDao.getAll()
  const goalList: any = await goalDao.getAll()

  goalList.reverse()

  store.dispatch.unit.add(unitList)
  store.dispatch.goal.add(goalList)
  store.dispatch.initState.setState(true)

  console.log(`init in ${Date.now() - startTime}ms.`)

  // const list = await actionDao.query({
  //   goalId: 1,
  //   start: 0,
  //   limit: 20
  // })

  // console.log('list-->', list)

  // TODO to remote, for test
  ReactDOM.render(<App store={store} /> , document.getElementById('app'))
}

init()

window.store = store

// ReactDOM.render(<App store={store} /> , document.getElementById('app'))
