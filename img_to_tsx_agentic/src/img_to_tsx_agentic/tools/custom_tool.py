from __future__ import annotations
import json, re, os
from typing import Type
from PIL import Image
import google.generativeai as genai
from crewai.tools import BaseTool
from pathlib import Path
from pydantic import BaseModel, Field

MODEL_NAME = os.getenv("MODEL", "gemini-2.5-flash")

class ImagePathInput(BaseModel):
    image_path: str = Field(description="Path to the UI image file")

class AnalysisInput(BaseModel):
    analysis: str = Field(description="UI analysis text")

class ComponentInput(BaseModel):
    design_json: str = Field(description="Design system JSON")
    analysis: str = Field(description="Original UI analysis")

class FileManagerInput(BaseModel):
    analysis: str = Field(description="UI analysis text")
    design_json: str = Field(description="Design system JSON")
    tsx_code: str = Field(description="Generated TSX code")

# ---------- TOOL 1 -----------------------------------------------------------
class UIAnalysisTool(BaseTool):
    name: str = "UI Analysis Tool"
    description: str = "Analyses a UI image and returns a detailed design report."
    args_schema: Type[BaseModel] = ImagePathInput

    def _run(self, image_path: str) -> str:
        image = Image.open(Path(image_path))
        
        prompt = """
        Look at this UI design and tell me:
        1. What type of interface is this?
        2. What are the main colors used?
        3. What components do you see? (buttons, cards, etc.)
        4. How is the layout arranged?
        
        Keep it simple and focused.
        """
        
        response = genai.GenerativeModel(MODEL_NAME).generate_content([prompt, image])
        return response.text

# ---------- TOOL 2 -----------------------------------------------------------
class DesignSystemTool(BaseTool):
    name: str = "Design System Generator"
    description: str = "Creates a JSON design-system spec from analysis text."
    args_schema: Type[BaseModel] = AnalysisInput

    def _run(self, analysis: str) -> str:
        prompt = f"""
        Based on this UI analysis, create a simple JSON design system:
        
        {analysis}
        
        Format:
        {{
          "colors": {{
            "primary": "#hex-color",
            "secondary": "#hex-color",
            "background": "#hex-color"
          }},
          "components": [
            {{
              "name": "button",
              "style": "tailwind-classes-here"
            }}
          ]
        }}
        
        Return only JSON, no extra text.
        """
        
        response = genai.GenerativeModel(MODEL_NAME).generate_content(prompt)
        data = response.text.strip()
        
        if data.startswith("```json"):
            data = data[7:-3]
        elif data.startswith("```"):
            data = data[3:-3]
        
        return data

# ---------- TOOL 3 -----------------------------------------------------------
class ComponentGeneratorTool(BaseTool):
    name: str = "Next.js Component Generator"
    description: str = "Produces a full TSX page from design-system JSON."
    args_schema: Type[BaseModel] = ComponentInput

    def _run(self, design_json: str, analysis: str) -> str:
        prompt = f"""
        Create a COMPLETE Next.js 15 TypeScript component that I can copy-paste and run immediately.
        
        Design System: {design_json}
        UI Analysis: {analysis}
        
        Requirements:
        1. Make it a COMPLETE page component (not just a small component)
        2. Include ALL necessary imports at the top
        3. Use Tailwind CSS classes based on the design system colors
        4. Create a realistic UI that matches the analyzed design
        5. Include multiple sections (header, main content, footer if needed)
        6. Add interactive elements (buttons, forms, cards)
        7. Make it responsive and production-ready
        8. Include proper TypeScript interfaces
        9. Add sample content that makes sense
        10. Export as default for Next.js pages
        
        Structure it like a real landing page/dashboard/app page that someone would actually use.
        
        Return ONLY the complete TSX code with no explanations.
        """
        
        response = genai.GenerativeModel(MODEL_NAME).generate_content(prompt)
        code = response.text.strip()
        
        if code.startswith('```tsx'):
            code = code[6:-3]
        elif code.startswith('```typescript'):
            code = code[13:-3]
        elif code.startswith('```'):
            code = code[3:-3]
        
        return code

# ---------- TOOL 4 -----------------------------------------------------------
class FileManagerTool(BaseTool):
    name: str = "File Manager"
    description: str = "Saves analysis, design JSON and TSX files."
    args_schema: Type[BaseModel] = FileManagerInput

    def _run(self, analysis: str, design_json: str, tsx_code: str) -> str:
        Path("outputs").mkdir(exist_ok=True)

        Path("outputs/ui-analysis.md").write_text("# UI Analysis Report\n\n" + analysis, encoding="utf-8")
        
        try:
            design_data = json.loads(design_json)
            with open('outputs/design-system.json', 'w') as f:
                json.dump(design_data, f, indent=2)
        except json.JSONDecodeError:
            Path("outputs/design-system.json").write_text(design_json, encoding="utf-8")
        
        Path("outputs/GeneratedComponent.tsx").write_text(tsx_code, encoding="utf-8")

        page_content = f"""// Generated UI Component - Ready for Next.js deployment
// Place in: app/generated-ui/page.tsx or pages/generated-ui.tsx

{tsx_code}"""
        
        Path("outputs/generated-ui-page.tsx").write_text(page_content, encoding="utf-8")
        return "Files saved to ./outputs directory."
