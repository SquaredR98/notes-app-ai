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
