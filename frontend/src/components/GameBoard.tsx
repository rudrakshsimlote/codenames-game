// src/components/GameBoard.tsx
import React, { useState, useEffect } from 'react';
import { database } from '../firebaseConfig';
import { onValue, ref } from 'firebase/database';
import './GameBoard.css';
import Spymaster from './Spymaster';  // Add this import

interface Card {
  word: string;
  type: string; // red, blue, neutral, assassin
  revealed: boolean;
}

const GameBoard: React.FC<{ gameId: string, team: 'red' | 'blue', role: 'spymaster' | 'operative' }> = ({ gameId, team, role }) => {
  const [board, setBoard] = useState<Card[]>([]);
  const [clue, setClue] = useState<{ word: string, count: number } | null>(null);

  useEffect(() => {
    console.log("Fetching game board for gameId:", gameId);
    const gameRef = ref(database, `games/${gameId}/board`);
    onValue(gameRef, (snapshot) => {
      const boardData = snapshot.val();
      console.log("Board data:", boardData);
      setBoard(boardData || []);
    });

    const clueRef = ref(database, `games/${gameId}/clue`);
    onValue(clueRef, (snapshot) => {
      const clueData = snapshot.val();
      setClue(clueData);
    });
  }, [gameId]);

  const handleCardClick = (index: number) => {
    console.log("Card clicked:", index);
    fetch('/move', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId, cardIndex: index })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error(data.error);
      }
    });
  };

  const getCardColor = (card: Card) => {
    if (role === 'spymaster' || card.revealed) {
      if (card.type === 'red') return 'red';
      if (card.type === 'blue') return 'blue';
      if (card.type === 'assassin') return 'black';
      return 'grey';
    }
    return 'grey';
  };

  return (
    <div className="game-board">
      {role === 'spymaster' && <Spymaster gameId={gameId} team={team} />}
      {clue && <p>Clue: {clue.word} ({clue.count})</p>}
      {board.map((card, index) => (
        <div 
          key={index} 
          className={`card ${card.revealed ? 'revealed' : ''}`} 
          onClick={() => handleCardClick(index)}
          style={{ backgroundColor: getCardColor(card) }}
        >
          {role === 'spymaster' || card.revealed ? card.word : 'Hidden'}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
