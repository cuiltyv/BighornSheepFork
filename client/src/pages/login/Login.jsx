import { useRef, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Login.css";
import "./Register.css";
import axios from "../../api/axios";
import Loading from "../../components/Loading";

const LOGIN_URL = "usuarios/auth";

const USER_REGEX = /^[AaLl][0-9]{8}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/usuarios/registro";

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

  const [userR, setUserR] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwdR, setPwdR] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwdR, setMatchPwdR] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  useEffect(() => {
    setValidName(USER_REGEX.test(userR));
  }, [userR]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwdR));
    setValidMatch(pwdR === matchPwdR);
  }, [pwdR, matchPwdR]);

  useEffect(() => {
    setErrMsg("");
  }, [userR, pwdR, matchPwdR]);

  const handleSubmitR = async (e) => {
    e.preventDefault();
    setLoading(true);
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(userR);
    const v2 = PWD_REGEX.test(pwdR);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    let capitalizedStr = userR.charAt(0).toUpperCase() + userR.slice(1);
    setUserR(capitalizedStr);

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ Matricula: userR, Contrasena: pwdR }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      console.log(response?.data);
      console.log(response?.accessToken);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this

      await loginAfterRegister(userR, pwdR); // Call handleSubmit after registration is successful

      setUserR("");
      setPwdR("");
      setMatchPwdR("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Fallo en el servidor");
      } else if (err.response?.status === 500) {
        setErrMsg("Usuario ya existe.");
      } else {
        setErrMsg("Fallo en el registro. Intente de nuevo.");
        console.error(err);
      }
      errRef.current.focus();
    } finally {
      setLoading(false); // Set loading to false when request completes (whether success or error)
    }
  };

  const loginAfterRegister = async (user, pwd) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the request starts

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
    } finally {
      setLoading(false); // Set loading to false when request completes (whether success or error)
    }
  };

  return (
    <>
      <div className="flex h-screen w-screen justify-center pb-20">
        <Tabs defaultValue="login" className="w-[400px]">
          {/* Render loading icon over the tabs if loading state is true */}
          {loading && (
            <div className="loading-icon-over-tabs">
              <div className="loading-icon">
                <Loading />
              </div>
            </div>
          )}
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="registro">Registro</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Bienvenido</CardTitle>
                <CardDescription>Iniciar Sesión</CardDescription>
                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* Replaced static content with dynamic user state content */}
                <div className="space-y-1">
                  <Label htmlFor="username">Matricula</Label>
                  <Input
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    disabled={loading}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSubmit} disabled={loading}>
                  Iniciar Sesión
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="registro">
            <Card>
              <CardHeader>
                <CardTitle>Bienvenido</CardTitle>
                <CardDescription>Registro para nuevo usuario</CardDescription>
                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">
                    Matricula
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validName ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={validName || !userR ? "hide" : "invalid"}
                    />
                  </Label>
                  <Input
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUserR(e.target.value)}
                    value={userR}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    disabled={loading}
                  />
                  <p
                    id="uidnote"
                    className={
                      userFocus && userR && !validName
                        ? "instructions"
                        : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    De 8 Caracteres.
                    <br />
                    Debe empezar con una A o L.
                    <br />
                    Ingresar una matricula valida.
                  </p>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">
                    Contraseña
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validPwd ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={validPwd || !pwdR ? "hide" : "invalid"}
                    />
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    onChange={(e) => setPwdR(e.target.value)}
                    value={pwdR}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    disabled={loading}
                  />
                  <p
                    id="pwdnote"
                    className={
                      pwdFocus && !validPwd ? "instructions" : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 to 24 characters.
                    <br />
                    Debe incluir al menos una letra mayúscula,
                    <br />
                    una letra minúscula, un número y un carácter
                    <br />
                    especial.
                    <br />
                    Caracteres especiales permitidos:{" "}
                    <span aria-label="exclamation mark">!</span>{" "}
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="dollar sign">$</span>{" "}
                    <span aria-label="percent">%</span>
                  </p>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="confirm_pwd">
                    Confirmar Contraseña
                    <FontAwesomeIcon
                      icon={faCheck}
                      className={validMatch && matchPwdR ? "valid" : "hide"}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className={validMatch || !matchPwdR ? "hide" : "invalid"}
                    />
                  </Label>
                  <Input
                    type="password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwdR(e.target.value)}
                    value={matchPwdR}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    disabled={loading}
                  />
                  <p
                    id="confirmnote"
                    className={
                      matchFocus && !validMatch ? "instructions" : "offscreen"
                    }
                  >
                    <FontAwesomeIcon icon={faInfoCircle} />
                    La contraseña debe coincidir.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={
                    loading || !validName || !validPwd || !validMatch
                      ? true
                      : false
                  }
                  onClick={handleSubmitR}
                >
                  Registrarse
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Login;
