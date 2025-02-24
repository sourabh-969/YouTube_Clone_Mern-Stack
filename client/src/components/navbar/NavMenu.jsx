import Avatar from "../custom/Avatar";
import "./navmenu.css";
import { NavLink } from "react-router-dom";
import {FaGear,FaFlag,FaCircleQuestion,FaCircleHalfStroke} from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import * as services from "../../services/services";

export default function NavMenu({ open, onClose }) {
  const { state, logout, toggleTheme } = useContext(AppContext);

  const authUser = state?.channel;
  const profileUrl = services.getProfileUrl(authUser?.profile);

  return (
    <div className={open ? "nav-menu active" : "nav-menu"}>
      <div className={`nav-menu-wrapper ${state?.theme}`}>
        {authUser && (
          <NavLink
            onClick={() => onClose(false)}
            to={`channel/${authUser?._id}`}
            className="nav-menu-avatar"
          >
            <Avatar size={40} src={authUser.profile ? profileUrl : ""} />
            <div className="nav-menu-infos">
              <h4>{authUser?.name}</h4>
              <span>View Channel</span>
            </div>
          </NavLink>
        )}

        <div className="nav-menu-links">
          {authUser ? (
            <div
              className="nav-menu-item"
              onClick={() => {
                logout();
                onClose(false);
              }}
            >
              <FiLogOut className="nav-menu-icon" />
              <span>Logout</span>
            </div>
          ) : (
            <div className="auth">
              <p>Sign in to like videos, comment and subscribe.</p>
              <NavLink
                className="login-btn"
                to="/login"
                onClick={() => onClose(false)}
              >
                Sign In
              </NavLink>
            </div>
          )}
          <div
            className="nav-menu-item"
            onClick={() => {
              toggleTheme();
              onClose(false);
            }}
          >
            <FaCircleHalfStroke className="nav-menu-icon" />
            <span>Dark Mode</span>
          </div>
          <NavLink onClick={() => onClose(false)} to="/settings">
            <FaGear className="nav-menu-icon" />
            <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
