import streamlit as st
from langchain_community.callbacks import StreamlitCallbackHandler
from langchain_community.chat_message_histories import StreamlitChatMessageHistory
# AI
from agents.reservation_agent import reservation_agent_executor as agent
from langchain.memory import ConversationBufferMemory

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
    st.session_state.steps = {}

# Display conversation history
for idx, msg in enumerate(msgs.messages):
    with st.chat_message(avatars[msg.type]):
        for step in st.session_state.steps.get(str(idx), []):
            if step[0].tool == "_Exception":
                continue
            with st.status(f"**{step[0].tool}**: {step[0].tool_input}", state="complete"):
                st.write(step[0].log)
                st.write(step[1])
        st.write(msg.content)

# Get user input
if prompt := st.chat_input():
    st.chat_message("user").write(prompt)
    with st.chat_message("assistant"):
        st_callback = StreamlitCallbackHandler(st.container(), expand_new_thoughts=False)
        response = agent.invoke({"input": prompt, "chat_history": msgs.messages})
        if isinstance(response, dict) and 'output' in response:
            ai_message = response['output']
            msgs.add_user_message(prompt)
            msgs.add_ai_message(ai_message)
            st.session_state.current_response = ai_message
            st.write(ai_message)
        else:
            st.error("The response received from the agent is not in the expected format.")
