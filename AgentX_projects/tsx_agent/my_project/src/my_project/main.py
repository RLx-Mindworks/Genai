from pathlib import Path
from my_project.crew import MyProject

def run():
    type_struct_path = r"C:\Users\ADMIN\Desktop\tsx_agent\my_project\src\my_project\type_struct.txt"
    api_spec_path = r"C:\Users\ADMIN\Desktop\tsx_agent\my_project\src\my_project\api_spec.yaml"
    sitemap_path = r"C:\Users\ADMIN\Desktop\tsx_agent\my_project\src\my_project\sitemap.txt"

    type_struct_content = Path(type_struct_path).read_text(encoding="utf-8")
    api_spec_content = Path(api_spec_path).read_text(encoding="utf-8")
    sitemap_content = Path(sitemap_path).read_text(encoding="utf-8")

    MyProject().crew().kickoff(inputs={
        "type_struct": type_struct_content,
        "api_spec": api_spec_content,
        "sitemap": sitemap_content
    })

if __name__ == "__main__":
    run()
