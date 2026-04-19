import { SafeAreaView, StyleSheet} from 'react-native';
import Homescreen from './src/screens/Homescreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Homescreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
