import { useMemo, useState } from "react";
import { useVideos } from "./hooks/useGetVideos";
import { Genre } from "./types/types";
import { ClipLoader } from "react-spinners";
import HeaderPanel from "./components/header-panel/header-panel";
import VideoList from "./components/video-list/video-list";
import "./App.css";

function App() {
  const { data, isLoading, isError } = useVideos();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const years: number[] = useMemo(() => [...new Set(data?.videos.map((video) => video.release_year))] ,[ data?.videos ]);

  const genres: Genre = useMemo(() => data?.genres ?? {}, [data?.genres]);

  const filteredVideos = data?.videos.filter((video) => {
    const isMatchingSearch =
      searchQuery === "" ||
      video.title.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.artist.toString().toLowerCase().includes(searchQuery.toLowerCase());
    
    const isMatchingYear = selectedYear === "" || Number(video.release_year) === Number(selectedYear);
    const isMatchingGenre = selectedGenres.length === 0 || selectedGenres.includes(video.genre_id);
  
    return isMatchingSearch && isMatchingYear && isMatchingGenre;
  });
  

  if(isLoading) {
    return (
      <div className="loading-container">
      <ClipLoader size={50} color={"#007bff"} />
      <p>Loading videos...</p>
    </div>
    )
  }

  if(isError) {
    return (<p className="error-message">Error loading videos.</p>)
  }

  return (
    <div >
      <HeaderPanel
        onSearch={setSearchQuery}
        onYearChange={setSelectedYear}
        onGenreChange={setSelectedGenres}
        years={years}
        genres={genres}
      />
        <VideoList
          videos={filteredVideos ?? []}
          genres={genres ?? {}}
        />
    </div>
  );
}

export default App;
