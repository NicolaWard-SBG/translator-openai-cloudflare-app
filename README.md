# Language Translator

### A simple language translation app built with React, Cloudflare Workers and the OpenAI API. Developed as a side project after completing the first Deployment module of the Scrimba AI Engineer Pathway.

### Features

- Translate text into Spanish, French, or Italian using GPT-3.5-turbo
- Responsive UI with React hooks and CSS animations
- Built-in loading and error handling states
- Edge computing with Cloudflare Workers for optimal performance
- Deployed on Cloudflare Pages for global availability

### Technology Stack

- **Frontend**: React (functional components, hooks)
- **Backend**: Cloudflare Workers (replacing Express.js server)
- **AI Engine**: OpenAI API (gpt-3.5-turbo) via the openai Node.js SDK
- **HTTP Client**: fetch for communication between client and worker
- **Styling**: Modern CSS for layout, responsiveness and animations
- **Deployment**: Cloudflare Pages with edge deployment

### Architecture Evolution

This project originally used an Express.js backend server but has been upgraded to use **Cloudflare Workers** for enhanced performance and scalability. This transition was implemented during the Deployment section of the AI Engineer pathway course.

### Cloudflare Workers Advantages

- **Edge Computing**: Code runs closer to users worldwide for reduced latency
- **Built-in Caching**: Intelligent caching strategies to reduce API calls and improve response times
- **Rate Limiting**: Automatic protection against abuse and excessive requests
- **Zero Cold Starts**: Instant response times without server spin-up delays
- **Global Distribution**: Automatic deployment across Cloudflare's global network
- **Serverless Scaling**: Handles traffic spikes without manual scaling

## Tech Stack

| Layer      | Tech                            |
| ---------- | ------------------------------- |
| Frontend   | React (Vite, hooks, functional) |
| Styling    | Modern CSS with animations      |
| Backend    | Cloudflare Pages Functions      |
| AI Engine  | OpenAI (GPT-3.5-turbo) API      |
| Deployment | Cloudflare Pages (global CDN)   |

### Project Structure

```
language-translator/
├── public/ # Static assets (e.g. globe icon)
├── src/ # React app files
├── functions/api/ # Cloudflare Pages API endpoint
├── package.json # Project metadata
├── vite.config.js # Vite build config
└── README.md # Project docs
```

### Demo Video

![Video Demo](https://raw.githubusercontent.com/NicolaWard-SBG/language-translator-openai-project/refs/heads/main/resources/OpenAI-LLM-LanguageTranslator-Project.gif)

### Deployment

Hosted on [Cloudflare Pages](https://translator-openai-cloudflare-app.pages.dev/), offering:

- Automatic builds from GitHub
- Global CDN distribution
- HTTPS by default
- Preview deployments for branches

You can test the deployed API via:

```bash
curl -X POST https://<your-site>.pages.dev/api/translate \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello", "language": "french"}'
```
