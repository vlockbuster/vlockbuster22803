import React from 'react';

const NavBar = () => {

    return (
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
        <a class="navbar-brand" href="javascript:void(0)">
            <img src="popcorn.png" width={40}></img>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mynavbar">
        <ul class="navbar-nav me-auto">
            <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)">Peliculas</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)">Series</a>
            </li>
            <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)">Categorias</a>
            </li>
        </ul>
        <form class="d-flex">
            <input class="form-control me-2" type="text" placeholder="Buscar"/>
            <button class="btn btn-primary" type="button">Buscar</button>
        </form>
        </div>
    </div>
    </nav>
    )
}

export default NavBar;