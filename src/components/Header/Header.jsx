// Header.jsx
// Importa o React e o CSS do componente
import React from 'react';
import "./Header.css";

// Componente Header que recebe as props:
// - usuario: e-mail do usuário logado
// - onLogout: função para realizar logout
const Header = ({ usuario, onLogout }) => {
  
  // Função que trata o clique no botão "Sair"
  const handleLogout = (e) => {
    e.preventDefault(); // evita comportamento padrão do link
    onLogout(); // chama a função de logout
  };

  return (
    <div className="Header">
      
      {/* Links de navegação interna (âncoras) */}
      <div className="Ancoras">
        <a href="#cadastro" className="HeaderLink">Ir para Cadastro</a>
        <a href="#lista" className="HeaderLink">Ver lista de despesas</a>
      </div>

      {/* Título central do sistema */}
      <h1>Controle de gastos</h1>

      {/* Lado direito: exibe o e-mail do usuário e botão de logout */}
      <div className="HeaderDireita">
        <span className="UsuarioEmail">{usuario}</span>
        <a href="#logout" className="LogoutButton" onClick={handleLogout}>Sair</a>
      </div>
    </div>
  );
};

// Exporta o componente para uso em outras partes do app
export default Header;
