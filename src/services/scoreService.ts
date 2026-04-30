import { supabase } from '../lib/supabase';
import {Score} from '../types/score';

export const fetchScores = async (): Promise<Score[]> => {
  const {data, error} = await supabase
    .from('scores')
    .select('*')
    .order('score', { ascending: false })
    .order('time_in_seconds', { ascending: true });

  if (error) {
    throw error;
  }
  
  return data.map((item)=> ({
    id: item.id,
    name: item.name,
    score: item.score,
    timeInSeconds: item.time_in_seconds,
    createdAt: item.created_at,
  }));
};

export const createScore = async (score: Score): Promise<Score> => {
  const { data, error } = await supabase
    .from('scores')
    .insert({
      name: score.name,
      score: score.score,
      time_in_seconds: score.timeInSeconds,
    })
    .select()
    .single();
  if (error) {
    throw error;
  }

  return {
    id: data.id,
    name: data.name,
    score: data.score,
    timeInSeconds: data.time_in_seconds,
    createdAt: data.created_at,
  };
};