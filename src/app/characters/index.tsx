import React, {useEffect, useMemo, useState} from "react";
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import CardSelectionCard from "../../components/CardSelectionCard";
import { fetchCharacters } from "../../services/characterService";
import { Character } from "../../types/character";
import { router, Stack } from 'expo-router';

const CharacterSelectionScreen = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOrder, setSortOrder] = useState<"AZ" | "ZA">("AZ");

    useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchCharacters();
        setCharacters(data);
      } catch (err) {
        console.error(err);
        setError("Could not load characters.");
      } finally {
        setLoading(false);
      }
    };

    loadCharacters();
    }, []);

    // filtering + sorting
    const filteredCharacters = useMemo(() => {
        let result = [...characters];

        // search
        if (searchQuery.trim() !== "") {
            result = result.filter((c) =>
                c.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // sort
        result.sort((a,b)=>{
            if(sortOrder === "AZ") return a.name.localeCompare(b.name);
            return b.name.localeCompare(a.name);
        });

        return result;
    }, [characters, searchQuery, sortOrder]);
    
    if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.statusText}>Loading characters...</Text>
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
      <Stack.Screen options={{ title: "Select Character" ,headerTitleAlign: "center"}} />
      <Text style={styles.title}>Select Your Character</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.sortContainer}>
        <TouchableOpacity
          style={[styles.button, sortOrder === "AZ" && styles.activeButton]}
          onPress={() => setSortOrder("AZ")}
        >
          <Text
            style={[
              styles.buttonText,
              sortOrder === "AZ" && styles.activeButtonText,
            ]}
          >
            A-Z
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, sortOrder === "ZA" && styles.activeButton]}
          onPress={() => setSortOrder("ZA")}
        >
          <Text
            style={[
              styles.buttonText,
              sortOrder === "ZA" && styles.activeButtonText,
            ]}
          >
            Z-A
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredCharacters}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <CardSelectionCard
              character={item}
              onPress={() =>
                router.push({
                  pathname: "/characters/[id]",
                  params: {
                    id: item.id.toString(),
                    character: JSON.stringify(item),
                  },
                })
              }
            />
          </View>
        )}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>No characters found</Text>
        }
      />
    </View>
  );
};

export default CharacterSelectionScreen;

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