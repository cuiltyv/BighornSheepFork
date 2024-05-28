import os
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

from langchain_anthropic import ChatAnthropic

haiku = ChatAnthropic(model='claude-3-haiku-20240307')
sonnet = ChatAnthropic(model='claude-3-sonnet-20240229')
opus = ChatAnthropic(model='claude-3-opus-20240229')

def setup_llm(model_name="gpt-4o", temperature=0.7):
    llm = ChatOpenAI(model_name=model_name, temperature=temperature)
    return llm

# llm = opus
llm=setup_llm()

'''
Mi matricula es A01026999, quiero reservar para mañana a las 3pm, en la sala 1, para un proyecto de clase, con 0 alumnos, y nada de hardware.
'''