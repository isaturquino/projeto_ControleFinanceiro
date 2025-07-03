import React, { useState, useEffect } from 'react';
import "./CadastroDespesas.css";
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const CadastroDespesas = ({ tipo, onAddDespesa }) => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState(dayjs());

  const categoriasFixas = ['Aluguel', 'Academia', 'Assinaturas','Condomínio','Internet', 'Plano de Saúde','Seguro'];
  const categoriasVariaveis = ['Alimentação', 'Transporte', 'Lazer', 'Compras', 'Outros'];

  const categorias = tipo === 'Fixa' ? categoriasFixas : categoriasVariaveis;

  useEffect(() => {
    setCategoria(categorias[0]);
  }, [tipo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (descricao && valor) {
      onAddDespesa({
        id: Date.now(),
        descricao,
        valor: parseFloat(valor),
        categoria,
        tipo,
        data: data.format('YYYY-MM-DD'),
      });
      setDescricao('');
      setValor('');
      setCategoria(categorias[0]);
      setData(dayjs());
    }
  };

  return (
    <div className='CadastroDespesa'>
      <h3>Adicionar Despesa {tipo}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Descrição do gasto</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Digite a descrição"
          />
        </div>
        <div>
          <label>Valor (R$)</label>
          <input
            type="number"
            step="0.01"
            value={valor}
            placeholder="0,00"
            onChange={(e) => setValor(e.target.value)}
          />
        </div>
        <div>
          <label>Categoria</label>
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Data"
              value={data}
              onChange={(newValue) => setData(newValue)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'small',
                },
              }}
            />
          </LocalizationProvider>
        </div>
        <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
          + Adicionar Gasto
        </Button>
      </form>
    </div>
  );
};

export default CadastroDespesas;
