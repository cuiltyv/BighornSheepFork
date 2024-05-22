import { useState, useEffect } from 'react';
import axios from "../api/axios";
import "../pages/reservaciones/styles/style.css";
import ReservationCard from '@/components/ReservationCard';
import { getSalas } from "../api/apihelper";

const RESERVACIONES_URL = '/reservaciones';


const ReservationShow = ({user, estado}) => {
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
        } catch (error) {
          console.error('Error fetching reservations:', error);
        } finally {
          setIsDataLoading(false);
        }
      };
  
      fetchReservations();
    }, [user]);
  
    useEffect(() => {
      const fetchSalas = async () => {
        try {
          const salasData = await getSalas();
          setSalas(salasData);
        } catch (error) {
          console.error('Error fetching salas:', error);
        }
      };
  
      fetchSalas();
    }, []);

    const solicitados = reservedRooms.filter(
    reservation => reservation.Estado === estado
    );

    return (
      <div className="mx-2 mt-4 p-4">
        {solicitados.length !== 0 ? (
        <h2 className="mx-5 text-2xl font-semibold">Revisa tus reservaciones con estado: {estado}</h2>
        ) : null}
        {isDataLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="scroll-container h-fit overflow-y-hidden">
            {solicitados.map((reservation, index) => (
              <ReservationCard
                key={index}
                reservacion={reservation}
                sala={salas.find(sala => sala?.SalaId === reservation.ZonaID)}
              />
            ))}
          </div>
        )}
      </div>
    );
}

export default ReservationShow;