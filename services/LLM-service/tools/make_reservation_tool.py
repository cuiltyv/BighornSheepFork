import json
from langchain.tools import StructuredTool
from utils.api_helper import post_api_reservation
from tools.ReservationRequest import ReservationRequest
import json


# This function will contain the logic that was previously in the _run method.
def make_reservation_function(**kwargs) -> str:
    try:
        # Create an instance of ReservationRequest from the passed keyword arguments

        reservation_data = ReservationRequest(**kwargs)
        data = reservation_data.json() # convert to string
        data = json.loads(data)
        response = post_api_reservation(data=data)
        
        if response.status_code == 201:
            return f"Reservation created successfully. Server Response: {response.content}"
        elif response.status_code == 500:
            return f"Server error or connectivity problem with the database. Server Response: {response.content}"
        elif response.status_code == 400:
            return f"Missing required fields. Server Response: {response.content}"
        else:
            return f"Failed to make reservation. Error: {response.status_code}"
    except Exception as e:
        return f"An error occurred: {str(e)}"


# Now we create the StructuredTool from the function we've defined.
MakeReservation = StructuredTool.from_function(
    func=make_reservation_function,
    name="MakeReservation",
    description="Create a reservation in the database, remember that the details of the reservation are in Spanish",
    args_schema=ReservationRequest,  # Assuming ReservationRequest is a Pydantic BaseModel
)

