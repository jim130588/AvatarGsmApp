import { Character } from "../types/character";

const BASE_URL = "https://sampleapis.assimilate.be/avatar/characters";

export const fetchCharacters = async (): Promise<Character[]> => {
  try {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch characters");
    }

    const data = await response.json();

    return data.map((item: any): Character => ({
      id: item.id,
      name: item.name ?? "Unknown",
      image: item.image ?? "",
      nationality: item.nationality ?? "Unknown",
      ethnicity: item.ethnicity ?? "",
      gender: item.gender ?? "",
      eyeColor: item.eyeColor ?? "",
      hairColor: item.hairColor ?? "",
      skinColor: item.skinColor ?? "",
      allies: item.allies ?? [],
      enemies: item.enemies ?? [],
      weaponOfChoice: item.weaponOfChoice ?? [],
      fightingStyles: item.fightingStyles ?? [],
      firstAppearance: item.firstAppearance ?? "",
      voiceActors: item.voiceActors ?? [],
    }));
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};