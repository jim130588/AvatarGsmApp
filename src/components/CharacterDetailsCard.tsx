import { Character } from "../types/character";
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const renderList = (items?: string[]) => {
  return items && items.length > 0 ? items.join(", ") : "NA";
};

const CharacterDetailsCard = ({ character }: { character: Character }) => {

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.name}>{character.name}</Text>
                <Image source={{ uri: character.image }} style={styles.image} />
                <View style={styles.info}>
                    <Text style={styles.item}><Text style={styles.label}>Nationality:</Text> {character.nationality}</Text>
                    <Text style={styles.item}><Text style={styles.label}>Ethnicity:</Text> {character.ethnicity}</Text>
                    <Text style={styles.item}><Text style={styles.label}>Gender:</Text> {character.gender}</Text>
                    <Text style={styles.item}><Text style={styles.label}>Eye Color:</Text> {character.eyeColor}</Text>
                    <Text style={styles.item}><Text style={styles.label}>Hair Color:</Text> {character.hairColor}</Text>
                    <Text style={styles.item}><Text style={styles.label}>Skin Color:</Text> {character.skinColor}</Text>

                    <Text style={styles.item}>
                        <Text style={styles.label}>Allies:</Text> {renderList(character.allies)}
                    </Text>
                    <Text style={styles.item}>
                        <Text style={styles.label}>Enemies:</Text> {renderList(character.enemies)}
                    </Text>
                    <Text style={styles.item}>
                        <Text style={styles.label}>Weapons:</Text> {renderList(character.weaponOfChoice)}
                    </Text>
                    <Text style={styles.item}>
                        <Text style={styles.label}>Fighting Styles:</Text> {renderList(character.fightingStyles)}
                    </Text>
                    <Text style={styles.item}>
                        <Text style={styles.label}>First Appearance:</Text> {character.firstAppearance}
                    </Text>
                    <Text style={styles.item}>
                        <Text style={styles.label}>Voice Actors:</Text> {renderList(character.voiceActors)}
                    </Text>
                </View>
            </View>
        </ScrollView>  
    )
}


export default CharacterDetailsCard;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  container: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#1f2937',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 15,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  info: {
    marginTop: 4,
  },
  item: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    lineHeight: 20,
  },
  label: {
    fontWeight: 'bold',
    color: '#111827',
  },
});
