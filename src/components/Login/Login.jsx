import React, { useState } from "react";
import "./login.css";

// Ícones do Material UI
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

// Componente principal de Login
export default function Login({ onLogin }) {
  // Estado para controlar qual tela está ativa: login, cadastro ou recuperação
  const [tela, setTela] = useState("login");

  // Estados para inputs
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // Carrega usuários salvos no localStorage ou cria um usuário padrão
  const [usuarios, setUsuarios] = useState(() => {
    const salvos = localStorage.getItem("usuarios");
    return salvos ? JSON.parse(salvos) : [{ email: "admin@teste.com", senha: "1234" }];
  });

  // Salva novos usuários no estado e localStorage
  const salvarUsuarios = (novos) => {
    setUsuarios(novos);
    localStorage.setItem("usuarios", JSON.stringify(novos));
  };

  // Limpa todos os campos
  const limparCampos = () => {
    setEmail("");
    setSenha("");
    setConfirmarSenha("");
  };

  // Função de login
  const handleLogin = (e) => {
    e.preventDefault();

    // Verifica se o usuário existe com o e-mail e senha informados
    const usuario = usuarios.find((u) => u.email === email && u.senha === senha);
    if (usuario) {
      alert("Login realizado com sucesso!");
      onLogin(); // Dispara callback após login
    } else {
      alert("Email ou senha inválidos.");
    }
  };

  // Função de cadastro
  const handleCadastro = (e) => {
    e.preventDefault();

    // Verifica se as senhas são iguais
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    // Verifica se o e-mail já está cadastrado
    if (usuarios.find((u) => u.email === email)) {
      alert("Usuário já cadastrado.");
      return;
    }

    // Cria e salva novo usuário
    const novoUsuario = { email, senha };
    salvarUsuarios([...usuarios, novoUsuario]);

    alert("Cadastro realizado com sucesso!");

    // Volta para a tela de login e limpa os campos
    setTela("login");
    limparCampos();
  };

  // Função para recuperar senha
  const handleEsqueceuSenha = (e) => {
    e.preventDefault();

    // Busca o usuário pelo e-mail
    const usuario = usuarios.find((u) => u.email === email);
    if (usuario) {
      alert(`Senha do usuário: ${usuario.senha}`); // ⚠️ Mostrar senha diretamente não é seguro
    } else {
      alert("Usuário não encontrado.");
    }
  };

  // Componente auxiliar para agrupar ícones
  const IconWrapper = ({ children }) => (
    <div className="input-icon">{children}</div>
  );

  return (
    <div className="login-container">
      
      {/* Tela de Login */}
      {tela === "login" && (
        <form className="login-form" onSubmit={handleLogin}>
          <div className="profile-icon">
            <PersonIcon fontSize="large" />
          </div>
          <h2>Entrar</h2>

          {/* Campo de e-mail */}
          <div className="input-group">
            <IconWrapper><EmailIcon /></IconWrapper>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Campo de senha */}
          <div className="input-group">
            <IconWrapper><LockIcon /></IconWrapper>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {/* Botão de login */}
          <button type="submit">LOGIN</button>

          {/* Links para mudar de tela */}
          <p className="link" onClick={() => { setTela("cadastro"); limparCampos(); }}>
            Criar conta
          </p>
          <p className="link" onClick={() => { setTela("esqueceu"); limparCampos(); }}>
            Esqueceu a senha?
          </p>
        </form>
      )}

      {/* Tela de Cadastro */}
      {tela === "cadastro" && (
        <form className="login-form" onSubmit={handleCadastro}>
          <div className="profile-icon">
            <PersonIcon fontSize="large" />
          </div>
          <h2>Criar Conta</h2>

          {/* Campo de e-mail */}
          <div className="input-group">
            <IconWrapper><EmailIcon /></IconWrapper>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Campo de senha */}
          <div className="input-group">
            <IconWrapper><LockIcon /></IconWrapper>
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {/* Campo de confirmação de senha */}
          <div className="input-group">
            <IconWrapper><LockIcon /></IconWrapper>
            <input
              type="password"
              placeholder="Confirmar senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
            />
          </div>

          {/* Botão de cadastro */}
          <button type="submit">Cadastrar</button>

          {/* Link para voltar ao login */}
          <p className="link" onClick={() => { setTela("login"); limparCampos(); }}>
            Já tem conta? Entrar
          </p>
        </form>
      )}

      {/* Tela de recuperação de senha */}
      {tela === "esqueceu" && (
        <form className="login-form" onSubmit={handleEsqueceuSenha}>
          <div className="profile-icon">
            <PersonIcon fontSize="large" />
          </div>
          <h2>Recuperar Senha</h2>

          {/* Campo para inserir o e-mail */}
          <div className="input-group">
            <IconWrapper><EmailIcon /></IconWrapper>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Botão para recuperar senha */}
          <button type="submit">Recuperar</button>

          {/* Link para voltar ao login */}
          <p className="link" onClick={() => { setTela("login"); limparCampos(); }}>
            Voltar ao login
          </p>
        </form>
      )}
    </div>
  );
}
