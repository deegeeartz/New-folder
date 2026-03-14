# Quonote Digital - React Landing Page

This project is a React-based landing page for Quonote Digital, a fictional tech firm. It's built with Vite and Tailwind CSS.

## Deployment Docs

For production deployment and troubleshooting on cPanel/Passenger, see:

- [`DEPLOYMENT_RUNBOOK.md`](./DEPLOYMENT_RUNBOOK.md)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd quonote-react-js
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up your environment variables:**

    Copy `.env.example` to `.env` and fill in the values:

    ```bash
    cp .env.example .env
    ```

    | Variable | Description |
    | --- | --- |
    | `GEMINI_API_KEY` | Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey) (server-side only) |
    | `RESEND_API_KEY` | Resend API key for contact form emails. Create a free account at [resend.com](https://resend.com) (3,000 emails/month free) |
    | `VITE_API_BASE_URL` | Leave empty for local dev; set to your domain in production |
    | `PORT` | Express server port (default: `3001`) |

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Building for Production

To create a production build, run:

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Linting

To run the linter, use:

```bash
npm run lint
```
