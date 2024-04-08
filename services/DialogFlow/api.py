"""
A sample Hello World server.
"""
import os

from flask import Flask, render_template
from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
import logging
from datetime import datetime

# pylint: disable=C0103
app = Flask(__name__)



auth = ("auth.json")

cred = credentials.Certificate(auth)
firebase_admin.initialize_app(cred)

# Firestore database
db = firestore.client()

import pymssql



server = 'dreamlabs.database.windows.net'
database = 'DREAMLab'
username = 'user'
password = 'Password!'  



def extract_reservation_details(req):
    
    parameters = req.get('sessionInfo', {}).get('parameters', {})

    
    reservation_details = {
        'cuarto': parameters.get('cuarto'),
        'date': None,
        'date-time': None,
        'hora-fin': None,
    }

    
    if 'date' in parameters:
        date = parameters['date']
        reservation_details['date'] = f"{int(date['year'])}-{int(date['month']):02d}-{int(date['day']):02d}"

    
    if 'date-time' in parameters:
        date_time = parameters['date-time']
        reservation_details['date-time'] = f"{int(date_time['hours']):02d}:{int(date_time['minutes']):02d}:00"

    
    if 'hora-fin' in parameters:
        hora_fin = parameters['hora-fin']
        reservation_details['hora-fin'] = f"{int(hora_fin['hours']):02d}:{int(hora_fin['minutes']):02d}:00"

    return reservation_details


def get_cuarto(json_obj):
    return json_obj.get('cuarto', None)

def get_date(json_obj):
    date = json_obj.get('date', {})
    return f"{int(date['year'])}-{int(date['month'])}-{int(date['day'])}"

def get_date_time(json_obj):
    date_time = json_obj.get('date-time', {})
    return f"{int(date_time['hours'])}:{int(date_time['minutes'])}:00"

def get_hora_fin(json_obj):
    hora_fin = json_obj.get('hora-fin', {})
    return f"{int(hora_fin['hours'])}:{int(hora_fin['minutes'])}:00"

def parse_datetime(parameters, field_name):
    try:
        if field_name == 'date':
            field = parameters.get(field_name, {}).get('mapValue', {}).get('fields', {})
            year = int(field.get('year', {}).get('doubleValue', datetime.now().year))
            month = int(field.get('month', {}).get('doubleValue', datetime.now().month))
            day = int(field.get('day', {}).get('doubleValue', datetime.now().day))
            return f"{year}-{month:02d}-{day:02d}"
        else:  
            time_info = parameters.get(field_name, {}).get('mapValue', {}).get('fields', {})
            hours = int(time_info.get('hours', {}).get('doubleValue', 0))
            minutes = int(time_info.get('minutes', {}).get('doubleValue', 0))
            return f"{hours:02d}:{minutes:02d}:00"
    except Exception as e:
        logging.error(f"Error parsing {field_name}: {e}")
        # Default to current date or midnight if there's an error
        return datetime.now().strftime('%Y-%m-%d') if field_name == 'date' else "00:00:00"




@app.route('/sql', methods=['POST'])
def sql():
    try:
        with pymssql.connect(server=server, user=username, password=password, database=database) as conn:
            with conn.cursor() as cursor:
                req = request.get_json(force=True)
                logging.info(f"Received request data: {req}")
                req_mod = extract_reservation_details(req)

                cuarto = req_mod['cuarto']
                reservation_date = req_mod['date']
                start_time = req_mod['date-time']
                end_time = req_mod['hora-fin']

                reservation = {
                    'room': cuarto,
                    'reservation_date': reservation_date,
                    'start_time': start_time,
                    'end_time': end_time
                }

                sql = "INSERT INTO reservations (room, reservation_date, start_time, end_time) VALUES (%s, %s, %s, %s)"
                values = (cuarto, reservation_date, start_time, end_time)
                cursor.execute(sql, values)
                conn.commit()
                return jsonify({'fulfillmentResponse': {'messages': [{'text': {'text': [f"reservacion hecha para {cuarto} y guardada en SQL"]}}]}})
                #return jsonify({'fulfillmentResponse': {'messages': [{'text': {'text': [f"reservacion de: {reservation}  \n req_mod {req_mod}"]}}]}})
                #return jsonify({'fulfillmentResponse': {'messages': [{'text': {'text': ['Reservación confirmada aaaa. \n cuarto: {cuarto} reservation_date: {reservation_date} , start_time : {start_time} , end_time: {end_time}']}}]}})

                reservation = {
                    'room': cuarto,
                    'reservation_date': reservation_date,
                    'start_time': start_time,
                    'end_time': end_time
                }

                

                return jsonify({'fulfillmentResponse': {'messages': [{'text': {'text': ['Reservación confirmada y guardada en la base de datos SQL.']}}]}})
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        # Detailed error message including the reservation object for debugging
        return jsonify({'fulfillmentResponse': {'messages': [{'text': {'text': [f'Error: reservation_date={reservation_date}, start_time={start_time}, end_time={end_time} \n {e} \n {reservation}']}}]}})




@app.route('/')
def hello():
    """Return a friendly HTTP greeting."""
    message = "It's running!"

    """Get Cloud Run environment variables."""
    service = os.environ.get('K_SERVICE', 'Unknown service')
    revision = os.environ.get('K_REVISION', 'Unknown revision')

    return render_template('index.html',
        message=message,
        Service=service,
        Revision=revision)



@app.route('/test', methods=['GET'])
def test():
    return 'Hello from FirebaseAPI!', 200

@app.route('/firebase', methods=['POST'])
def firebase():
    try:

        reservation = {
            'room': "LEGO Room PRUEBA",
            'date': "2024-03-23",  # YYYY-MM-DD
            'startTime': "17:00",
            'endTime': "19:00",
            'confirmed': True
        }

        
        doc_ref = db.collection('reservations').add(reservation)
        
        
        return jsonify({'status': 'success', 'message': 'Reservation confirmed', 'doc_id': doc_ref[1].id}), 200
    except Exception as e:
       
        app.logger.error(f"An error occurred: {e}")
        
        return jsonify({'status': 'error', 'message': str(e)}), 500


@app.route('/webhook', methods=['POST'])
def webhook():
    try:
        # Get the request data
        req = request.get_json(force=True)
        logging.info(f"Received request data: {req}")
        """
        
        fulfillment_info = req.get('fulfillmentInfo', {})
        tag = fulfillment_info
        
        cuarto = tag.get('cuarto')
        date_info = tag.get('date', {})
        start_time_info = tag.get('date-time', {})
        end_time_info = tag.get('hora-fin', {})

      
        date = f"{date_info.get('year')}-{date_info.get('month'):02d}-{date_info.get('day'):02d}"
        start_time = f"{start_time_info.get('hours'):02d}:{start_time_info.get('minutes'):02d}"
        end_time = f"{end_time_info.get('hours'):02d}:{end_time_info.get('minutes'):02d}"

        # Construct the reservation object
        reservation = {
            'room': cuarto,
            'date': date,
            'startTime': start_time,
            'endTime': end_time,
            'confirmed': True
        }
        """
        # Add the reservation to Firebase Firestore
        db.collection('reservations').add(req)

        # Return a response
        return jsonify({'fulfillmentResponse': {'messages': [{'text': {'text': ['Reservación confirmada y guardada en Firebase.']}}]}})
    except Exception as e:
        return jsonify({'fulfillmentResponse': {'messages': [{'text': {'text': [f'Error: {e}']}}]}})
    



if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))  # Get the PORT environment variable
    app.run(debug=False, host='0.0.0.0', port=port)
