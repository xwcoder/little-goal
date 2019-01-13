import { open } from './db'

export async function getAll () {

  const db = await open()
  const store = db.transaction('action', 'readonly').objectStore('action')

  return store.getAll()
}

export async function getAllByGoalId (goalId) {

  const db = await open()
  const store = db.transaction('action', 'readonly').objectStore('action')

  const index = store.index('goalId')

  return index.getAll(goalId)
}

// 获取指定goalId下最近n天的活动，最多取count项
// TODO
export async function getRecentItems (goalId, n = 7, count = 10) {
  const db = await open()
  const store = db.transaction('action', 'readonly').objectStore('action')
  const index = store.index('goalId-time')

  const list = []
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
