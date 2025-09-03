import os
from crewai import Agent, Task, Crew, LLM


llm = LLM(
    model="gemini/gemini-2.0-flash",
    temperature=0.7,
    api_key="AIzaSyBjAETN4y__jzd82bA_Xzl0j4dUUkPBwCM"
)

# Define agent
analyst = Agent(
    role="System Analyst",
    goal="Analyze textual system descriptions and extract insights",
    backstory="A fast and concise model trained on recent corpora to perform text understanding.",
    llm=llm,
    verbose=True
)

# Example manually described image (since Flash can’t handle vision)
description_text = """
The image shows a system design for an NLP pipeline. It contains:
- A user interface that sends input text
- A preprocessor for tokenization and normalization
- An NLP engine with named entity recognition, sentiment analysis, and summarization modules
- A response generator that formats the output
- All components communicate via REST APIs
"""

# Define task
task = Task(
    description=f"Analyze the following system description and list all key components, flows, and responsibilities:\n{description_text}",
    expected_output="A bullet list of components and their roles",
    agent=analyst
)

# Define and run crew
crew = Crew(
    agents=[analyst],
    tasks=[task],
    verbose=True
)

if __name__ == "__main__":
    result = crew.kickoff()
    print("\n✅ Output:\n", result)
