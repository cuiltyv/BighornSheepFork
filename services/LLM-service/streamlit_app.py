
from agents.reservation_agent import reservation_agent_executor as agent
from langchain_community.callbacks import StreamlitCallbackHandler
from langchain_community.chat_message_histories import StreamlitChatMessageHistory
from langchain.memory import ConversationBufferMemory
import streamlit as st

st.set_page_config(page_title='🦜🔗 Crea una Reservación')
st.title('🦜🔗 Reserva con Dream LAB!')

msgs = StreamlitChatMessageHistory()
avatars = {"human": "user", "ai": "assistant"}
memory = ConversationBufferMemory(
    chat_memory=msgs, return_messages=True, memory_key="chat_history", output_key="output"
)

# Reset conversation history button
if len(msgs.messages) == 0 or st.sidebar.button("Reset chat history"):
    msgs.clear()
    msgs.add_ai_message("Como te puedo ayudar?")
    # Clear/reset any previous state
    st.session_state.steps = {}

# Display conversation history
for idx, msg in enumerate(msgs.messages):
    with st.chat_message(avatars[msg.type]):
        # Render intermediate steps if any were saved
        for step in st.session_state.steps.get(str(idx), []):
            if step[0].tool == "_Exception":
                continue
            # Assuming 'step' here is a tuple (tool_config, output), customize as needed
            with st.status(f"**{step[0].tool}**: {step[0].tool_input}", state="complete"):
                st.write(step[0].log)  # Display the log from the runnable/tool
                st.write(step[1])  # Display the output from the runnable/tool
        # Display the message content
        st.write(msg.content)

# Get user input
if prompt := st.chat_input():
    # Write the user's prompt to the chat history
    st.chat_message("user").write(prompt)
    # Invoke the agent and handle the response
    with st.chat_message("assistant"):
        st_callback = StreamlitCallbackHandler(st.container(), expand_new_thoughts=False)
        response = agent.invoke({"input": prompt , "chat_history": msgs.messages})

        # Expecting response to be a dict with an 'output' key. Extract the text message from it.
        if isinstance(response, dict) and 'output' in response:
            ai_message = response['output']
            msgs.add_user_message(prompt)  # Record the input prompt in the message history
            msgs.add_ai_message(ai_message)  # Record the AI's response in the message history
            st.session_state.current_response = ai_message  # Store the response for rendering
            st.write(ai_message)
        else:
            st.error("The response received from the agent is not in the expected format.")


# # Render the current step's response (if any)
# if "current_response" in st.session_state:
#     with st.chat_message("assistant"):
#         # Output the current response
#         st.write(st.session_state.current_response)
