import React from 'react';
import '../Tepcss/learningPage.css'; // Import CSS thông thường
import { Link, NavLink, useNavigate,useLocation } from 'react-router-dom';

function LearningPage() {
  return (
    <div className="learningPage-container">
      <header className="learningPage-header">
        <h1>Học tập</h1>
        <nav className="learningPage-navBar">
          <ul>
            <li>Tất cả khóa học</li>
            <li>Danh sách của tôi</li>
            <li>Mong muốn</li>
            <li>Đã lưu trữ</li>
            <li>Công cụ học tập</li>
          </ul>
        </nav>
      </header>

      <div className="learningPage-scheduleLearning">
        <div className="learningPage-scheduleBox">
          <h2>Lên lịch thời gian học</h2>
          <p>
            Học một chút mỗi ngày sẽ giúp bạn tích lũy kiến thức. Nghiên cứu cho thấy rằng những học viên biến việc học thành thói quen sẽ có nhiều khả năng đạt được mục tiêu hơn. Hãy dành thời gian để học và nhận lời nhắc bằng cách sử dụng trình lên lịch học tập.
          </p>
          <div className="learningPage-actionButtons">
            <button className="learningPage-startButton">Bắt đầu</button>
            <button className="learningPage-cancelButton">Hủy bỏ</button>
          </div>
        </div>
      </div>

      <div className="learningPage-courseSection">
        <div className="learningPage-courseBox">
          <img src="mancity.jpeg" alt="Udemy Logo" className="learningPage-courseLogo" />
          <div className="learningPage-courseInfo">
            <h4>Kiến Thức Nhập Môn IT</h4>
            <p>By Mr.Quoc</p>
            <div className='line-learning'></div>
            {/* <button className="learningPage-startCourseButton">Bắt đầu khóa học</button> */}
            <NavLink as={Link} to="/course"><span className="learningPage-startCourseButton">Bắt đầu khóa học</span></NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningPage;
