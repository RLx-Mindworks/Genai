import os
from my_project.crew import MarkdownToCodeCrew
from my_project.img_to_md import process_system_design, generate_markdown

def run():
    os.makedirs("output", exist_ok=True)
    
    # First, generate the markdown from image
    print("🖼️ Processing image to markdown...")
    IMAGE_PATH = r"C:\Users\ADMIN\Desktop\new_crewai\my_project\src\my_project\nlp.png"
    result = process_system_design(IMAGE_PATH)
    generate_markdown(IMAGE_PATH, result)
    
    # Then run the crew
    print("🚀 Running Markdown-to-Code Pipeline")
    result = MarkdownToCodeCrew().crew().kickoff()
    
    print("\n✅ CONVERSION COMPLETE")
    print(result.raw)

if __name__ == "__main__":
    run()