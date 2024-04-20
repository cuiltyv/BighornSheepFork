import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import "./Login.css";
import axios from "../../api/axios";

const LOGIN_URL = "usuarios/auth";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/BighornSheep/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let capitalizedStr = user.charAt(0).toUpperCase() + user.slice(1);
    setUser(capitalizedStr);

    try {

      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ Matricula: user, Contrasena: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      // console.log(JSON.stringify(response?.data)); // Porfavor agrega contexto a tus console log
      // console.log(JSON.stringify(response));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ user, pwd, roles, accessToken });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <div className="flex items-center justify-center bg-blue pb-64 md:bg-darkWhite">
        <div className="mt-10 flex items-center justify-center rounded-xl bg-blue py-20 md:w-[500px]">
          <section>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
            <h1 className="text-2xl font-extrabold">Iniciar Sesión</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              <button className="my-3 rounded bg-violet px-4 py-2 font-bold text-white opacity-90">
                Sign In
              </button>
            </form>
            <p>
              No tiene cuenta?
              <br />
              <span className="line">
                <Link to="/BighornSheep/register">Registro</Link>
              </span>
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default Login;
