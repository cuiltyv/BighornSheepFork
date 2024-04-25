export interface Reserva {
  Matricula: string;
  ZonaID: number;
  HoraInicio: string;
  HoraFin: string;
  Proposito: string;
  Estado: string;
  Alumnos: IAlumno[];
  Hardware: IHardware[];
  Comentario: string;
}

interface IAlumno {
  Matricula: number;
  ReservacionID: string;
  Apellido: string;
  Email: string;
}

interface IHardware {
  HardwareID: number;
  Cantidad: number;
}
