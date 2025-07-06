import React from "react";
import ResumoItem from "./ResumoItem";
import "./Resumo.css";

import {
  PieChart, Pie, Cell, Tooltip, Legend
} from "recharts";

const COLORS_TIPO = ["#8884d8", "#82ca9d"];
const COLORS_CATEGORIA = [
  "#FFBB28", "#FF8042", "#AA336A", "#0088FE", "#00C49F", "#FF6666", "#66CCCC", "#A28BE7"
];

export default function Resumo({ despesas }) {
  const totalFixa = despesas
    .filter(d => d.tipo.toLowerCase() === "fixa")
    .reduce((acc, item) => acc + item.valor, 0);

  const totalVariavel = despesas
    .filter(d => d.tipo.toLowerCase() === "variável" || d.tipo.toLowerCase() === "variavel")
    .reduce((acc, item) => acc + item.valor, 0);

  const totalGeral = totalFixa + totalVariavel;

  const porCategoria = despesas.reduce((acc, d) => {
    const cat = d.categoria || "Outros";
    acc[cat] = (acc[cat] || 0) + d.valor;
    return acc;
  }, {});
  const dadosCategoria = Object.entries(porCategoria).map(([nome, valor]) => ({ nome, valor }));

  const dadosTipo = [
    { nome: "Fixas", valor: totalFixa },
    { nome: "Variáveis", valor: totalVariavel }
  ];

  return (
    <section className="ResumoContainer">
      {/* Totais no topo */}
      <div className="ResumoTotais">
        <ResumoItem titulo="Fixas" valor={totalFixa} />
        <ResumoItem titulo="Variáveis" valor={totalVariavel} />
        <ResumoItem titulo="Total" valor={totalGeral} />
      </div>

      {/* Gráficos de pizza */}
      <div className="ResumoGraficosTotal">
        {/* Pizza por tipo */}
        <div className="Grafico">
          <h4>Despesas por Tipo</h4>
          {totalGeral > 0 ? (
            <PieChart width={300} height={280}>
              <Pie
                data={dadosTipo}
                dataKey="valor"
                nameKey="nome"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
                labelLine={false}
              >
                {dadosTipo.map((entry, index) => (
                  <Cell key={`tipo-${index}`} fill={COLORS_TIPO[index]} />
                ))}
              </Pie>
              <Tooltip formatter={valor => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          ) : (
            <p>Nenhuma despesa para exibir.</p>
          )}
        </div>

        {/* Pizza por categoria */}
        <div className="Grafico">
          <h4>Despesas por Categoria</h4>
          {dadosCategoria.length > 0 ? (
            <PieChart width={300} height={280}>
              <Pie
                data={dadosCategoria}
                dataKey="valor"
                nameKey="nome"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
                labelLine={false}
              >
                {dadosCategoria.map((entry, index) => (
                  <Cell key={`cat-${index}`} fill={COLORS_CATEGORIA[index % COLORS_CATEGORIA.length]} />
                ))}
              </Pie>
              <Tooltip formatter={valor => valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          ) : (
            <p>Nenhuma categoria registrada.</p>
          )}
        </div>
      </div>
    </section>
  );
}
