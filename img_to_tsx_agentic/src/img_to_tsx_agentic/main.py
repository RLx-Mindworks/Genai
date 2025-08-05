from pathlib import Path
from .crew import build_crew

def run(image_path: str):
    if not Path(image_path).exists():
        raise FileNotFoundError(image_path)

    crew = build_crew(image_path)
    crew.kickoff()
    print("🎉 Finished!  Check the outputs directory.")

if __name__ == "__main__":
    run("image.png")  
