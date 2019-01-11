import * as actionDao from '../../dao/goal'

export const action = {

  state: [],

  reducers: {
    add (state, payload) {
      return [payload, ...state]
    }
  },

  effects: (dispatch) => ({

    async create (data) {
      const id = await actionDao.add(data)
      data.id = id
      dispatch.action.add(data)
    },

    async del (payload) {
      console.log(payload) // TODO
    }
  })
}
