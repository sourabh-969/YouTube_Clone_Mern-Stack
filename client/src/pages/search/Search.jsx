import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getVideosAsync } from "../../services/services";
import VideoCard from "../../components/videos/VideoCard";

export default function Search() {
  const [videos, setVideos] = useState([]);
  const location = useLocation();

  useEffect(() => {
    searchVideos();
  }, [location.search]); // Re-run when search input_change

  const searchVideos = async () => {
    try {
      // Extract input from URL
      const searchParams = new URLSearchParams(location.search);
      const search = searchParams.get("search") || "";

      // Fetch videos based on input
      const res = await getVideosAsync(search);
      if (res?.data) {
        setVideos(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  };

  return (
    <div className="home">
      <div className="video-list">
        {videos.map((item, index) => (
          <VideoCard key={index} video={item} />
        ))}
      </div>
    </div>
  );
}