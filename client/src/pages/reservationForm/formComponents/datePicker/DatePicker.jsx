import Calendar from "./Calendar.jsx";
import HoraInicio from "./HoraInicio.jsx";
import HoraFinal from "./HoraFinal.jsx";
import { useState, useEffect } from "react";

function DatePicker(props) {
  const onHoraInicioSeleccionadaChange = (hora, minute) => {
    props.setHoraInicio(parseInt(hora));
    props.setMinutoInicio(parseInt(minute));
  };

  const onHoraFinalSeleccionadaChange = (hora, minute) => {
    props.setHoraFinal(parseInt(hora));
    props.setMinutoFinal(parseInt(minute));
  };

  const handleDiaSeleccionadoChange = (dia) => {
    props.setDiaSeleccionado(dia);
  };

  const [error, setError] = useState("");

  useEffect(() => {
    //console.log(typeof props.horaInicio, typeof props.horaFinal);
    console.log("inicio: ", props.horaInicio, "final: ", props.horaFinal);
    /*
    console.log(
      "inicio: ",
      props.horaInicio.constructor.name,
      "final: ",
      props.horaFinal.constructor.name,
    );
*/
    if (props.horaFinal <= props.horaInicio)
      setError("Escoge una hora válida.");
    else setError("");
  }, [props.horaInicio, props.horaFinal]);

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
          {error && <p className="mt-2 w-full text-xs text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default DatePicker;
