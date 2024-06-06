import Hero from "./Hero";
import Caracteristicas from "./Caracteristicas";
import Salas from "./Salas";
import Contacto from "../../components/Contacto";
import { Element } from "react-scroll";
import AiCTA from "./AiCTA";

import { FloatingWhatsApp } from "react-floating-whatsapp";
import avatar from "./../../assets/avatar.jpg";

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
      <FloatingWhatsApp
        phoneNumber="+528119001483"
        accountName="Wall-E"
        avatar={avatar}
        chatMessage="¡Bienvenido al DREAM Lab! Te gustaría hacer una reservacion?"
      />
    </div>
  );
}
