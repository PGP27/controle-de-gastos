import React from 'react';
import { Link } from 'react-router-dom';
import { expenseCategoryTypes } from '../../utils/index';

const Header = () => {
  return (
    <header>
      <div>
        <Link to="/add-expense">
          <span>Adicionar gasto</span>
        </Link>
        <input
          type="text"
          placeholder="Busque pelo nome ou descrição de um gasto"
        />
      </div>
      <div>
        <span>Filtrar por:</span>
        <select>
          { expenseCategoryTypes.map((category) => (
            <option key={ category } >{ category }</option>
          )) }
        </select>
        <button type="button">Filtrar</button>
      </div>
    </header>
  );
};

export default Header;
