from typing import List

from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from crewai_tools import FileReadTool


@CrewBase
class MyProject():
    agents: List[BaseAgent]
    tasks: List[Task]
    tools_map = {
        "FileReadTool": lambda: FileReadTool()
    }

  
    @agent
    def type_struct_agent(self) -> Agent:
        return Agent(
            config=self.agents_config['type_struct_agent'],
            verbose=True
        )

    @agent
    def api_spec_agent(self) -> Agent:
        return Agent(
            config=self.agents_config['api_spec_agent'],
            verbose=True
        )

    @agent
    def sitemap_agent(self) -> Agent:
        return Agent(
            config=self.agents_config['sitemap_agent'],
            verbose=True
        )

    @agent
    def architect_agent(self) -> Agent:
        return Agent(
            config=self.agents_config['architect_agent'],
            verbose=True
        )

    @agent
    def dfd_agent(self) -> Agent:
        return Agent(
            config=self.agents_config['dfd_agent'],
            verbose=True
        )

    @agent
    def db_schema_agent(self) -> Agent:
        return Agent(
            config=self.agents_config['db_schema_agent'],
            verbose=True
        )
    
    @agent
    def api_schema_agent(self) -> Agent:
        return Agent(
            config=self.agents_config['api_schema_agent'], 
            verbose=True
        )

    @task
    def task_type_struct(self) -> Task:
        return Task(
            config=self.tasks_config['task_type_struct'],
            output_file='type_struct_summary.txt'
        )

    @task
    def task_api_spec(self) -> Task:
        return Task(
            config=self.tasks_config['task_api_spec'],
            output_file='api_spec_summary.txt'
        )

    @task
    def task_sitemap(self) -> Task:
        return Task(
            config=self.tasks_config['task_sitemap'],
            output_file='sitemap_summary.txt'
        )

    @task
    def task_architect(self) -> Task:
        return Task(
            config=self.tasks_config['task_architect'],
            output_file='system_design.txt'
        )

    @task
    def task_dfd(self) -> Task:
        return Task(
            config=self.tasks_config['task_dfd'],
            output_file='system_dfd.md'
        )

    @task
    def task_generate_db_schema(self) -> Task:
        return Task(
            config=self.tasks_config['task_generate_db_schema'],
            output_file='db_schema.json'
        )

    @task
    def task_api_schema_mapping(self) -> Task:
        return Task(
            config=self.tasks_config['task_api_schema_mapping'], 
            output_file='api_schema.json'
        )
    
    
    @crew
    def crew(self) -> Crew:
        return Crew(
            agents=self.agents,
            tasks=self.tasks,
            process=Process.sequential,
            verbose=True
        )
