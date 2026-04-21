import { Episode } from "../types/episode";

const BASE_URL = "https://sampleapis.assimilate.be/avatar/episodes";

const toArray = (value: unknown): string[] => {
  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    if (value.trim() === "" || value === "NA") return [];
    return [value];
  }

  return [];
};

export const fetchEpisodes = async (): Promise<Episode[]> => {
    try{
        const response = await fetch(BASE_URL);

        if(!response.ok){
            throw new Error("Failed to fetch episodes");
        }
        const data = await response.json();

        return data.map((item: any): Episode => ({
            id: item.id,
            season: item.Season ?? 0,
            numInSeason: item.NumInSeason ?? 0,
            title: item.Title ?? "",
            animatedBy: item.AnimatedBy ?? "",
            directedBy: item.DirectedBy ?? "",
            WrittenBy: toArray(item.WrittenBy),
            OriginalAirDate: item.OriginalAirDate ?? "",
            ProductionCode: item.ProductionCode ?? 0,
        }));
    }
    catch(error){
        console.error("Error fetching episodes:", error);
        throw error;
    }
}