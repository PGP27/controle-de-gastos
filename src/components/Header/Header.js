import React from 'react';
import HeaderOptions from './HeaderOptions';
import HeaderSelect from './HeaderSelect';

const Header = () => {
  return (
    <header className="w-full p-4 text-lg bg-blue-100 rounded-lg shadow-lg md:w-4/5 lg:w-3/5 xl:w-1/2">
      <HeaderOptions />
      <HeaderSelect />
    </header>
  );
};

export default Header;
