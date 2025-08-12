import os
from pathlib import Path
from .crew import build_crew
import sys

def run(image_path: str = None):
    if image_path is None and len(sys.argv) > 1:
        image_path = sys.argv[1]
    if image_path is None:
        image_path = os.environ.get("IMAGE_PATH", "image.png")
    if not Path(image_path).exists():
        raise FileNotFoundError(f"Image file '{image_path}' not found.")

    crew = build_crew(image_path)
    crew.kickoff()
    print("🎉 Finished!  Check the outputs directory.")

if __name__ == "__main__":
    run()
