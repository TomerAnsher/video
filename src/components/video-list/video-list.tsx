import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { ClipLoader } from "react-spinners";

import "./VideoList.css";
import { Video, Genre } from "../../types/types";
import VideoCard from "../video-card/video-card";

type VideoListProps = {
  videos: Video[];
  genres: Genre;
  fetchNextPage: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

const VideoList: React.FC<VideoListProps> = ({
  videos,
  genres,
  fetchNextPage,
  hasMore,
  isLoading,
}) => {
  return (
    <div id="video-container" className="video-container">
      <InfiniteScroll
        height={400}
        dataLength={videos.length}
        next={fetchNextPage}
        hasMore={hasMore}
        loader={isLoading && <ClipLoader size={30} color={"#007bff"} />}
        endMessage={<p className="end-message">No more videos</p>}
        scrollableTarget="video-container"
        className="infinite-scroll"
      >
        <div className="video-list">
          {videos.length > 0 ? (
            videos.map((video) => <VideoCard key={video.id} video={video} genres={genres} />)
          ) : (
            <p className="no-results">No videos found.</p>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default VideoList;
