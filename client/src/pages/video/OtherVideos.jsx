import React, { useEffect, useState } from "react";
import VideoCard from "../../components/videos/VideoCard";
import { getVideosAsync } from "../../services/services";

export default function OtherVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    loadVideos();
  }, []);
//req all video
  const loadVideos = async () => {
    try {
      const res = await getVideosAsync();
      if (res.status == 200) {
        setVideos(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="video-preview-right">
      {videos.map((item, index) => (
        <VideoCard key={index} video={item} />
      ))}
    </div>
  );
}
