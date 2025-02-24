import "./channel.css";
import Banner from "../../assets/banner.png";
import noprofile from "../../assets/default.png";
import VideoCard from "../../components/videos/VideoCard";
import PlaylistCard from "../../components/videos/PlaylistCard";
import { useContext, useEffect, useState } from "react";
import EditChannel from "./EditChannel";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import * as services from "../../services/services";
import ChannelVideos from "./ChannelVideos";

export default function Channel() {
  const { id } = useParams();
  const { state } = useContext(AppContext);
  const [currentChannel, setCurrentChannel] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [onEdit, setOnEdit] = useState(false);
  const [subStatus, setSubStatus] = useState(false);
  const authUser = state?.channel;

  useEffect(() => {
    loadCurrentChannel();
  }, [id, authUser]);

  const loadCurrentChannel = async () => {
    if (!id) return;
    try {
      if (id == authUser?._id) {
        setCurrentChannel(authUser);
        return;
      }

      const res = await services.getChannelAsync(id);
      if (res.status == 200) {
        setCurrentChannel(res.data);
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

  const handleSubscribe = async () => {
    if (!currentChannel || !authUser) return;

    try {
      if (!subStatus) {
        // subscribe to channel
        const res = await services.subscribeChannelAsync(currentChannel._id);
        if (res.status == 200) {
          setSubStatus(true);
        }
      } else {
        // unsubscribe to channel
        const res = await services.unsubscribeChannelAsync(currentChannel._id);
        if (res.status == 200) {
          setSubStatus(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="channel">
      <div className="channel-wrapper container">
        <div className="banner">
          <img
            src={authUser ? services.getBannerUrl(authUser.banner) : Banner}
            alt="banner"
          />
        </div>
        <div className="infos">
          <img
            src={
              authUser ? services.getProfileUrl(authUser.profile) : noprofile
            }
            alt="avatar"
            className="avatar"
          />
          {/* EditChannel */}
          <div className="details">
            <h4 className="channel-name">{currentChannel?.name}</h4>
            <span className="stats">{`${currentChannel?.subscribers.length} subscribers . ${currentChannel?.videos.length} videos`}</span>
            <p className="desc">{currentChannel?.desc}</p>
            {authUser && currentChannel?._id == authUser?._id ? (
              <button onClick={() => setOnEdit(true)}>Edit Channel</button>
            ) : (
              <button onClick={handleSubscribe}>
                {subStatus ? "unsubscribe" : "subscribe"}
              </button>
            )}
          </div>
        </div>

        <div className="tab-wrapper">
          <div
            className={tabIndex == 0 ? "tab-item active" : "tab-item"}
            onClick={() => setTabIndex(0)}
          >
            <span>Videos</span>
          </div>
          <div
            className={tabIndex == 1 ? "tab-item active" : "tab-item"}
            onClick={() => setTabIndex(1)}
          >
            <span>Playlist</span>
          </div>
          <div
            className={tabIndex == 2 ? "tab-item active" : "tab-item"}
            onClick={() => setTabIndex(2)}
          >
            <span>Settings</span>
          </div>
        </div>
            {/* per-load playlist  card */}
        <div className="tab-content">
          {tabIndex == 0 && <ChannelVideos channelId={id} />}
          {tabIndex == 1 && (
            <div className="list-items">
              {[...Array(2)].map((item, index) => (
                <PlaylistCard key={index} />
              ))}
            </div>
          )}
          {tabIndex == 2 && <div className="channel-settings">settings</div>}
        </div>
      </div>

      {onEdit && (
        <EditChannel
          user={currentChannel}
          setUser={setCurrentChannel}
          open={onEdit}
          onClose={setOnEdit}
        />
      )}
    </div>
  );
}