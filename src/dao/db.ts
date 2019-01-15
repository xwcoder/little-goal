import coladb from 'coladb'
import { UNIT_LIST } from '../constants'

const unitList = UNIT_LIST.map((unit) => ({text: unit.text}))

const dbname = 'little-goal'
const version = 1

let db: IDBDatabase

export async function initDB () {

  let oldVersion = -1

  db = await coladb.open(dbname, version, (idb, oldV, newV) => {

    oldVersion = oldV

    const goalStore = idb.createObjectStore('goal', { autoIncrement: true, keyPath: 'id' })
    goalStore.createIndex('createTime', 'createTime')
    goalStore.createIndex('updateTime', 'updateTime')

    const actionStore = idb.createObjectStore('action', { autoIncrement: true, keyPath: 'id' })
    actionStore.createIndex('goalId', 'goalId')
    actionStore.createIndex('time', 'time')
    actionStore.createIndex('goalId-time', ['goalId', 'time'])

    idb.createObjectStore('unit', { autoIncrement: true, keyPath: 'id' })
  })

  if (oldVersion === 0) {
    const unitStore = db.transaction('unit', 'readwrite').objectStore('unit')

    return Promise.all(unitList.map((unit) => unitStore.add(unit)))
  }
}

export async function open () {

  if (!db) {
    db = await coladb.open(dbname, version)
  }

  return db
}
