# src/img_to_tsx_agentic/start.py
import sys
from pathlib import Path

# Add the src directory to Python path
src_path = Path(__file__).parent.parent
sys.path.insert(0, str(src_path))

from img_to_tsx_agentic.main import run

if __name__ == "__main__":
    # Look for image in project root
    project_root = Path(__file__).parent.parent.parent
    image_path = project_root / "image.png"
    
    if not image_path.exists():
        print(f"❌ Please place your image at: {image_path}")
        sys.exit(1)
    
    run(str(image_path))
