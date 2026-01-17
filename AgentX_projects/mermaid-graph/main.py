import os
import git
import google.genai as genai
from typing import List, Dict, Any
from pydantic import BaseModel, Field
from dotenv import load_dotenv
load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

# Define Pydantic models
class TaskOutput(BaseModel):
    id: str = Field(..., description="Task identifier")
    repository: str = Field(..., description="GitHub repository URL")
    tutorial_summary: str = Field(..., description="Summary of what the repository does")
    repo_flow_graph: str = Field(..., description="Mermaid graph of the full repo")
    file_flow_graph: Dict[str, str] = Field(..., description="Mermaid graph of one specific file")

class ListOutput(BaseModel):
    repos: List[TaskOutput]

# Helper function to find the main entry point
def find_main_entry_point(repo_path: str) -> str:
    """
    Parses the repository to find the main entry point file.
    Args:
        repo_path: Path to the cloned repository
    Returns:
        The relative path of the main entry point file
    """
    entry_point_candidates = ["main.py", "app.py", "index.js", "index.ts", "server.py"]
    for root, _, files in os.walk(repo_path):
        for file in files:
            if file in entry_point_candidates:
                return os.path.relpath(os.path.join(root, file), repo_path)
    raise FileNotFoundError("No main entry point file found in the repository.")

# Function to clone the repository
def clone_repository(repo_url: str, clone_dir: str) -> str:
    """
    Clones the GitHub repository to a local directory.
    Args:
        repo_url: GitHub repository URL
        clone_dir: Directory to clone the repository into
    Returns:
        Path to the cloned repository
    """
    repo_path = os.path.join(clone_dir, os.path.basename(repo_url).replace(".git", ""))
    if os.path.exists(repo_path):
        print(f"Repository already cloned at {repo_path}")
        return repo_path
    print(f"Cloning repository from {repo_url}...")
    git.Repo.clone_from(repo_url, repo_path)
    print(f"Repository cloned to {repo_path}")
    return repo_path

# Function implementations
def summarize_code(repository_url: str) -> str:
    """
    Summarizes the code repository and creates a tutorial markdown.
    Args:
        repository_url: GitHub repository URL
    Returns:
        Tutorial summary in markdown format
    """
    prompt = f"""
    Analyze the GitHub repository at {repository_url} and create a comprehensive tutorial summary.
    Please provide:
    1. What this repository does (main purpose)
    2. Key features and functionality
    3. Main technologies used
    4. How to get started with this project
    5. Key files and their purposes
    Format the response as a clear tutorial markdown that explains the project to newcomers.
    """
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=[prompt],
        config={
            'response_mime_type': 'text/plain',
        },
    )
    return response.text

def generate_repo_flow_graph(repository_url: str) -> str:
    """
    Generates a Mermaid flowchart for the entire repository flow.
    Args:
        repository_url: GitHub repository URL
    Returns:
        Mermaid flowchart code as string
    """
    prompt = f"""
    Analyze the GitHub repository at {repository_url} and create a Mermaid flowchart that shows the high-level architecture and flow of the entire repository.
    The flowchart should include:
    1. Main entry points (like main.py, app.py, index.js, etc.)
    2. Key modules/components and their relationships
    3. Data flow between components
    4. External dependencies or services
    5. Output/results
    Return only the Mermaid code starting with ``````.
    Use flowchart TD (top-down) format.
    """
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=[prompt],
        config={
            'response_mime_type': 'text/plain',
        },
    )
    return response.text

def generate_fxn_flow_graph(functional_breakdown: str) -> str:
    """
    Generates a Mermaid flowchart for a specific function or file flow.
    Args:
        functional_breakdown: Description of the function/file to analyze
    Returns:
        Mermaid flowchart code as string
    """
    prompt = f"""
    Given the following functional breakdown: {functional_breakdown}
    Create a detailed Mermaid flowchart that shows:
    1. Function entry point
    2. Decision points (if/else conditions)
    3. Processing steps
    4. Loops or iterations
    5. Function calls to other methods
    6. Return points or outputs
    Return only the Mermaid code starting with ``````.
    Use flowchart LR (left-right) or TD (top-down) format as appropriate.
    Focus on the logical flow and control structures.
    """
    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=[prompt],
        config={
            'response_mime_type': 'text/plain',
        },
    )
    return response.text

def mermaid_graph_creator_tool(repo_url: str, output_file: str = "output.json") -> Dict[str, Any]:
    """
    Main tool function that combines all functionality to create mermaid graphs from code.
    Args:
        repo_url: GitHub repository URL
        output_file: Path to save the JSON output (default: output.json)
    Returns:
        Dictionary containing task results with tutorial summary and mermaid diagrams
    """
    try:
        # Clone the repository
        clone_dir = "./cloned_repos"
        os.makedirs(clone_dir, exist_ok=True)
        repo_path = clone_repository(repo_url, clone_dir)

        # Find the main entry point
        main_entry_point = find_main_entry_point(repo_path)

        # Generate tutorial summary
        print(f"Analyzing repository: {repo_url}")
        tutorial_summary = summarize_code(repo_url)

        # Generate repo-wide flow graph
        print("Generating repository flow diagram...")
        repo_flow_graph = generate_repo_flow_graph(repo_url)

        # Generate function flow graph for the main entry point
        functional_breakdown = f"Analyze the file {main_entry_point} in {repo_url} and create a function flow diagram showing the execution flow, decision points, and key operations."
        print("Generating function flow diagram...")
        file_flow_graph_content = generate_fxn_flow_graph(functional_breakdown)

        # Create the result using Pydantic model
        result = TaskOutput(
            id=f"task_{hash(repo_url) % 10000}",  # Simple ID generation
            repository=repo_url,
            tutorial_summary=tutorial_summary,
            repo_flow_graph=repo_flow_graph,
            file_flow_graph={
                "file": main_entry_point,
                "diagram": file_flow_graph_content
            }
        )
        
        # Save the result to a JSON file
        import json
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(result.dict(), f, indent=2, ensure_ascii=False)
        print(f"Results saved to {output_file}")
        
        return result.dict()
    except Exception as e:
        print(f"Error generating mermaid graphs: {str(e)}")
        return {
            "error": str(e),
            "repo_url": repo_url,
            "status": "failed"
        }

# Example usage
if __name__ == "__main__":
    example_repo = "https://github.com/fastapi/fastapi"
    # example_repo = "https://github.com/Aman4563/Calculator"
    output_file = "fastapi_analysis.json"
    result = mermaid_graph_creator_tool(example_repo, output_file)
    print(f"Analysis completed. Results saved to {output_file}")
