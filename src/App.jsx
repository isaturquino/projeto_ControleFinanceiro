import React, { useState, useEffect } from "react";
import "./App.css"
import Header from "./components/Header/Header";
import CadastroDespesas from "./components/CadastroDespesas/CadastroDespesas";
import ExpenseList from "./components/ListaDespesas";
import ExpenseFilter from "./components/FiltroDespesas";
import Resumo from "./components/Resumo/Resumo";

export default function App() {
  const [despesas, setDespesas] = useState(() => {
    const despesasSalvas = localStorage.getItem("despesas");
    return despesasSalvas ? JSON.parse(despesasSalvas) : [];
  });

  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

  useEffect(() => {
    localStorage.setItem("despesas", JSON.stringify(despesas));
  }, [despesas]);

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

  const despesasFiltradas = despesas.filter((d) => {
    return (
      (filtroCategoria ? d.categoria === filtroCategoria : true) &&
      (filtroTipo ? d.tipo === filtroTipo : true)
    );
  });

  return (
    <div className="Container">
      <Header />
       
      <Resumo despesas={despesasFiltradas} />
      <div className="AreaCadastro">
        <CadastroDespesas tipo="Fixa" onAddDespesa={adicionarDespesa} />
        <CadastroDespesas tipo="Variável" onAddDespesa={adicionarDespesa} />
      </div>


      <ExpenseFilter
        categoria={filtroCategoria}
        tipo={filtroTipo}
        onCategoriaChange={setFiltroCategoria}
        onTipoChange={setFiltroTipo}
      />

      <ExpenseList
        despesas={despesasFiltradas}
        aoEditar={editarDespesa}
        aoExcluir={excluirDespesa}
      />
    </div>
  );
}
