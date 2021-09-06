import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';

const ExpenseDetails = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [expense, setExpense] = useState();
  const [redirect, setRedirect] = useState();

  useEffect(() => {
    const getId = () => {
      const expensesStore = JSON.parse(localStorage.getItem('filteredExpenses'));
      expensesStore.forEach((currentExpense) => {
        if (currentExpense.id === id) {
          setExpense(currentExpense);
        }
      });
      setIsLoading(false);
    };
    getId();
  }, [id]);

  const deleteExpense = () => {
    const expensesStore = JSON.parse(localStorage.getItem('filteredExpenses'));
    const answer = window.confirm('Tem certeza que quer excluir esse gasto?');
    if (answer) {
      const newExpenses = expensesStore.filter((currentExpense) => currentExpense.id !== id);
      localStorage.setItem('filteredExpenses', JSON.stringify(newExpenses));
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Redirect to="/" />
  }

  if (isLoading) {
    return (
      <Loading />
    );
  }

  if (expense && !isLoading) {
    const { id, category, number, description, creationDate, favorite } = expense;
    const favoriteText = favorite ? 'Sim' : 'Não';
    return (
      <div className="w-full flex flex-col items-center text-lg px-4 shadow-lg rounded-lg border border-gray bg-blue-100 sm:w-4/5 lg:w-1/2 xl:w-1/3">
        <span className="m-4 text-2xl">Detalhes</span>
        <div className="shadow-lg">
          <div className="flex flex-col bg-gray-100 p-2 sm:flex-row">
            <span className="mr-2">ID:</span>
            <span>{ id }</span>
          </div>
          <div className="flex flex-col bg-gray-200 p-2 sm:flex-row">
            <span className="mr-2">Categoria:</span>
            <span>{ category }</span>
          </div>
          <div className="flex flex-col bg-gray-100 p-2 sm:flex-row">
            <span className="mr-2">Valor:</span>
            <span>R${ number }</span>
          </div>
          <div className="flex flex-col bg-gray-200 p-2 sm:flex-row">
            <span className="mr-2">Descrição:</span>
            <span>{ description }</span>
          </div>
          <div className="flex flex-col bg-gray-100 p-2 sm:flex-row">
            <span className="mr-2">Data de criação:</span>
            <span>{ creationDate }</span>
          </div>
          <div className="flex flex-col bg-gray-200 p-2 sm:flex-row">
            <span className="mr-2">Favorito:</span>
            <span>{ favoriteText }</span>
          </div>
        </div>
        <div className="w-full my-8 flex justify-evenly text-center">
          <Link
            to={ `/edit-expense/${id}` }
            className="w-20 px-2 shadow-lg border-2 border-black rounded-lg bg-white transition hover:bg-indigo-200"
          >
            Editar
          </Link>
          <button
            className="w-20 px-2 shadow-lg border-2 border-black rounded-lg bg-white transition hover:bg-red-300"
            onClick={ deleteExpense }
          >
            Excluir
          </button>
        </div>
      </div>
    );
  }

  alert('NENHUM GASTO COM ESSE ID FOI ENCONTRADO!');
  return <Redirect to="/" />

};

export default ExpenseDetails;
