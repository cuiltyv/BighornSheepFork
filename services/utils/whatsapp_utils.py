# here I want to make the function that makes the call to the LLM service, it receives the phone number, message, and it returns a response
from agents.reservation_agent import reservation_agent_executor as agent
from langchain.memory import ConversationBufferMemory


msgs = []

# memory = ConversationBufferMemory(
#     chat_memory=msgs, return_messages=True, memory_key="chat_history", output_key="output"
# )

def llm_response(phone_number, message):
    try:
        # langchain_response = llm(message)
        response = agent.invoke({"input": message, "chat_history": f"{msgs}"})
        print(response)
        return response["output"]
    
    except Exception as e:

        return {"error": f"Error calling the LLM to {phone_number}: {e}"}
