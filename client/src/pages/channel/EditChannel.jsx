import "./editchannel.css";
import { AppContext } from "../../context/AppContext";
import DefaultBanner from "../../assets/banner.png";
import DefaulProfile from "../../assets/default.png";
import { useContext, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import * as services from "../../services/services";

export default function EditChannel({ user, setUser, open, onClose }) {
  const [banner, setBanner] = useState(null);
  const [profile, setProfile] = useState(null);
  const [channel, setChannel] = useState(user ? user.name : "");
  const [desc, setDesc] = useState(user ? user.desc : "");
  const { state } = useContext(AppContext);

  const handleCancel = (e) => {
    e.preventDefault();
    clearInputs();
    onClose();
  };

  const handleBanner = (e) => {
    setBanner(e.target.files[0]);
  };

  const handleProfile = (e) => {
    setProfile(e.target.files[0]);
  };

  const clearInputs = () => {
    setBanner(null);
    setProfile(null);
    setChannel("");
    setDesc("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      // upload files: banner, profile
      const bannerName = await uploadBanner();
      const profileName = await uploadProfile();

      const data = {
        banner: bannerName ? bannerName : user?.banner,
        profile: profileName ? profileName : user?.profile,
        name: channel,
        desc,
      };

      const res = await services.updateChannelAsync(user._id, data);
      if (res.status == 200) {
        setUser(res.data);
        clearInputs();
        onClose(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadBanner = async () => {
    if (!banner) return;
    try {
      const formData = new FormData();
      const filename = new Date().getTime() + "-" + banner.name;
      formData.append("filename", filename);
      formData.append("file", banner);

      const res = await services.uploadBannerAsync(formData);
      if (res.status == 200) {
        return filename;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadProfile = async () => {
    if (!profile) return;
    try {
      const formData = new FormData();
      const filename = new Date().getTime() + "-" + profile.name;
      formData.append("filename", filename);
      formData.append("file", profile);

      const res = await services.uploadProfileAsync(formData);
      if (res.status == 200) {
        return filename;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={open ? "edit-channel active" : "edit-channel"}>
      <div className={`wrapper ${state?.theme}`}>
        <div className="banner">
          <img
            src={banner ? URL.createObjectURL(banner) : DefaultBanner}
            alt=""
          />
          <label htmlFor="upload-banner">
            <input
              type="file"
              id="upload-banner"
              accept="image/png, image/jpg, image/jpeg"
              style={{ display: "none" }}
              onChange={handleBanner}
            />
            <div className="upload-banner">
              <FaCamera className="camera-icon" />
            </div>
          </label>
        </div>

        <div className="infos">
          <div className="profile-wrapper">
            <img
              src={profile ? URL.createObjectURL(profile) : DefaulProfile}
              alt=""
              className="avatar"
            />
            <label htmlFor="upload-profile">
              <input
                type="file"
                id="upload-profile"
                accept="image/png, image/jpg, image/jpeg"
                style={{ display: "none" }}
                onChange={handleProfile}
              />
              <div className="upload-profile">
                <FaCamera className="camera-icon" />
              </div>
            </label>
          </div>

          <form onSubmit={handleSubmit} className="details">
            <input
              required
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              type="text"
              placeholder="Channel Name"
            />
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Channel Description"
            />
            <div className="actions">
              <button onClick={handleCancel} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
