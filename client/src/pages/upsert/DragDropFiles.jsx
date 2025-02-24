// saving video file to asserts
import "./dragdrop.css";
import { MdCloudDownload } from "react-icons/md";
import { BsFillCameraVideoFill } from "react-icons/bs";

export default function DragDropFiles({ file, setFile, selectedVideo }) {
  //GEt file
  const handleFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.items[0].type === "video/mp4") {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="drag-drop" onDragOver={handleDrag} onDrop={handleDrop}>
      <MdCloudDownload className="icon" />
      <h4>Drag and drop your video</h4>
      {(file || selectedVideo) && (
        <span className="filename">
          {file ? file.name : selectedVideo ? selectedVideo.videoUrl : ""}
        </span>
      )}
      <label htmlFor="upload-video">
        <input
          type="file"
          id="upload-video"
          accept="video/mp4"
          style={{ display: "none" }}
          onChange={handleFile}
        />
        <div className="upload-video">
          <BsFillCameraVideoFill className="video-icon" />
          <span>Select Video</span>
        </div>
      </label>
    </div>
  );
}