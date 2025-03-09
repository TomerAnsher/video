import { useMemo, useState } from "react";

import { useVideos } from "./hooks/useGetVideos";
import { Video, Genre } from "./types/types";
import { ClipLoader } from "react-spinners";
import "./App.css";
import HeaderPanel from "./components/header-panel/header-panel";
import VideoList from "./components/video-list/video-list";

function App() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useVideos();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const allVideos: Video[] = useMemo(
    () => data?.pages?.flatMap((page) => page.videos) || [],
    [data]
  );

  const years: number[] = useMemo(
    () => [...new Set(allVideos.map((video) => video.release_year))],
    [allVideos]
  );

  const genres: Genre = useMemo(() => data?.pages?.[0]?.genres ?? {}, [data]);

  const handleGenreChange = (selectedGenreIds: number[]) => {
    setSelectedGenres(selectedGenreIds);
  };

  const filteredVideos = allVideos.filter((video) => {
    const isMatchingSearch = searchQuery === "" ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.artist.toLowerCase().includes(searchQuery.toLowerCase());
  
    const isMatchingYear = selectedYear === "" || video.release_year.toString() === selectedYear;
  
    const isMatchingGenre = selectedGenres.length === 0 || selectedGenres.includes(video.genre_id);
  
    return isMatchingSearch && isMatchingYear && isMatchingGenre;
  });
  

  if (isLoading)
    return (
      <div className="loading-container">
        <ClipLoader size={50} color={"#007bff"} />
        <p>Loading videos...</p>
      </div>
    );

  if (isError) return <p className="error-message">Error loading videos.</p>;

  return (
    <div className="container">
      <HeaderPanel
        onSearch={setSearchQuery}
        onYearChange={setSelectedYear}
        onGenreChange={handleGenreChange}
        years={years}
        genres={genres}
      />
      <VideoList
        videos={filteredVideos}
        genres={genres}
        fetchNextPage={fetchNextPage}
        hasMore={hasNextPage || false}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
