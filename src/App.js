import './App.css';
import NavBar from './componentes/navbar';
import React from 'react';
import Login from "./componentes/auth/login";
import CrearUser from "./componentes/auth/crearUser";
import User from "./componentes/auth/user";
import MasVistas from "./componentes/peliculas/masvistas";
import MiLista from "./componentes/peliculas/miLista";


const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <br />
        <br />
        <br />
        <br />
        <br />
        <CrearUser />
        <br />
        <Login />
        <br />
        <User />
        <br />
        <MiLista />
        <br />
        <MasVistas />

      </header>
    </div>
  );
}

export default App;
