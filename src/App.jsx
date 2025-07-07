// Importações principais do React e de estilos
import React, { useState, useEffect } from "react";
import "./App.css";

// Importações dos componentes do projeto
import Header from "./components/Header/Header";
import CadastroDespesas from "./components/CadastroDespesas/CadastroDespesas";
import ExpenseList from "./components/ListaDespesas/ListaDespesas";
import ExpenseFilter from "./components/FiltroDespesas/FiltroDespesas";
import Resumo from "./components/Resumo/Resumo";
import Login from "./components/Login/Login";

// Ícones para o modo claro/escuro
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

// Componente principal da aplicação
export default function App() {
  // Estado para controle de login (verifica localStorage)
  const [logado, setLogado] = useState(() => localStorage.getItem("logado") === "true");

  // Estado para o email do usuário logado
  const [usuario, setUsuario] = useState(() => localStorage.getItem("usuario") || "");

  // Estado que armazena as despesas do usuário
  const [despesas, setDespesas] = useState(() => {
    const despesasSalvas = localStorage.getItem("despesas");
    return despesasSalvas ? JSON.parse(despesasSalvas) : [];
  });

  // Estados dos filtros
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  // Estado para o tema do sistema (claro/escuro)
  const [theme, setTheme] = useState("light");

  // Sempre que as despesas mudarem, atualiza no localStorage
  useEffect(() => {
    localStorage.setItem("despesas", JSON.stringify(despesas));
  }, [despesas]);

  // Atualiza o atributo `data-theme` para aplicar o tema atual no HTML
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Alterna o tema entre claro e escuro
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Função chamada quando o login é realizado com sucesso
  const handleLogin = (email) => {
    setLogado(true);
    setUsuario(email);
    localStorage.setItem("logado", "true");
    localStorage.setItem("usuario", email);
  };

  // Função chamada ao clicar em "Sair"
  const handleLogout = () => {
    setLogado(false);
    setUsuario("");
    localStorage.removeItem("logado");
    localStorage.removeItem("usuario");
  };

  // Adiciona uma nova despesa
  const adicionarDespesa = (novaDespesa) => {
    setDespesas((prev) => [...prev, novaDespesa]);
  };

  // Edita uma despesa já existente
  const editarDespesa = (despesaAtualizada) => {
    setDespesas((prev) =>
      prev.map((d) => (d.id === despesaAtualizada.id ? despesaAtualizada : d))
    );
  };

  // Exclui uma despesa pelo ID
  const excluirDespesa = (id) => {
    setDespesas((prev) => prev.filter((d) => d.id !== id));
  };

  // Função para normalizar strings para comparação (sem acento e em minúsculas)
  const normalizeString = (str) =>
    str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();

  // Aplica filtros de tipo e categoria nas despesas
  const despesasFiltradas = despesas.filter((d) => {
    const tipoDespesa = normalizeString(d.tipo || "");
    const filtroTipoNormalized = normalizeString(filtroTipo || "");
    const categoriaDespesa = normalizeString(d.categoria || "");
    const filtroCategoriaNormalized = normalizeString(filtroCategoria || "");

    return (
      (filtroCategoria ? categoriaDespesa === filtroCategoriaNormalized : true) &&
      (filtroTipo ? tipoDespesa === filtroTipoNormalized : true)
    );
  });

  // Se o usuário ainda não estiver logado, exibe a tela de login
  if (!logado) return <Login onLogin={handleLogin} />;

  // Retorno principal da aplicação para usuários logados
  return (
    <div className="Container">
      {/* Cabeçalho com navegação e botão de logout */}
      <Header usuario={usuario} onLogout={handleLogout} />

      {/* Botão de alternar tema (claro/escuro) */}
      <button className="theme-toggle" onClick={toggleTheme} title="Alternar tema">
        {theme === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
      </button>

      {/* Componente que mostra o resumo geral de despesas */}
      <Resumo despesas={despesas} />

      {/* Área de cadastro de despesas fixas e variáveis */}
      <div className="AreaCadastro" id="cadastro">
        <CadastroDespesas tipo="Fixa" onAddDespesa={adicionarDespesa} />
        <CadastroDespesas tipo="Variável" onAddDespesa={adicionarDespesa} />
      </div>

      {/* Filtros por tipo e categoria */}
      <ExpenseFilter
        categoriaSelecionada={filtroCategoria}
        tipoSelecionado={filtroTipo}
        aoMudarCategoria={setFiltroCategoria}
        aoMudarTipo={setFiltroTipo}
      />

      {/* Lista de despesas filtradas */}
      <div id="lista">
        <ExpenseList
          despesas={despesasFiltradas}
          aoEditar={editarDespesa}
          aoExcluir={excluirDespesa}
        />
      </div>
    </div>
  );
}
