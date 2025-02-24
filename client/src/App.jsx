import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Home from "./pages/home/Home.jsx";
import Video from "./pages/video/Video.jsx";
import Channel from "./pages/channel/Channel.jsx";
import Upsert from "./pages/upsert/Upsert.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import { useContext, useEffect } from "react";
import { AppContext } from "./context/AppContext";
import { getChannelAsync } from "./services/services.js";
import Search from "./pages/search/Search.jsx";

export default function App() {
  const { state, loadChannelInfos } = useContext(AppContext);

  useEffect(() => {
    getChannelInfos();
  }, [state?.auth]);

  const getChannelInfos = async () => {
    if (!state?.auth) return;

    try {
      const res = await getChannelAsync(state.auth.id);
      if (res.status == 200) {
        loadChannelInfos(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`app ${state?.theme}`}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="videos">
              <Route path=":id" element={<Video />} />
            </Route>
            <Route path="channel">
              <Route path=":id" element={<Channel />} />
            </Route>
            <Route path="upload" element={<Upsert />} />
            <Route path="login" element={!state?.auth ? <Login /> : <Home />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
