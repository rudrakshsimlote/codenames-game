# Codenames Game

A web-based implementation of the popular board game Codenames. This project includes a frontend built with React and TypeScript, and a backend using Node.js and Firebase Realtime Database for real-time game management.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- Multiplayer game setup
- Real-time game updates using Firebase Realtime Database
- Separate roles for Spymaster and Operative
- Interactive game board with color-coded cards
- Clue submission and guess validation

## Installation

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

### Backend Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/codenames-game.git
    cd codenames-game
    ```

2. Navigate to the backend directory and install dependencies:

    ```sh
    cd backend
    npm install
    ```

3. Set up Firebase:

   - Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
   - Obtain your Firebase service account key and save it as `serviceAccountKey.json` in the backend directory.
   - Update the `databaseURL` in `server.js` to match your Firebase project URL.

4. Start the backend server:

    ```sh
    node server.js
    ```

### Frontend Setup

1. Navigate to the frontend directory and install dependencies:

    ```sh
    cd ../frontend
    npm install
    ```

2. Create a `.env` file in the frontend directory with your Firebase configuration:

    ```plaintext
    REACT_APP_API_KEY=your_api_key
    REACT_APP_AUTH_DOMAIN=your_project_id.firebaseapp.com
    REACT_APP_DATABASE_URL=https://your_project_id.firebaseio.com
    REACT_APP_PROJECT_ID=your_project_id
    REACT_APP_STORAGE_BUCKET=your_project_id.appspot.com
    REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
    REACT_APP_APP_ID=your_app_id
    ```

3. Start the frontend development server:

    ```sh
    npm start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Click on "Start Game" to create a new game session.
3. Players can join as Spymaster or Operative for the Red or Blue team.
4. Spymasters can give clues, and Operatives can guess the words.

## Project Structure

codenames-game/
├── backend/
│   ├── server.js
│   ├── serviceAccountKey.json
│   └── package.json
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   ├── src/
│   │   ├── components/
│   │   │   ├── GameBoard.tsx
│   │   │   ├── Spymaster.tsx
│   │   │   └── ...
│   │   ├── App.tsx
│   │   ├── index.tsx
│   │   ├── firebaseConfig.ts
│   │   └── ...
│   ├── .env
│   ├── package.json
│   └── ...
├── README.md
└── ...

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
