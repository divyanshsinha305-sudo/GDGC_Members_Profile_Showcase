<h1>GDGC Member Showcase</h1>

<hr>

<p>
A lightweight, fast member-profile web app with a static frontend and a minimal Flask backend.
This README is GitHub-ready and uses simple HTML for styling where helpful (title color, horizontal rules).
</p>

---

## Project Structure

```
GDGC-Member-Showcase/
│
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
└── backend/
    ├── package.json
    ├── members.json
    └── server.js
```

---

## Features

* Simple, responsive static frontend (HTML/CSS/JS)
* Flask backend serving JSON member data via simple endpoints
* Search/filter-ready UI (client-side)
* Easy to run locally and deploy (GitHub Pages + Render recommended)
* Beginner-friendly layout and code structure

---

## Run Frontend Locally

* Open `frontend/index.html` directly in your browser.

---

## Data Format (members.json)

```
[
  {
    "id": 1,
    "name": "John Doe",
    "role": "Web Developer",
    "domain": "Frontend",
    "bio": "Short bio or tagline",
    "github": "https://github.com/johndoe",
    "linkedin": "https://linkedin.com/in/johndoe",
    "portfolio": "https://johndoe.dev"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "role": "Backend Developer",
    "domain": "APIs",
    "bio": "Short bio",
    "github": "",
    "linkedin": ""
  }
]
```
Make sure each member has a unique `id`. The backend reads this file and returns JSON responses.

---
## Result:

<img width="1575" height="759" alt="image" src="https://github.com/user-attachments/assets/4fcebee7-ddf9-4246-98a2-d9c4ae8c3032" />





