import React, { useState, useEffect } from 'react';
import "./CadastroDespesas.css";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { FormControl, InputLabel, MenuItem, Select, OutlinedInput } from '@mui/material';


const CadastroDespesas = ({ tipo, onAddDespesa }) => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState(dayjs());

  const categoriasFixas = ['Aluguel', 'Academia', 'Assinaturas', 'Condomínio', 'Internet', 'Plano de Saúde', 'Seguro'];
  const categoriasVariaveis = ['Alimentação','Compras','Educação','Lazer','Moradia','Saúde','Transporte', 'Outros'];

  const categorias = tipo === 'Fixa' ? categoriasFixas : categoriasVariaveis;

  useEffect(() => {
    setCategoria(categorias[0]);
  }, [tipo]);
const handleSubmit = (e) => {
  e.preventDefault();
  if (descricao && valor) {
    const tipoPadronizado = tipo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    onAddDespesa({
      id: Date.now(),
      descricao,
      valor: parseFloat(valor),
      categoria,
      tipo: tipoPadronizado,
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
      <div className='HeaderCadastro'>
        <h3>Cadastro de Despesa {tipo}</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <div>
            <label>Descrição do gasto</label>
            <input type="text" value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Digite a descrição"
            />
          </div>
          <div>
            <label>Valor (R$)</label>
            <input type="number" step="0.01"value={valor} placeholder="0,00"
              onChange={(e) => setValor(e.target.value)}
            />
          </div>

        </div>
        <div className='SelectRow'>
  <FormControl size="small" fullWidth>
    <InputLabel id="categoria-label">Categoria</InputLabel>
    <Select
      labelId="categoria-label" id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}  
      input={<OutlinedInput label="Categoria" />}
    >
      {categorias.map((cat) => (
        <MenuItem key={cat} value={cat}>
          {cat}
        </MenuItem>
      ))}
    </Select>
  </FormControl>

  <div className="DatePickerWrapper">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Data" value={data} 
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
</div>


        <Button className='ButtonRed' type="submit" variant="contained" size="small" endIcon={<SendIcon />}>
          Adicionar
        </Button>
      </form>
    </div>
  );
};

export default CadastroDespesas;
