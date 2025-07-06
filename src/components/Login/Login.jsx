import React, { useState } from "react";
import "./login.css";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

export default function Login({ onLogin }) {
  const [tela, setTela] = useState("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [usuarios, setUsuarios] = useState(() => {
    const salvos = localStorage.getItem("usuarios");
    return salvos ? JSON.parse(salvos) : [{ email: "admin@teste.com", senha: "1234" }];
  });

  const salvarUsuarios = (novos) => {
    setUsuarios(novos);
    localStorage.setItem("usuarios", JSON.stringify(novos));
  };

  const limparCampos = () => {
    setEmail("");
    setSenha("");
    setConfirmarSenha("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const usuario = usuarios.find((u) => u.email === email && u.senha === senha);
    if (usuario) {
      alert("Login realizado com sucesso!");
      onLogin();
    } else {
      alert("Email ou senha inválidos.");
    }
  };

  const handleCadastro = (e) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }
    if (usuarios.find((u) => u.email === email)) {
      alert("Usuário já cadastrado.");
      return;
    }
    const novoUsuario = { email, senha };
    salvarUsuarios([...usuarios, novoUsuario]);
    alert("Cadastro realizado com sucesso!");
    setTela("login");
    limparCampos();
  };

  const handleEsqueceuSenha = (e) => {
    e.preventDefault();
    const usuario = usuarios.find((u) => u.email === email);
    if (usuario) {
      alert(`Senha do usuário: ${usuario.senha}`);
    } else {
      alert("Usuário não encontrado.");
    }
  };

  const IconWrapper = ({ children }) => (
    <div className="input-icon">{children}</div>
  );

  return (
    <div className="login-container">
      {tela === "login" && (
        <form className="login-form" onSubmit={handleLogin}>
          <div className="profile-icon">
            <PersonIcon fontSize="large" />
          </div>
          <h2>Entrar</h2>

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

          <button type="submit">LOGIN</button>
          <p className="link" onClick={() => setTela("cadastro")}>Criar conta</p>
          <p className="link" onClick={() => setTela("esqueceu")}>Esqueceu a senha?</p>
        </form>
      )}

      {tela === "cadastro" && (
        <form className="login-form" onSubmit={handleCadastro}>
          <div className="profile-icon">
            <PersonIcon fontSize="large" />
          </div>
          <h2>Criar Conta</h2>

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

          <button type="submit">Cadastrar</button>
          <p className="link" onClick={() => setTela("login")}>Já tem conta? Entrar</p>
        </form>
      )}

      {tela === "esqueceu" && (
        <form className="login-form" onSubmit={handleEsqueceuSenha}>
          <div className="profile-icon">
            <PersonIcon fontSize="large" />
          </div>
          <h2>Recuperar Senha</h2>

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

          <button type="submit">Recuperar</button>
          <p className="link" onClick={() => setTela("login")}>Voltar ao login</p>
        </form>
      )}
    </div>
  );
}
