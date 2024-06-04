import json
from langchain.tools import StructuredTool
from utils.api_helper import get_upcoming_reservations
from models.ReservationRequest import Alumno


def getUpcomingReservations(**kwargs) -> str:
    try:
        # Create an instance of Almuno from the passed keyword arguments
        alumno_data = Alumno(**kwargs)
        data = alumno_data.json() # convert to string
        data = json.loads(data)
        matricula = data.get("Matricula")
        
        response = get_upcoming_reservations(matricula)
        
        if response.status_code == 201:
            return f"FINAL ANSWER: Succesfully found the user. Here you can find the server response with all of the upcoming reservations, remember to answer in a extremly UX friendly format, as if to a millenial grandma: {response.content}"
        elif response.status_code == 500:
            return f"FINAL ANSWER: Server error or connectivity problem with the database. Server Response: {response.content}"
        elif response.status_code == 400:
            return f"FINAL ANSWER: Missing required fields. Server Response: {response.content}"
        else:
            return f"FINAL ANSWER: Failed to find the user. Error: {response.status_code}"
    except Exception as e:
        return f"An error occurred: {str(e)}"


# Now we create the StructuredTool from the function we've defined.
GetUpcomingReservations = StructuredTool.from_function(
    func=getUpcomingReservations,
    name="getUpcomingReservations",
    description="Get the upcomming reservation from a specific Matricula (AKA userID), always reference userID as Matricula",
    args_schema=Alumno,  # Assuming Alumno is a Pydantic BaseModel
)

