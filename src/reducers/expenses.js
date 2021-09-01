import { ADD_EXPENSE, REMOVE_EXPENSE } from '../actions/actionsType';

const INITIAL_STATE = {
  expenses: [],
};

function expenses(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return { expenses: [...state.expenses, action.value] };
  case REMOVE_EXPENSE:
    return { expenses: state.expenses.filter((expense) => expense.id !== action.value) };
  default:
    return state;
  }
}

export default expenses;
