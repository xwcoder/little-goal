import { BASE_PATH } from '../constants'

export function pathTag (strings, ...values) {

  const list = []
  values.forEach((value, index) => {
    list.push(strings[index])
    list.push(value)
  })

  list.push(strings[strings.length - 1])
  return `${BASE_PATH}${list.join('')}`
}
