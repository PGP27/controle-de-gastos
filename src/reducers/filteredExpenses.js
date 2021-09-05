import { SET_EXPENSES, SET_SELECT, SET_OPTION, SET_NUMBER } from '../actions/actionsType';

const INITIAL_STATE = {
  select: '',
  option: '',
  number: '',
  filteredExpenses: [],
};

function filteredExpenses(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_EXPENSES:
    return { ...state, filteredExpenses: action.value };
  case SET_SELECT:
    return { ...state, select: action.value };
  case SET_OPTION:
    return { ...state, option: action.value };
  case SET_NUMBER:
    return { ...state, number: action.value };
  default:
    return state;
  }
}

export default filteredExpenses;
