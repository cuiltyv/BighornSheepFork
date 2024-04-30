from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from tools.ReservationRequest import ReservationRequest_format, ReservationRequest
import datetime
from utils.setup_llm import llm

# Define the custom prompt for the schema

system_message = '''
You are an AI Reservation Agent Interpreter, you will receive a JSON object with a reservation request and you will have to parse it into a structured object, remember that 
the details of the reservation are in spanish, .md format is forbidden:
Context:
"TimeNow": {timenow}
{format_instructions}

Reservation Request:
{text}
'''


prompt = ChatPromptTemplate.from_template(
    template=system_message,
    partial_variables = {
        "format_instructions": ReservationRequest_format,
        "timenow": datetime.datetime.now().isoformat()
    }
)


def json_agent(input_string):
    full_chain = {"text": lambda x: x["text"]} | prompt | llm
    result = full_chain.invoke({"text": input_string})
    return result.content

