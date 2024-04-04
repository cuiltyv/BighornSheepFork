export default function Caracteristicas() {
  return (
    <div className="flex flex-col justify-between bg-violet px-4 py-10 text-white md:flex-row md:px-32">
      <div className="md-mb-0 mb-4 flex w-full flex-col gap-3 md:w-56">
        <h3 className="font-xl font-serif">Laboratorios y talleres</h3>
        <p>
          Podrás hacer uso de laboratorios, talleres y todo el equipo dentro de
          ellos.
        </p>
      </div>
      <div className="md:h-100% hidden bg-gold md:block md:w-px" />
      <div className="md-mb-0 mb-4 flex w-full flex-col gap-3 md:w-56">
        <h3 className="font-xl font-serif">Tecnología</h3>
        <p>
          Usa los equipos de VR, AR, redes, hardware, equipos Windows, Mac,
          Linux, entre otros.
        </p>
      </div>
      <div className="md:h-100% hidden bg-gold md:block md:w-px" />
      <div className="md-mb-0 mb-4 flex w-full flex-col gap-3 md:w-56">
        <h3 className="font-xl font-serif">Eventos y actividades</h3>
        <p>
          Entérate de los próximos eventos organizados por estudiantes,
          profesores, y staff del D.R.E.A.M. Lab.
        </p>
      </div>
    </div>
  );
}
