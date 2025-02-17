# server/app.py
import os
from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from dotenv import load_dotenv
import warnings

# Silence the development warning about in-memory storage
warnings.filterwarnings('ignore', message='Using the in-memory storage')

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
# Enable CORS with specific origins
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:3000",
            "https://your-frontend-domain.vercel.app"  # Add your Vercel domain
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization", "Accept", "Origin"],
        "supports_credentials": False
    }
})

# Configuration
app.config.update(
    MAX_CONTENT_LENGTH=16 * 1024 * 1024,  # 16MB max request size
    REQUEST_TIMEOUT=30  # Increased timeout
)

# Retrieve API key from environment variable
API_KEY = os.getenv("OPENROUTER_API_KEY")
if not API_KEY:
    raise ValueError("OPENROUTER_API_KEY environment variable is not set")

API_URL = "https://openrouter.ai/api/v1/chat/completions"

# Configure limiter with in-memory storage for development
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["100 per day", "10 per minute"]
)

# Root route
@app.route('/')
def index():
    return jsonify({
        "status": "ok",
        "message": "Welcome to the Product Description Generator API",
        "endpoints": {
            "/generate-description": {
                "method": "POST",
                "description": "Generate a product description",
                "required_fields": ["product_name", "features", "keywords"],
                "optional_fields": ["tone"]
            }
        }
    })

@app.route('/generate-description', methods=['POST'])
@limiter.limit("10 per minute")
def generate_description():
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                "error": "Invalid request",
                "details": "No data provided"
            }), 400

        required_fields = ['product_name', 'features', 'keywords']
        for field in required_fields:
            if not data.get(field):
                return jsonify({
                    "error": "Missing required field",
                    "details": f"The field '{field}' is required"
                }), 400

        # Extract data
        product_name = data['product_name']
        features = data['features']
        keywords = data['keywords']
        tone = data.get('tone', 'professional')
        
        # Format the messages for the AI
        messages = [
            {
                "role": "system",
                "content": (
                    "You are an expert product copywriter specializing in creating compelling, SEO-optimized product descriptions. "
                    "Your writing style is engaging, persuasive, and professional. "
                    "Follow these guidelines:\n"
                    "1. Start with a powerful hook\n"
                    "2. Use sensory and emotional language\n"
                    "3. Highlight unique selling points\n"
                    "4. Include technical details naturally\n"
                    "5. End with a strong call-to-action\n"
                    "6. Break the description into clear paragraphs\n"
                    "7. Use bullet points for key features when appropriate\n"
                    "8. Incorporate keywords naturally and strategically"
                )
            },
            {
                "role": "user",
                "content": (
                    f"Create a compelling product description with the following details:\n\n"
                    f"Product: {product_name}\n"
                    f"Target Audience: {data.get('target_audience', 'general consumers')}\n"
                    f"Key Features: {features}\n"
                    f"Keywords to Include: {keywords}\n"
                    f"Tone: {tone}\n"
                    f"Writing Style: {data.get('writing_style', 'descriptive')}\n"
                    f"Length: {data.get('length', 'medium')} "
                    f"(short ≈ 100 words, medium ≈ 200 words, long ≈ 300 words)\n\n"
                    "Structure the description with:\n"
                    "1. An attention-grabbing headline\n"
                    "2. A powerful opening paragraph\n"
                    "3. Organized feature highlights\n"
                    "4. Benefits to the user\n"
                    "5. Technical specifications (if relevant)\n"
                    "6. A compelling call-to-action\n\n"
                    "Make it engaging, informative, and persuasive for online shoppers. "
                    "Use formatting like bullet points, bold text (with ** **), or sections where appropriate."
                )
            }
        ]

        # Make request to OpenRouter API
        response = requests.post(
            API_URL,
            headers={
                "Authorization": f"Bearer {API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "AI Product Description Generator",
            },
            json={
                "model": "openai/gpt-3.5-turbo",
                "messages": messages,
                "temperature": 0.8,  # Increased for more creativity
                "max_tokens": 800,   # Increased for longer responses
                "stream": False,
                "presence_penalty": 0.3,  # Encourages more diverse language
                "frequency_penalty": 0.3  # Reduces repetition
            }
        )

        if response.status_code != 200:
            return jsonify({
                "error": "API Error",
                "details": f"OpenRouter API returned status code {response.status_code}"
            }), 500

        response_data = response.json()
        
        if not response_data.get('choices'):
            return jsonify({
                "error": "Invalid API Response",
                "details": "No content in API response"
            }), 500

        description = response_data['choices'][0]['message']['content']
        
        return jsonify({
            "description": description
        })

    except requests.exceptions.RequestException as e:
        return jsonify({
            "error": "API Connection Error",
            "details": str(e)
        }), 500
    except Exception as e:
        return jsonify({
            "error": "Server Error",
            "details": str(e)
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        "status": "ok",
        "message": "Server is running"
    })

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "error": "Not Found",
        "message": "The requested resource was not found"
    }), 404

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({
        "error": "Method Not Allowed",
        "message": f"The {request.method} method is not allowed for this endpoint",
        "allowed_methods": error.valid_methods
    }), 405

@app.errorhandler(429)
def ratelimit_handler(error):
    return jsonify({
        "error": "Too Many Requests",
        "message": "Rate limit exceeded",
        "retry_after": error.description
    }), 429

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "error": "Internal Server Error",
        "message": "An unexpected error occurred"
    }), 500

# Add CORS headers to all responses
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
