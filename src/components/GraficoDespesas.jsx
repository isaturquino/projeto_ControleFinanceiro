// Importa os componentes necessários da biblioteca 'recharts'
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Dados estáticos de exemplo: cada item representa uma categoria de despesa
const dados = [
  { nome: 'Alimentação', valor: 400 },
  { nome: 'Transporte', valor: 300 },
  { nome: 'Lazer', valor: 200 },
  { nome: 'Outros', valor: 100 },
];

// Cores usadas para cada fatia do gráfico (em ordem)
const cores = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

// Componente funcional que renderiza o gráfico de pizza
export default function GraficoDespesas() {
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <h3>Distribuição de Despesas</h3>

      {/* Componente de gráfico de pizza */}
      <PieChart width={400} height={300}>
        <Pie
          data={dados}          // dados a serem exibidos
          dataKey="valor"       // campo que será usado como valor numérico
          nameKey="nome"        // campo que será mostrado como nome/categoria
          cx="50%"              // posição horizontal do centro do gráfico
          cy="50%"              // posição vertical do centro do gráfico
          outerRadius={100}     // raio externo da pizza
          label                 // exibe rótulos nas fatias
        >
          {/* Gera uma cor para cada fatia com base nos dados */}
          {dados.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
          ))}
        </Pie>

        {/* Tooltip mostra informações ao passar o mouse */}
        <Tooltip />

        {/* Legenda abaixo do gráfico */}
        <Legend />
      </PieChart>
    </div>
  );
}
