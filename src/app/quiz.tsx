import {View, Text, StyleSheet, Pressable} from 'react-native';
import { router } from 'expo-router';

export default function QuizScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Quiz Screen</Text>
            <Pressable style={styles.button} onPress={() => router.back()}>
                <Text style={styles.buttonText}>Go Back</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
  },
  buttonText: {
    color: '#111827',
    fontWeight: '600',
  },
});