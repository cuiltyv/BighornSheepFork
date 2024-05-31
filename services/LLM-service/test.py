# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ['TWILIO_ACCOUNT_SID']
auth_token = os.environ['TWILIO_AUTH_TOKEN']
client = Client(account_sid, auth_token)

message = client.messages \
                .create(
                     body="Join Earth's mightiest heroes. Like Kevin Bacon.",
                     from_='+14155238886',
                     to='+525520913464'
                 )

print(message.sid)




# from langchain.agents import AgentExecutor
# from agents.test_agent import reservation_agent_executor




# user_input = {
#     "text": "Hola, Soy Alberto Tamez, mi matricula es A01234567 y quiero reservar la sala New Horizons con sala id 1, mañana a las 10 am por 2 horas para un proyecto de clase."
# }




# response = reservation_agent_executor.invoke({"input": user_input})
# print(response["output"])  # This will either be a confirmation of the reservation or an error message


