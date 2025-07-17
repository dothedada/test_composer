import { useEffect, useRef, useState } from "react";
import { fetcher } from "./fetcher";

export function UserBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("journal");
    if (!userData) {
      return;
    }

    fetcher({
      url: `http://localhost:8080/api/logged`,
      method: "POST",
      body: { username: userData },
    })
      .then((response) => {
        setUser(response);
      })
      .catch(() => setLogged(false));
  }, []);

  return (
    <>
      <LoginForm />
      {user}
      <button type="button">Crear usuario</button>
    </>
  );
}

function LoginForm() {
  const password = useRef(null);
  const email = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await fetcher({
      url: `http://localhost:8080/api/login`,
      method: "POST",
      body: { email: email.current.value, password: password.current.value },
    });

    console.log("res:", data);
    localStorage.setItem("journal", data.token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre de usuario
        <input type="email" name="email" ref={email} required />
      </label>
      <label>
        Contraseña
        <input type="password" name="password" ref={password} required />
      </label>
      <button>Ingresar</button>
    </form>
  );
}
