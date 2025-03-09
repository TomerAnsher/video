export interface Video {
    id: number;
    artist: string;
    title: string;
    release_year: number;
    genre_id: number;
    image_url: string;
  }
  
  export type Genre  = {
        [key: number]: string;
        }
  
  export interface VideoApiResponse {
    genres: Record<number, string>; // Genre ID as key, name as value
    videos: Video[];
  }
  
  export interface UseVideosResult {
    data?: {
      pages: VideoApiResponse[];
    };
    fetchNextPage: () => void;
    hasNextPage?: boolean;
    isLoading: boolean;
    isError: boolean;
  }
  

  