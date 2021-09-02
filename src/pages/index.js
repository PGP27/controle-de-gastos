import React from 'react';
import ExpensesList from '../components/ExpensesList/ExpensesList';
import Header from '../components/Header/Header';

const index = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <ExpensesList />
    </div>
  );
};

export default index;
