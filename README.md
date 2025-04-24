# Notes App

This is a simple Notes App built using React, TypeScript, and Vite. The application allows users to create, edit, and manage notes efficiently.

## Features

- **Note Management**: Create, edit, and delete notes.
- **Sidebar Navigation**: Quickly navigate between different sections of the app.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Custom Styling**: Styled using CSS for a clean and modern look.

## Project Structure

The project is organized as follows:

```
public/
  background.jpg
  vite.svg
src/
  App.css
  App.tsx
  index.css
  main.tsx
  MainLayout.tsx
  NoteForm.tsx
  Sidebar.tsx
  assets/
    react.svg
  lib/
    ai.ts
```

## AI Usage

## AI Features in Smart Notes App
The Smart Notes App integrates free and powerful AI services to enhance the note-taking experience:

1. Summarization
Powered by: OpenRouter (GPT-3.5) with fallback to DeepAI

    Triggered manually by the user via a "🧠 Summarize" button

    Returns a short, AI-generated summary of the note content

    Immediately saved with the note in localStorage

2. Sentiment Detection
Powered by: Hugging Face (DistilBERT SST-2)

    Analyzes the tone of the note and assigns an emoji mood:

    😊 Positive

    😞 Negative

    😐 Neutral

3. Smart Title Generation
Custom logic extracts a meaningful title from the first sentence or line of the note

    Triggered automatically on save if no title is provided

    Would you like the full README template with this integrated, including tech stack, installation, and deployment sections?

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd notes-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

To start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Building for Production

To create a production build:
```bash
npm run build
```

The build output will be located in the `dist/` directory.

### Linting and Formatting

To run ESLint:
```bash
npm run lint
```

## License

This project is licensed under the MIT License.
