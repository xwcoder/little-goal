import './components/boots'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import App from './components/App'
import { store } from './store'

import { initDB } from './dao/db'
import * as unitDao from './dao/unit'
import * as goalDao from './dao/goal'

(window as any).store = store

async function init () {

  await initDB()

  const unitList: any = await unitDao.getAll()
  const goalList: any = await goalDao.getAll()

  goalList.reverse()
  unitList.reverse()

  store.dispatch.unit.add(unitList)
  store.dispatch.goal.add(goalList)
  store.dispatch.initState.setState(true)
}

init()

ReactDOM.render(<App store={store} /> , document.getElementById('app'))

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('./sw.js')
//   .then((reg) => {
//     // tslint:disable-next-line:no-console
//     console.log('registion sw.js success.')
//   })
//   .catch((err) => {
//     // tslint:disable-next-line:no-console
//     console.log('registion failed ', err)
//   })
// }
