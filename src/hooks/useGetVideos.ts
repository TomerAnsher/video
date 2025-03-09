import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchVideos } from "../api/videos";

const PAGE_SIZE = 12;

export function useVideos() {
  return useInfiniteQuery({
    queryKey: ["videos"],
    queryFn: async ({ pageParam = 0 }) => {
      const data = await fetchVideos();
      
      return {
        videos: data.videos.slice(pageParam, pageParam + PAGE_SIZE),
        genres: data.genres.reduce((acc: Record<number, string>, genre: { id: number; name: string; }) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {}),
        nextPage: pageParam + PAGE_SIZE < data.videos.length ? pageParam + PAGE_SIZE : null,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}
