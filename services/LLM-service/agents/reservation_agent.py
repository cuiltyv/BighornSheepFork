from langchain_core.prompts import PromptTemplate
import datetime
from langchain.agents import create_tool_calling_agent, AgentExecutor
from tools.make_reservation_tool import MakeReservation
from utils.setup_llm import llm

# Example prompt to instruct the model
reservation_prompt_template = PromptTemplate(
    input_variables=["input"],
    partial_variables={
        "tools": {tool.name: tool.description for tool in [MakeReservation]},
        "agent_scratchpad": "",
        "timenow": datetime.datetime.now().isoformat(),
    },
    template='''
    Input: {input} 
    Agent Scratchpad: {agent_scratchpad} 
    Tools: {tools} 
    Contest:
    Current time: {timenow}
    --
    If the user asks to make a reservation, use the MakeReservation Tool
    with the provided details. Otherwise, respond normally in natural language, interpreting the JSON format for the benefit of the user,
    and in the language the user is speaking in.''',
)

# Initialize the LLM and tool

# Create the agent
tools = [MakeReservation]

reservationAgent = create_tool_calling_agent(
    llm,
    tools,
    reservation_prompt_template
)


reservation_agent_executor = AgentExecutor(agent=reservationAgent, tools=tools, verbose=True)

