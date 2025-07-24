# Project README

## Prerequisites

- **Python**: Make sure you have Python **3.10** or higher installed. IDLE comes bundled with Python.
- **pip**: Ensure you have `pip` available for installing packages.

## Installation

1. **Clone the repository**
   ```bash
   git clone <REPO_URL>
   cd <REPO_DIRECTORY>
   ```

2. **Create a Python virtual environment** (optional, but recommended)
   ```bash
   python3 -m venv env
   source env/bin/activate   # On Windows: env\\Scripts\\activate
   ```

3. **Install required packages**
   ```bash
   pip install --upgrade pip
   pip install ipykernel google-genai
   ```

## Running Jupyter Notebooks

1. **Start Jupyter Notebook**
   ```bash
   jupyter-notebook
   ```

2. In the browser window that opens, navigate to the cloned repository and open the desired notebook files.

## Branching Strategy

- Before making any changes, create a development branch named after you:
  ```bash
  git checkout -b <YourName>-dev
  ```
- Commit your changes to this branch.
- Push the branch to the remote repository:
  ```bash
  git push origin <YourName>-dev
  ```
- Open a pull request against `main` (or the default branch) when ready for review.

## Contributing Guidelines

- Work exclusively on your `<YourName>-dev` branch.
- Follow existing coding styles and notebook conventions.
- Ensure all notebooks run without errors before committing.

---

*Feel free to customize this README as your project evolves.*

