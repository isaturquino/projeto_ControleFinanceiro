import React from "react";
import "./ResumoItem.css"

export default function ResumoItem({ titulo, valor, }) {

  return (
    <div className="ResumoItem">
      <h4>{titulo}</h4>
      <p>R$ {valor.toFixed(2)}</p>
    </div>
  );
}
