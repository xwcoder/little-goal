import * as unitDao from '../../dao/unit'

export const unit = {

  state: [],

  reducers: {

    add (state, units) {

      const list = Array.isArray(units) ? units : [units]

      return [...list, ...state]
    },

    remove (state, id) {
      const list = [...state]
      const index = list.findIndex((item) => item.id === id)

      if (index !== -1) {
        list.splice(index, 1)
        return list
      }

      return state
    }
  },

  effects: (dispatch) => ({

    async create (data) {
      const id = await unitDao.add(data)
      data.id = id
      dispatch.unit.add(data)
      return id
    },

    async del (id) {
      await unitDao.del(id)
      dispatch.unit.remove(id)
    }

  })
}
