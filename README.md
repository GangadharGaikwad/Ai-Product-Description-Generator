# AI Product Description Generator

A full-stack application that generates SEO-optimized product descriptions using AI. The application features a modern React frontend with a Flask backend, leveraging OpenRouter's AI API for generating compelling product descriptions.

## Features

- 🎯 AI-powered product description generation
- 💅 Modern, responsive user interface
- ✨ Real-time character counting and tone analysis
- 🔍 SEO optimization suggestions
- 💾 Local storage for saving generated descriptions
- 📤 Export descriptions in multiple formats
- 🎨 Customizable writing styles and tones
- 🔄 Template system for quick starts

## Tech Stack

### Frontend (client/)
- Next.js with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Radix UI for accessible components
- Local storage for data persistence

### Backend (server/)
- Flask (Python)
- OpenRouter API integration
- Rate limiting and CORS support
- Environment-based configuration

## Prerequisites

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- OpenRouter API key

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd ai-product-des-generator
```

2. Set up the backend:
```bash
cd server
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```

3. Configure environment variables:
Create a `.env` file in the server directory:
```
OPENROUTER_API_KEY=your_api_key_here
```

4. Set up the frontend:
```bash
cd ../client
npm install
```

## Running the Application

1. Start the backend server:
```bash
cd server
python app.py
```
The server will run on `http://localhost:5000`

2. Start the frontend development server:
```bash
cd client
npm run dev
```
The application will be available at `http://localhost:3000`

## API Endpoints

### POST /generate-description
Generates a product description based on provided parameters.

Required fields:
- `product_name`: Name of the product
- `features`: Key features of the product
- `keywords`: SEO keywords to include

Optional fields:
- `tone`: Writing tone (default: "professional")
- `target_audience`: Target market
- `writing_style`: Style of writing
- `length`: Description length (short/medium/long)

## Rate Limiting

The API implements rate limiting:
- 100 requests per day
- 10 requests per minute

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenRouter API for AI capabilities
- Next.js team for the amazing framework
- Flask team for the reliable backend framework 