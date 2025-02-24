import VideoList from "../../components/videos/VideoList";
import "./home.css";
import { useState } from "react";
const categories = [
  "All",
  "Music",
  "Gaming",
  "Technology",
  "Education",
  "Sports",
  "Comedy",
  "News",
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  return (
    <div className="home">
      {/* Horizontal Filter Bar */}
      <div className="filter-bar">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-button ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="header">
        <h1>Google/Ad</h1>
        <h3>Banner</h3>
      </div>

      {/* Video List */}
      <VideoList category={selectedCategory} />
    </div>
  );
}
