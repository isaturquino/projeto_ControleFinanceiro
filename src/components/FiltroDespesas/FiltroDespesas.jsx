// Importa o React e os estilos CSS personalizados
import React from "react";
import "./FiltroDespesas.css";

// Importa componentes do Material UI
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

// Lista de categorias para o filtro (somente para despesas variáveis)
const categorias = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Saúde",
  "Lazer",
  "Educação",
  "Outros",
];

// Componente funcional que recebe props para controlar filtros
export default function FiltroDespesas({
  tipoSelecionado,       // tipo da despesa selecionada ('' | 'fixa' | 'variavel')
  categoriaSelecionada,  // categoria atualmente selecionada
  aoMudarCategoria,      // função para atualizar a categoria selecionada
  aoMudarTipo,           // função para atualizar o tipo de despesa
}) {
  return (
    <div>
      {/* Grupo de botões de opção (radio) para o tipo da despesa */}
      <FormControl component="fieldset" style={{ marginBottom: 16 }}>
        <RadioGroup
          row
          name="tipo-despesa"
          value={tipoSelecionado}
          onChange={(e) => aoMudarTipo(e.target.value)} // Atualiza tipo quando o usuário muda
        >
          {/* Opções disponíveis */}
          <FormControlLabel value="" control={<Radio />} label="Todos" />
          <FormControlLabel value="fixa" control={<Radio />} label="Fixa" />
          <FormControlLabel value="variavel" control={<Radio />} label="Variável" />
        </RadioGroup>
      </FormControl>

      {/* Se o tipo selecionado for "variável", exibe o filtro por categoria */}
      {tipoSelecionado === "variavel" && (
        <FormControl>
          {/* Select dropdown para escolher categoria */}
          <select
            id="categoria-select"
            value={categoriaSelecionada}
            onChange={(e) => aoMudarCategoria(e.target.value)} // Atualiza categoria
          >
            {/* Opção padrão para mostrar todas */}
            <option value="">Todas as Categorias</option>

            {/* Mapeia e cria opções para cada categoria da lista */}
            {categorias.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </FormControl>
      )}
    </div>
  );
}
