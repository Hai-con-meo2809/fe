import React, { useState, useEffect } from "react";
import "../Tepcss/CourseFeedback.css";
import RatingFeedback from "./RatingFeedback";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPen,
  faVideo,
  faFile,
  faTrash,
  faPlus,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
const CourseFeedback = () => {
  const [showRating, setshowRating] = useState(false);
  const show = () => {
    setshowRating((e) => !e);
  };
  return (
    <div className="cfb-container">
      <div className="cfb-header">
        <a href="#">Tổng quan</a>
        <a href="#">Ghi chú</a>
        <a href="#">Thông báo</a>
        <a href="#" className="cfb-active">
          Đánh giá
        </a>
        <a href="#">Công cụ học tập</a>
      </div>
      <div className="cfb-feedback">
        <h2>Phản hồi của học viên</h2>
        <div className="cfb-rating-overview">
          <div className="cfb-rating">4.5</div>
          <div className="cfb-stars">
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
            <FontAwesomeIcon icon={faStar} />
          </div>
          <div className="cfb-text">Xếp hạng khóa học</div>
        </div>
        <div className="cfb-rating-bars">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="cfb-bar">
              <div className="cfb-label">{stars} sao</div>
              <div className="cfb-progress">
                <div
                  className="cfb-fill"
                  style={{
                    width:
                      stars === 5
                        ? "54%"
                        : stars === 4
                        ? "33%"
                        : stars === 3
                        ? "10%"
                        : stars === 2
                        ? "0%"
                        : "3%",
                  }}
                ></div>
              </div>
              <div className="cfb-percentage">
                {stars === 5
                  ? "54%"
                  : stars === 4
                  ? "33%"
                  : stars === 3
                  ? "10%"
                  : stars === 2
                  ? "0%"
                  : "3%"}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="cfb-reviews">
        <h3>Đánh giá</h3>
        <div className="cfb-search-bar">
          <input type="text" placeholder="Tìm kiếm đánh giá" />
          <button>
            <i className="fas fa-search"></i>
          </button>
          <div className="cfb-filter">
            <select>
              <option>Tất cả xếp hạng</option>
            </select>
          </div>
          <div className="cfb-wrting" onClick={show}>
            Viết đánh giá
          </div>
        </div>
        <div className="cfb-review-item">
          <div className="cfb-avatar">NT</div>
          <div className="cfb-content">
            <div className="cfb-name">Nguyễn Thị Thu T.</div>
            <div className="cfb-time">1 tháng trước</div>
            <div className="cfb-text">Goodss</div>
            <div className="cfb-actions">
              <button>
                <i className="fas fa-thumbs-up"></i> Đánh giá này có hữu ích
                không?
              </button>
              <button>
                <i className="fas fa-flag"></i> Báo cáo
              </button>
            </div>
          </div>
        </div>
      </div>
      {showRating ? <RatingFeedback onshow={show} /> : ""}
    </div>
  );
};

export default CourseFeedback;
