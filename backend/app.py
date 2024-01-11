from flask import Flask, request
from werkzeug.utils import secure_filename
import os
from flask_cors import CORS
from flask import Flask, request, jsonify
import warnings
warnings.filterwarnings("ignore")
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

from transformers import AutoTokenizer, AutoModel

tokenizer = AutoTokenizer.from_pretrained("microsoft/xclip-base-patch32")
model = AutoModel.from_pretrained("microsoft/xclip-base-patch32")

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = './'

@app.route('/app', methods=['POST'])
def receive_video():
    try:
        video_file = request.files['video']
        print('File size:', len(video_file.read()))
        video_file.seek(0)
    
        video_file.save(r'D:\Research\DL Depression\EmoRec\backend\video.webm')

        # if len(video_file.read()) > 0:
        from face import face_emo
        maximum, labels = face_emo()
        print(maximum)
        print(labels)

        response_data = {
            'message': 'Video received successfully',
            'labels': labels,
            'maximum': maximum
        }

        inputs = tokenizer(text, padding=True, return_tensors="pt")
        text_features = model.get_text_features(**inputs)

        return (response_data), 200
    except Exception as e:
        return jsonify(error=str(e)), 500
    

if __name__ == '__main__':
    app.run(debug=False, port = 8080)

