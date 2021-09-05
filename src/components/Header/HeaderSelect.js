import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelect, setExpenses } from '../../actions/index';
import SelectOptions from './SelectOptions';

const HeaderSelect = () => {
  const [currentSelectType, setCurrentSelectType] = useState('Categoria');

  const dispatch = useDispatch();

  const selectValue = useSelector((state) => state.filteredExpenses.select);
  const optionValue = useSelector((state) => state.filteredExpenses.option);
  const numberValue = useSelector((state) => state.filteredExpenses.number);

  useEffect(() => {
    const changeSelect = () => {
      dispatch(setSelect(currentSelectType));
    };
    changeSelect();
  }, [currentSelectType, dispatch]);

  const handleChange = ({ target: { value } }) => {
    setCurrentSelectType(value);
  };

  const filterClick = () => {
    const expensesStore = JSON.parse(localStorage.getItem('filteredExpenses'));
    if (selectValue === 'Categoria') {
      const filteredExpenses = expensesStore.filter(({ category }) => {
        if (optionValue === 'Todos') return category;
        return category === optionValue;
      });
      if (filteredExpenses.length > 0) {
        dispatch(setExpenses(filteredExpenses));
      } else {
        alert('Nenhum gasto encontrado com esse filtro.');
      }
    } else if (selectValue === 'Favoritos') {
      const filteredExpenses = expensesStore.filter(({ favorite }) => favorite === true);
      if (filteredExpenses.length > 0) {
        dispatch(setExpenses(filteredExpenses));
      } else {
        alert('Nenhum gasto encontrado com esse filtro.');
      }
    } else if (selectValue === 'Valor') {
      const filteredExpenses = expensesStore.filter(({ number }) => {
        const numberNumber = Number(number);
        const numberNumberValue = Number(numberValue);
        if (optionValue === 'Menor que') {
          return numberNumber < numberNumberValue;
        }
        if (optionValue === 'Igual a') return numberNumber === numberNumberValue;
        return numberNumber > numberNumberValue;
      });
      if (filteredExpenses.length > 0) {
        dispatch(setExpenses(filteredExpenses));
      } else {
        alert('Nenhum gasto encontrado com esse filtro.');
      }
    }
  };

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
          onClick={ filterClick }
        >
          Filtrar
        </button>
      </div>
    </div>
  );
};

export default HeaderSelect;
