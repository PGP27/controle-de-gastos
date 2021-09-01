import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import home from './pages';
import addExpense from './pages/addExpense';
import editExpense from './pages/editExpense';
import expenseDetails from './pages/expenseDetails';

const App = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <Link to="/" className="flex justify-center">
        <h1 className="w-full text-3xl text-center p-4 sm:text-5xl lg:text-6xl">Controle de gastos</h1>
      </Link>
      <Switch>
        <Route exact path="/" component={ home } />
        <Route path="/add-expense" component={ addExpense } />
        <Route path="/edit-expense/:id" component={ editExpense } />
        <Route path="/expense/:id" component={ expenseDetails } />
      </Switch>
    </div>
  );
};

export default App;