import os

def next_transcription_number(directory):
    """Get the next available transcription number in the given directory."""
    if not os.path.exists(directory):
        os.makedirs(directory)  # Step 3: Ensure the 'transcriptions' directory exists
        return 0
    else:
        files = os.listdir(directory)
        transcriptions = [f for f in files if f.startswith("transcription_") and f.endswith(".txt")]
        numbers = [int(f.split('_')[1].split('.txt')[0]) for f in transcriptions]
        next_number = max(numbers) + 1 if numbers else 0
        return next_number

# Step 4: Update the save_transcript function
def save_transcript(text, directory="transcriptions"):
    next_number = next_transcription_number(directory)
    filename = f"transcription_{next_number}.txt"
    filepath = os.path.join(directory, filename)
    with open(filepath, 'a') as file:
        file.write(text + '\n')