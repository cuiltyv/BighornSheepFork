import Hero from "./Hero";
import Caracteristicas from "./Caracteristicas";
import Salas from "./Salas";
import Contacto from "../../components/Contacto";
import { Element } from "react-scroll";

export default function Landing() {
  return (
    <div>
      <Hero />
      <Caracteristicas />
      <Element name="salas" className="element">
        <Salas />
      </Element>
      <Contacto />
    </div>
  );
}
