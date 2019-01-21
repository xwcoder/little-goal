import { open } from './db'

export async function get (id) {
  const db = await open()
  const store = db.transaction('action', 'readonly').objectStore('action')
  return store.get(id)
}

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

export async function query ({
  goalId,
  start = 0,
  limit = Infinity,
  fromTime = new Date('1970-01-01').getTime(),
  endTime = Date.now()
}) {

  let amount = 1
  const list = []

  const db = await open()
  const index = db.transaction('action', 'readonly').objectStore('action').index('goalId-time')

  // tslint:disable-next-line:no-invalid-await
  let cursor: any = await index.openCursor(
    IDBKeyRange.bound([goalId, fromTime], [goalId, endTime]),
    'prev'
  )

  if (cursor) {

    if (start > 0) {
      await cursor.advance(start)
    }

    while (cursor && amount <= limit) {
      amount = amount + 1
      list.push(cursor.value)
      cursor = await cursor.continue()
    }
  }

  return list
}

export async function count (goalId?) {
  const db = await open()
  const store = db.transaction('action', 'readonly').objectStore('action')

  if (typeof goalId === 'undefined') {
    return store.count()
  }

  const index = store.index('goalId')

  // tslint:disable-next-line:no-invalid-await
  const list: any = await index.getAllKeys(IDBKeyRange.only(goalId))
  return list ? list.length : 0
}

export async function add (action) {

  const saveData = {
    ...action,
    createTime: Date.now()
  }

  const db = await open()
  const store = db.transaction('action', 'readwrite').objectStore('action')

  return store.add(saveData)
}

export async function del (id) {

  const db = await open()
  const store = db.transaction('action', 'readwrite').objectStore('action')

  return store.delete(id)
}
