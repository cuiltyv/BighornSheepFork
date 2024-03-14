import os
import json
import flask
from flask import send_from_directory, request
import requests


creds = ('cred.json')

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
def whatsapp():
    print(request.get_data())
    message = request.form['Body']
    senderId = request.form['From'].split('+')[1]
    print(f'Message --> {message}')
    print(f'Sender id --> {senderId}')


    #response_text = dialogflow_response['response']['queryResult']['fulfillmentText']
    print(f'Response text --> {message}')

    append_to_transcript(senderId, message)
    
    res = sendMessage(senderId=senderId, message="mensaje guardado")
    print(f'This is the response --> {res}')
    return '200'


""" def send_to_dialogflow_cx(message):
    # Construct the request to Dialogflow CX

    with open(creds, 'r') as f:
        credentials = json.load(f)

    dialogflow_cx_endpoint = 'https://dialogflow.googleapis.com/v3/projects/ordinal-brace-416801/locations/global/agents/d180d9d7-288a-4c2e-a8b9-19bcea1527ba/sessions/id1:detectIntent'
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {credentials["token_uri"]}'
    }
    data = {
        'queryInput': {
            'text': {
                'text': message,
                'languageCode': 'es'
            }
        }
    }
    
    response = requests.post(dialogflow_cx_endpoint, json=data, headers=headers)
    return response.json() """

def append_to_transcript(sender, message):
    transcript_folder = "transcripts"
    if not os.path.exists(transcript_folder):
        os.makedirs(transcript_folder)
    filename = os.path.join(transcript_folder, f"transcript{sender.capitalize()}.txt")
    with open(filename, "a") as file:
        file.write(message + "\n")


if __name__ == "__main__":
    app.run(port=5000, debug=True)