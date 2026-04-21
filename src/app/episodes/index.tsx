import { View, Text, ActivityIndicator, TextInput, FlatList, StyleSheet  } from 'react-native';
import { router, Stack } from 'expo-router';
import react, { useState , useEffect , useMemo } from 'react';
import { Episode } from '../../types/episode';
import { fetchEpisodes } from '../../services/episodeService';
import EpisodeSelectionCard from '../../components/EpisodeSelectionCard';

const EpisodeSelectionScreen = () => {

    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
    const loadEpisodes = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchEpisodes();
        setEpisodes(data);
      } catch (err) {
        console.error(err);
        setError("Could not load episodes.");
      } finally {
        setLoading(false);
      }
    };

    loadEpisodes();
    }, []);

    // filtering + sorting
    const filteredEpisodes = useMemo(() => {
        let result = [...episodes];

        // search
        if (searchQuery.trim() !== "") {
            result = result.filter((c) =>
                c.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return result;
    }, [episodes, searchQuery]);
    
    if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.statusText}>Loading episodes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

    return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Select Episode",  headerTitleAlign: "center" }} />
      <Text style={styles.title}>Select Your Episode</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={filteredEpisodes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <EpisodeSelectionCard
              episode={item}
              onPress={() =>
                router.push({
                  pathname: "/episodes/[id]",
                  params: {
                    id: item.id.toString(),
                    episode: JSON.stringify(item),
                  },
                })
              }
            />
          </View>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>No episode found</Text>
        }
      />
    </View>
    )
}

export default EpisodeSelectionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: 20,
    paddingHorizontal: 12,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    marginTop: 10,
    fontSize: 16,
    color: "#444",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
    color: "#222",
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sortContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  buttonText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 14,
  },
  activeButton: {
    backgroundColor: "#4A90E2",
    borderColor: "#4A90E2",
  },
  activeButtonText: {
    color: "#fff",
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
    marginBottom: 12,
  },
  filterButton: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  listContent: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
  },
  cardWrapper: {
    flex: 1,
  },
  empty: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#666",
  },
});