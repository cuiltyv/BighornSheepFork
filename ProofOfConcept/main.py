
# Loading the env variables
from dotenv import load_dotenv
load_dotenv()  # This loads the environment variables from the .env file

import os

# Now you can access your Twilio credentials safely
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
# End of loading .env variables

