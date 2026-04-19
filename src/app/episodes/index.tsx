import { View, Text, Pressable } from 'react-native';
import { router, Stack } from 'expo-router';

const EpisodeSelectionScreen = () => {

    return (
        <View >
            <Stack.Screen options={{ title: "Select Episode",  headerTitleAlign: "center" }} />
            <Text>Episode Selection Screen</Text>
        </View>
    )
}

export default EpisodeSelectionScreen;