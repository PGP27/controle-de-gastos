import React from 'react';
import { Link } from 'react-router-dom';
import addIcon from '../../images/addIcon.svg';

const HeaderOptions = () => (
  <div className="flex flex-col items-center sm:flex-row sm:justify-evenly">
    <Link to="/add-expense">
      <div className="flex p-1 rounded-full transition hover:bg-blue-200">
        <img
          src={ addIcon }
          alt="Add icon"
          className="h-7"
        />
        <span className="hidden sm:flex">Adicionar gasto</span>
      </div>
    </Link>
    <div className="flex items-center mt-2 sm:mt-0">
      <span className="mr-2">Favoritos:</span>
      <input
        type="checkbox"
      />
    </div>
  </div>
);

export default HeaderOptions;
