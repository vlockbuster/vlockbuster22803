import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";

// estado del usuario
function user() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const logueado = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
    return () => {
      logueado();
    };
  }, []);

  const desloguear = async () => {
    try {
      await signOut(auth);
      console.log("deslogueado ok");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      {authUser ? (
        <>
          <p>{`logueado ${authUser.email}`}</p>
          <button onClick={desloguear}>Log Out</button>
        </>
      ) : (
        <p>Deslogueado</p>
      )}
    </div>
  );
}

export default user;
