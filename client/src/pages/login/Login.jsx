import { useContext, useRef, useState } from "react";
import "./login.css";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { loginAsync } from "../../services/services";

export default function Login() {
  const { state, login } = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState("");
  const userRef = useRef(null);
  const passRef = useRef(null);

  const handleClear = () => {
    if (passRef.current) {
      passRef.current.value = "";
    }
    if (userRef.current) {
      userRef.current.value = "";
    }
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const username = userRef.current?.value;
    const password = passRef.current?.value;

    if (!username || !password) {
      setErrorMessage("Username and password are required.");
      return;
    }

    try {
      const res = await loginAsync({
        name: username,
        email: username,
        password,
      });
      if (res.status == 200) {
        login(res.data);
        handleClear();
      }
    } catch (error) {
      setErrorMessage(error.response.data);
      console.log(error);
    }
  };
  return (
    <div className="login">
      <div className={`wrapper ${state?.theme}`}>
        <h2 className="heading">Login</h2>
        {errorMessage && <span className="error-msg">{errorMessage}</span>}
        <form className="form" onSubmit={handleSubmit}>
          <input type="text" ref={userRef} placeholder="Username" required />
          <input
            type="password"
            ref={passRef}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
          <div className="action">
            No Account? Sign up <Link to="/register">here.</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
