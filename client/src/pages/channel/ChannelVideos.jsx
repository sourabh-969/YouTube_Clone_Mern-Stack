import React, { useEffect, useState } from "react";
import VideoCard from "../../components/videos/VideoCard";
import { getVideosByChannelIdAsync } from "../../services/services";

export default function ChannelVideos({ channelId }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    loadVideoByChannelId();
  }, [channelId]);

  const loadVideoByChannelId = async () => {
    if (!channelId) return;
    try {
      const res = await getVideosByChannelIdAsync(channelId);
      if (res.status == 200) {
        setVideos(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="list-items">
      {videos.map((item, index) => (
        <VideoCard key={index} video={item} />
      ))}
    </div>
  );
}
