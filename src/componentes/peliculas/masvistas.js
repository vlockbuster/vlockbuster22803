import React, { useState, useEffect } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Swal from "sweetalert2";


function masvistas() {
  const [pelis, setPelis] = useState([]);
  const [pagina, setPagina] = useState(1);
  const key = "e4e0f9c7c990f3921d36b5095affbe99";

  // fetch de api mas vistas
  const datos = async (pagina) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=es-ES&page=${pagina}`
    );
    const data = await response.json();
    setPelis((pelisActuales) => [...pelisActuales, ...data.results]);
    console.log(data);
  };

  useEffect(() => {
    datos(pagina);
  }, [pagina]);

  // ver mas
  const verMas = () => {
    setPagina((prevstate) => prevstate + 1);
  };

  const verDetalle = (e) => {
    let selDetalle = e.target.dataset.dato;
    console.log("detalle:", selDetalle);
  };

  // agregar a lista en firebase
  const agregarLista = async (e) => {
    let id = e.target.dataset.id;
    let poster_path = e.target.dataset.poster_path;
    console.log("lista:", id, poster_path);
    if (auth.currentUser) {
      let uid = auth.currentUser.uid;
      console.log(uid);
      const docRef = doc(db, "usuarios", uid);
      await updateDoc(docRef, {
        lista: arrayUnion({
          id,
          poster_path,
        }),
      });
    } else {
      Swal.fire("Por favor loguear para guardar");
    }
  };

  return (
    <>
      <div>
        <br />
        <h3>Mas Populares</h3>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
          {pelis.map((item, index) => (
            <div key={index} className="card">
              <img
                className="card-img-top"
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                data-dato={item.id}
                onClick={verDetalle}
                alt={item.original_title}
              />
              <button
                type="button"
                onClick={agregarLista}
                data-id={item.id}
                data-poster_path={item.poster_path}>
                + lista
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={verMas}
        disabled={pagina > 15 ? true : false}>
        Ver más
      </button>
    </>
  );
}

export default masvistas;
