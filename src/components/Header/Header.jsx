import React from 'react';
import "./Header.css"

const Header = () => {
  return (
    <div className='Header'>
      <div className='Ancoras'>
      <a href="#cadastro" className="HeaderLink">Ir para Cadastro</a>
      <a href="#lista" className="HeaderLink">Ver lista de despesas</a>
      </div>
      <h1>Controle de gastos</h1>
    </div>
  );
};

export default Header;
