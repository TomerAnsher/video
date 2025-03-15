import React from "react";
import "./VideoList.css";
import { Video, Genre } from "../../types/types";
import VideoCard from "../video-card/video-card";

type VideoListProps = {
  videos: Video[];
  genres: Genre;
};

const VideoList: React.FC<VideoListProps> = ({
  videos 
}) => {
  return (  
        <div className="video-list">
          {videos.length > 0 ? (
            videos.map((video) => <VideoCard key={video.id} video={video}/>)
          ) : (
            <p className="no-results">No videos found.</p>
          )}
        </div>
  );
};

export default VideoList;
