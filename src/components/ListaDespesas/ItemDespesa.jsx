import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import "./ItemDespesa.css";

export default function ItemDespesa({ despesa, aoEditar, aoExcluir }) {
  const [modoEdicao, setModoEdicao] = useState(false);
  const [form, setForm] = useState({ ...despesa });

  const handleSalvar = () => {
    aoEditar(form);
    setModoEdicao(false);
  };

  const handleCancelar = () => {
    setForm({ ...despesa });
    setModoEdicao(false);
  };

  const inputStyle = { marginBottom: 8, display: "block", width: "100%" };

  return (
    <li
    >
      {modoEdicao ? (
        <>
          <input
            type="text"
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
            placeholder="Descrição"
            style={inputStyle}
          />
          <input
            type="number"
            value={form.valor}
            onChange={(e) =>
              setForm({ ...form, valor: parseFloat(e.target.value) || 0 })
            }
            placeholder="Valor"
            style={inputStyle}
          />
          <input
            type="date"
            value={form.data}
            onChange={(e) => setForm({ ...form, data: e.target.value })}
            style={inputStyle}
          />
          <select
            value={form.categoria}
            onChange={(e) => setForm({ ...form, categoria: e.target.value })}
            style={inputStyle}
          >
            <option value="">Selecione Categoria</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Transporte">Transporte</option>
            <option value="Educação">Educação</option>
          </select>
          <select
            value={form.tipo}
            onChange={(e) => setForm({ ...form, tipo: e.target.value })}
            style={inputStyle}
          >
            <option value="">Selecione Tipo</option>
            <option value="Fixa">Fixa</option>
            <option value="Variável">Variável</option>
          </select>
          <button onClick={handleSalvar} style={{ marginRight: 8 }}>
            Salvar
          </button>
          <button onClick={handleCancelar}>Cancelar</button>
        </>
      ) : (
        <>
          <strong>{despesa.descricao}</strong>
          <p>
            R$ {despesa.valor.toFixed(2)} — {despesa.categoria} — {despesa.tipo}
          </p>
          <p>{despesa.data}</p>
          <button onClick={() => setModoEdicao(true)} style={{ marginRight: 8 }}>
            Editar
          </button>
          <IconButton aria-label="delete" onClick={aoExcluir} color="error">
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </li>
  );
}
