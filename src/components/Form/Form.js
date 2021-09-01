import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { expenseCategoryTypes } from '../../utils/index';
import { useParams } from 'react-router-dom';
import { addExpense, removeExpense } from '../../actions';
import { v4 as uuidv4 } from 'uuid';

const Form = () => {
  const INITIAL_STATE = {
    name: '',
    number: 1,
    category: 'Outros',
    description: '',
  }

  const [expense, setExpense] = useState(INITIAL_STATE);

  const dispatch = useDispatch();
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
      [name]: value,
    });
  };

  const clearForm = () => {
    setExpense(INITIAL_STATE);
  };

  const saveExpense = () => {
    const day = new Date().getDate();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    if (id) {
      const filteredExpense = expenses.find((expense) => expense.id === id);
      const { id: expenseId } = filteredExpense;
      const modificationDate = `${day}/${month}/${year}`;
      const newExpense = {
        ...expense,
        id: expenseId,
        modificationDate,
      };
      dispatch(removeExpense(expenseId));
      dispatch(addExpense(newExpense));
    } else {
      const creationDate = `${day}/${month}/${year}`;
      const newExpense = {
        ...expense,
        id: uuidv4(),
        creationDate,
      };
      dispatch(addExpense(newExpense));
    }
  }

  if (expense) {
    const { name, number, category, description } = expense;
    return (
      <form>
        <div>
          <input
            type="text"
            placeholder="Digite um nome"
            required
            name="name"
            value={ name }
            onChange={ handleChange }
          />
          <input
            type="number"
            required
            min='1'
            step='0.01'
            name="number"
            value={ number }
            onChange={ handleChange }
          />
          <select required name="category" value={ category } onChange={ handleChange }>
            { expenseCategoryTypes.map((category) => (
              <option key={ category }>{ category }</option>
            )) }
          </select>
        </div>
        <textarea
          placeholder="Digite uma descrição"
          required
          name="description"
          value={ description }
          onChange={ handleChange }
        />
        <div>
          <button onClick={ clearForm } >Limpar</button>
          <button onClick={ saveExpense } >Adicionar</button>
        </div>
      </form>
    );
  }
  return (
    <span>ID '{id}' não encontrado!</span>
  );
};

export default Form;
