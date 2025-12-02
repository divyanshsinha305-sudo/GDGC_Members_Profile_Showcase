# GDGC Member Showcase

## Repo structure
- frontend/: static frontend (index.html + styles.css)
- backend/: Python Flask API (members.json + app.py)

## Run backend locally
cd backend
python -m venv venv

# Windows:
venv\Scripts\activate

# macOS / Linux:
source venv/bin/activate
pip install -r requirements.txt
python app.py

## Run frontend locally
Open frontend/index.html in your browser or use Live Server in VS Code.

## Deploy
- Frontend: GitHub Pages
- Backend: Render 

