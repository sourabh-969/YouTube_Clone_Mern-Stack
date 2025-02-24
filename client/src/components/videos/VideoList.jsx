import { useEffect, useState } from "react";
import VideoCard from "./VideoCard.jsx";
import "./videolist.css";
import * as services from "../../services/services";

export default function VideoList({ search, category }) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    loadVideosAsync();
  }, [search, category]);

  const loadVideosAsync = async () => {
    try {
      const res = await services.getVideosAsync(search, category); //display base on input||filtre btn.
      if (res?.data) {
        setVideos(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="video-list">
      {videos.map((item, index) => (
        <VideoCard key={index} video={item} />
      ))}
    </div>
  );
}
