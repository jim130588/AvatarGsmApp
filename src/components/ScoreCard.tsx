import { View, Text, StyleSheet } from 'react-native';
import { Score } from '../types/score';

type ScoreCardProps = {
  score: Score;
  rank: number;
  isCurrentPlayer: boolean;
};

const ScoreCard = ({ score, rank, isCurrentPlayer }: ScoreCardProps) => {
    return (
        <View style={[styles.card, isCurrentPlayer && styles.currentPlayerCard]}>
            <Text style={styles.rank}>#{rank}</Text>
            
            <View style={styles.info}>
                <Text style={[styles.name, isCurrentPlayer && styles.currentPlayerText]}>
                    {score.name}
                </Text>
                <Text style={styles.details}>
                    Score: {score.score} | Tijd: {score.timeInSeconds}s
                </Text>
            </View>
        </View>
    );
};

export default ScoreCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  currentPlayerCard: {
    backgroundColor: '#dcfce7',
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  rank: {
    width: 45,
    fontSize: 16,
    fontWeight: '700',
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  currentPlayerText: {
    color: '#15803d',
    fontWeight: '800',
  },
  details: {
    marginTop: 4,
    color: '#4b5563',
  },
});