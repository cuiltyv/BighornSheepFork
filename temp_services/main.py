from agents.reservation_agent import reservation_agent_executor as agent
from langchain.memory import ConversationBufferMemory
from langchain.schema import HumanMessage, AIMessage

# Initialize the conversation history and memory
memory = ConversationBufferMemory(return_messages=True, memory_key="chat_history", output_key="output")

# Initial message to start the conversation
initial_message = "¿Cómo te puedo ayudar?"
memory.save_context({"input": ""}, {"output": initial_message})

def print_messages(messages):
    avatars = {HumanMessage: "Usuario", AIMessage: "Asistente"}
    for msg in messages:
        print(f"{avatars[type(msg)]}: {msg.content}")

# Function to handle user input and agent response
def chat_with_agent():
    print("Iniciando chat con el agente. Escribe 'salir' para terminar la conversación.")
    while True:
        # Display the conversation history
        print_messages(memory.chat_memory.messages)

        # Get user input
        user_input = input("Usuario: ")
        if user_input.lower() == "salir":
            break

        # Invoke the agent and handle the response
        response = agent.invoke({"input": user_input, "chat_history": memory.chat_memory.messages})

        # Expecting response to be a dict with an 'output' key
        if isinstance(response, dict) and 'output' in response:
            ai_message = response['output']
            memory.save_context({"input": user_input}, {"output": ai_message})
            print(f"Asistente: {ai_message}")
        else:
            print("Error: La respuesta recibida del agente no está en el formato esperado.")

if __name__ == "__main__":
    chat_with_agent()
