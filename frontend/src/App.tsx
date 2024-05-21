// src/App.tsx
import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import './App.css';

const App: React.FC = () => {
  const [gameId, setGameId] = useState<string | null>(null);
  const [team, setTeam] = useState<'red' | 'blue' | null>(null);
  const [role, setRole] = useState<'spymaster' | 'operative' | null>(null);

  const handleStartGame = () => {
    console.log("Starting game...");
    fetch('/start-game', { method: 'POST' })
      .then(response => {
        console.log("Response received:", response);
        if (!response.ok) {
          throw new Error("Failed to start game");
        }
        return response.json();
      })
      .then(data => {
        console.log("Game started with ID:", data.gameId);
        setGameId(data.gameId);
      })
      .catch(error => {
        console.error("Error starting game:", error);
      });
  };

  const handleJoinGame = (team: 'red' | 'blue', role: 'spymaster' | 'operative') => {
    console.log("Joining game...");
    fetch('/join-game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId, playerId: 'examplePlayerId', team, role })
    })
      .then(response => {
        console.log("Join response received:", response);
        if (!response.ok) {
          throw new Error("Failed to join game");
        }
        return response.json();
      })
      .then(() => {
        setTeam(team);
        setRole(role);
      })
      .catch(error => {
        console.error("Error joining game:", error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Codenames Game</h1>
        {gameId ? (
          <>
            {!team && (
              <div>
                <h2>Join a Team</h2>
                <button className="red-team" onClick={() => handleJoinGame('red', 'spymaster')}>Join Red Team as Spymaster</button>
                <button className="red-team" onClick={() => handleJoinGame('red', 'operative')}>Join Red Team as Operative</button>
                <button className="blue-team" onClick={() => handleJoinGame('blue', 'spymaster')}>Join Blue Team as Spymaster</button>
                <button className="blue-team" onClick={() => handleJoinGame('blue', 'operative')}>Join Blue Team as Operative</button>
              </div>
            )}
            {team && role && <GameBoard gameId={gameId} team={team} role={role} />}
          </>
        ) : (
          <button onClick={handleStartGame}>Start Game</button>
        )}
      </header>
    </div>
  );
};

export default App;
