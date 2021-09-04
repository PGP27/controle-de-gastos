import React, { useState } from 'react';
import SelectOptions from './SelectOptions';

const HeaderSelect = () => {
  const [currentSelectType, setCurrentSelectType] = useState('Categoria');

  const handleChange = ({ target: { value } }) => {
    setCurrentSelectType(value);
  }

  return (
    <div className="flex flex-col items-center mt-4">
      <span className="w-40 text-center">Filtrar por:</span>
      <div className="flex flex-col items-center sm:flex-row sm:justify-center">
        <select
          className="w-36 h-8 p-1 bg-white rounded-lg outline-none m-2 shadow-lg"
          value={ currentSelectType }
          onChange={ handleChange }
        >
          <option>Categoria</option>
          <option>Favoritos</option>
          <option>Valor</option>
        </select>
        <SelectOptions
          selectType={ currentSelectType }
        />
        <button
          type="button"
          className="w-24 px-2 m-2 shadow-lg border-2 border-black rounded-lg bg-white transition hover:bg-gray-200"
        >
          Filtrar
        </button>
      </div>
    </div>
  );
};

export default HeaderSelect;
