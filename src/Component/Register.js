import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../Tepcss/register.css'; // Thêm đường dẫn đến file CSS

function Register() {
  const navigate = useNavigate(); // Khởi tạo navigate hook
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    userName: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7298/api/AccountUser', formData);
      if (response.status === 200) {
        alert('Đăng ký thành công');
        navigate('/login');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Lỗi khi gửi dữ liệu');
    }
  };

  return (
    <div className="design-register">
      <div className="register-container">
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
          <Link to="/login" className="login-link">Already have an account? Login</Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
