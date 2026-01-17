import google.generativeai as genai
from PIL import Image
from datetime import datetime
import os


API_KEY = "AIzaSyDXKmAaNNXo3Czw56TGdMJHlL4iV_hr-yk"  
IMAGE_PATH = r"C:\Users\ADMIN\Desktop\new_crewai\my_project\src\my_project\nlp.png"  
OUTPUT_FILE = "output/system_design.md"


genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-2.5-flash')


def process_system_design(image_path):
    image = Image.open(image_path)
    prompt = (
        """This is a system design diagram. 
        Identify and describe all key components, functionalities and how they are linked. 
        Present the result as structured markdown with clear headings and bullet points."""
    )
    response = model.generate_content([prompt, image])
    return response.text

def generate_markdown(image_path, markdown_content):
    output_dir = os.path.dirname(OUTPUT_FILE)
    os.makedirs(output_dir, exist_ok=True)  # ✅ Ensure output/ exists

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(f"# System Design Documentation\n\n")
        f.write(f"_Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}_\n\n")
        f.write(f"![System Design]({image_path})\n\n")
        f.write(markdown_content)
    print(f"✅ Markdown saved to: {OUTPUT_FILE}")


if __name__ == "__main__":
    print(f"Analyzing image: {IMAGE_PATH}")
    result = process_system_design(IMAGE_PATH)
    generate_markdown(IMAGE_PATH, result)
