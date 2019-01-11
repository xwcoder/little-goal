export const unit = {

  state: [],

  reducers: {

    add (state, units) {

      const list = Array.isArray(units) ? units : [units]

      return [...state, ...list]
    }
  }
}
