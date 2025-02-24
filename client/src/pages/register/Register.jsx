import { useContext, useRef, useState } from "react";
import "./register.css";
import { AppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { registerAsync } from "../../services/services";

export default function Register() {
  const { state } = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState("");
  const userRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  const navigate = useNavigate();

  const handleClear = () => {
    if (passRef.current) {
      passRef.current.value = "";
    }
    if (emailRef.current) {
      emailRef.current.value = "";
    }
    if (userRef.current) {
      userRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const username = userRef.current?.value;
    const password = passRef.current?.value;

    if (!username || !password || !email) {
      setErrorMessage("Username and password are required.");
      return;
    }

    try {
      const res = await registerAsync({ name: username, email, password });
      if (res.status == 200) {
        navigate("/login");
        handleClear();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register">
      <div className={`wrapper ${state?.theme}`}>
        <h2 className="heading">Register</h2>
        {errorMessage && <span className="error-msg">{errorMessage}</span>}
        <form className="form" onSubmit={handleSubmit}>
          <input type="text" ref={userRef} placeholder="Username" required />
          <input type="email" ref={emailRef} placeholder="Email" required />
          <input
            type="password"
            ref={passRef}
            placeholder="Password"
            required
          />
          <button type="submit">Register</button>
          <div className="action">
            Already an Account? Sign in <Link to="/login">here.</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
