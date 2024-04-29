from datetime import datetime
from typing import List, Optional
from langchain_core.pydantic_v1 import BaseModel, Field
from langchain.output_parsers import PydanticOutputParser


class Alumno(BaseModel):
    """Information about a student involved in the reservation."""

    Matricula: str = Field(default="A00000000", description="The student's unique identification number")
    Rol: str = Field(default="Lider", description="Only the user making the reservation should have the role 'Lider'")

class HardwareUnit(BaseModel):
    """Information about hardware required for the reservation."""

    HardwareID: Optional[int] = Field(default=None, description="The unique identifier for the hardware")
    Cantidad: Optional[int] = Field(default=None, description="The quantity of the hardware required")

class ReservationRequest(BaseModel):
    """Information about a Reservation Request."""
    
    Matricula: str = Field(..., description="The user's unique identification number making the reservation")
    SalaID: int = Field(..., description="The unique identifier of the room to be reserved")
    HoraInicio: datetime = Field(..., description="The start time for the reservation in ISO 8601 format")
    HoraFin: datetime = Field(..., description="The ending time for the reservation in ISO 8601 format")
    Proposito: str = Field(default="Proyecto Personal", description="The purpose of the reservation")
    Estado: str = Field(default="Confirmado", description="The current status of the reservation")
    Alumnos: List[Alumno] = Field(default=[], description="The list of students involved in the reservation, including the user making the reservation")
    Hardware: List[HardwareUnit] = Field(default=[], description="The list of hardware required for the reservation")


ReservationRequest_parser = PydanticOutputParser(pydantic_object=ReservationRequest)


# Crea un string que explica el formato que se debe seguir para la solicitud de reserva, basado en la calse reservationrequest
ReservationRequest_format = ReservationRequest_parser.get_format_instructions()