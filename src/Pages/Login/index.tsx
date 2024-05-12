import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import customAxios from "../../utils/axios";
import { errorToastWrapper, setLocalStorageItem } from "../../utils";
import "./styles.css";

type LoginResponse  = {
  id: any;
  username: string;
  email: string;
  roles: any;
  tokenType: string;
  accessToken: string;
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [registrationStatus, setRegistrationStatus] = useState('');

  const handleLogin = async () => {
    try {
      const response = await customAxios.post<LoginResponse>(
        "/api/auth/login",
        {
          username,
          password,
        }
      );
      if (response?.data) {
        setLocalStorageItem("token", "Bearer " + response?.data?.accessToken);
        setLocalStorageItem("userName", response?.data?.username!);
        navigate(ROUTES.BOOKS_LISTING);
      } 
    } catch (err: any) {
      errorToastWrapper("Error while logging in");
      setRegistrationStatus("Error logging in")
    }
  };
  return (
    <div className="main">
    <div className="container">
      <h1>Welcome back to BookSwpr</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <div className="loginForm">
          <input
            type="Username"
            placeholder="Enter your Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" type="submit">Submit
          </button>
        </div>
      </form>
      <div className="registerLink">
        <p className="text">
          Don't have an account?
          <Link to={ROUTES.REGISTER}>
            <span> Register</span>
          </Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;
