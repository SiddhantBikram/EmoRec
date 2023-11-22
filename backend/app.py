from flask import Flask, request
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = './'  # Set the path to the upload directory
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/app', methods=['POST'])
def upload_file():
    if 'video' not in request.files:
        print('1')
        return 'No video part', 400
    file = request.files['video']
    if file.filename == '':
        print('2')
        return 'No selected file', 400
    if file:
        print('3')
        filename = secure_filename(file.filename)
        print(filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return 'File successfully uploaded', 200

if __name__ == "__main__":
    app.run(debug=True, port = 8080)

