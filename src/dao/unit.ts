import { open } from './db'

export async function getAll () {
  const db = await open()
  const store = db.transaction('unit', 'readonly').objectStore('unit')

  return store.getAll()
}

export async function del (id) {
  const db = await open()
  const store = db.transaction('unit', 'readwrite').objectStore('unit')

  return store.delete(id)
}

export async function add (data) {

  const db = await open()
  const store = db.transaction('unit', 'readwrite').objectStore('unit')

  return store.add(data)
}
