// Header.jsx
import React from 'react';
import "./Header.css";

const Header = ({ usuario, onLogout }) => {
  const handleLogout = (e) => {
    e.preventDefault();
    onLogout();
  };

  return (
    <div className="Header">
      <div className="Ancoras">
        <a href="#cadastro" className="HeaderLink">Ir para Cadastro</a>
        <a href="#lista" className="HeaderLink">Ver lista de despesas</a>
      </div>

      <h1>Controle de gastos</h1>

      <div className="HeaderDireita">
        <span className="UsuarioEmail">{usuario}</span>
        <a href="#logout" className="LogoutButton" onClick={handleLogout}>Sair</a>
      </div>
    </div>
  );
};

export default Header;
