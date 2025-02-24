import "./playlistcard.css";
import DemoCover from "../../assets/listcover.png";
import { RiPlayList2Fill } from "react-icons/ri";

export default function PlaylistCard() {
  return (
    <div className="playlist-card">
      <div className="wrapper">
        <div className="cover-wrapper">
          <img src={DemoCover} alt="coverIMG" className="cover" />
          <div className="icon-wrapper">
            <span>10</span>
            <RiPlayList2Fill className="icon" />
          </div>
        </div>
        <span className="title">Playlist_name-DemoList</span>
      </div>
    </div>
  );
}
