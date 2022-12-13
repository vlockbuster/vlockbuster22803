import React, { useRef } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

function crearUser() {
  const emailRef = useRef();
  const passwordRef = useRef();

  // creacion de usuario en firebase
  const crearUsuario = async (e) => {
    e.preventDefault();
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const docRef = doc(db, "usuarios", auth.currentUser.uid);
      const data = { uid: auth.currentUser.uid, authProvider: "local", email};
      await setDoc(docRef, data).then(() => {
        sendEmailVerification(auth.currentUser);
        Swal.fire(
          `En breve recibiras un email a ${email} para validar tu cuenta`
        );
      });
    } catch (error) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        Swal.fire(`El email ${email} ya esta en uso`);
      } else if (error.code === "auth/weak-password") {
        Swal.fire("El password debe contener un minimo de 6 caracteres");
      } else if (error.code) {
        Swal.fire("Un error a ocurrido");
      }
    }
  };
//  reset usuario
  const reset = async () => {
    const { value: email } = await Swal.fire({
      title: "Ingrese su email",
      input: "email",
      inputPlaceholder: "email",
    });

    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          Swal.fire(
            `En breve recibiras un email a ${email} para resetear tu password`
          );
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            Swal.fire(
              `En breve recibiras un email a ${email} para resetear tu password`
            );
          } else {
            console.log(error);
            Swal.fire(`Un error a ocurrido`);
          }
        });
    }
  };

  return (
    <div>
      Registrar Usuario
      <form onSubmit={crearUsuario}>
        <label htmlFor="email"></label>
        <input
          type="text"
          placeholder="Ingrese email"
          ref={emailRef}
          autoComplete="username"
          required
        />
        <label htmlFor="password"></label>
        <input
          type="password"
          placeholder="Ingrese password"
          autoComplete="current-password"
          ref={passwordRef}
          required
        />
        <button type="submit">Registrar Usuario</button>
      </form>
      <a onClick={reset} href="#">
        Olvide mi password
      </a>
    </div>
  );
}

export default crearUser;
