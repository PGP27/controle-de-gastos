import { SET_EXPENSES, SET_SELECT, SET_OPTION, SET_NUMBER } from './actionsType';

export const setExpenses = (expenses) => ({ type: SET_EXPENSES, value: expenses });
export const setSelect = (select) => ({ type: SET_SELECT, value: select });
export const setOption = (option) => ({ type: SET_OPTION, value: option });
export const setNumber = (number) => ({ type: SET_NUMBER, value: number });
