import Calendar from "./Calendar.jsx";
import HoraInicio from "./HoraInicio.jsx";
import HoraFinal from "./HoraFinal.jsx";

function DatePicker(props) {
  const onHoraInicioSeleccionadaChange = (hora, minute, period) => {
    props.setHoraInicio(hora);
    props.setMinutoInicio(minute);
    props.setPeriodoInicio(period);
  };

  const onHoraFinalSeleccionadaChange = (hora, minute, period) => {
    props.setHoraFinal(hora);
    props.setMinutoFinal(minute);
    props.setPeriodoFinal(period);
  };

  const handleDiaSeleccionadoChange = (dia) => {
    props.setDiaSeleccionado(dia);
  };

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
        </div>
      </div>
    </div>
  );
}

export default DatePicker;
