

function ReservationCard({reservation, sala}){
    const { Link, Nombre, Lugar } = sala;
    const { HoraInicio, HoraFin } = reservation;
    return(
        <div>
        <img src={`${Link}.png`} alt={`${Nombre} image`} />
        <h3>{Nombre}</h3>
        <p>{Lugar}</p>
        <p>{new Date(HoraInicio).toLocaleString()}</p>
        <p>{new Date(HoraFin).toLocaleString()}</p>
      </div>
    );
}
export default ReservationCard;