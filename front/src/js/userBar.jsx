import { useEffect, useRef, useState } from "react";
import { fetcher } from "./fetcher";

export function UserBar({ user, setUser }) {
  const [activeForm, setActiveForm] = useState(1);

  useEffect(() => {
    const userData = localStorage.getItem("journal");
    if (!userData) {
      return;
    }

    fetcher({
      path: "/logged",
      method: "POST",
      body: { username: userData },
    })
      .then((response) => {
        const { username } = response;
        setUser(username);
      })
      .catch(() => setUser(null));
  }, [setUser]);

  const handleCloseSession = () => {
    localStorage.removeItem("journal");
    setUser(null);
  };

  const handleChangeForm = () => {
    setActiveForm((current) => current + 1);
  };

  return (
    <>
      {user ? (
        <>
          <div>Hola {user}</div>
          <button onClick={handleCloseSession} type="button">
            Cerrar sesión
          </button>
        </>
      ) : (
        <>
          {activeForm % 2 === 0 ? (
            <LoginForm updateLoginCallback={setUser} />
          ) : (
            <SignInForm updateLoginCallback={setUser} />
          )}

          <button type="button" onClick={handleChangeForm}>
            {activeForm % 2 === 0 ? "Crear usuario" : "ingresar con mi correo"}
          </button>
        </>
      )}
    </>
  );
}

function LoginForm({ updateLoginCallback }) {
  const password = useRef(null);
  const email = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await fetcher({
      path: `/login`,
      method: "POST",
      body: { email: email.current.value, password: password.current.value },
    });

    updateLoginCallback(data.username);
    localStorage.setItem("journal", data.token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Correo
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

function SignInForm({ updateLoginCallback }) {
  const password = useRef(null);
  const password_confirm = useRef(null);
  const username = useRef(null);
  const email = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = await fetcher({
      path: `/sign-up`,
      method: "POST",
      body: {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
        password_confirm: password_confirm.current.value,
      },
    });

    if (data.success) {
      updateLoginCallback(data.username);
    } else {
      console.log(data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre de usuario
        <input type="text" name="username" ref={username} required />
      </label>
      <label>
        Correo
        <input type="email" name="email" ref={email} required />
      </label>
      <label>
        Contraseña
        <input type="password" name="password" ref={password} required />
      </label>
      <label>
        Confirmar contraseña
        <input
          type="password"
          name="password_confirm"
          ref={password_confirm}
          required
        />
      </label>
      <button>Ingresar</button>
    </form>
  );
}
