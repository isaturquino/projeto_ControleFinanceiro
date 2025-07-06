import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import CadastroDespesas from "./components/CadastroDespesas/CadastroDespesas";
import ExpenseList from "./components/ListaDespesas";
import ExpenseFilter from "./components/FiltroDespesas";
import Resumo from "./components/Resumo/Resumo";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function App() {
  const [despesas, setDespesas] = useState(() => {
    const despesasSalvas = localStorage.getItem("despesas");
    return despesasSalvas ? JSON.parse(despesasSalvas) : [];
  });

  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    localStorage.setItem("despesas", JSON.stringify(despesas));
  }, [despesas]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const adicionarDespesa = (novaDespesa) => {
    setDespesas((prev) => [...prev, novaDespesa]);
  };

  const editarDespesa = (despesaAtualizada) => {
    setDespesas((prev) =>
      prev.map((d) => (d.id === despesaAtualizada.id ? despesaAtualizada : d))
    );
  };

  const excluirDespesa = (id) => {
    setDespesas((prev) => prev.filter((d) => d.id !== id));
  };

  const normalizeString = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

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

  return (
    <div className="Container">
      <Header />
      <button className="theme-toggle" onClick={toggleTheme} title="Alternar tema">
        {theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      </button>
      <Resumo despesas={despesasFiltradas} />

      <div className="AreaCadastro">
        <CadastroDespesas tipo="Fixa" onAddDespesa={adicionarDespesa} />
        <CadastroDespesas tipo="Variável" onAddDespesa={adicionarDespesa} />
      </div>

      <ExpenseFilter
        categoriaSelecionada={filtroCategoria}
        tipoSelecionado={filtroTipo}
        aoMudarCategoria={setFiltroCategoria}
        aoMudarTipo={setFiltroTipo}
      />

      <ExpenseList
        despesas={despesasFiltradas}
        aoEditar={editarDespesa}
        aoExcluir={excluirDespesa}
      />
    </div>
  );
}