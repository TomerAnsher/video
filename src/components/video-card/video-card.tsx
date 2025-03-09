import React from "react";
import { Video, Genre } from "../../types/types";
import "./VideoCard.css";

type VideoCardProps  = {
  video: Video;
  genres: Genre;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, genres }) => {
  return (
                <div key={video.id} className="video-card">
                  <img src={video.image_url} alt={video.title} className="video-image" />
                  <h3>{video.title}</h3>
                  <p>
                    {video.artist} ({video.release_year}) - {genres[video.genre_id]}
                  </p>
                </div>
  );
};

export default VideoCard;
