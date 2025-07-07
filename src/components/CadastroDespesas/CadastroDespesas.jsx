import React, { useState, useEffect } from 'react';
import "./CadastroDespesas.css";

// Componentes do Material UI
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { FormControl, InputLabel, MenuItem, Select, OutlinedInput } from '@mui/material';

// Componente de cadastro de despesas (fixas ou variáveis)
const CadastroDespesas = ({ tipo, onAddDespesa }) => {
  // Estados para armazenar os dados da nova despesa
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState(dayjs()); // Data atual

  // Categorias pré-definidas
  const categoriasFixas = ['Aluguel', 'Academia', 'Assinaturas', 'Condomínio', 'Internet', 'Plano de Saúde', 'Seguro'];
  const categoriasVariaveis = ['Alimentação','Compras','Educação','Lazer','Moradia','Saúde','Transporte', 'Outros'];

  // Define as categorias com base no tipo da despesa (Fixa ou Variável)
  const categorias = tipo === 'Fixa' ? categoriasFixas : categoriasVariaveis;

  // Sempre que o tipo mudar (Fixa/Variável), atualiza a categoria padrão
  useEffect(() => {
    setCategoria(categorias[0]);
  }, [tipo]);

  // Função que trata o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    // Verifica se os campos obrigatórios foram preenchidos
    if (descricao && valor) {
      // Normaliza o tipo, removendo acentos e colocando minúsculo (ex: 'Fixa' vira 'fixa')
      const tipoPadronizado = tipo.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      // Chama a função passada via props para adicionar a despesa
      onAddDespesa({
        id: Date.now(), // ID único baseado no timestamp
        descricao,
        valor: parseFloat(valor), // Converte o valor para número
        categoria,
        tipo: tipoPadronizado,
        data: data.format('YYYY-MM-DD'), // Formato padrão de data
      });

      // Limpa os campos do formulário
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
        {/* Linha com os campos de descrição e valor */}
        <div className="input-row">
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
        </div>

        {/* Linha com o select de categoria e o seletor de data */}
        <div className='SelectRow'>
          {/* Campo de seleção de categoria */}
          <FormControl size="small" fullWidth>
            <InputLabel id="categoria-label">Categoria</InputLabel>
            <Select
              labelId="categoria-label"
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}  
              input={<OutlinedInput label="Categoria" />}
            >
              {/* Gera as opções dinamicamente com base no tipo */}
              {categorias.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Campo de seleção de data */}
          <div className="DatePickerWrapper">
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
        </div>

        {/* Botão de envio do formulário */}
        <Button 
          className='ButtonRed' 
          type="submit" 
          variant="contained" 
          size="small" 
          endIcon={<SendIcon />}
        >
          Adicionar
        </Button>
      </form>
    </div>
  );
};

export default CadastroDespesas;
