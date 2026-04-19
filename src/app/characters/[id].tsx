import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import CharacterDetailsCard from "../../components/CharacterDetailsCard";
import { Character } from "../../types/character";

const CharacterDetailScreen = () => {
    const { character } = useLocalSearchParams<{ character: string }>();

    if (!character) {
    return (
      <View style={styles.center}>
        <Text>No character data found.</Text>
      </View>
        );
    }
    
    const parsedCharacter: Character = JSON.parse(character);

    return(
        <View style={styles.container}>
            <Stack.Screen options={{ title: parsedCharacter.name, headerTitleAlign: "center" }} />
            <CharacterDetailsCard character={parsedCharacter} />
        </View>
    )
}

export default CharacterDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});