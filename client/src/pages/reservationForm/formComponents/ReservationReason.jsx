function ReservationReason({ razonSeleccionada, setRazonSeleccionada }) {
  const reasons = [
    "Unidad de Formacion",
    "Exploracion personal",
    "Proyecto Personal",
    "Otro",
  ];

  const onChangeSelection = (event) => {
    setRazonSeleccionada(event.target.value);
  };

  return (
    <div className="mt-10">
      <h2 className="mb-2 text-xl font-bold">Razón de la reservación</h2>
      <select
        className="w-60 rounded-md bg-white py-2 text-xl text-black shadow-[0_5px_20px_-5px_rgba(0,0,0,0.3)]"
        onChange={onChangeSelection}
        value={razonSeleccionada}
      >
        {reasons.map((reason, index) => (
          <option key={index} value={reason} className="">
            {reason}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ReservationReason;
