import { combineReducers } from 'redux';
import filteredExpenses from './filteredExpenses';

const reducer = combineReducers({ filteredExpenses });

export default reducer;
