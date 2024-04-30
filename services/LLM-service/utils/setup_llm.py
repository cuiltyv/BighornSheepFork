import os
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

def setup_llm(model_name="gpt-3.5-turbo", temperature=0.6):
    llm = ChatOpenAI(model_name=model_name, temperature=temperature)
    return llm

# llm = setup_llm("gpt-4-turbo")
llm=setup_llm()