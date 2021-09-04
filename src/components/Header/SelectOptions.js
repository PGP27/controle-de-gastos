import React from 'react';
import { expenseCategoryTypes, costTypes } from '../../utils';

const SelectOptions = ({ selectType }) => {
  const options = selectType === 'Categoria' ? expenseCategoryTypes : costTypes;
  const showInput = selectType === 'Categoria' ? 'hidden' : 'block';
  return (
    <div className="flex flex-col justify-center sm:flex-row sm:items-center">
      <select className="w-36 h-8 p-1 m-2 bg-white rounded-lg outline-none shadow-lg">
        { options.map((option) => (
          <option key={ option }>{ option }</option>
        )) }
      </select>
      <input
        type="number"
        min='1'
        step='0.01'
        className={ `w-36 h-8 ${ showInput } m-2 p-1 rounded-lg outline-none` }
      />
    </div>
  );
};

export default SelectOptions;
