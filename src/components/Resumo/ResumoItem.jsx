import React, { useState, useEffect } from "react"
import "./ResumoItem.css"

export default function ResumoItem({ titulo, valor }) {
  const [cotacao, setCotacao] = useState(5.5) 

  useEffect(() => {
    fetch("https://brasilapi.com.br/api/exchange-rates/v1/USD-BRL")
      .then(response => response.json())
      .then(data => {
        if (data && data.bid) {
          setCotacao(data.bid)
        }
      })
  }, [])

  const valorEmDolar = (valor / cotacao).toFixed(2)

  return (
    <div className="ResumoItem">
      <h4>{titulo}</h4>
      <p>R$ {valor.toFixed(2)} | $ {valorEmDolar}</p>
    </div>
  )
}