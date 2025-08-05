# start.py (place in project root alongside pyproject.toml)
import sys
from pathlib import Path

# Add src to path
sys.path.insert(0, str(Path(__file__).parent / "src"))

from main import run

if __name__ == "__main__":
    run("image.png")  # Update with your actual image path
