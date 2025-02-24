import "./videoplayer.css";
import { getVideoUrl } from "../../services/services";

export default function VideoPlayer({ video }) {
  const videoUrl = getVideoUrl(video.videoUrl);
  return (
    <div className="video-player">
      <video src={videoUrl} controls />
    </div>
  );
}
