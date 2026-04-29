import {View, Text, StyleSheet, Pressable, TextInput, Image, Alert, ActivityIndicator, FlatList, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState , useEffect} from 'react';
import { router, Stack } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Character } from '../../types/character';

const PLAYER_NAME_KEY = 'playerName';
const PLAYER_AVATAR_KEY = 'playerAvatarUri';

const QuizScreen = () => {
  const [name , setName] =  useState("");
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loadingCharacters, setLoadingCharacters] = useState(false);

  useEffect(() => {
    fetchCharacters();
  }, []);
  
  const fetchCharacters = async () => {
    try {
      setLoadingCharacters(true);

      // Vervang dit door jullie echte endpoint
      const response = await fetch('https://sampleapis.assimilate.be/avatar/characters');
      const data: Character[] = await response.json();

      setCharacters(data);
    } catch (error) {
      console.error('Fout bij ophalen characters:', error);
      Alert.alert('Fout', 'Characters konden niet geladen worden.');
    } finally {
      setLoadingCharacters(false);
    }
  };


  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Geen toestemming', 'Camera toestemming is nodig.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const uri = result.assets[0].uri;
      setPhotoUri(uri);
      setSelectedCharacter(null);
    }
  };

  const chooseCharacter = (character: Character) => {
    setSelectedCharacter(character);
    setPhotoUri(character.image);
  };

  const handleStart = async () => {
    if (!name.trim()) {
      Alert.alert('Naam ontbreekt', 'Vul eerst je naam in.');
      return;
    }

    if (!photoUri) {
      Alert.alert('Foto ontbreekt', 'Neem een foto of kies een avatar.');
      return;
    }

  await AsyncStorage.setItem(PLAYER_NAME_KEY, name.trim());
  await AsyncStorage.setItem(PLAYER_AVATAR_KEY, photoUri);

  router.push({
    pathname: '/quiz/questions',
  });
};

  const renderCharacter = ({ item }: { item: Character }) => {
    const isSelected = selectedCharacter?.id === item.id;

    return (
      <Pressable
        style={[
          styles.characterCard,
          isSelected && styles.characterCardSelected,
        ]}
        onPress={() => chooseCharacter(item)}
      >
        <Image source={{ uri: item.image }} style={styles.characterImage} />
        <Text style={styles.characterName}>{item.name}</Text>
      </Pressable>
    );
  };

  return (
    <ScrollView
  style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <Stack.Screen
        options={{
          title: 'Quiz',
          headerTitleAlign: 'center',
        }}
      />

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>

      <Text style={styles.title}>Start Quiz</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Naam</Text>
        <TextInput
          style={styles.input}
          placeholder="Voer je naam in"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Gekozen foto</Text>

        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.previewImage} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>
              Neem een foto of kies een character
            </Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Pressable style={styles.optionButton} onPress={takePhoto}>
          <Text style={styles.optionButtonText}>Foto nemen</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Kies een avatar</Text>

        {loadingCharacters ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={characters}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderCharacter}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.characterList}
          />
        )}
      </View>

      <Pressable style={styles.startButton} onPress={handleStart}>
        <Text style={styles.startButtonText}>Start</Text>
      </Pressable>
    </ScrollView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 12,
    marginBottom: 24,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: '#e5e7eb',
  },
  backButtonText: {
    color: '#111827',
    fontWeight: '600',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#111827',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  imagePlaceholder: {
    height: 180,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  placeholderText: {
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  previewImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
  },
  optionButton: {
    backgroundColor: '#e5e7eb',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  optionButtonText: {
    color: '#111827',
    fontWeight: '600',
  },
  characterList: {
    paddingVertical: 4,
  },
  characterCard: {
    width: 110,
    marginRight: 12,
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  characterCardSelected: {
    borderColor: '#111827',
  },
  characterImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 8,
  },
  characterName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  startButton: {
    marginTop: 20,
    backgroundColor: '#111827',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
});