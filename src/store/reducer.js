import mainList from './main.list/reducer.js'
import mainLine from './main.line/reducer.js'
import {combineReducers} from 'redux'

export default Object.assign(mainList, mainLine);
