import ButtonFilled from "../../components/ButtonFilled";
import ButtonEmpty from "../../components/ButtonEmpty";
import image from "../../assets/hero-image.png";

export default function Hero() {
  return (
    <div className="flex flex-col bg-darkWhite md:flex-row">
  <div className="flex h-auto md:h-[800px] items-center justify-center bg-blue md:w-7/12">
    <img src={image} alt="" className="h-auto max-h-full mx-auto my-auto w-auto md:max-w-none" />
  </div>
  <div className="flex w-full flex-col gap-6 px-4 py-4 md:w-5/12 md:px-16 md:py-0">
    <h2 className="text-2xl font-serif font-medium md:text-3xl lg:text-4xl">
      Atrévete a soñar con el
    </h2>
    <h1 className="text-4xl font-serif text-blue md:text-5xl lg:text-6xl xl:text-8xl">
      D.R.E.A.M. Lab
    </h1>
    <p className="text-sm md:text-base lg:text-lg font-medium">
      El Laboratorio D.R.E.A.M (Desarrollo, Recursos, Experimentación,
      Avance y Modelado) del Tecnológico de Monterrey promete ser un
      epicentro de innovación y estudio, abriendo sus puertas a estudiantes
      y profesores para la reserva de equipos y espacios especializados.
      Orientado a una diversidad de proyectos, desde la realidad virtual
      hasta la computación avanzada, este laboratorio busca impulsar la
      investigación y el desarrollo tecnológico en un ambiente colaborativo.
    </p>
    
    <div className="flex flex-col gap-6 md:flex-row">
      <ButtonFilled text="Reserva un espacio" />
      <ButtonEmpty text="Crea tu perfil" />
    </div>
  </div>
</div>

  );
}
