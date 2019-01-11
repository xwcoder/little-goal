import { open } from './db'

export async function getAll () {

  const db = await open()
  const store = db.transaction('action', 'readonly').objectStore('goal')

  return store.getAll()
}

export async function getAllByGoalId (id) {

  const db = await open()
  const store = db.transaction('action', 'readonly').objectStore('goal')

  const index = store.index('goalId')

  return index.getAll(id)
}

export async function add (action) {

  const db = await open()
  const store = db.transaction('action', 'readwrite').objectStore('action')

  return store.add(action)
}

export async function del (id) {

  const db = await open()
  const store = db.transaction('action', 'readwrite').objectStore('action')

  return store.delete(id)
}
