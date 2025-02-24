import { createContext, useReducer, useEffect } from "react";

//handling theme mode.
const initState = {
  theme: JSON.parse(localStorage.getItem("theme")) || "dark",
  onMenu: false,
  auth: JSON.parse(localStorage.getItem("auth")) || null,
  channel: null,
};

export const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload,
      };
    case "TOGGLE_MENU":
      return {
        ...state,
        onMenu: !state.onMenu,
      };
    case "LOGIN":
      return {
        ...state,
        auth: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        auth: null,
        channel: null,
      };
    case "LOAD_CHANNEL_INFOS":
      return {
        ...state,
        channel: action.payload,
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(state.theme));
  }, [state.theme]);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(state.auth));
  }, [state?.auth]);

  const toggleTheme = () => {
    dispatch({
      type: "SET_THEME",
      payload: state.theme === "dark" ? "light" : "dark",
    });
  };

  const toggleMenu = () => {
    dispatch({ type: "TOGGLE_MENU" });
  };

  const login = (auth) => {
    dispatch({ type: "LOGIN", payload: auth });
  };

  const loadChannelInfos = (channel) => {
    dispatch({ type: "LOAD_CHANNEL_INFOS", payload: channel });
  };

  const logout = (auth) => {
    dispatch({ type: "LOGOUT", payload: auth });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        toggleMenu,
        toggleTheme,
        login,
        logout,
        loadChannelInfos,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
