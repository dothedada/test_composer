import { useEffect, useRef, useState } from "react";
import { fetcher } from "./fetcher";

export function UserBar() {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("journal");

    console.log(userData);
    (async () => {
      const data = await fetcher({
        url: `http://localhost:8080/api/logged`,
        method: "POST",
        body: { username: userData },
      });

      console.log(data);
    })();
  }, []);
  return (
    <>
      <LoginForm />
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
