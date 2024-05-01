from langchain.agents import AgentExecutor
from agents.reservation_agent import reservation_agent_executor



user_input = {
    "text": '''
    Hola, Soy Alberto Tamez, mi matricula es A01234567 y quiero reservar la sala New Horizons con sala id 1, mañana a las 10 am por 2 horas para un proyecto de clase.
    '''
}


response = reservation_agent_executor.invoke({"input": user_input})
print(response["output"])  # This will either be a confirmation of the reservation or an error message


