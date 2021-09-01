import { combineReducers } from 'redux';
import expenses from './expenses';

const reducer = combineReducers({ expenses });

export default reducer;
