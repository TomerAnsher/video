export type Video = {
    id: number;
    artist: string;
    title: string;
    release_year: number;
    genre_id: number;
    image_url: string;
  }
  
  export type Genre  = {[key: number]: string;}
  
  export type VideoApiResponse  = {
    genres: Record<number, string>;
    videos: Video[];
  }
  
  

  