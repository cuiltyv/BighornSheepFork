from datetime import datetime
from typing import List, Optional
from langchain_core.pydantic_v1 import BaseModel, Field, validator
from langchain.output_parsers import PydanticOutputParser

def validate_matricula(cls, v):
    if len(v) != 9 or not (v[0] == 'A' or v[0] == 'L') or not v[1:].isdigit():
        raise ValueError("Matricula must be a string of length 9, start with 'A' or 'L', followed by 8 digits")
    return v

class Alumno(BaseModel):
    """Information about a student involved in the reservation."""
    Matricula: str = Field(default="A00000000", description="The student's unique identification number")
    Rol: str = Field(default="Lider", description="Only the user making the reservation should have the role 'Lider', otherwise leave blank")
    
    # @validator('Matricula' , allow_reuse=True)
    # def validate_matricula(cls, v):
    #     return validate_matricula(v)


class HardwareUnit(BaseModel):
    """Information about hardware required for the reservation."""
    
    HardwareID: Optional[int] = Field(default=None, description="The unique identifier for the hardware")
    Cantidad: Optional[int] = Field(default=None, description="The quantity of the hardware required")

class ReservationRequest(BaseModel):
    """Information about a Reservation Request."""

    Matricula: str = Field(..., description="The user's unique identification number making the reservation, referred to as 'Matricula' conversationally")
    ZonaID: int = Field(..., description="The unique identifier of the room to be reserved, referred to as 'ZonaID' conversationally") # Cambiar a SalaID When DB Update is done
    HoraInicio: datetime = Field(..., description="The start time for the reservation in ISO 8601 format, referred to as 'Start Time' conversationally")
    HoraFin: datetime = Field(..., description="The ending time for the reservation in ISO 8601 format,  referred to as 'End Time' conversationally")
    Proposito: str = Field(default="Proyecto Personal", description="The purpose of the reservation")
    Estado: str = Field(default="Confirmado", description="The current status of the reservation, should be 'Confirmado' by default")
    Alumnos: List[Alumno] = Field(default=[], description="The list of students involved in the reservation, including the user making the reservation")
    Hardware: List[HardwareUnit] = Field(default=[], description="The list of hardware required for the reservation, if no hardware is specified, place an empty array")



ReservationRequest_parser = PydanticOutputParser(pydantic_object=ReservationRequest)
# Crea un string que explica el formato que se debe seguir para la solicitud de reserva, basado en la calse reservationrequest
ReservationRequest_format = ReservationRequest_parser.get_format_instructions()

