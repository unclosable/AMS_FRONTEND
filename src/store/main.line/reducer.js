import {
  ADD_LOADING,
  LODED
} from './actions.js'

function theLoading(state = [], action) {
  switch (action.type) {
    case ADD_LOADING:
      {
        return [...state, action.uuid]
      }
    case LODED:
      {
        return state.filter((value) => value !== action.uuid)
      }
    default:
      return state;
  }
}

export default {
  theLoading
}
