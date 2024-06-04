import json
from langchain.tools import StructuredTool
from utils.api_helper import post_api_reservation
from models.ReservationRequest import ReservationRequest


def make_reservation_function(**kwargs) -> str:
    try:
        # Create an instance of ReservationRequest from the passed keyword arguments

        reservation_data = ReservationRequest(**kwargs)
        data = reservation_data.json() # convert to string
        data = json.loads(data)
        data["Estado"] = "Confirmado"
        response = post_api_reservation(data=data)
        
        if response.status_code == 201:
            return f"FINAL ANSWER: Reservation created successfully, no need to create another one with the same details. Here you can find the server response, remember to answer in a extremly UX friendly format, as if to a millenial grandma: {response.content}"
        elif response.status_code == 500:
            return f"FINAL ANSWER: Server error or connectivity problem with the database. Here you can find the server response, remember to answer in a extremly UX friendly format, as if to a millenial grandma: {response.content}"
        elif response.status_code == 400:
            return f"FINAL ANSWER: Missing required fields. Here you can find the server response, remember to answer in a extremly UX friendly format, as if to a millenial grandma: {response.content}"
        elif response.status_code == 409:
            return f"FINAL ANSWER: There is an overlap with another reservation. Here you can find the server response, remember to answer in a extremly UX friendly format, as if to a millenial grandma: {response.content}"
        else:
            return f"Failed to make reservation. Here you can find the server response, remember to answer in a extremly UX friendly format, as if to a millenial grandma: {response.status_code}"
    except Exception as e:
        return f"An error occurred, Here you can find the server response, remember to answer in a extremly UX friendly format, as if to a millenial grandma: {str(e)}"


# Now we create the StructuredTool from the function we've defined.
MakeReservation = StructuredTool.from_function(
    func=make_reservation_function,
    name="MakeReservation",
    description="Create a reservation in the database, remember that the details of the reservation are in Spanish, remember to ask for the reservation details in a extremly UX friendly format, as if to a millenial grandma",
    args_schema=ReservationRequest,  # Assuming ReservationRequest is a Pydantic BaseModel
)

