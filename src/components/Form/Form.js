import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { expenseCategoryTypes } from '../../utils/index';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Form = () => {
  const INITIAL_STATE = {
    name: '',
    number: 1,
    category: 'Outros',
    description: '',
  }

  const [expense, setExpense] = useState(INITIAL_STATE);

  const expenses = useSelector((state) => state.expenses.expenses);

  const { id } = useParams();

  useEffect(() => {
    const setInitExpense = () => {
      if (id) {
        const filteredExpense = expenses.find((expense) => expense.id === id);
        setExpense(filteredExpense);
      }
    };
    setInitExpense();
  }, [expenses, id]);

  const handleChange = ({ target: { name, value } }) => {
    setExpense({
      ...expense,
      [name]: value,
    });
  };

  const clearForm = () => {
    setExpense(INITIAL_STATE);
  };

  const saveExpense = () => {
    if (JSON.parse(localStorage.getItem('filteredExpenses')) === null) {
      localStorage.setItem('filteredExpenses', JSON.stringify([]));
    }
    const filteredExpenses = JSON.parse(localStorage.getItem('filteredExpenses'));
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    if (id) {
      const expenseEdit = filteredExpenses.find((expense) => expense.id === id);
      const { id: expenseId } = expenseEdit;
      const modificationDate = `${day}/${month}/${year}`;
      const newExpense = {
        ...expense,
        id: expenseId,
        modificationDate,
      };
      const newFilteredExpenses = filteredExpenses.filter((expense) => expense.id !== id);
      newFilteredExpenses.push(newExpense);
      localStorage.setItem('filteredExpenses', JSON.stringify(newFilteredExpenses));
    } else {
      const creationDate = `${day}/${month}/${year}`;
      const newExpense = {
        ...expense,
        id: uuidv4(),
        creationDate,
      };
      filteredExpenses.push(newExpense);
      localStorage.setItem('filteredExpenses', JSON.stringify(filteredExpenses));
    }
    clearForm();
  }

  if (expense) {
    const { name, number, category, description } = expense;
    const title = id ? 'Editar gasto' : 'Adicionar gasto';
    return (
      <form className="w-full flex flex-col items-center p-2 shadow-lg rounded-lg border border-gray bg-blue-50 sm:w-4/5 lg:w-1/2">
        <legend className="mt-4 text-2xl">{ title }</legend>
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col w-4/5 mt-4">
            <span>Nome:</span>
            <input
              type="text"
              required
              autoCorrect="off"
              autoComplete="off"
              name="name"
              value={ name }
              onChange={ handleChange }
              className="shadow-lg p-2 rounded-md border border-gray focus:outline-none focus:ring-2"
            />
          </div>
          <div className="flex flex-col w-4/5 mt-4">
            <span>Valor:</span>
            <input
              type="number"
              required
              autoCorrect="off"
              autoComplete="off"
              min='1'
              step='0.01'
              name="number"
              value={ number }
              onChange={ handleChange }
              className="shadow-lg p-2 rounded-md border border-gray focus:outline-none focus:ring-2"
            />
          </div>
          <div className="flex flex-col w-4/5 mt-4">
            <span>Categoria:</span>
            <select
              required name="category"
              value={ category }
              onChange={ handleChange }
              className="p-2 outline-none shadow-lg rounded-md bg-white"
            >
              { expenseCategoryTypes.map((category) => (
                <option key={ category }>{ category }</option>
              )) }
            </select>
          </div>
        </div>
        <div className="flex flex-col w-4/5 mt-4">
          <span>Descrição:</span>
          <textarea
            required
            autoCorrect="off"
            autoComplete="off"
            rows="6"
            style={ { resize: 'none' } }
            name="description"
            value={ description }
            onChange={ handleChange }
            className="shadow-lgs p-2 rounded-md shadow-lg border border-gray focus:outline-none focus:ring-2"
          />
        </div>
        <div className="w-4/5 mt-4 mb-2 flex justify-evenly text-lg">
          <button
            type="button"
            onClick={ clearForm }
            className="w-24 px-2 mx-2 shadow-lg border-2 border-black rounded-lg bg-white transition hover:bg-yellow-100"
          >
            Limpar
          </button>
          <button
            type="button"
            onClick={ saveExpense }
            className="w-24 px-2 mx-2 shadow-lg border-2 border-black rounded-lg bg-white transition hover:bg-green-100"
          >
            Adicionar
          </button>
        </div>
      </form>
    );
  }
  return (
    <span>ID '{id}' não encontrado!</span>
  );
};

export default Form;
