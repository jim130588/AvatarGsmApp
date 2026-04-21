import { Text, Image, StyleSheet, Pressable } from 'react-native';
import { Character } from "../types/character";

type CarSelectionCardProps = {
    character: Character;
    onPress?: () => void;
};

const CardSelectionCard = ({ character, onPress}: CarSelectionCardProps) => {
    return (
        <Pressable onPress={onPress} style={({pressed})=>[styles.card, pressed && {opacity: 0.8, transform: [{scale: 0.98}]}]}>
            <Image source={{ uri: character.image }} style={styles.image} />
            <Text style={styles.name} numberOfLines={1}>
                {character.name}
            </Text>
        </Pressable>
    );
}

export default CardSelectionCard;

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
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingHorizontal: 8,
  },
});