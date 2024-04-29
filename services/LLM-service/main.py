from dotenv import load_dotenv
from structured_output import json_agent
from setup_llm import setup_llm 



#load variables - OpenAI API key
load_dotenv()

# llm = setup_llm("gpt-4-turbo")
llm = setup_llm() 

#call function
test_message= '''
Hola, Soy Alberto Tamez, mi matricula es A01234567 y quiero reservar la sala New Horizons mañana a las 10 am por 2 horas para un proyecto de clase.
'''


print(json_agent(llm, test_message))
# Paso a seguir: Convertir el output en un objeto estructurado JSON
# PD ME gustaría algun tipo de Agent que vaya punto por punto verificando cada campo del objeto JSON.
# Mandar el json como cuerpo de un request POST a la API de Reservation Controller

# Verificar que se creao el objeto en la base de datos
