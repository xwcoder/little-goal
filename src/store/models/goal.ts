import * as goalDao from '../../dao/goal'

export const goal = {

  state: [],

  reducers: {

    add (state, goals) {

      const list = Array.isArray(goals) ? goals : [goals]

      return [...list, ...state]
    },

    remove (state, id) {

      const list = [...state]
      const index = list.findIndex((item) => item.id === id)

      if (index !== -1) {
        list.splice(index, 1)
        return [...list]
      }

      return state
    },

    replace (state, payload) {

      const list = [...state]
      const index = list.findIndex((item) => item.id === payload.id)

      if (index !== -1) {
        list.splice(index, 1, payload)
        return [...list]
      }

      return state
    },

    unshift (state, payload) {

      return [payload, ...state]
    }
  },

  effects: (dispatch) => ({

    async create (data) {
      const id = await goalDao.add(data)
      data.id = id
      dispatch.goal.unshift(data)
    },

    async update (data) {
      const id = await goalDao.update(data)
      dispatch.goal.replace(data)
    },

    async del (id) {
      await goalDao.del(id)
      dispatch.goal.remove(id)
    }
  })
}
