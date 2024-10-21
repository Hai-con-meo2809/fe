import React, { useState, useEffect } from 'react';
// import { ChevronDown, ChevronUp, Video, Folder } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const CourseContentComponent = ({ onVideoSelect }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [expandedModules, setExpandedModules] = useState([]);
  const [showdata, setShowdata] = useState([]);
  const toggleModule = (moduleIndex) => {
    if (expandedModules.includes(moduleIndex)) {
      setExpandedModules(expandedModules.filter((index) => index !== moduleIndex));
    } else {
      setExpandedModules([...expandedModules, moduleIndex]);
    }
  };

  const sections = [
    { title: "Chào mừng bạn!", duration: "3 phút"  },
    { title: "Những gì bạn sẽ học trong khóa học này", duration: "1 phút",  },
    { title: "Các bước tạo khóa học trên Udemy", duration: "3 phút"},
    { title: "Hoạt động: Xây dựng dự thảo khóa học trên Udemy", duration: "1 phút" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7298/api/Upload');
        setShowdata(response.data);

        if(response.data.length < 0){
        }
      } catch (error) {
        console.error('Có lỗi xảy ra khi lấy dữ liệu:', error);
      }
    };

    fetchData();
    
  }, []); // Thêm navigate vào dependencies array

  return (
    <div className="custom-course-content">
        <div className='header-contents'>
            <p className='header-content'>Nội dung khóa học</p>
            <FontAwesomeIcon icon={faXmark} className='cancel-content'/>
        </div>
         <div className="course-section">
          <div onClick={() => toggleModule(1)}>
      <p className="title">Phần 1: Giới thiệu</p>
      <p className="sub-title">0 / 4 | 9 phút</p>
      </div>
      {expandedModules.includes(1) && (
      <ul className="lesson-list">
   {showdata.map((course, index)  => ( 
    <>
        <li className="lesson-item" onClick={() => onVideoSelect(course.url)}>
          <div className="checkbox-container">
            <input type="checkbox" className="checkbox" style={{color:"black"}}/>
          </div>
          <div className="content-container">
            <p className="lesson-title">{course.title}</p>
            <p className="lesson-time">{course.url}</p>
          </div>
        </li>
   
        </>
         ))}
      </ul>
       )}
    </div>
 
  

    <div className="course-section">
          <div onClick={() => toggleModule(2)}>
      <p className="title">Phần 3: Giới thiệu</p>
      <p className="sub-title">0 / 4 | 9 phút</p>
      </div>
      {expandedModules.includes(2) && (
      <ul className="lesson-list">
        <li className="lesson-item">
          <div className="checkbox-container">
            <input type="checkbox" className="checkbox" style={{color:"black"}}/>
          </div>
          <div className="content-container">
            <p className="lesson-title">1. Chào mừng bạn! đây là khóa học đỉnh nhất rồi đó</p>
            <p className="lesson-time">3 phút</p>
          </div>
        </li>
        <li className="lesson-item">
          <div className="checkbox-container">
            <input type="checkbox" className="checkbox" />
          </div>
          <div className="content-container">
            <p className="lesson-title">2. Những gì bạn sẽ học trong khóa học này</p>
            <p className="lesson-time">1 phút</p>
          </div>
        </li>
        <li className="lesson-item">
          <div className="checkbox-container">
            <input type="checkbox" className="checkbox" />
          </div>
          <div className="content-container">
            <p className="lesson-title">3. Các bước tạo khóa học trên Udemy</p>
            <p className="lesson-time">3 phút</p>
            {/* <button className="resource-button">Tải nguyên</button> */}
          </div>  
        </li>
        <li className="lesson-item">
          <div className="checkbox-container">
            <input type="checkbox" className="checkbox" />
          </div>
          <div className="content-container">
            <p className="lesson-title">4. Hoạt động: Xây dựng dự thảo khóa học trên Udemy</p>
            <p className="lesson-time">3 phút</p>

          </div>
        </li>
      </ul>
       )}
    </div>

    <div className="course-section">
          <div onClick={() => toggleModule(3)}>
      <p className="title">Phần 2: Giới thiệu</p>
      <p className="sub-title">0 / 4 | 9 phút</p>
      </div>
      {expandedModules.includes(3) && (
      <ul className="lesson-list">
        <li className="lesson-item">
          <div className="checkbox-container">
            <input type="checkbox" className="checkbox" style={{color:"black"}}/>
          </div>
          <div className="content-container">
            <p className="lesson-title">1. Chào mừng bạn! đây là khóa học đỉnh nhất rồi đó</p>
            <p className="lesson-time">3 phút</p>
          </div>
        </li>
        <li className="lesson-item">
          <div className="checkbox-container">
            <input type="checkbox" className="checkbox" />
          </div>
          <div className="content-container">
            <p className="lesson-title">2. Những gì bạn sẽ học trong khóa học này</p>
            <p className="lesson-time">1 phút</p>
          </div>
        </li>
        <li className="lesson-item">
          <div className="checkbox-container">
            <input type="checkbox" className="checkbox" />
          </div>
          <div className="content-container">
            <p className="lesson-title">3. Các bước tạo khóa học trên Udemy</p>
            <p className="lesson-time">3 phút</p>
            {/* <button className="resource-button">Tải nguyên</button> */}
          </div>  
        </li>
        <li className="lesson-item">
          <div className="checkbox-container">
            <input type="checkbox" className="checkbox" />
          </div>
          <div className="content-container">
            <p className="lesson-title">4. Hoạt động: Xây dựng dự thảo khóa học trên Udemy</p>
            <p className="lesson-time">3 phút</p>

          </div>
        </li>
      </ul>
       )}
    </div>
    </div>
  );
};

export default CourseContentComponent;
