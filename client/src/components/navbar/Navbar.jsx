import "./navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft,FaYoutube } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiDotsHorizontal } from "react-icons/hi";
import { RiVideoAddFill } from "react-icons/ri";
import Avatar from "../custom/Avatar";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import NavMenu from "./NavMenu";
import Sidebar from "../sidebar/Sidebar";
import * as services from "../../services/services";

export default function Navbar() {
  const { state, toggleMenu } = useContext(AppContext);
  const [onSearch, setOnSearch] = useState(false);
  const [onMenu, setOnMenu] = useState(false);
  const [toSearch, setToSearch] = useState("");
  const authUser = state?.channel;
  const navigate = useNavigate();

  const profileUrl = services.getProfileUrl(authUser?.profile);

  const handleSearch = (e) => {
    e.preventDefault();
    if (toSearch.trim()) {
      //navigate to the search page
      navigate(`/search?search=${toSearch}`);
    } else {
      //search bar is empty, navigate to '/' page
      navigate("/");
    }
  };

  return (
    <>
      <div className={`navbar ${state?.theme}`}>
        <div className="nav-wrapper">
        <div className="nav-sidebar" onClick={toggleMenu}>
            <GiHamburgerMenu />
            </div>
          <div className={onSearch ? "nav-left mobile-search" : "nav-left"}>
            <Link to="/" className="logo">
              <span>You</span>
              <span className="tube"><FaYoutube /></span>
              <span>Tube</span>
            </Link>
          </div>

          <div className={onSearch ? "nav-center active" : "nav-center"}>
            <div className="nav-icon mobile" onClick={() => setOnSearch(false)}>
              <FaArrowLeft />
            </div>
            <form onSubmit={handleSearch} className="nav-form">
              <input
                value={toSearch}
                onChange={(e) => setToSearch(e.target.value)}
                type="search"
                placeholder="Search..."
              />
              <button type="submit">
                <FiSearch />
              </button>
            </form>
          </div>

          <div className={onSearch ? "nav-right mobile-search" : "nav-right"}>
            <div
              className="nav-icon mobile"
              onClick={() => setOnSearch((prev) => !prev)}
            >
              <FiSearch />
            </div>
            {authUser && (
              <>
                <NavLink to="/upload" className="nav-icon">
                  <RiVideoAddFill />
                </NavLink>
                <NavLink to="/notifications" className="nav-icon">
                  <FaBell />
                </NavLink>
              </>
            )}

            <div
              className="nav-icon"
              onClick={() => setOnMenu((prev) => !prev)}
            >
              <div className="nav-avatar">
                {authUser ? (
                  <Avatar src={authUser.profile ? profileUrl : ""} size={35} />
                ) : (
                  <HiDotsHorizontal />
                )}
              </div>
            </div>
          </div>
          <NavMenu open={onMenu} onClose={setOnMenu} />
        </div>
      </div>

      <Sidebar />
    </>
  );
}
