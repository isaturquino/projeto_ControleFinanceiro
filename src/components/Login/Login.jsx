import React, { useState } from "react";
import "./Login.css";

export default function Login({ onLogin }) {
  const [tela, setTela] = useState("login"); // login | cadastro | esqueceu
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
      alert(`Senha do usuário: ${usuario.senha}`); // Apenas para fins didáticos
    } else {
      alert("Usuário não encontrado.");
    }
  };

  return (
    <div className="login-container">
      {tela === "login" && (
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Entrar</h2>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
          <p className="link" onClick={() => setTela("cadastro")}>Criar conta</p>
          <p className="link" onClick={() => setTela("esqueceu")}>Esqueceu a senha?</p>
        </form>
      )}

      {tela === "cadastro" && (
        <form className="login-form" onSubmit={handleCadastro}>
          <h2>Criar Conta</h2>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
          <button type="submit">Cadastrar</button>
          <p className="link" onClick={() => setTela("login")}>Já tem conta? Entrar</p>
        </form>
      )}

      {tela === "esqueceu" && (
        <form className="login-form" onSubmit={handleEsqueceuSenha}>
          <h2>Recuperar Senha</h2>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Recuperar</button>
          <p className="link" onClick={() => setTela("login")}>Voltar ao login</p>
        </form>
      )}
    </div>
  );
}
