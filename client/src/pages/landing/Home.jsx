import Hero from "./Hero";
import Caracteristicas from "./Caracteristicas";
import Salas from "./Salas";
import PreFooter from "./PreFooter";
import Footer from "./Footer";
import { Element } from "react-scroll";
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
      <PreFooter />
      <Footer />
      <FloatingWhatsApp
        phoneNumber="+528119001483"
        accountName="Wall-E"
        avatar={avatar}
        chatMessage="¡Bienvenido al DREAM Lab! Te gustaría hacer una reservacion?"
      />
    </div>
  );
}
