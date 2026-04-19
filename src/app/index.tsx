import { View, Text, StyleSheet, Pressable } from "react-native";
import { router, Stack } from "expo-router";

const HomeScreen = () => {
    return(
        <View style={styles.container}>
          <Stack.Screen options={{ title: "Avatar",  headerTitleAlign: "center" }} />
            <Text style={styles.title}>Avatar GSM App</Text>
            <Text style={styles.subtitle}>Startscherm</Text>
            <Pressable style={styles.button} onPress={() => router.navigate('/quiz')}>
              <Text style={styles.buttonText}>Start Quiz</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => router.navigate('/characters')}>
              <Text style={styles.buttonText}>Select Character</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => router.navigate('/episodes')}>
              <Text style={styles.buttonText}>Select Episode</Text>
            </Pressable>

        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});