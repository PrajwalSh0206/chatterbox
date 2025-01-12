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
    "You're doing amazing!",
    "That's so inspiring!",
    "I'm so happy for you!",
    "That's the spirit!",
    "You're on the right track!",
    "You're crushing it!",
    "Amazing effort!",
    "You're unstoppable!",
    "Keep up the momentum!",
    "Your enthusiasm is uplifting!",
    "That's such great news!",
    "You’re absolutely thriving!",
    "You're making progress!",
    "You're radiating positivity!",
    "That’s a big win!",
    "You're shining bright!",
    "This is your moment!",
    "You’re setting an example!",
    "That's so encouraging!",
    "You've got this!",
    "You're a force to be reckoned with!",
    "Way to go!",
    "You’re on fire!",
    "You’re making a difference!",
    "You're on top of the world!",
    "You're amazing at what you do!",
    "That's pure brilliance!",
    "You're an inspiration!",
    "Keep reaching for the stars!",
    "You're showing great determination!",
    "Your hard work is paying off!",
    "The best is yet to come!",
    "You're achieving greatness!",
    "You’re rocking it!",
    "You’ve got the magic touch!",
    "You're a shining star!",
    "Your efforts are remarkable!",
    "You’re turning dreams into reality!",
    "You’re full of potential!",
    "That’s so uplifting to hear!",
    "You’ve got an amazing attitude!",
    "Your positivity lights up the room!",
    "You’re an unstoppable force!",
    "You’re doing something extraordinary!",
    "Your progress is inspiring!",
    "You're on a roll!",
    "You’re absolutely smashing it!",
    "You’ve got what it takes!",
    "You’re a natural!",
    "You’re so talented!",
    "You’ve got the power to succeed!",
    "You’re making things happen!",
    "Keep the great energy flowing!",
    "You’re heading in the right direction!",
    "You’re making waves!",
    "You're so uplifting!",
    "Your happiness is contagious!",
    "Your outlook is refreshing!",
    "You’re a positive influence!",
    "You’re spreading so much joy!",
    "Your passion is inspiring!",
    "You’re changing the game!",
    "You’re living your best life!",
    "You’re so full of life!",
    "Your success is well-deserved!",
    "You’re a beacon of hope!",
    "You’re creating something beautiful!",
    "You’re absolutely brilliant!",
    "You’ve got this in the bag!",
    "Your energy is infectious!",
    "You’re reaching new heights!",
    "You're building something incredible!",
    "You’re an absolute gem!",
    "You’re a joy to be around!",
    "You’re such a bright light!",
    "Your efforts are inspiring others!",
    "You’re accomplishing amazing things!",
    "Your achievements are impressive!",
    "You’re a master at what you do!",
    "You’re doing something truly special!",
    "You're absolutely thriving!",
    "You’re breaking boundaries!",
    "Your resilience is admirable!",
    "You’re making a huge impact!",
    "You’re destined for greatness!",
    "You’re leaving a legacy!",
    "You’re a breath of fresh air!",
    "You’re so driven and focused!",
    "You’re truly remarkable!",
    "You’re a role model for others!",
    "Your positivity is making waves!",
    "You're setting the bar high!",
    "You're leading the way!",
    "You're a powerhouse!",
    "Your potential is limitless!",
    "You’re inspiring greatness in others!"
]

negative_responses = [
    "I'm sorry to hear that.",
    "That's unfortunate.",
    "I hope things improve for you soon.",
    "Stay strong; better days are ahead.",
    "I'm here if you need support.",
     "That sounds really tough.",
    "I’m here for you during this difficult time.",
    "It’s okay to feel this way.",
    "Take your time to process things.",
    "You don’t have to go through this alone.",
    "I wish I could make it better for you.",
    "That must be really frustrating.",
    "I can only imagine how hard that must be.",
    "You’re not alone in this.",
    "Let me know if there’s anything I can do to help.",
    "I'm here to listen if you want to talk.",
    "It's okay to not be okay right now.",
    "I understand how difficult this must be for you.",
    "I’m sorry you’re going through this.",
    "That’s really challenging to deal with.",
    "I’m sending you strength and support.",
    "Things might feel heavy right now, but they can get better.",
    "It’s hard to face situations like this.",
    "You’re doing the best you can, and that’s enough.",
    "I can see why this would be upsetting.",
    "Take it one step at a time.",
    "You don’t have to face this alone.",
    "I’m sorry things are feeling this way for you.",
    "I’m here to help however I can.",
    "That must feel overwhelming.",
    "You’re allowed to feel upset about this.",
    "It's tough to go through something like this.",
    "You deserve to have support during this time.",
    "I hope you find some peace soon.",
    "It’s okay to take a break and focus on yourself.",
    "That’s a lot to handle right now.",
    "I’m sorry this has been so hard on you.",
    "Sometimes life throws challenges our way.",
    "You’re stronger than you realize.",
    "I believe you’ll get through this.",
    "It’s okay to lean on others when times are hard.",
    "Take the time you need to heal.",
    "It’s understandable to feel this way given what’s happened.",
    "Try not to be too hard on yourself.",
    "This situation sounds very painful.",
    "I’m so sorry you’re dealing with this.",
    "You’re not at fault for feeling this way.",
    "I wish I could take this pain away for you.",
    "Life can be unfair sometimes.",
    "It's okay to let your emotions out.",
    "You’re handling this as best as anyone could.",
    "Things might feel dark now, but light will come again.",
    "You’re doing what you can, and that’s important.",
    "Don’t hesitate to ask for help if you need it.",
    "This isn’t easy, and that’s okay.",
    "Even though it’s hard now, you’re not alone.",
    "You don’t have to have all the answers right now.",
    "I hope you find comfort soon.",
    "Sometimes all we can do is take it one day at a time.",
    "You’re allowed to feel sad about this.",
    "It’s okay to focus on yourself for now.",
    "I’m so sorry this has happened to you.",
    "No one deserves to go through this.",
    "Your feelings are valid and important.",
    "You’ve been through a lot; it’s okay to take a moment.",
    "It’s hard to see it now, but things can improve.",
    "I’m sorry you have to deal with this right now.",
    "This sounds really challenging to face.",
    "You’re not a burden for feeling this way.",
    "I’m here to stand by you.",
    "It’s okay to reach out for help if you need it.",
    "Don’t forget to be gentle with yourself.",
    "I know this must be hard to process.",
    "You have every right to feel upset about this.",
    "I wish I could make things better for you.",
    "This is a lot to carry, and I’m sorry.",
    "You don’t have to go through this on your own.",
    "It’s okay to take it slow and steady.",
    "Sometimes just getting through the day is enough.",
    "This must feel like a heavy weight to bear.",
    "I wish there were something I could do to ease this.",
    "It’s understandable that you’re feeling this way.",
    "Your emotions are valid and important.",
    "You’ve been through so much; it’s okay to take a break.",
    "This situation isn’t your fault.",
    "I’m sending you all my support.",
    "It’s okay to ask for help when you need it.",
    "I’m here to support you in any way I can.",
    "You’re doing better than you think.",
    "I hope you can find a moment of peace soon.",
    "Take the time you need to recover.",
    "This sounds incredibly hard to face.",
    "You’re not weak for feeling this way.",
    "I’m so sorry you’re going through this.",
    "It’s okay to not have it all figured out yet.",
    "Please know you’re not alone in this.",
    "I hope brighter days come your way soon.",
    "It’s okay to feel vulnerable right now."
]

# Positive face emojis
positive_emojis = [
    "😊",  # Smiling Face with Smiling Eyes
    "😃",  # Grinning Face with Big Eyes
    "😄",  # Grinning Face with Smiling Eyes
    "😁",  # Beaming Face with Smiling Eyes
    "😍",  # Smiling Face with Heart-Eyes
    "🤩",  # Star-Struck
    "🥰",  # Smiling Face with Hearts
    "😇",  # Smiling Face with Halo
    "😌",  # Relieved Face
    "🤗"   # Hugging Face
]

# Negative face emojis
negative_emojis = [
    "😞",  # Disappointed Face
    "😢",  # Crying Face
    "😔",  # Pensive Face
    "😟",  # Worried Face
    "😫",  # Tired Face
    "😭",  # Loudly Crying Face
    "😩",  # Weary Face
    "😒",  # Unamused Face
    "😕",  # Confused Face
    "🥺"   # Pleading Face
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
    size=3
    # Generate response
    response = (
     [np.random.choice(positive_emojis) for _ in range(size)] + np.random.choice(positive_responses, size, replace=False).tolist()
    if sentiment == 1
    else  [np.random.choice(negative_emojis) for _ in range(size)] + np.random.choice(negative_responses, size, replace=False).tolist()
)
   
    return jsonify({
        "input": input_data,
        "sentiment": "positive" if sentiment == 1 else "negative",
        "response": response
    })

# Run the app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5002)