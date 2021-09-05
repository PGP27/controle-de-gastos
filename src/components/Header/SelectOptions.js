import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setOption, setNumber } from '../../actions/index';
import { expenseCategoryTypes, costTypes } from '../../utils';

const SelectOptions = ({ selectType }) => {
  let options;
  if (selectType === 'Categoria') options = expenseCategoryTypes;
  if (selectType === 'Valor') options = costTypes;
  if (selectType === 'Favoritos') options = null;

  const showInput = selectType === 'Valor' ? 'block' : 'hidden';

  const [currentOptionType, setCurrentOptionType] = useState('Todos');
  const [currentNumberType, setCurrentNumberType] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const changeOptionOnMount = () => {
      if (selectType === 'Categoria') {
        dispatch(setOption('Todos'));
      }
      if (selectType === 'Valor') {
        dispatch(setOption('Menor que'));
      }
      if (selectType === 'Favoritos') {
        dispatch(setOption(''));
      }
    };
    changeOptionOnMount();
  }, [selectType, dispatch]);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'option') {
      setCurrentOptionType(value);
      dispatch(setOption(value));
    }
    else if (name === 'number') {
      setCurrentNumberType(value)
      dispatch(setNumber(value));
    };
  };

  if (options) {
    return (
      <div className="flex flex-col justify-center sm:flex-row sm:items-center">
        <select
          className="w-36 h-8 p-1 m-2 bg-white rounded-lg outline-none shadow-lg"
          name="option"
          onChange={ handleChange }
          value={ currentOptionType }
        >
          { options.map((option) => (
            <option key={ option }>{ option }</option>
          )) }
        </select>
        <input
          type="number"
          min='1'
          step='0.01'
          className={ `w-36 h-8 ${ showInput } m-2 p-1 rounded-lg outline-none` }
          name="number"
          onChange={ handleChange }
          value={ currentNumberType }
        />
      </div>
    );
  }
  return null;
};

export default SelectOptions;
