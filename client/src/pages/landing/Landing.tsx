import Hero from "./Hero";
import Caracteristicas from "./Caracteristicas";
import Salas from "./Salas";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";

export default function Landing() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/linkpage");
  };

  return (
    <div>
      <Hero />
      <Caracteristicas />
      <Salas />
      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
    </div>
  );
}
