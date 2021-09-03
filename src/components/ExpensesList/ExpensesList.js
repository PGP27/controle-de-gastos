import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ExpensesList = () => {
  const [expenses, setExpenses] = useState([]);

  const filteredExpenses = useSelector((state) => state.expenses.expenses);

  useEffect(() => {
    const getExpenses = () => {
      if (filteredExpenses.length === 0) {
        const expensesStore = JSON.parse(localStorage.getItem('filteredExpenses'));
        if (expensesStore) {
          setExpenses(expensesStore);
        }
      } else {
        setExpenses(filteredExpenses);
      }
    };
    getExpenses();
  }, [filteredExpenses]);

  if (expenses.length > 0) {
    return (
      <div className="flex justify-center w-full mt-6">
        <ul className="w-full flex flex-col items-center border border-gray-200">
          { expenses.map(({ id, category, number, description, creationDate, favorite }, index) => {
            const color = index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200';
            const favoriteText = favorite === true ? 'Sim' : 'Não';
            return (
              <li key={ id } className={`w-full grid grid-cols-2 ${ color } sm:grid-cols-3 lg:flex flex-row`}>
                <div className="flex flex-col w-full p-2 px-6 overflow-auto">
                  <span>Categoria:</span>
                  <p className="overflow-auto">{ category }</p>
                </div>
                <div className="flex flex-col w-full p-2 px-6 overflow-auto">
                  <span>Valor:</span>
                  <p className="overflow-auto">R$ { number }</p>
                </div>
                <div className="flex flex-col w-full p-2 px-6 overflow-auto">
                  <span>Descrição:</span>
                  <p className="overflow-auto">{ description }</p>
                </div>
                <div className="flex flex-col w-full p-2 px-6 overflow-auto">
                  <span>Criação:</span>
                  <p className="overflow-auto">{ creationDate }</p>
                </div>
                <div className="flex items-center w-full p-2 px-6">
                  <span>Favorito:</span>
                  <p className="ml-2">{ favoriteText }</p>
                </div>
                <Link to={`/expense/${ id }`} className="flex items-center w-full p-2 px-6 overflow-auto">
                  Ver detalhes
                </Link>
              </li>
            );
          }) }
        </ul>
      </div>
    );
  }
  return null;
};

export default ExpensesList;
