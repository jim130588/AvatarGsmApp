import { Character } from "../types/character";

const BASE_URL = "https://sampleapis.assimilate.be/avatar/characters";

const toArray = (value: unknown): string[] => {
  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    if (value.trim() === "" || value === "NA") return [];
    return [value];
  }

  return [];
};

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

      nationality: item.bio?.nationality ?? "Unknown",
      ethnicity: item.bio?.ethnicity ?? "",

      gender: item.physicalDescription?.gender ?? "",
      eyeColor: item.physicalDescription?.eyeColor ?? "",
      hairColor: item.physicalDescription?.hairColor ?? "",
      skinColor: item.physicalDescription?.skinColor ?? "",

      allies: toArray(item.personalInformation?.allies),
      enemies: toArray(item.personalInformation?.enemies),
      weaponOfChoice: toArray(item.personalInformation?.weaponsOfChoice),
      fightingStyles: toArray(item.personalInformation?.fightingStyles),

      firstAppearance: item.chronologicalInformation?.firstAppearance ?? "",
      voiceActors: toArray(item.chronologicalInformation?.voicedBy),
    }));
  } catch (error) {
    console.error("Error fetching characters:", error);
    throw error;
  }
};