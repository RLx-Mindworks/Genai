# src/component_analyzer/crew.py

from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from typing import List
from crewai_tools import FileReadTool

@CrewBase
class ComponentAnalyzerCrew():
    """Crew for analyzing React/Next.js .tsx codebase and reporting component structure"""

    agents: List[Agent]
    tasks: List[Task]
    tools_map={
        "FileReadTool": lambda: FileReadTool()
    }

    @agent
    def code_parser(self) -> Agent:
        return Agent(
            config=self.agents_config['code_parser'],
            verbose=True,
            # Add any tools to help with file reading/parsing if you customize
        )

    @agent
    def report_generator(self) -> Agent:
        return Agent(
            config=self.agents_config['report_generator'],
            verbose=True,
        )

    @task
    def parse_codebase_task(self) -> Task:
        return Task(
            config=self.tasks_config['parse_codebase_task'],
        )

    @task
    def report_task(self) -> Task:
        return Task(
            config=self.tasks_config['report_task'],
        )

    @crew
    def crew(self) -> Crew:
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True,
        )
