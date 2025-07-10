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
   cd flask-backend
   ```

2. Create a virtual environment (optional but recommended):

   ```bash
   python -m venv venv
   source venv/bin/activate  # Linux/macOS
   .\venv\Scripts\activate    # Windows
   ```

3. Install dependencies:

   ```bash
   pip install -r requirements.txt
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
   cd next-flask-app
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
demo/
├── flask-backend/
│   ├── app.py
│   └── requirements.txt
├── next-flask-app/
│   ├── src/
│   │   └── app/              # Next.js App Router pages
│   │       ├── page.tsx      # Main page with API links
│   │       ├── ping/         # Ping endpoint demo
│   │       ├── tasks/        # Task manager demo
│   │       └── ...           # Other API endpoint pages
│   ├── package.json
│   └── ...
└── README.md
```

---

## Available API Endpoints

The Flask backend provides the following endpoints:

- **GET /api/ping** - Health check endpoint
- **GET /api/hello** - Simple greeting with query parameters
- **GET /api/tasks** - Get all tasks
- **POST /api/tasks** - Create a new task
- **DELETE /api/tasks/{id}** - Delete a task
- **GET /api/session** - Session management demo
- **GET /api/download** - File download demo
- **GET /api/redirect** - Redirect demo
- **GET /api/custom-response** - Custom response headers demo

---

## Features

- **Task Manager**: Create, view, and delete tasks with a clean UI
- **CORS Support**: Properly configured for frontend-backend communication
- **TypeScript Support**: Full TypeScript implementation in the frontend
- **Modern UI**: Clean, responsive design with Tailwind CSS

---

## Notes

- Make sure CORS is enabled in `app.py` like so:

  ```python
  CORS(app, supports_credentials=True, origins=["http://localhost:3000"])
  ```

- All API calls in the frontend assume the Flask server is running on `localhost:5000`
- The frontend uses TypeScript with proper type definitions
- Task status is visually indicated with different background colors

---

## Getting Started

1. Start the Flask backend server (port 5000)
2. Start the Next.js frontend server (port 3000)
3. Visit `http://localhost:3000` to interact with each Flask API endpoint visually

That's it! You now have a fully functional full-stack application with Flask and Next.js.
