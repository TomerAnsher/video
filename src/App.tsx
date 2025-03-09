import { useMemo, useState } from "react";

import { useVideos } from "./hooks/useGetVideos";
import { Genre, Video, } from "./types/types";
import { ClipLoader } from "react-spinners";
import "./App.css";
import HeaderPanel from "./components/header-panel/header-panel";
import VideoList from "./components/video-list/video-list";

function App() {
  const { data, fetchNextPage, hasNextPage, isLoading, isError } = useVideos();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const allVideos: Video[] = useMemo(
    () => data?.pages?.flatMap((page) => page.videos) || [],
    [data]
  );

  const years: number[] = useMemo(
    () => [...new Set(allVideos.map((video) => video.release_year))],
    [allVideos]
  );

  const genres:Genre = useMemo(() => data?.pages?.[0]?.genres ?? {}, [data]);

  const filteredVideos = allVideos.filter((video) => {
    return (
      (searchQuery === "" ||
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.artist.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedYear === "" || video.release_year.toString() === selectedYear) &&
      (selectedGenre === "" || video.genre_id === Number(selectedGenre))
    );
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
        onGenreChange={setSelectedGenre}
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
