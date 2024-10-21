import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPaaword] = useState("");
  const navigate = useNavigate(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/"; // Default to home if no prior location
  console.log(location);
  const showpassword = () => {
    setshowPaaword((e) => !e);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // const response = await axios.post('https://localhost:7298/api/AccountUser/login', {
      const response = await axios.post(
        "http://comics-truyentranh.somee.com/api/AccountUser/login",
        {
          Email: email,
          Password: password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", email);
        navigate(from, { replace: true });
      } else {
        alert("Đăng nhập không thành công, vui lòng kiểm tra lại.");
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      alert("Đăng nhập không thành công, vui lòng kiểm tra lại.");
    }
  };

  return (
    <div className="design-login">
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <h2 className="login-details">Login</h2>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Mật khẩu:</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {showPassword ? (
                <FontAwesomeIcon
                  icon={faEye}
                  className="icon-eyes"
                  onClick={showpassword}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faEyeSlash}
                  className="icon-eyes"
                  onClick={showpassword}
                />
              )}
            </div>
          </div>
          <div className="input-groups">
            <span className="remember-me">
              <input type="checkbox" /> Remember me
            </span>
            <span className="forgot-password">Forgot password?</span>
          </div>
          <button type="submit">Login</button>
        </form>
        <label className="register-link">
          Donn't you have account?{" "}
          <label onClick={() => navigate("/register")}>Sign up</label>
        </label>
        <div className="toggle-login">
          <label>Or login with</label>
          <div className="login-icon">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/600px-2023_Facebook_icon.svg.png?20231011122028"
              alt="Facebook"
            />
            <img
              src="https://banner2.cleanpng.com/20180413/rfe/avfci721i.webp"
              alt="Google"
              style={{ borderRadius: "50%" }}
            />
            <img
              src="https://cdn.pixabay.com/photo/2022/01/30/13/33/github-6980894_960_720.png"
              alt="Github"
              style={{ borderRadius: "50%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
