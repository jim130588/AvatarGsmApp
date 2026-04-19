import { View, Text } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

const EpisodeDetailScreen = () => {
    const { id } = useLocalSearchParams<{ id: string }>();

    return(
        <View>
            <Stack.Screen options={{ title: "Episode details",  headerTitleAlign: "center" }} />
            <Text>Episode Detail Screen for episode with ID: {id}</Text>
        </View>
    )
}

export default EpisodeDetailScreen;