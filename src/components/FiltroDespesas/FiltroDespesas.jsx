import React from "react";
import "./FiltroDespesas.css";
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

const categorias = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Saúde",
  "Lazer",
  "Educação",
  "Outros",
];

export default function FiltroDespesas({
  tipoSelecionado,
  categoriaSelecionada,
  aoMudarCategoria,
  aoMudarTipo,
}) {
  return (
    <div>
      <FormControl component="fieldset" style={{ marginBottom: 16 }}>
        <RadioGroup
          row
          name="tipo-despesa"
          value={tipoSelecionado}
          onChange={(e) => aoMudarTipo(e.target.value)}
        >
          <FormControlLabel value="" control={<Radio />} label="Todos" />
          <FormControlLabel value="fixa" control={<Radio />} label="Fixa" />
          <FormControlLabel value="variavel" control={<Radio />} label="Variável" />
        </RadioGroup>
      </FormControl>

      {tipoSelecionado === "variavel" && (
        <FormControl>
          <select
            id="categoria-select"
            value={categoriaSelecionada}
            onChange={(e) => aoMudarCategoria(e.target.value)}
          >
            <option value="">Todas as Categorias</option>
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
