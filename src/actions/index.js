import { ADD_FILTER, REMOVE_FILTERS } from './actionsType';

export const addFilter = (expenses) => ({ type: ADD_FILTER, value: expenses });

export const removeFilters = () => ({ type: REMOVE_FILTERS });
