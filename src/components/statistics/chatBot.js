import React, { useState } from 'react';
import axios from 'axios';

export default function ChatBot() {
  const [userInput, setUserInput] = useState('');
  const [movieRecommendations, setMovieRecommendations] = useState([]); // Remove TypeScript type annotation

  const handleUserInput = async () => {
    try {
      // Send user input to the API route
      const response = await axios.post('/api/chatbot', { userInput });

      const { movieRecommendations } = response.data; // Update this line as necessary

      setMovieRecommendations(movieRecommendations); // Set the movie recommendations state
      setUserInput(''); // Clear the input field
    } catch (error) {
      console.error('Error interacting with the chatbot:', error);
    }
  };

  return (
    <div className="chatbot">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask for a movie recommendation..."
      />
      <button onClick={handleUserInput}>Send</button>
      <div className="movie-recommendations">
        {movieRecommendations.map((movie, index) => (
          <div key={index}>{movie}</div> // Only display the movie name
        ))}
      </div>
    </div>
  );
}
