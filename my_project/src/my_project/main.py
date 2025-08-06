from my_project.crew import ComponentAnalyzerCrew
 
def run():
    tsx_file=r"C:\Users\ADMIN\Documents\RLx-Mindworks project\Genai\my_project\src\my_project\example.tsx"
    with open(tsx_file, "r", encoding="utf-8") as f:
        tsx_file_content=f.read()

    crew_instance=ComponentAnalyzerCrew()
    result=crew_instance.crew().kickoff(inputs={
        "tsx_file":tsx_file_content
    })
    print("Result saved")


if __name__=="__main__":
    run()