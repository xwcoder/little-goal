import * as actionDao from '../../dao/action'

export const action = {

  state: [],

  reducers: {
    add (state, payload) {
      return [payload, ...state]
    }
  },

  effects: (dispatch) => ({

    async create (data, state) {
      const id = await actionDao.add(data)
      data.id = id
      dispatch.action.add(data)

      const { goal: goalList } = state
      const goal = goalList.find((item) => item.id === data.goalId)
      const goalData = {...goal}
      goalData.completeAmount = (goalData.completeAmount || 0) + data.amount

      return dispatch.goal.update(goalData)
    },

    async del (id, state) {

      const actionItem: any = await actionDao.get(id)
      const { amount, goalId } = actionItem

      const { goal: goalList } = state
      const goal = goalList.find((item) => item.id === goalId)
      const goalData = {...goal}
      goalData.completeAmount = (goalData.completeAmount || 0) - amount

      return Promise.all([
        actionDao.del(id),
        dispatch.goal.update(goalData)
      ])
    }
  })
}
