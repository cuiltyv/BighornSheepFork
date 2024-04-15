import { useState, useEffect } from 'react';
import axios from 'axios';
import { PencilIcon, TrashIcon } from '@heroicons/react/solid';
import EditReservationModal from '../../components/EditReservationModal';

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
  const [isEditing, setIsEditing] = useState(false);
  const [currentReservation, setCurrentReservation] = useState(null);

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
    setCurrentReservation(reservations.find((res: Reservation) => res.ReservacionID === reservacionID));
    setIsEditing(true);
    console.log('Editing reservation with ID:', reservacionID);
  };

  const closeModal = () => {
    setIsEditing(false);
    setCurrentReservation(null);
  };

  const updateReservation = async (updatedData: Reservation) => {
    try {
      console.log('Updating reservation:', updatedData)
      const response = await axios.put(`https://dreamapi.azurewebsites.net/reservaciones/${updatedData.ReservacionID}`, updatedData);
      setReservations(reservations.map((res: Reservation) => res.ReservacionID === updatedData.ReservacionID ? { ...res, ...updatedData } : res));
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  //DECIDIR QUE HACER CON LAS FOREIGN KEY DE LAS TABLAS
  const handleDelete = async (reservacionID: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this reservation?');
    if (confirmDelete) {
      try {
        console.log('Deleting reservation with ID:', reservacionID);
        const response = await axios.delete(`https://dreamapi.azurewebsites.net/reservaciones/${reservacionID}`);
        console.log(response.data);
        setReservations(reservations.filter((res: Reservation) => res.ReservacionID !== reservacionID));
        alert('Reservation deleted successfully'); 
      } catch (error) {
        console.error('Error deleting reservation:', error);
        alert('There was an error deleting the reservation.'); 
      }
    }
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
            {reservations.map((res: Reservation) => (
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
      {currentReservation && (
        <EditReservationModal
          isOpen={isEditing}
          closeModal={closeModal}
          reservation={currentReservation}
          updateReservation={updateReservation}
        />
      )}
    </div>
  );
};

export default RecentReservations;
