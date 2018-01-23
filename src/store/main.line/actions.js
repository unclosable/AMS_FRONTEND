export const ADD_LOADING = 'ADD_LOADING'
export const LODED = 'LODED'


export function addLoading(uuid) {
  return {
    type: ADD_LOADING,
    uuid
  }
}
export function loaded(uuid) {
  return {
    type: LODED,
    uuid
  }
}
