export const ADD_MENU = 'ADD_MENU'
export const SHOW = 'SHOW'
export const RESETCOLOR = 'RESETCOLOR'

export function addMenu(menu) {
  return {
    type: ADD_MENU,
    menu
  }
}

export function showMenu(show) {
  return {
    type: SHOW,
    show
  }
}

export function resetColor(color) {
  return {
    type: RESETCOLOR,
    color
  }
}
