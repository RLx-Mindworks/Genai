from crewai import Agent, Task, Crew
from crewai.project import CrewBase, agent, task, crew
from crewai.agents.agent_builder.base_agent import BaseAgent
from crewai_tools import FileReadTool
from typing import List

@CrewBase
class MarkdownToCodeCrew:
    agents: List[BaseAgent]
    tasks: List[Task]

    @agent
    def markdown_reader(self) -> Agent:
        return Agent(
            config=self.agents_config["markdown_reader"],
            tools=[FileReadTool()],
            verbose=True
        )

    @agent
    def code_generator(self) -> Agent:
        return Agent(
            config=self.agents_config["code_generator"],
            verbose=True
        )

    @task
    def parse_markdown_task(self) -> Task:
        return Task(
            config=self.tasks_config["parse_markdown_task"]
        )  

    @task
    def generate_python_code_task(self) -> Task:
        return Task(
            config=self.tasks_config["generate_python_code_task"]
        )  # Task details loaded from YAML

    @crew
    def crew(self) -> Crew:
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process="sequential",
            verbose=True
        )
