import PeopleSelect from "./formComponents/PeopleSelect";
import ReservationReason from "./formComponents/ReservationReason";
import DeviceList from "./formComponents/deviceList/DeviceList";
import Comments from "./formComponents/Comments";
import DatePicker from "./formComponents/datePicker/DatePicker";

import "tailwindcss/tailwind.css";
import "./styles/Form.css";
import "./styles/styles.css";

function Form() {
  //estas constantes las voy a cambiar (se llamarán desde la api)
  const nombreSala = "PCB Factory";
  const imgSala = "src/pages/reservationForm/roomImages/PCB.jpg";
  const listaDeAparatos = [
    "Computadora",
    "Impresora 3D",
    "Cable USB-C",
    "Robot Pro",
    "Vision Pro",
    "IPad Pro",
    "Meta Quest 3",
    "Ray Ban x Meta",
  ];

  //pendiente
  const enviar = () => {
    alert("enviado");
  };

  const cancelar = () => {
    alert("cancelado");
  };

  return (
    <div className="flex justify-center bg-black">
      <div className="form-container my-5 w-fit overflow-auto rounded-xl">
        <img src={imgSala} className="h-72 w-full object-cover " />
        <div className="px-28 py-14 ">
          <h1 className="bh-text-blue ml-4 text-5xl font-bold">{nombreSala}</h1>
          <DatePicker />
          <PeopleSelect />
          <ReservationReason />
          <DeviceList aparatos={listaDeAparatos} />
          <Comments />
          <div className="mt-10 flex w-full justify-center gap-10">
            <button
              onClick={enviar}
              className="bh-bg-blue align-center flex justify-center self-center rounded-lg px-4 py-2 font-bold text-white"
            >
              Enviar
            </button>

            <button
              onClick={cancelar}
              className="bh-border-blue bh-text-blue align-center flex justify-center self-center rounded-lg border-2 px-4 py-2 font-bold"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
