import { useEffect, useState } from "react";

type LoginProps = { onLoginSuccess: () => void };

function Login({ onLoginSuccess }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.body.classList.add("login-page");
    return () => document.body.classList.remove("login-page");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Login exitoso");
        onLoginSuccess();
      } else {
        setMessage(data.message);
      }
    } catch {
      setMessage("Error en el servidor");
    }
  };

  return (
    <div>
      <div className="background"></div>
      <div className="login-container">
        <h1>Bienvenido</h1>
        <p>Inicia sesión para continuar</p>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <i className="fa-regular fa-user"></i>
            <input
              type="email"
              placeholder="Usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            <i className="fa-solid fa-lock"></i>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="fa-regular fa-eye eye"></i>
          </div>
          <button type="submit">Iniciar sesión</button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Login;
