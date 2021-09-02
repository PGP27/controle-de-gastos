import { ADD_FILTER, REMOVE_FILTERS } from '../actions/actionsType';

const INITIAL_STATE = {
  expenses: [],
};

function expenses(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_FILTER:
    return { expenses: action.value };
  case REMOVE_FILTERS:
    return { expenses: [] };
  default:
    return state;
  }
}

export default expenses;
