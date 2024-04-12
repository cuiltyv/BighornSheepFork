import { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';

interface Reservation {
  ReservacionID: number;
  Matricula: string;
  HoraInicio: string;
  HoraFin: string;
  Proposito: string;
  Estado: string;
}

// PENDIENTE: DECIDIR QUE HACER CON LAS RESERVACIONES QUE SALEN EN PENDIENTE

const RecentReservations = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get('https://dreamapi.azurewebsites.net/reservaciones');
        setReservations(response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  const handleEdit = (reservacionID: number) => {
    // FALTA LOGICA DE EDIT, YA ESTA EN EL API PERO NO LO HE METIDO
    console.log('Editing reservation with ID:', reservacionID);
  };

  const handleDelete = (reservacionID: number) => {
    // FALTA LOGICA DE DELETE, YA ESTA EN EL API PERO NO LO HE METIDO
    console.log('Deleting reservation with ID:', reservacionID);
  };

  return (
    <div className="mt-4 mx-2 p-4 bg-white rounded shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Reservaciones recientes</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left font-medium">ID</th>
              <th className="text-left font-medium">Matricula</th>
              <th className="text-left font-medium">Hora Inicio</th>
              <th className="text-left font-medium">Hora Fin</th>
              <th className="text-left font-medium">Proposito</th>
              <th className="text-left font-medium">Estado</th>
              <th className="text-left font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res.ReservacionID} className="text-sm">
                <td>{res.ReservacionID}</td>
                <td>{res.Matricula}</td>
                <td>{new Date(res.HoraInicio).toLocaleString()}</td>
                <td>{new Date(res.HoraFin).toLocaleString()}</td>
                <td>{res.Proposito}</td>
                <td>{res.Estado}</td>
                <td>
                  <button
                    onClick={() => handleEdit(res.ReservacionID)}
                    className="p-1 m-1 text-blue-500 hover:text-blue-700"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(res.ReservacionID)}
                    className="p-1 m-1 text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentReservations;