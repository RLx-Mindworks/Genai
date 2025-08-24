import random 
from typing import Literal
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START, END

# State
class State(TypedDict):
    graph_state: str

from langchain_google_genai import ChatGoogleGenerativeAI

# Example: use gemini-2.5-flash 
gemini_llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0, api_key = "AIzaSyAf9Io6lfcy1aq28BNlYLcubkdLZDGw6UM")


# # Conditional edge
# def decide_mood(state) -> Literal["node_2", "node_3"]:
    
#     # Often, we will use state to decide on the next node to visit
#     user_input = state['graph_state'] 
    
#     # Here, let's just do a 50 / 50 split between nodes 2, 3
#     if random.random() < 0.5:

#         # 50% of the time, we return Node 2
#         return "node_2"
    
#     # 50% of the time, we return Node 3
#     return "node_3"


import random
from typing import Literal # Literal are optional values (where or is required)

def decide_mood(state) -> Literal["node_2", "node_3"]:
    user_input = state['graph_state'] 
    if random.random() < 0.5:
        return "node_2"
    return "node_3"
def get_name(query):
    query ="Hi I'm "
    prompt = f"""
    {query}
    Tell me if this above is a name or Not, if this is not a name write 1002  else if this is a name write 1004"""
    return prompt 
    
def decide_name(state) -> Literal["node_4", "node_5"]:
    user_input = state['graph_state'] 
    provide_name = gemini_llm.invoke(get_name(user_input))
    
    if "1002" in provide_name.text():
        return "node_4"
    return "node_5"
    


# Nodes
def node_1(state):
    print("---Node 1---")
    return {"graph_state": state['graph_state'] +" I am"}

def node_2(state):
    print("---Node 2---")
    return {"graph_state": state['graph_state'] +" happy!"}

def node_3(state):
    print("---Node 3---")
    return {"graph_state": state['graph_state'] +" sad!"}

def node_4(state):
    print("---Node 4---")
    print(state)
    query = gemini_llm.invoke(f"First extract the name and then tell me the characters for the following name (and provide only number of character) : {state['graph_state']}").text()
    characters=  f"\n This name has {query} "
    return {"graph_state": state['graph_state'] + characters}
    
def node_5(state):
    print("---Node 5---")
    return {"graph_state": state['graph_state'] +" This is not a name "}



# Build graph
builder = StateGraph(State)
builder.add_node("node_1", node_1)
builder.add_node("node_2", node_2)
builder.add_node("node_3", node_3)
builder.add_node("node_4", node_4)
builder.add_node("node_5", node_5)

# Logic
builder.add_edge(START, "node_1")
builder.add_conditional_edges("node_1", decide_mood) # Decide_Mood : [node2 | node3]
builder.add_edge("node_3", END)
builder.add_conditional_edges("node_2", decide_name) # Decide_Mood : [node2 | node3]
builder.add_edge("node_4", END)
builder.add_edge("node_5", END)

# Compile graph
graph = builder.compile()