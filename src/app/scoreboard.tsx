import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert} from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ScoreCard from '../components/ScoreCard';
import { Score } from '../types/score';
import { createScore, fetchScores } from '../services/scoreService';

const PLAYER_NAME_KEY = 'playerName';

const ScoreboardScreen = () => {
  const params = useLocalSearchParams<{
    score?: string;
    totalQuestions?: string;
    timeInSeconds?: string;
    justPlayed?: string;
  }>();

    const [scores, setScores] = useState<Score[]>([]);
    const [playerName, setPlayerName] = useState('');
    const [loading, setLoading] = useState(true);
    const [personalScoreSaved, setPersonalScoreSaved] = useState(false);

    useEffect(() => {
        loadScoreboard();
    }, []);

    const loadScoreboard = async () => {
        try{
            setLoading(true);

            const storedName = await AsyncStorage.getItem(PLAYER_NAME_KEY);
            const name = storedName ?? '';
            setPlayerName(name);

            const justPlayed = params.justPlayed === 'true';
            if(justPlayed && name && params.score && params.timeInSeconds && !personalScoreSaved) {
                await createScore({
                    name,
                    score: Number(params.score),
                    timeInSeconds: Number(params.timeInSeconds),
                });
                setPersonalScoreSaved(true);
            }
            const data = await fetchScores();

            const sortedScores = data.sort((a, b)=> {
                if(b.score !== a.score) {
                    return b.score - a.score;
                }
                return a.timeInSeconds - b.timeInSeconds;
            });
            setScores(sortedScores);
        } catch (error) {
            console.error(error);
            Alert.alert('Fout', 'Scoreboard kon niet geladen worden.');
        } finally {
            setLoading(false);
        }
    };

const showPersonalScore = params.justPlayed === 'true' && !!params.score && !!params.timeInSeconds;

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Scoreboard',
          headerTitleAlign: 'center',
        }}
      />

      {showPersonalScore ? (
        <View style={styles.personalScoreBox}>
          <Text style={styles.personalTitle}>Jouw resultaat</Text>
          <Text style={styles.personalText}>
            {playerName} · Score: {params.score}/{params.totalQuestions} · Tijd:{' '}
            {params.timeInSeconds}s
          </Text>
        </View>
      ) : null}

      <Text style={styles.title}>Scoreboard</Text>

      <FlatList
        data={scores}
        keyExtractor={(item, index) => item._id ?? index.toString()}
        renderItem={({ item, index }) => {
          const isCurrentPlayer =
            item.name.trim().toLowerCase() ===
            playerName.trim().toLowerCase();

          return (
            <ScoreCard
              score={item}
              rank={index + 1}
              isCurrentPlayer={isCurrentPlayer}
            />
          );
        }}
      />
    </View>
  );
};

export default ScoreboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  personalScoreBox: {
    backgroundColor: '#dcfce7',
    borderColor: '#22c55e',
    borderWidth: 2,
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
  },
  personalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#15803d',
    marginBottom: 6,
  },
  personalText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#166534',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 16,
  },
});
