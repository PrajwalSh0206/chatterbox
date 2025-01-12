from flask import Flask, request, jsonify
import pickle
import numpy as np
import re
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
import nltk
from flask_cors import CORS
nltk.download('stopwords')

# Load artifacts
model = pickle.load(open('trained_model.sav', 'rb'))
vectorizer = pickle.load(open('vectorizer.pkl', 'rb'))

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Define response pools
positive_responses = [
    "That's fantastic to hear!",
    "I'm glad you're feeling positive!",
    "That's wonderful news!",
    "Keep up the great vibes!",
    "Your positivity is contagious!"
]

negative_responses = [
    "I'm sorry to hear that.",
    "That's unfortunate.",
    "I hope things improve for you soon.",
    "Stay strong; better days are ahead.",
    "I'm here if you need support."
]

# Stemming function
port_stem = PorterStemmer()

def stemming(content):
    stemmed_content = re.sub('[^a-zA-Z]', ' ', content)
    stemmed_content = stemmed_content.lower()
    stemmed_content = stemmed_content.split()
    stemmed_content = [port_stem.stem(word) for word in stemmed_content if word not in stopwords.words('english')]
    return ' '.join(stemmed_content)

# API endpoint
@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    input_data = request.json.get('text', '')
    if not input_data:
        return jsonify({"error": "No input text provided"}), 400

    # Preprocess and predict
    processed_input = stemming(input_data)
    transformed_input = vectorizer.transform([processed_input])
    sentiment = model.predict(transformed_input)[0]

    # Generate response
    response = [np.random.choice(positive_responses) if sentiment == 1 else np.random.choice(negative_responses) for _ in range(2)]
    return jsonify({
        "input": input_data,
        "sentiment": "positive" if sentiment == 1 else "negative",
        "response": response
    })

# Run the app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)