import { open } from './db'

export async function getAll () {
  const db = await open()
  const store = db.transaction('goal', 'readonly').objectStore('goal')

  return store.getAll()
}

export async function add (goal) {

  const db = await open()
  const store = db.transaction('goal', 'readwrite').objectStore('goal')

  goal.createTime = Date.now()

  return store.add(goal)
}

export async function del (id) {

  const db = await open()
  const transaction = db.transaction(['goal', 'action'], 'readwrite')
  const goalStore = transaction.objectStore('goal')
  const actionIndex = transaction.objectStore('action').index('goalId')

  goalStore.delete(id)

  // tslint:disable-next-line:no-invalid-await
  let cursor: any = await actionIndex.openCursor(id)

  while (cursor) {
    await cursor.delete()
    cursor = await cursor.continue()
  }
}

export async function update (goal) {

  const db = await open()
  const store = db.transaction('goal', 'readwrite').objectStore('goal')

  // tslint:disable-next-line:no-invalid-await
  const cursor: any = await store.openCursor(goal.id)

  goal.updateTime = Date.now()

  if (cursor) {
    return cursor.update(goal)
  }
}
