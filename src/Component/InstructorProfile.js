import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUser, faBook } from '@fortawesome/free-solid-svg-icons';
import '../Tepcss/InstructorProfile.css';
const InstructorProfile = () => {
  return (
    <div className="instructor_profile__container">
      <h2 className="instructor_profile__title">Giảng viên</h2>
      <h3 className="instructor_profile__name">Cú Thông Thái</h3>
      <p className="instructor_profile__subtitle">Giảng viên tại Udemy</p>
      
      <div className="instructor_profile__image-container">
        {/* Thay thế URL bằng đường dẫn thực tế đến hình ảnh */}
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFrEzTd-RKa_htd93lPA-Z8_knh01FDqLrpphF792kpZD1wmgO5k6xBVWxSkmrb5u2-xU&usqp=CAU" alt="Cú Thông Thái" className="instructor_profile__image" />
      </div>
      
      <div className="instructor_profile__stats">
        <div className="instructor_profile__stat-item">
          <FontAwesomeIcon icon={faStar} className="instructor_profile__icon" />
          <span className="instructor_profile__stat-text">4,0 xếp hạng giảng viên</span>
        </div>
        <div className="instructor_profile__stat-item">
          <FontAwesomeIcon icon={faStar} className="instructor_profile__icon" />
          <span className="instructor_profile__stat-text">2 đánh giá</span>
        </div>
        <div className="instructor_profile__stat-item">
          <FontAwesomeIcon icon={faUser} className="instructor_profile__icon" />
          <span className="instructor_profile__stat-text">1 học viên</span>
        </div>
        <div className="instructor_profile__stat-item">
          <FontAwesomeIcon icon={faBook} className="instructor_profile__icon" />
          <span className="instructor_profile__stat-text">5 khóa học</span>
        </div>
      </div>
      
      <p className="instructor_profile__description">
        Với kinh nghiệm hơn 20 năm trên thị trường chứng khoán, Cú mong muốn chia sẻ các kiến thức, kinh nghiệm mà mình đã đúc kết được cho mọi người cùng học hỏi.
      </p>
      
      <p className="instructor_profile__description">
        Đặc biệt là các bạn mới bắt đầu tìm hiểu về chứng khoán. Các NDT F0 chưa nắm vững kiến thức cần bản trong tay.
      </p>
    </div>
  );
};

export default InstructorProfile;