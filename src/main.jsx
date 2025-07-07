import React from "react"; // Importa a biblioteca React para usar JSX e componentes React
import ReactDOM from "react-dom/client"; // Importa o ReactDOM para manipular o DOM no navegador
import App from "./App"; // Importa o componente principal App

// Cria a raiz da aplicação React dentro do elemento HTML com id "root"
ReactDOM.createRoot(document.getElementById("root")).render(
  // React.StrictMode ajuda a identificar problemas no aplicativo durante o desenvolvimento
  <React.StrictMode>
    <App /> {/* Renderiza o componente App dentro do StrictMode */}
  </React.StrictMode>
);
