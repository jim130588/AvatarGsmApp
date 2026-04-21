import { StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
