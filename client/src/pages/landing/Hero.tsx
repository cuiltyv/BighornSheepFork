import ButtonFilled from "../../components/ButtonFilled";
import ButtonEmpty from "../../components/ButtonEmpty";

export default function Hero() {
  return (
    <div className="flex flex-col bg-darkWhite md:flex-row">
      <div className="flex h-[800px] items-center justify-center bg-blue md:w-7/12">
        <img
          src="https://cdn.labmanager.com/assets/articleNo/2561/iImg/5457/70f4ae1d-74c7-4263-b2ef-3e3f881838c9-dec17-tech-laboftomorrow-640x360.jpg"
          alt=""
          className="my- mx-auto"
        />
      </div>
      <div className="flex w-full flex-col gap-6 px-4 py-4 md:w-5/12 md:px-16 md:py-0">
        <h2 className="font-serif text-3xl font-medium md:text-4xl">
          Atrévete a soñar con el
        </h2>
        <h1 className="font-serif text-5xl text-blue md:text-6xl xl:text-8xl">
          D.R.E.A.M. Lab
        </h1>
        <p className="font-medium">
          El Laboratorio D.R.E.A.M (Desarrollo, Recursos, Experimentación,
          Avance y Modelado) del Tecnológico de Monterrey promete ser un
          epicentro de innovación y estudio, abriendo sus puertas a estudiantes
          y profesores para la reserva de equipos y espacios especializados.
          Orientado a una diversidad de proyectos, desde la realidad virtual
          hasta la computación avanzada, este laboratorio busca impulsar la
          investigación y el desarrollo tecnológico en un ambiente colaborativo.
        </p>
        <p>
          Equipado con la tecnología más avanzada, incluyendo simuladores de
          alta fidelidad y estaciones de trabajo para modelado 3D, el D.R.E.A.M
          Lab facilitará el avance académico y profesional de su comunidad. La
          integración de estas herramientas avanzadas permitirá a los usuarios
          del Tec de Monterrey superar los límites tradicionales de su
          aprendizaje y exploración, fomentando soluciones innovadoras y un
          aprendizaje interdisciplinario para enfrentar los desafíos del mañana.
        </p>
        <div className="flex flex-col gap-6 md:flex-row">
          <ButtonFilled text="Reserva un espacio" />
          <ButtonEmpty text="Crea tu perfil" />
        </div>
      </div>
    </div>
  );
}
