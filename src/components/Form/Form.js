import React, { useEffect, useState } from 'react';
import { expenseCategoryTypes } from '../../utils/index';
import { Redirect, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const Form = () => {
  const INITIAL_STATE = {
    category: 'Outros',
    number: 1,
    description: '',
    favorite: false,
  }

  const [expense, setExpense] = useState(INITIAL_STATE);
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [redirect, setRedirect] = useState();

  const { id } = useParams();

  useEffect(() => {
    const setInitExpense = () => {
      const expensesStore = JSON.parse(localStorage.getItem('filteredExpenses'));
      if (id) {
        const filteredExpense = expensesStore.find((expense) => expense.id === id);
        setExpense(filteredExpense);
        const descId = filteredExpense.description.length;
        setDescriptionLength(descId);
      }
    };
    setInitExpense();
  }, [id]);

  const handleChange = ({ target: { name, value, checked } }) => {
    const newValue = name === 'favorite' ? checked : value;
    setExpense({
      ...expense,
      [name]: newValue,
    });
    if (name === 'description') {
      setDescriptionLength(value.length);
    }
  };

  const clearForm = () => {
    setExpense(INITIAL_STATE);
  };

  const saveExpense = () => {
    const { number, description } = expense;

    if (number < 1) {
      alert('Digite um valor maior ou igual a 1');
    } else if (description.length <= 0) {
      alert('Digite uma descrição');
    } else {
      if (JSON.parse(localStorage.getItem('filteredExpenses')) === null) {
        localStorage.setItem('filteredExpenses', JSON.stringify([]));
      }
      const filteredExpenses = JSON.parse(localStorage.getItem('filteredExpenses'));
      const day = new Date().getDate();
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();
  
      const creationDate = `${day}/${month}/${year}`;

      if (id) {
        const newExpense = {
          ...expense,
          creationDate,
        };
        const newFilteredExpenses = filteredExpenses.filter((expense) => expense.id !== id);
        newFilteredExpenses.push(newExpense);
        localStorage.setItem('filteredExpenses', JSON.stringify(newFilteredExpenses));
        alert('Gasto editado com sucesso!');
      } else {
        const newExpense = {
          ...expense,
          id: uuidv4(),
          creationDate,
        };

        filteredExpenses.push(newExpense);
        localStorage.setItem('filteredExpenses', JSON.stringify(filteredExpenses));
        alert('Gasto adicionado com sucesso!');
      }
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Redirect to="/" />
  }

  if (expense) {
    const { number, category, description, favorite } = expense;
    const title = id ? 'Editar gasto' : 'Adicionar gasto';
    const buttonTypeTitle = id ? 'Editar' : 'Adicionar';
    return (
      <form className="w-full flex flex-col items-center p-2 shadow-lg rounded-lg border border-gray bg-blue-100 sm:w-4/5 lg:w-1/2">
        <legend className="mt-4 text-2xl">{ title }</legend>
        <div className="w-full flex flex-col items-center">
          <div className="flex flex-col w-4/5 mt-4">
            <span>Categoria:</span>
            <select
              required
              name="category"
              value={ category }
              onChange={ handleChange }
              className="p-2 outline-none shadow-lg rounded-md bg-white"
            >
              { expenseCategoryTypes.map((category) => (
                <option key={ category }>{ category }</option>
              )) }
            </select>
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
        </div>
        <div className="flex flex-col w-4/5 mt-4">
          <span>Descrição:</span>
          <textarea
            required
            autoCorrect="off"
            autoComplete="off"
            rows="3"
            maxLength="100"
            style={ { resize: 'none' } }
            name="description"
            value={ description }
            onChange={ handleChange }
            className="shadow-lgs p-2 rounded-md shadow-lg border border-gray focus:outline-none focus:ring-2"
          />
          <span>Caracteres restantes: { 100 - descriptionLength }</span>
        </div>
        <div className="flex items-center w-4/5 mt-4">
          <span>Favoritar:</span>
          <input
            type="checkbox"
            name="favorite"
            checked={ favorite }
            onChange={ handleChange }
            className="ml-4"
          />
        </div>
        <div className="w-4/5 mt-6 mb-2 flex justify-evenly text-lg">
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
            { buttonTypeTitle }
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
