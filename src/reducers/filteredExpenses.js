import { SET_EXPENSES } from '../actions/actionsType';

const INITIAL_STATE = {
  filterType: {
    select: '',
    option: '',
    number: 0,
  },
  filteredExpenses: [],
};

function filteredExpenses(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_EXPENSES:
    return { filteredExpenses: action.value };
  default:
    return state;
  }
}

export default filteredExpenses;
