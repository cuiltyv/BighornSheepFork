""" import os
import json
import flask
from flask import send_from_directory, request
import requests
from google.cloud import dialogflowcx_v3 as dialogflow_cx

SERVICE_ACCOUNT_JSON_FILE_PATH = 'cred.json'
DIALOGFLOW_CX_AGENT_ID = 'd180d9d7-288a-4c2e-a8b9-19bcea1527ba'
DIALOGFLOW_CX_AGENT_LOCATION = 'us-central1'

with open(SERVICE_ACCOUNT_JSON_FILE_PATH) as json_file:
    credentials = json.load(json_file)

# Extract necessary information
project_id = credentials['project_id']
location = DIALOGFLOW_CX_AGENT_LOCATION
agent_id = DIALOGFLOW_CX_AGENT_ID
language_code = 'es'

# Create client
client_options = {'api_endpoint': f'{location}-dialogflow.googleapis.com'}
client = dialogflow_cx.SessionsClient(client_options=client_options, credentials=credentials)


app = flask.Flask(__name__)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/favicon.png')

@app.route('/')
@app.route('/home')
def home():
    return "Hello World"

from helperfunction.waSendMessage import sendMessage

@app.route('/whatsapp', methods=['GET', 'POST'])
async def whatsapp():
    print(request.get_data())
    message = request.form['Body']
    senderId = request.form['From'].split('+')[1]
    print(f'Message --> {message}')
    print(f'Sender id --> {senderId}')


    #response_text = dialogflow_response['response']['queryResult']['fulfillmentText']
    print(f'Response text --> {message}')
    await detect_intent_text(message, senderId)

    append_to_transcript(senderId, message)


    
    res = sendMessage(senderId=senderId, message="mensaje guardado")
    print(f'This is the response --> {res}')
    return '200'



def append_to_transcript(sender, message):
    transcript_folder = "transcripts"
    if not os.path.exists(transcript_folder):
        os.makedirs(transcript_folder)
    filename = os.path.join(transcript_folder, f"transcript{sender.capitalize()}.txt")
    with open(filename, "a") as file:
        file.write(message + "\n")





async def detect_intent_text(query, session_id):
    try:
        session_path = client.session_path(project=project_id, location=location, agent=agent_id, session=session_id)
        text_input = dialogflow_cx.TextInput(text=query)
        query_input = dialogflow_cx.QueryInput(text=text_input, language_code=language_code)
        response = await client.detect_intent(
            request={"session": session_path, "query_input": query_input}
        )
        for message in response.query_result.response_messages:
            if message.text:
                print(f"Message --> {message.text.text[0]}")
                return {
                    "status": 1,
                    "response": message.text.text[0]
                }
        return {
            "status": 0,
            "response": "We are facing a technical issue at this time, please try after sometimes."
        }
    except Exception as error:
        print(f"Error at detect_intent_text -> {error}")
        return {
            "status": 0,
            "response": "We are facing a technical issue at this time, please try after sometimes."
        }







if __name__ == "__main__":
    app.run(port=5000, debug=True) """

import os
import json
import flask
from flask import send_from_directory, request
from google.cloud import dialogflowcx_v3 as dialogflow_cx
from twilio.twiml.messaging_response import MessagingResponse
from google.oauth2 import service_account

SERVICE_ACCOUNT_JSON_FILE_PATH = 'genuine-haiku-416823-5e70a6306a0b.json'

DIALOGFLOW_CX_AGENT_ID = '9ffc4e20-e011-494e-af55-43b043002ef6'
DIALOGFLOW_CX_AGENT_LOCATION = 'us-central1'
DIALOGFLOW_CX_PROJECT_ID = 'genuine-haiku-416823'

from helperfunction.waSendMessage import sendMessage



app = flask.Flask(__name__)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='images/favicon.png')

@app.route('/')
@app.route('/home')
def home():
    return "Hello World"

@app.route('/whatsapp', methods=['POST'])
def whatsapp():
    message = request.form['Body']
    senderId = request.form['From'].split('+')[1]
    print(f'Message --> {message}')
    print(f'Sender id --> {senderId}')

    response = detect_intent_text(message, 1)
    append_to_transcript(senderId, message)

    
    res = sendMessage(senderId=senderId, message=response)
    print(f'This is the response --> {res}')
    return '200'

  



def append_to_transcript(sender, message):
    transcript_folder = "transcripts"
    if not os.path.exists(transcript_folder):
        os.makedirs(transcript_folder)
    filename = os.path.join(transcript_folder, f"transcript{sender.capitalize()}.txt")
    with open(filename, "a") as file:
        file.write(message + "\n")

def detect_intent_text(query, session_id):
    client_options = {'api_endpoint': f'{DIALOGFLOW_CX_AGENT_LOCATION}-dialogflow.googleapis.com'}
   

    credentials = service_account.Credentials.from_service_account_file(SERVICE_ACCOUNT_JSON_FILE_PATH)
    session_client = dialogflow_cx.SessionsClient(client_options=client_options, credentials=credentials)
    session_path = session_client.session_path(DIALOGFLOW_CX_PROJECT_ID, DIALOGFLOW_CX_AGENT_LOCATION, DIALOGFLOW_CX_AGENT_ID, session_id)

    text_input = dialogflow_cx.TextInput(text=query)
    query_input = dialogflow_cx.QueryInput(text=text_input, language_code='es')

    response = session_client.detect_intent(
        request={"session": session_path, "query_input": query_input}
    )

    response_text = response.query_result.response_messages[0].text.text[0]
    return response_text
    

if __name__ == "__main__":
    app.run(port=5000, debug=True)
