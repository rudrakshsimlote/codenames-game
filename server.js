// Updated server.js
const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Path to your service account key JSON file
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://codenames-game-e2513-default-rtdb.firebaseio.com/' // Replace with your database URL
});

// Reference to Firebase Realtime Database
const db = admin.database();

// Function to generate a new game board
function generateGameBoard() {
  const words = ['apple', 'banana', 'cat', 'dog', 'tree', 'car', 'sky', 'river', 'sun', 'moon', 'star', 'mountain', 'ocean', 'forest', 'desert', 'island', 'valley', 'plain', 'hill', 'field', 'pond', 'lake', 'stream', 'cloud', 'rain']; // Add more words if needed
  const shuffledWords = words.sort(() => 0.5 - Math.random()).slice(0, 25); // Pick 25 words randomly

  const numRedCards = 8;
  const numBlueCards = 8;
  const numNeutralCards = 7;
  const numAssassinCards = 1;

  const board = [];

  for (let i = 0; i < numRedCards; i++) board.push({ word: shuffledWords.pop(), type: 'red', revealed: false });
  for (let i = 0; i < numBlueCards; i++) board.push({ word: shuffledWords.pop(), type: 'blue', revealed: false });
  for (let i = 0; i < numNeutralCards; i++) board.push({ word: shuffledWords.pop(), type: 'neutral', revealed: false });
  for (let i = 0; i < numAssassinCards; i++) board.push({ word: shuffledWords.pop(), type: 'assassin', revealed: false });

  // Shuffle the board so the cards are mixed
  return board.sort(() => 0.5 - Math.random());
}

// Endpoint to start a new game
app.post('/start-game', (req, res) => {
  const gameId = db.ref('games').push().key;
  const gameData = {
    id: gameId,
    players: [],
    board: generateGameBoard(),
    turn: 'red',
    status: 'waiting', // Set to 'in-progress' if ready to start immediately
    teams: {
      red: { spymaster: null, operatives: [] },
      blue: { spymaster: null, operatives: [] }
    }
  };
  db.ref(`games/${gameId}`).set(gameData)
    .then(() => res.json({ gameId }))
    .catch(error => res.status(500).json({ error: error.message }));
});

// Endpoint to join a game
app.post('/join-game', (req, res) => {
  const { gameId, playerId, team, role } = req.body;
  db.ref(`games/${gameId}`).once('value', (snapshot) => {
    const gameData = snapshot.val();
    if (!gameData) {
      return res.status(404).json({ error: 'Game not found' });
    }
    if (role === 'spymaster') {
      gameData.teams[team].spymaster = playerId;
    } else {
      gameData.teams[team].operatives.push(playerId);
    }
    db.ref(`games/${gameId}`).set(gameData)
      .then(() => res.json({ success: true }))
      .catch(error => res.status(500).json({ error: error.message }));
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
