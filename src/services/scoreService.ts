import {Score} from '../types/score';

const API_URL = 'https://your-api-url.com/scores';

export const fetchScores = async (): Promise<Score[]> => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error('Scores konden niet geladen worden.');
  }

  return response.json();
};

export const createScore = async (score: Score): Promise<Score> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(score),
  });

  if (!response.ok) {
    throw new Error('Score kon niet opgeslagen worden.');
  }

  return response.json();
};