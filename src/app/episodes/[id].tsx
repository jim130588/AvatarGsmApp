import { View, StyleSheet, Text } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Episode } from "../../types/episode";
import EpisodeDetailsCard from "../../components/EpisodeDetailsCard";

const EpisodeDetailScreen = () => {
    const { episode } = useLocalSearchParams<{ episode: string }>();

    if (!episode){
        return(
            <View style={styles.center}>
                <Text>No episode data found.</Text>
            </View>
        );
    }

    const parsedEpisode: Episode = JSON.parse(episode);

    return(
        <View style={styles.container}>
            <Stack.Screen options={{ title: parsedEpisode.title,  headerTitleAlign: "center" }} />
            <EpisodeDetailsCard episode={parsedEpisode} />
        </View>
    )
}

export default EpisodeDetailScreen;

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