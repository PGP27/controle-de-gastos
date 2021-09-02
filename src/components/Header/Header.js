import React from 'react';
import { Link } from 'react-router-dom';
import { expenseCategoryTypes } from '../../utils/index';
import addIcon from '../../images/add.svg';

const Header = () => {
  return (
    <header className="w-full flex flex-col items-center shadow-lg rounded-lg border border-gray bg-blue-50 sm:w-4/5 lg:w-1/2">
      <div className="w-full flex justify-center mt-4 mb-4">
        <Link to="/add-expense" className="flex items-center mr-2 rounded-full transition hover:bg-gray-200">
          <img src={ addIcon } alt="Add icon" className="w-8" />
          <span className="hidden mr-2 text-lg sm:flex">Adicionar gasto</span>
        </Link>
        <input
          type="text"
          placeholder="Busque pelo nome ou descrição de um gasto"
          className="w-4/5 shadow-lg p-2 rounded-md border border-gray focus:outline-none focus:ring-2 sm:w-3/5"
          autoCorrect="off"
          autoComplete="off"
        />
      </div>
      <div className="w-full flex flex-col mt-4 mb-4 text-lg sm:flex-row sm:justify-evenly">
        <div className="flex flex-col items-center mb-8 sm:flex-row sm:mb-0">
          <div className="bg-white rounded-lg shadow-lg border border-gray">
            <span className="px-2 mx-2">Filtrar por:</span>
              <select className="px-2 mx-2 bg-white outline-none">
                { expenseCategoryTypes.map((category) => (
                  <option key={ category }>{ category }</option>
                )) }
              </select>
          </div>
          <button
            type="button"
            className="w-1/2 px-2 m-2 shadow-lg border-2 border-black rounded-lg bg-white transition hover:bg-green-100 sm:w-20"
          >
            Filtrar
          </button>
        </div>
        <div className="flex justify-center items-center">
          <span className="px-2 mx-2">Favoritos:</span>
          <input
            type="checkbox"
            className="p-2"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
