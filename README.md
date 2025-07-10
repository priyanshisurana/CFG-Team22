````markdown
# Flask + Next.js Fullstack Demo

This is a simple full-stack project demonstrating communication between a Flask backend and a Next.js App Router frontend.

Each API route in Flask is tested on a dedicated page in the frontend, making it easy to understand and extend.

---

## Prerequisites

- Node.js (v18 or higher recommended)
- Python 3

---

## Backend Setup (Flask)

1. Navigate to the backend folder:

   ```bash
   cd backend
````

2. Create a virtual environment (optional but recommended):

   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/macOS
   .\venv\Scripts\activate    # Windows
   ```

3. Install dependencies:

   ```bash
   pip install flask flask-cors datetime
   ```

4. Start the Flask server:

   ```bash
   python app.py
   ```

   By default, this runs at `http://localhost:5000`

---

## Frontend Setup (Next.js)

1. Navigate to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

   This will run the app at `http://localhost:3000`

---

## Directory Structure

```
repo-root/
├── backend/
│   └── app.py
├── frontend/
│   └── app/              # Next.js App Router pages
│       └── ...           # Pages for each API endpoint
└── README.md
```

---

## Notes

* Make sure CORS is enabled in `app.py` like so:

  ```python
  CORS(app, supports_credentials=True, origins=["http://localhost:3000"])
  ```

* All API calls in the frontend assume the Flask server is running on `localhost:5000`

---

That's it. Once both servers are running, you can visit `http://localhost:3000` and interact with each Flask API visually.