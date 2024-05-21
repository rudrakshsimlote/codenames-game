// src/components/Spymaster.tsx
import React, { useState } from 'react';

const Spymaster: React.FC<{ gameId: string, team: 'red' | 'blue' }> = ({ gameId, team }) => {
  const [clue, setClue] = useState('');
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  const handleSubmitClue = () => {
    console.log("Submitting clue...");
    fetch('/submit-clue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameId, team, clue, selectedCards })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error(data.error);
      }
      setClue('');
      setSelectedCards([]);
    });
  };

  return (
    <div>
      <h2>Give Clue</h2>
      <input type="text" value={clue} onChange={(e) => setClue(e.target.value)} />
      <button onClick={handleSubmitClue}>Submit Clue</button>
      <div className="card-selection">
        {selectedCards.map((index) => (
          <span key={index}>{index}</span>
        ))}
      </div>
    </div>
  );
};

export default Spymaster;
