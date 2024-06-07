import Hero from "./Hero";
import Caracteristicas from "./Caracteristicas";
import Salas from "./Salas";
import { Element } from "react-scroll";
import PreFooter from "./PreFooter";
import Footer from "./Footer";

export default function Landing() {
  return (
    <div>
      <Hero />
      <Caracteristicas />
      <Element name="salas" className="element">
        <Salas />
      </Element>
      <PreFooter />
      <Footer />
    </div>
  );
}
