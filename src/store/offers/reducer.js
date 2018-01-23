import {
  SENDOFFER
} from './actions.jsx'

function addMenu(state = [], action) {
  switch (action.type) {
    case ADD_MENU:
      {
        return [...state, ...action.menu]
      }
    default:
      return state;
  }
}
