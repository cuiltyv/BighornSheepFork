const ViewReservationInfoModal = ({ isOpen, closeModal, reservation }) => {
  const [formData, setFormData] = useState({ ...reservation });

  if (!isOpen) {
    return null;
  }

  function toLocalDateTimeString(isoString) {
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().slice(0, 16); //Cortar Z
  }

  const horaInicioLocal = toLocalDateTimeString(formData.HoraInicio);
  const horaFinLocal = toLocalDateTimeString(formData.HoraFin);
};

export default ViewReservationInfoModal;
