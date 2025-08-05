from __future__ import annotations
import json, re
from typing import Type
from PIL import Image
import google.generativeai as genai
from crewai.tools import BaseTool
from pathlib import Path
from pydantic import BaseModel, Field

MODEL_NAME = "gemini-2.5-flash"

# Input schemas for tools
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
        prompt = (
            "As a senior UX researcher, analyse this UI and list:\n"
            "1. Interface type\n2. Colour palette (hex)\n3. Typography hierarchy\n"
            "4. Layout strategy\n5. Component inventory\n6. Accessibility notes\n"
            "7. Responsive considerations"
        )
        response = genai.GenerativeModel(MODEL_NAME).generate_content([prompt, image])
        return response.text

# ---------- TOOL 2 -----------------------------------------------------------
class DesignSystemTool(BaseTool):
    name: str = "Design System Generator"
    description: str = "Creates a JSON design-system spec from analysis text."
    args_schema: Type[BaseModel] = AnalysisInput

    def _run(self, analysis: str) -> str:
        prompt = f"""
        Turn the following analysis into JSON (no extra text):

        {analysis}

        {{
          "colors": {{"primary":"#","secondary":"#","background":"#"}},
          "components":[{{"name":"button","style":"tailwind-classes"}}]
        }}
        """
        response = genai.GenerativeModel(MODEL_NAME).generate_content(prompt)
        data = response.text.strip()
        if data.startswith("```"):
            data = re.sub(r"```json|```")
        return data

# ---------- TOOL 3 -----------------------------------------------------------
class ComponentGeneratorTool(BaseTool):
    name: str = "Next.js Component Generator"
    description: str = "Produces a full TSX page from design-system JSON."
    args_schema: Type[BaseModel] = ComponentInput

    def _run(self, design_json: str, analysis: str) -> str:
        prompt = f"""
        Build a complete Next.js 15 page component in TypeScript.

        DESIGN JSON:
        {design_json}

        ANALYSIS:
        {analysis}

        Requirements:
        - import statements
        - Tailwind classes from colors
        - header / main / footer
        - interactive button
        - responsive design
        Return TSX code only.
        """
        response = genai.GenerativeModel(MODEL_NAME).generate_content(prompt)
        code = response.text.strip()
        if code.startswith("```"):
            code = re.sub(r"``````typescript|```")
        return code

# ---------- TOOL 4 -----------------------------------------------------------
class FileManagerTool(BaseTool):
    name: str = "File Manager"
    description: str = "Saves analysis, design JSON and TSX files."
    args_schema: Type[BaseModel] = FileManagerInput

    def _run(self, analysis: str, design_json: str, tsx_code: str) -> str:
        Path("outputs").mkdir(exist_ok=True)

        Path("outputs/ui-analysis.md").write_text("# UI Analysis\n\n" + analysis, encoding="utf-8")
        Path("outputs/design-system.json").write_text(design_json, encoding="utf-8")
        Path("outputs/GeneratedComponent.tsx").write_text(tsx_code, encoding="utf-8")

        page = (
            "// Place in app/generated-ui/page.tsx\n\n"
            + tsx_code
        )
        Path("outputs/generated-ui-page.tsx").write_text(page, encoding="utf-8")
        return "Files saved to ./outputs directory."
