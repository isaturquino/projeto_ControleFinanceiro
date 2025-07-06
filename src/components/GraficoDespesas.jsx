import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const dados = [
  { nome: 'Alimentação', valor: 400 },
  { nome: 'Transporte', valor: 300 },
  { nome: 'Lazer', valor: 200 },
  { nome: 'Outros', valor: 100 },
];

const cores = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

export default function GraficoDespesas() {
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <h3>Distribuição de Despesas</h3>
      <PieChart width={400} height={300}>
        <Pie
          data={dados}
          dataKey="valor"
          nameKey="nome"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {dados.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={cores[index % cores.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
