import Hero from "./Hero";
import Caracteristicas from "./Caracteristicas";
import Salas from "./Salas";
import Contacto from "../../components/Contacto";
import { Element } from "react-scroll";
import AiCTA from "./AiCTA";

export default function Home() {
  return (
    <div>
      <Hero />
      <Caracteristicas />
      <Element name="salas" className="element">
        <Salas />
      </Element>
      <AiCTA />
      <Contacto />
    </div>
  );
}
