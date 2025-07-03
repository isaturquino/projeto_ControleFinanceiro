import React from "react";
import ResumoItem from "./ResumoItem"; 
import "./Resumo.css"

export default function Resumo({ despesas }) {
  const totalGeral = despesas.reduce((acc, item) => acc + item.valor, 0);
  const totalFixa = despesas
    .filter((d) => d.tipo === "Fixa")
    .reduce((acc, item) => acc + item.valor, 0);
  const totalVariavel = despesas
    .filter((d) => d.tipo === "Variável")
    .reduce((acc, item) => acc + item.valor, 0);

  return (
    <div className="ResumoContainer" >
      <ResumoItem titulo="Fixas" valor={totalFixa} />
      <ResumoItem titulo="Variáveis" valor={totalVariavel} />
      <ResumoItem titulo="Total" valor={totalGeral} />
    </div>
  );
}
