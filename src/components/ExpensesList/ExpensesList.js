import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ExpensesList = () => {
  const [expenses, setExpenses] = useState([]);

  const filteredExpenses = useSelector((state) => state.expenses.expenses);

  useEffect(() => {
    const getExpenses = () => {
      if (filteredExpenses.length === 0) {
        setExpenses(JSON.parse(localStorage.getItem('filteredExpenses')));
      } else {
        setExpenses(filteredExpenses);
      }
    };
    getExpenses();
  }, [filteredExpenses]);

  return (
    <div className="flex justify-center w-full mt-6">
      <ul className="flex flex-col items-center xl:w-4/5 border border-gray-200">
        { expenses.map(({ id, name, category, number, description, creationDate, modificationDate }, index) => {
          const color = index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200';
          const modification = modificationDate ? modificationDate : '-';
          return (
            <Link to={`/expense/${ id }`} key={ id } className="w-full">
              <li className={`grid grid-cols-2 ${ color } sm:grid-cols-3 lg:flex flex-row`}>
                <div className="flex flex-col w-full p-2 px-6 overflow-auto">
                  <span>Nome: </span>
                  <p className="overflow-auto">{ name }</p>
                </div>
                <div className="flex flex-col w-full p-2 px-6 overflow-auto">
                  <span>Categoria: </span>
                  <p className="overflow-auto">{ category }</p>
                </div>
                <div className="flex flex-col w-full p-2 px-6 overflow-auto">
                  <span>Valor: </span>
                  <p className="overflow-auto">{ number }</p>
                </div>
                <div className="flex flex-col w-full p-2 px-6 overflow-auto">
                  <span>Descrição: </span>
                  <p className="overflow-auto">{ description }</p>
                </div>
                <div className="flex flex-col w-full p-2 px-6 overflow-auto">
                  <span>Data de criação: </span>
                  <p className="overflow-auto">{ creationDate }</p>
                </div>
                <div className="flex flex-col w-full p-2 px-6 overflow-auto">
                  <span>Data da última edição: </span>
                  <p className="overflow-auto">{ modification }</p>
                </div>
              </li>
            </Link>
          );
        }) }
      </ul>
    </div>
  );
};

export default ExpensesList;
