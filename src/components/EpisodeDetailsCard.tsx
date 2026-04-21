import { Episode } from "../types/episode";
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const renderList = (items?: string[]) => {
  return items && items.length > 0 ? items.join(", ") : "NA";
};

const EpisodeDetailsCard = ({ episode }: { episode: Episode }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <Text style={styles.name}>{episode.title}</Text>
                <View style={styles.info}>
                    <Text style={styles.item}><Text style={styles.label}>Season:</Text> {episode.season}</Text>
                    <Text style={styles.item}><Text style={styles.label}>Episode:</Text> {episode.numInSeason}</Text>
                    <Text style={styles.item}><Text style={styles.label}>Air Date:</Text> {episode.OriginalAirDate}</Text>
                    <Text style={styles.item}><Text style={styles.label}>Episode Code:</Text> {episode.ProductionCode}</Text>
                    <Text style={styles.item}><Text style={styles.label}>Animated by:</Text> {episode.animatedBy}</Text>
                    <Text style={styles.item}><Text style={styles.label}>Directed by:</Text> {episode.directedBy}</Text>
                    <Text style={styles.item}><Text style={styles.label}>Written by:</Text> {renderList(episode.WrittenBy)}</Text>
                </View>
            </View>
        </ScrollView>  
    )
}

export default EpisodeDetailsCard;

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