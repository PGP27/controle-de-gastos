import { ADD_EXPENSE, REMOVE_EXPENSE } from './actionsType';

export const addExpense = (expense) => ({ type: ADD_EXPENSE, value: expense });

export const removeExpense = (expenseId) => ({ type: REMOVE_EXPENSE, value: expenseId });
