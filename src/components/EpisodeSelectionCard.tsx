import { Text, StyleSheet, Pressable } from 'react-native';
import { Episode } from '../types/episode';

type EpisodeSelectionCardProps = {
    episode: Episode;
    onPress?: () => void;
};

const EpisodeSelectionCard = ({ episode, onPress }: EpisodeSelectionCardProps) => {
    return (
        <Pressable onPress={onPress} style={({pressed})=>[styles.card, pressed && {opacity: 0.8, transform: [{scale: 0.98}]}]}>
            <Text style={styles.name} numberOfLines={1}>
                Season {episode.season}, Episode {episode.numInSeason} -
                {episode.title}
            </Text>
        </Pressable>
    );
}

export default EpisodeSelectionCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingBottom: 12,
    alignItems: "center",
    overflow: "hidden",
    elevation: 3,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 8,
  },
});