import React, { useState } from "react";
import { PencilIcon } from "@heroicons/react/solid";
import { idToSalasMap } from "./interfaces/constants";

const EditReservationModal = ({
  isOpen,
  closeModal,
  reservation,
  updateReservation,
}) => {
  const [formData, setFormData] = useState({ ...reservation });

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateReservation(formData);
    closeModal();
  };

  if (!isOpen) {
    return null;
  }

  //console.log(formData);
  function toLocalDateTimeString(isoString) {
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().slice(0, 16); //Cortar Z
  }

  const horaInicioLocal = toLocalDateTimeString(formData.HoraInicio);
  const horaFinLocal = toLocalDateTimeString(formData.HoraFin);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={closeModal}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Editar Reservacion
          </h3>
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hora Inicio:
              </label>
              <input
                type="datetime-local"
                name="HoraInicio"
                value={horaInicioLocal}
                onChange={handleChange}
                className="mt-1 w-full rounded border border-gray-300 p-2 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hora Fin:
              </label>
              <input
                type="datetime-local"
                name="HoraFin"
                value={horaFinLocal}
                onChange={handleChange}
                className="mt-1 w-full rounded border border-gray-300 p-2 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Propósito:
              </label>
              <input
                type="text"
                name="Proposito"
                value={formData.Proposito}
                onChange={handleChange}
                className="mt-1 w-full rounded border border-gray-300 p-2 shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Cuarto
              </label>
              <select
                name="ZonaID"
                value={formData.ZonaID}
                onChange={handleChange}
                className="mt-1 w-full rounded border border-gray-300 p-2 shadow-sm"
              >
                {Object.entries(idToSalasMap).map(([id, sala]) => (
                  <option key={id} value={id}>
                    {sala}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Estado:
              </label>
              <select
                name="Estado"
                value={formData.Estado}
                onChange={handleChange}
                className="mt-1 w-full rounded border border-gray-300 p-2 shadow-sm"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Cancelado">Cancelado</option>
                <option value="Completado">Completado</option>
              </select>
            </div>
            <div className="flex justify-between space-x-2">
              <button
                type="button"
                onClick={closeModal}
                className="rounded bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded bg-green-500 px-4 py-2 font-medium text-white hover:bg-green-700"
              >
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditReservationModal;
