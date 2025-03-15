import React, { useRef, useState, useEffect } from "react";
import { Video } from "../../types/types";
import "./VideoCard.css";
import Tooltip from "@mui/material/Tooltip";

type VideoCardProps = {
  video: Video;
};

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const artistRef = useRef<HTMLParagraphElement>(null);
  const [isTitleTruncated, setIsTitleTruncated] = useState(false);
  const [isArtistTruncated, setIsArtistTruncated] = useState(false);

  useEffect(() => {
    if (titleRef.current) {
      setIsTitleTruncated(titleRef.current.scrollWidth > titleRef.current.clientWidth);
    }
    if (artistRef.current) {
      setIsArtistTruncated(artistRef.current.scrollWidth > artistRef.current.clientWidth);
    }
  }, [video.title, video.artist]);

  return (
    <div key={video.id} className="video-card">
      <img src={video.image_url} alt={video.title} className="video-image" />
      {isTitleTruncated ? (
        <Tooltip title={video.title} arrow>
          <h3 ref={titleRef} className="truncate-text">{video.title}</h3>
        </Tooltip>
      ) : (
        <h3 ref={titleRef} className="truncate-text">{video.title}</h3>
      )}
      {isArtistTruncated ? (
        <Tooltip title={`${video.artist} (${video.release_year})`} arrow>
          <p ref={artistRef} className="truncate-text">{video.artist} ({video.release_year})</p>
        </Tooltip>
      ) : (
        <p ref={artistRef} className="truncate-text">{video.artist} ({video.release_year})</p>
      )}
    </div>
  );
};

export default VideoCard;
