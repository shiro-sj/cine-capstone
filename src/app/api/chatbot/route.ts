// app/api/chatbot/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  const { userInput } = await req.json();
  const openaiApiKey = process.env.OPENAI_API_KEY;
  const movieApiKey = process.env.MOVIE_API_KEY;

  try {
    console.log('User input:', userInput); // Log the user input

    // Call OpenAI GPT API to get a response
    const gptResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a movie recommendation assistant.' },
          { role: 'user', content: userInput }
        ],
        max_tokens: 150,
        temperature: 0.7
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openaiApiKey}`
        }
      }
    );

    const gptMessage = gptResponse.data.choices[0].message.content;
    console.log('GPT Message:', gptMessage); // Log the response from GPT

    // Example genre extraction for testing
    const genre = 'action'; 
    const movieResponse = await axios.get(
      `https://www.omdbapi.com/?apikey=${movieApiKey}&s=${genre}&type=movie`
    );

    // Check if movies were found
    if (!movieResponse.data.Search) {
      console.error('No movies found:', movieResponse.data); // Log if no movies are found
      return NextResponse.json({ error: 'No movies found' }, { status: 404 });
    }

    // Return only the movie titles
    const movieRecommendations = movieResponse.data.Search.map((movie: { Title: string }) => movie.Title);
    console.log(movieRecommendations);
    return NextResponse.json({ movieRecommendations });
  } catch (error) {
    console.error('Error in POST handler:', error); // Log the error
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
