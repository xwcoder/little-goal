import { open } from './db'

export async function getAll () {
  const db = await open()
  const store = db.transaction('unit', 'readonly').objectStore('unit')

  return store.getAll()
}
