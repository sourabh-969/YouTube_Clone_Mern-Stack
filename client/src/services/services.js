import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const request = axios.create({ baseURL, withCredentials: true });

// auth services
export const loginAsync = (creds) => request.post("/auth/login", creds);
export const registerAsync = (creds) => request.post("/auth/register", creds);

// channel services
export const getChannelAsync = (channelId) =>
  request.get(`/channels/${channelId}`);

export const updateChannelAsync = (channelId, data) =>
  request.put(`/channels/${channelId}`, data);

export const subscribeChannelAsync = (channelId) =>
  request.put(`/channels/subscribe/${channelId}`, { channelId });

export const unsubscribeChannelAsync = (channelId) =>
  request.put(`/channels/unsubscribe/${channelId}`, { channelId });

// videos services
export const getVideosAsync = (search = "", category = "All") => {
  return request.get(`/videos`, {params: {
      search,
      category,
    },});
};
export const getVideosByChannelIdAsync = (channelId) =>
  request.get(`/videos/channel/${channelId}`);

export const getVideoAsync = (videoId) => request.get(`/videos/${videoId}`);

export const createVideoAsync = (data) => request.post(`/videos`, data);

export const updateVideoAsync = (videoId, data) =>
  request.put(`/videos/${videoId}`, data);

export const deleteVideoAsync = (videoId) =>
  request.delete(`/videos/${videoId}`);

export const likeVideoAsync = (videoId) =>
  request.put(`/videos/like/${videoId}`, { videoId });

export const dislikeVideoAsync = (videoId) =>
  request.put(`/videos/dislike/${videoId}`, { videoId });

//comment services
export const postCommentAsync = (videoId, commentData) => {
  return request.post(`/videos/${videoId}/comments`, commentData);
};

// upload services
export const uploadCoverAsync = (cover) =>
  request.post("/uploads/covers", cover);

export const uploadProfileAsync = (profile) =>
  request.post("/uploads/profiles", profile);

export const uploadVideoAsync = (video) =>
  request.post("/uploads/videos", video);

export const uploadBannerAsync = (banner) =>
  request.post("/uploads/banners", banner);


// helps
export const getProfileUrl = (profile) => {
  return `${baseURL}/medias/profiles/${profile}`;
};

export const getBannerUrl = (banner) => {
  return `${baseURL}/medias/banners/${banner}`;
};

export const getCoverUrl = (cover) => {
  return `${baseURL}/medias/covers/${cover}`;
};

export const getVideoUrl = (video) => {
  return `${baseURL}/medias/videos/${video}`;
};
