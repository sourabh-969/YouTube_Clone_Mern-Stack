import { useContext, useEffect, useState } from "react";
import Comment from "../../components/comments/Comment";
import Comments from "../../components/comments/Comments";
import Avatar from "../../components/custom/Avatar";
import VideoPlayer from "../../components/custom/VideoPlayer";
import "./video.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import * as services from "../../services/services";
import { format } from "timeago.js";
import { AppContext } from "../../context/AppContext";
import OtherVideos from "./OtherVideos";
import Upsert from "../upsert/Upsert";

export default function Video() {
  const { state } = useContext(AppContext);
  const [more, setMore] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [subStatus, setSubStatus] = useState(false);
  const [videoDetails, setVideoDetails] = useState(null);
  const [dislike, setDislike] = useState(0);

  // Function to handle the button click
  const handleClick = () => {
    setDislike((prevCount) => (prevCount === 0 ? 1 : 0));
  };

  const authUser = state?.channel;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadCurrentVideo();
  }, [id, authUser]);

  const loadCurrentVideo = async () => {
    if (!id) return;
    try {
      const res = await services.getVideoAsync(id);
      if (res.status == 200) {
        setVideoDetails(res.data);
        if (authUser && res.data.subscribers.includes(authUser._id)) {
          setSubStatus(true);
        } else {
          setSubStatus(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikes = async () => {
    if (!videoDetails || !authUser) return;

    try {
      let res = null;
      if (videoDetails.likes.includes(authUser._id)) {
        res = await services.dislikeVideoAsync(videoDetails._id);
      } else {
        res = await services.likeVideoAsync(videoDetails._id);
      }

      if (res?.status == 200) {
        // reload current video
        loadCurrentVideo();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    if (!videoDetails) return;

    try {
      if (window.confirm("Are you sure you want to delete this?")) {
        const res = await services.deleteVideoAsync(videoDetails._id);
        if (res.status == 200) {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubscribe = async () => {
    if (!videoDetails || !authUser) return;

    try {
      if (!authUser.subscriptions.includes(videoDetails.channelId)) {
        // subscribe to channel
        const res = await services.subscribeChannelAsync(
          videoDetails.channelId
        );
        if (res.status == 200) {
          setSubStatus(true);
        }
      } else {
        // unsubscribe to channel
        const res = await services.unsubscribeChannelAsync(
          videoDetails.channelId
        );
        if (res.status == 200) {
          setSubStatus(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (onEdit && videoDetails)
    return (
      <Upsert
        selectedVideo={videoDetails}
        setSelectedVideo={setVideoDetails}
        onClose={setOnEdit}
      />
    );

  return (
    <div className="video-preview">
      <div className="video-preview-wrapper container">
        <div className="video-preview-left">
          {videoDetails && <VideoPlayer video={videoDetails} />}
          <h2 className="video-title">{videoDetails?.title}</h2>
          <div className="video-preview-infos">
            <div className="channel-infos">
              <div className="left">
                <a
                  href={`/channel/${videoDetails?.channelId}`}
                  className="avatar-wrapper"
                >
                  <Avatar
                    size={35}
                    src={services.getProfileUrl(videoDetails?.profile)}
                  />
                  <div className="avatar-infos">
                    <h4 className="name">{videoDetails?.name}</h4>
                    <span className="subscribers">2.5k subscribers</span>
                  </div>
                </a>
                {videoDetails?.channelId == authUser?._id ? (
                  <button>
                    <a href={`/channel/${videoDetails?.channelId}`}>
                      View Channel
                    </a>
                  </button>
                ) : (
                  <button onClick={handleSubscribe}>
                    {subStatus ? "unsubscribe" : "subscribe"}
                  </button>
                )}
              </div>
              <div className="right">
                {videoDetails?.channelId == authUser?._id && (
                  <>
                    <div
                      className="action-item"
                      onClick={() => setOnEdit(true)}
                    >
                      <FaEdit />
                    </div>
                    <div className="action-item" onClick={handleDelete}>
                      <FaTrashAlt />
                    </div>
                  </>
                )}

                {/* i want a dislike button similar to this  */}
                <div className="like-wrapper">
                  <div className="action-item" onClick={handleLikes}>
                    {videoDetails?.likes.includes(authUser?._id) ? (
                      <BiSolidLike />
                    ) : (
                      <BiLike />
                    )}
                  </div>
                  <span>{videoDetails?.likes.length}</span>
                </div>

                <div className="like-wrapper">
                  <div className="action-item" onClick={handleClick}>
                    {dislike ? <BiSolidDislike /> : <BiDislike />}
                  </div>
                  <span>{dislike}</span>
                </div>
              </div>
            </div>

            <div
              className={
                more ? "video-preview-desc active" : "video-preview-desc"
              }
            >
              <div className="views">{`${videoDetails?.views} views . ${format(
                videoDetails?.createdAt
              )}`}</div>
              <div className="video-desc">
                <p>{videoDetails?.desc}</p>
              </div>
              <span
                onClick={() => setMore((prev) => !prev)}
                className="read-more"
              >
                {more ? "show less" : "show more"}
              </span>
            </div>

            <div className="video-comments">
              <Comments />
              <Comment />
            </div>
          </div>
        </div>
        <OtherVideos />
      </div>
    </div>
  );
}
