import ButtonFilled from "./ButtonFilled";
import { Link } from "react-router-dom";

export default function SalaCard({
  sala,
}: {
  sala: {
    SalaId: string;
    Link: string;
    Nombre: string;
    Descripcion: string;
    Lugar: string;
    Cupo: string;
  };
}) {
  return (
    <div className="flex max-w-xs flex-col justify-between gap-2 rounded bg-white p-3">
      <img src={`${sala.Link}.png`} alt={sala.Nombre} className="h-60 w-60" />
      <div className="flex flex-row justify-between text-xs text-blue">
        <p className="overflow-hidden font-semibold">
          {sala.Descripcion.length > 25
            ? sala.Descripcion.substring(0, 25) + "..."
            : sala.Descripcion}
        </p>
        <p className="font-medium">{sala.Cupo} personas</p>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold">{sala.Nombre}</h3>
        <p className="text-xs font-medium">{sala.Lugar}</p>
      </div>
      <Link
        className=""
        to={`http://localhost:5173/BighornSheep/form/${sala.SalaId}`}
      >
        <ButtonFilled text="Reservar" />
      </Link>
    </div>
  );
}
