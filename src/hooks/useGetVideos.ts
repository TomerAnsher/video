import { useQuery } from "@tanstack/react-query";
import { fetchVideos } from "../api/videos";
import { VideoApiResponse } from "../types/types";

export function useVideos() {
  return useQuery<VideoApiResponse>({
    queryKey: ["videos"],
    queryFn: async () => {
      const data = await fetchVideos();      
      return {
        videos: data.videos,
        genres: data.genres.reduce(
          (acc: Record<number, string>, genre: { id: number; name: string }) => {
            acc[genre.id] = genre.name;
            return acc;
          },
          {}
        ),
      };
    },
  });
}
