import requests
from dotenv import load_dotenv
import os


load_dotenv()
base_url = os.getenv("BASE_URL")


def post_api_reservation(data=None):
    method = "POST"
    url = f"{base_url}/ai/reservation"
    headers = {
        'Content-Type': 'application/json',  # Explicitly set the Content-Type to application/json
        'Accept': 'application/json',  # Ensures that the server knows the client expects a JSON response.
    }
    try:
        response = requests.request(method, url, headers=headers, json=data)
        print("Response status code:", response.status_code)  # Debugging statement to check the response status code
        # print("Response data:", response.text)  # Debugging statement to check the response content
        if response:
            if response.status_code == 201 or response.status_code == 400:
                print("Response Content: ", response.content)
                return response # Return response if everything is fine
        else:
            response.raise_for_status()  # Will raise an HTTPError for bad responses
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")  # Specific HTTP error handling
    except requests.exceptions.RequestException as err:
        print(f"Other error occurred: {err}")  # General network error handling
    except Exception as exc:
        print(f"An unexpected error occurred: {exc}")  # Catch-all for any other exceptions

    return response 

def get_upcoming_reservations(matricula):
    method = "GET"
    url = f"{base_url}/ai/reservations/{matricula}"
    headers = {
        'Content-Type': 'application/json',  # Explicitly set the Content-Type to application/json
        'Accept': 'application/json',  # Ensures that the server knows the client expects a JSON response.
    }
    try:
        response = requests.request(method, url, headers=headers)
        print("Response status code:", response.status_code)  # Debugging statement to check the response status code
        # print("Response data:", response.text)  # Debugging statement to check the response content
        if response:
            if response.status_code == 200:
                print("Response Content: ", response.content)
                return response # Return response if everything is fine
        else:
            response.raise_for_status()  # Will raise an HTTPError for bad responses
    except requests.exceptions.HTTPError as http_err:
        print(f"HTTP error occurred: {http_err}")  # Specific HTTP error handling
    except requests.exceptions.RequestException as err:
        print(f"Other error occurred: {err}")  # General network error handling
    except Exception as exc:
        print(f"An unexpected error occurred: {exc}")  # Catch-all for any other exceptions

    return response  
