import React, { useState } from 'react';
import { PencilIcon } from '@heroicons/react/solid';

const EditReservationModal = ({ isOpen, closeModal, reservation, updateReservation }) => {
  const [formData, setFormData] = useState({ ...reservation });

  const handleChange = (e) => {
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

  function toLocalDateTimeString(isoString) {
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().slice(0, 16); //Cortar Z
  }
  
  
  const horaInicioLocal = toLocalDateTimeString(formData.HoraInicio);
  const horaFinLocal = toLocalDateTimeString(formData.HoraFin);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden">
        <div className="p-5">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Edit Reservation</h3>
          <form onSubmit={handleSubmit} className="space-y-4 mt-5">
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Hora Inicio:</label>
              <input type="datetime-local" name="HoraInicio" value={horaInicioLocal} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded shadow-sm w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hora Fin:</label>
              <input type="datetime-local" name="HoraFin" value={horaFinLocal} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded shadow-sm w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Propósito:</label>
              <input type="text" name="Proposito" value={formData.Proposito} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded shadow-sm w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Estado:</label>
              <select name="Estado" value={formData.Estado} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded shadow-sm w-full">
                <option value="Pendiente">Pendiente</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Cancelado">Cancelado</option>
              </select>
            </div>
            <div className="flex justify-between space-x-2">
              <button type="button" onClick={closeModal} className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded">
                Cancel
              </button>
              <button type="submit" className="bg-green-500 hover:bg-blue-700 text-green font-medium py-2 px-4 rounded">
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
