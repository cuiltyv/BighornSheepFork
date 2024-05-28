import Calendar from "./Calendar.jsx";
import HoraInicio from "./HoraInicio.jsx";
import HoraFinal from "./HoraFinal.jsx";
import { useState } from "react";

function DatePicker(props) {
  const onHoraInicioSeleccionadaChange = (hora, minute) => {
    props.setHoraInicio(hora);
    props.setMinutoInicio(minute);
  };

  const onHoraFinalSeleccionadaChange = (hora, minute) => {
    props.setHoraFinal(hora);
    props.setMinutoFinal(minute);

    if (props.horaFinal <= props.horaInicio)
      setError("Escoge una hora válida.");
  };

  const handleDiaSeleccionadoChange = (dia) => {
    props.setDiaSeleccionado(dia);
  };

  const [error, setError] = useState("");

  return (
    <div>
      <div className="flex flex-row gap-20">
        <Calendar onDiaSeleccionadoChange={handleDiaSeleccionadoChange} />
        <div className="flex flex-col gap-8">
          <HoraInicio
            onHoraInicioSeleccionadaChange={onHoraInicioSeleccionadaChange}
          />
          <HoraFinal
            onHoraFinalSeleccionadaChange={onHoraFinalSeleccionadaChange}
          />
          {error && <p className="mt-2 w-56 text-xs text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default DatePicker;
