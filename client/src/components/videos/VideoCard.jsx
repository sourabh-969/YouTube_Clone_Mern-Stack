import "./videocard.css";
import Avatar from "../custom/Avatar";
import { format } from "timeago.js";
import * as services from "../../services/services";

export default function VideoCard({ video }) {
  const profileUrl = services.getProfileUrl(video?.profile);
  const coverUrl = services.getCoverUrl(video?.cover);
  return (
    <div className="video-card">
      <a href={`/videos/${video?._id}`} className="card-cover">
        <img src={coverUrl} alt="card cover" />
      </a>
      <div className="card-details">
        <a href={`/videos/${video?._id}`} className="card-title">
          {video?.title}
        </a>

        <div className="card-infos">
          <a href={`/channel/${video?.channelId}`} className="card-profile">
            <Avatar src={video?.profile ? profileUrl : ""} size={24} />
          </a>
          <a href={`/channel/${video?.channelId}`} className="card-channel">
            {video?.name}
          </a>
          <span className="card-views">{`${video?.views} views`}</span>
          <span className="timeline">{format(video?.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
