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
        <ul className="w-full flex flex-col items-center shadow-lg border border-gray-200 xl:w-10/12">
          { expenses.map(({ id, category, number, description, creationDate, favorite }, index) => {
            const color = index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200';
            const favoriteText = favorite === true ? 'Sim' : 'Não';
            return (
              <li key={ id } className={`w-full grid grid-cols-2 ${ color } sm:grid-cols-3 lg:flex lg:justify-evenly`}>
                <div className="flex flex-col w-60 p-2 px-6 xl:flex-row xl:items-center">
                  <span>Categoria:</span>
                  <div className="xl:ml-2">
                    <p>{ category }</p>
                  </div>
                </div>
                <div className="flex flex-col w-60 p-2 px-6 xl:flex-row xl:items-center">
                  <span>Valor:</span>
                  <div className="xl:ml-2">
                    <p className="overflow-auto">R${ number }</p>
                  </div>
                </div>
                <div className="flex flex-col w-60 p-2 px-6 xl:flex-row xl:items-center">
                  <span>Criação:</span>
                  <div className="xl:ml-2">
                    <p>{ creationDate }</p>
                  </div>
                </div>
                <div className="flex flex-col w-60 p-2 px-6 xl:flex-row xl:items-center">
                  <span>Favorito:</span>
                  <div className="xl:ml-2">
                    <p>{ favoriteText }</p>
                  </div>
                </div>
                <div className="col-span-2 flex items-center w-60 p-2 px-6">
                  <Link to={`/expense/${ id }`} className="text-blue-600 hover:underline">
                    Ver detalhes
                  </Link>
                </div>
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
