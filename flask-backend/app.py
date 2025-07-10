from flask import Flask, request, jsonify, session, redirect, url_for, send_file, make_response
from flask_cors import CORS
import io
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'SHHHHHHHHHHHH'  

CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

tasks = {}  # In-memory task store
task_id_counter = 1  # Incremental task ID

# Health check / up-check endpoint
@app.route('/api/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'pong', 'status': 'ok'}), 200


# Simple greeting endpoint using query
@app.route('/api/hello', methods=['GET'])
def hello():
    name = request.args.get('name', 'World')
    return jsonify({'greeting': f"Hello, {name}!"}), 200


# Add a new task using global variables
@app.route('/api/tasks', methods=['POST'])
def add_task():
    global task_id_counter
    data = request.get_json()
    if not data or 'title' not in data:
        return jsonify({"error": "Title is required"}), 400
    task = {
        'id': task_id_counter,
        'title': data['title'],
        'done': False
    }
    tasks[task_id_counter] = task
    task_id_counter += 1
    return jsonify(task), 201


# Return a list
@app.route('/api/tasks', methods=['GET'])
def list_tasks():
    return jsonify(list(tasks.values())), 200


# Handle multi-method endpoints
@app.route('/api/tasks/<int:task_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_task(task_id):
    task = tasks.get(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404

    if request.method == 'GET':
        return jsonify(task)
    elif request.method == 'PUT':
        data = request.get_json()
        task['title'] = data.get('title', task['title'])
        task['done'] = data.get('done', task['done'])
        return jsonify(task)
    elif request.method == 'DELETE':
        del tasks[task_id]
        return jsonify({'message': 'Task deleted'}), 200


# server-side storage - sessions
@app.route('/api/session/set', methods=['POST'])
def set_session():
    data = request.get_json()
    username = data.get('username')
    if not username:
        return jsonify({'error': 'Username required'}), 400
    session['username'] = username
    return jsonify({'message': f'Session set for {username}'}), 200


# Retrieve session data
@app.route('/api/session/get', methods=['GET'])
def get_session():
    username = session.get('username', None)
    if username:
        return jsonify({'username': username}), 200
    else:
        return jsonify({'error': 'No session found'}), 404


# download file
@app.route('/api/download/sample', methods=['GET'])
def download_sample():
    buffer = io.BytesIO()
    buffer.write(b"This is a sample file.\nGenerated on: " + str(datetime.now()).encode())
    buffer.seek(0)
    return send_file(
        buffer,
        as_attachment=True,
        download_name='sample.txt',
        mimetype='text/plain'
    )


# Redirect
@app.route('/api/redirect-test', methods=['GET'])
def redirect_test():
    return redirect(url_for('ping'))


# Custom response with status code and header
@app.route('/api/custom-response', methods=['GET'])
def custom_response():
    response = make_response(jsonify({'message': 'This is a custom response'}), 202)
    response.headers['X-Custom-Header'] = 'FlaskAPI'
    return response


if __name__ == '__main__':
    app.run(debug=True)