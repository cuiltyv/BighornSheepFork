import { useState, useEffect } from 'react';
import axios from "../api/axios";
import "../pages/reservaciones/styles/style.css"
import ReservationCard from '@/components/ReservationCard';
import { getSalas } from "../api/apihelper";

const RESERVACIONES_URL = '/reservaciones';


const ReservationShow = ({user}) => {
    const [reservedRooms, setReservedRooms] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(true);
    const [salas, setSalas] = useState([]);
    
  
    useEffect(() => {
      const fetchReservations = async () => {
        try {
          const response = await axios.get(RESERVACIONES_URL);
          const userReservations = response.data.filter(
            res => res.Matricula === user?.matricula
          );
          setReservedRooms(userReservations);
          setIsDataLoading(false);
        } catch (error) {
          console.error('Error fetching reservations:', error);
          setIsDataLoading(false);
        }
      };
  
      fetchReservations();
    }, [user]);
  
    useEffect(() => {
      getSalas().then((salas) => {
        setSalas(salas);
      });
    }, []);
  
    return (
      <div className="mx-2 mt-4 p-4">
        {isDataLoading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {reservedRooms.map((reservation, index) => (
              <ReservationCard key={index} reservation={reservation} sala={salas.find(sala => sala?.SalaId === reservation.ZonaID)} />
            ))}
          </ul>
        )}
      </div>
    );
}

export default ReservationShow;