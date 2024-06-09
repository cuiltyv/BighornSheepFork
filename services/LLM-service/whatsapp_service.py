from fastapi import FastAPI, Form, Depends, Request
import logging
import os
from twilio.rest import Client
from dotenv import load_dotenv
from utils.whatsapp_utils import llm_response as llm


# Load environment variables from .env file
load_dotenv()

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.getenv("TWILIO_ACCOUNT_SID")
auth_token = os.getenv("TWILIO_AUTH_TOKEN")
client = Client(account_sid, auth_token)
twilio_number = os.getenv('TWILIO_NUMBER')

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("whatsapp_service")

app = FastAPI()

def send_message(to_number, body_text):
    try:
        message = client.messages.create(
            from_=f"whatsapp:{twilio_number}",
            body=body_text,
            to=f"whatsapp:{to_number}"
            )
        logger.info(f"Message sent to {to_number}: {message.body}")
    except Exception as e:
        logger.error(f"Error sending message to {to_number}: {e}")


@app.post("/message")
async def reply(request: Request):
    form_data = await request.form()
    logger.info(f"Received form data: {form_data}")
    print("got conversation")

    # Check if 'Author' and 'Body' keys exist in form_data
    if 'Author' not in form_data or 'Body' not in form_data:
        logger.error("Key 'Author' or 'Body' not found in form data")
        return {"error": "Key 'Author' or 'Body' not found in form data"}

    whatsapp_number = form_data['Author'].split("whatsapp:")[-1]
    message_body = form_data['Body']
    
    # langchain_response = llm(message_body)

    # Your logic to handle the incoming message
    response_text = llm(whatsapp_number, message_body)
    send_message(whatsapp_number, response_text)
    
    return ""

