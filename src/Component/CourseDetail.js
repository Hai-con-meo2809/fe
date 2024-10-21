import React, { useState,useEffect,useRef } from 'react';
import '../Tepcss/courseDetail.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faStar, faCheck, faPlus, faMinus,faCirclePlay, faHeart,faEllipsisV, faThumbsUp, faThumbsDown} from '@fortawesome/free-solid-svg-icons';
import { Link, NavLink, useNavigate,useLocation } from 'react-router-dom';
import InstructorProfile from './InstructorProfile';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css'; // Import CSS của Plyr
import VideoPlayer from './VideoPlayer';
import VideoModal from './VideoModal';
const CourseIntro = () => {
  const navigate = useNavigate(); 

  const reviews = [
    {
      avatar: 'T',
      name: 'Trần Hữu Tính',
      rating: 5,
      time: '2 tuần trước',
      content: 'Khoá học tuyệt vời để bắt đầu làm back end với js'
    },
    {
      avatar: 'EA',
      name: 'Erkut Burak A.',
      rating: 5,
      time: '2 tháng trước',
      content: 'wonderful'
    },
    {
      avatar: 'K',
      name: 'Kent_Shin',
      rating: 5,
      time: '3 tháng trước',
      content: 'bài giảng dễ hiểu nhưng lại rất chi tiết cho người đang học lại code như mình'
    },
    {
      avatar: 'PT',
      name: 'Pham Thanh T.',
      rating: 5,
      time: '4 tháng trước',
      content: 'The course is very good and detailed for beginners'
    }
  ];
  // State để lưu trạng thái mở rộng hoặc thu gọn
  const [expandedModules, setExpandedModules] = useState([]);
  const videoUrl = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  // Hàm để xử lý mở rộng hoặc thu gọn module
  const toggleModule = (moduleIndex) => {
    if (expandedModules.includes(moduleIndex)) {
      setExpandedModules(expandedModules.filter((index) => index !== moduleIndex));
    } else {
      setExpandedModules([...expandedModules, moduleIndex]);
    }
  };
  const videoPoster = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQndwBZC3rLn-ukenwa8p-iMm46z1bzExHqIQ&s"; // URL của ảnh poster
  const videoRef = useRef(null);
  const playerRef = useRef(null); // Thêm ref để lưu Plyr instance
  const [isModalOpen, setModalOpen] = useState(false);
  
  const openModal = () => {
  
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  
  };


  return (
    <div className="course-container-tong">
      <div className="course-container-unique">
        <div className="header-footer-wrapper-unique">
          <div className="course-header-unique">
            <h1>Kiến Thức Nhập Môn IT</h1>
            <p>
              Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn nên xem các videos tại khóa này trước nhé.
            </p>

            <div className="course-details-unique">
              <h2>Bạn sẽ học được gì?</h2>
              <ul className="course-details-list">
                <li><FontAwesomeIcon icon={faCheck} style={{ color: 'orange' }} /> Các kiến thức cơ bản, nền móng của ngành IT</li>
                <li><FontAwesomeIcon icon={faCheck} style={{ color: 'orange' }} /> Các khái niệm, thuật ngữ cốt lõi khi triểnds </li>
              
                
                <li><FontAwesomeIcon icon={faCheck} style={{ color: 'orange' }} /> Các mô hình, kiến trúc cơ bản khi triển khai ứng dụng</li>
                <li><FontAwesomeIcon icon={faCheck} style={{ color: 'orange' }} /> Hiểu hơn về cách internet và máy vi tính hoạt động</li>
               
              </ul>
            </div>
          </div>

       
        </div>

        <div className="course-content-unique">
          <h2>Nội dung khóa học</h2>
          <p>4 chương ・ 12 bài học ・ Thời lượng 03 giờ 26 phút</p>

          {/* Module 1 */}
          <div className="module-unique" onClick={() => toggleModule(1)}>
            <h1 >
              <FontAwesomeIcon icon={expandedModules.includes(1) ? faMinus : faPlus} style={{ color: 'orange', marginRight: 10 }} />
              1. Khái niệm kỹ thuật cần biết
            </h1>
            {expandedModules.includes(1) && (
             <ul class="module-content">
                  <NavLink as={Link} to="/you"><li class="list-item-effect"><FontAwesomeIcon icon={faCirclePlay} style={{ marginRight: '12px' }} />Bài học 1: Giới thiệu khóa học</li> </NavLink>
                <li class="list-item-effect">Bài học 2: Cài đặt Dev - C++</li>
                <li class="list-item-effect">Bài học 3: Hướng dẫn sử dụng Dev - C++</li>
           </ul>
           
            )}
          </div>

          {/* Module 2 */}
          <div className="module-unique">
            <h1 onClick={() => toggleModule(2)}>
              <FontAwesomeIcon icon={expandedModules.includes(2) ? faMinus : faPlus} style={{ color: 'orange', marginRight: 10 }} />
              2. Môi trường, con người IT
            </h1>
            {expandedModules.includes(2) && (
              <ul>
                <li>Bài học 1: Môi trường IT</li>
                <li>Bài học 2: Con người trong ngành IT</li>
              </ul>
            )}
          </div>

          {/* Module 3 */}
          <div className="module-unique">
            <h1 onClick={() => toggleModule(3)}>
              <FontAwesomeIcon icon={expandedModules.includes(3) ? faMinus : faPlus} style={{ color: 'orange', marginRight: 10 }} />
              3. Phương pháp, định hướng
            </h1>
            {expandedModules.includes(3) && (
              <ul>
                <li>Bài học 1: Phương pháp học hiệu quả</li>
                <li>Bài học 2: Định hướng phát triển</li>
              </ul>
            )}
          </div>
        </div>

       


        <div className="nodejs-express-course">
      {/* <h2 className="nodejs-express-course__title">Backend Server Website Pro Max với Node.JS và Express</h2>
      
      <p className="nodejs-express-course__description">
        Khóa học giúp các bạn beginners có thể học, hiểu và thực hành xây backend website từ số 0, 
        bằng cách sử dụng platform Node.js và framework Express.
      </p> */}
      
      <h3 className="nodejs-express-course__section-title">Nội dung trọng tâm:</h3>
      <ul className="nodejs-express-course__content-list">
        <li> Hiểu các nguyên lý, các thành phần chủ chốt khi xây dựng một website</li>
        <li>Cài đặt và sử dụng môi trường Node.js</li>
        <li>Tạo server Backend Node.js với Framework Express</li>
        <li>Xây dựng Server Backend với SSR (Server side rendering)</li>
        <li>Xây dựng Server Backend như là 1 RestfulAPIs</li>
        <li>Thực hành ứng dụng Fullstack (React/Node.js) với backend tự tạo</li>
      </ul>
      
      <h3 className="nodejs-express-course__section-title">Đối tượng học:</h3>
      <p className="nodejs-express-course__target-audience">
        Tất cả beginners muốn học Backend Nodejs từ số 0
      </p>
      
      <h3 className="nodejs-express-course__section-title">Yêu cầu:</h3>
      <ul className="nodejs-express-course__requirements-list">
        <li>Có hiểu cơ bản về Javascript</li>
        <li>Có hiểu biết về React (Frontend) là một lợi thế</li>
      </ul>
    </div>


     <InstructorProfile/>


     <div className="course-reviews">
      <div className="course-reviews__header">
        <FontAwesomeIcon icon={faStar} className="course-reviews__star-icon" /> 4,6 xếp hạng khóa học • 260 xếp hạng
      </div>
      <div className="course-reviews__list">
        {reviews.map((review, index) => (
          <div key={index} className="course-reviews__item">
            <div className="course-reviews__item-header">
              <div className="course-reviews__avatar">{review.avatar}</div>
              <div className="course-reviews__name">{review.name}</div>
              <FontAwesomeIcon icon={faEllipsisV} className="course-reviews__ellipsis" />
            </div>
            <div className="course-reviews__item-body">
              {[...Array(review.rating)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} className="course-reviews__star" />
              ))} {review.time}
              <p>{review.content} {review.name === 'Pham Thanh T.' && <FontAwesomeIcon icon={faHeart} />}</p>
            </div>
            <div className="course-reviews__item-footer">
              Bạn thấy hữu ích?
              <FontAwesomeIcon icon={faThumbsUp} className="course-reviews__thumb" />
              <FontAwesomeIcon icon={faThumbsDown} className="course-reviews__thumb" />
            </div>
          </div>
        ))}
      </div>
      <button className="course-reviews__show-all">Hiện tất cả đánh giá</button>
    </div>
      </div>

        

      <div className="course-footer-unique">
      <div className="video-wrapper" onClick={openModal}>
        {/* <video ref={videoRef} className="plyr-react plyr video-player-custom" poster={videoPoster}>
          <source src={videoUrl} type="video/mp4" />
        </video> */}
        <img src={videoPoster} className='video-player-custom'/>
        <div className="video-overlay">
          <p>Xem trước</p>
        </div>
      </div>

      <div className="price-section-unique">
      <div className="price-unique">
        <span className="currency-unique">đ</span> 1.099.000
      </div>
      <div className="button-container-unique">
        <a href="#" className="add-to-cart-unique">Thêm vào giỏ hàng</a>
        {/* <a href="#" className="heart-icon-unique"><FontAwesomeIcon icon={faHeartOutline} className='icon-heart'/></a> */}
      <FontAwesomeIcon icon={faHeart} className='icon-heart heart-icon-unique'/>

      </div>
      <div className="button-container-unique">
        <label className="buy-now-unique"  onClick={() => navigate('/you')}>Mua ngay</label>
      </div>
      <div className="guarantee-unique">
        Đảm bảo hoàn tiền trong 30 ngày
      </div>
    </div>
    </div>
        <VideoModal 
         isOpen={isModalOpen} 
         onClose={closeModal} 
         videoUrl={videoUrl} 
         />

    </div>
  );
};

export default CourseIntro;
