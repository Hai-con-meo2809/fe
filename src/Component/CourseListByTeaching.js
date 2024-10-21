import React, { useState, useEffect } from 'react';
import '../Tepcss/courseListByTeaching.css';
import { Link, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MessageIcon from '@mui/icons-material/Message';
import HelpIcon from '@mui/icons-material/Help';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const CourseListByTeaching = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('course');
    const navigate = useNavigate();

  const courses = [
    { id: 1, title: 'python hay', status: 'BẢN NHÁP', visibility: 'Công khai' },
    { id: 2, title: 'python hay', status: 'BẢN NHÁP', visibility: 'Công khai', progress: '100%' },
    { id: 3, title: 'fd', status: 'BẢN NHÁP', visibility: 'Công khai', progress: '10%' },
  ];

  const handleClick = () => {
    setOpen(!open);
  };
    console.log(activeSection);
  const handleSectionChange = (section) => {
    setActiveSection(section === activeSection ? section : section);
    console.log(activeSection);

    // if(showdata === section || showdata !== section){
    //   setShowdata(section);
    // }
  };

  return (
    <div className="course-boths">
      <div className="special-course-content-containers">
        <List
          sx={{ width: '100%', bgcolor: 'background.paper', backgroundColor: '#efeaea', color: 'black', borderRadius: '8px' }}
          component="nav"
        >
          <ListItemButton
            sx={activeSection === "course" ? { backgroundColor: 'darkgray' } : {}}
            onClick={() => handleSectionChange("course")}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Khóa học" />
          </ListItemButton>

          <ListItemButton onClick={handleClick}>
            <ListItemIcon>
              <MessageIcon />
            </ListItemIcon>
            <ListItemText primary="Tin nhắn" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                sx={activeSection === "message" ? { backgroundColor: 'darkgray', pl: 6 } : { pl: 6 }}
                onClick={() => handleSectionChange("message")}
              >
                <ListItemIcon>
                  <MessageIcon />
                </ListItemIcon>
                <ListItemText primary="Tin nhắn" />
              </ListItemButton>
              <ListItemButton
                sx={activeSection === "Hoidap" ? { backgroundColor: 'darkgray', pl: 6 } : { pl: 6 }}
                onClick={() => handleSectionChange("Hoidap")}
              >
                <ListItemIcon>
                  <HelpIcon />
                </ListItemIcon>
                <ListItemText primary="Hỏi đáp" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </div>

      {activeSection === "message" && (
        <div className="course-list-container">
          <div className="message-container-custom">
            <h1 className="message-title-custom">Tin nhắn</h1>
            <div className="message-content-custom">
              <img 
                className="message-image-custom" 
                src="https://storage.googleapis.com/a1aa/image/xseS2FZ0xvWQJCMi31f9toFrt5ceJkNdoib7eI1y93f1eWl5E.jpg" 
                alt="Illustration of a person with a speech bubble"
              />
              <h2 className="message-heading-custom">Không có tin nhắn mới</h2>
              <p className="message-text-custom">
                Tin nhắn trực tiếp cho phép bạn trao đổi riêng với học viên hoặc các giảng viên khác. 
                Bạn sẽ thấy tin nhắn trực tiếp ở đây.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeSection === "course" && (
        <div className="course-list-container">
          <div className="course-list-header">
            <input type="text" placeholder="Tìm kiếm khóa học cũ" className="course-search" />
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown button
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>
            <div className="course-newcourse" onClick={() => navigate('/courseProgram')}>
              <button>Tạo khóa học mới</button>
            </div>
          </div>

          <div className="course-list">
            {courses.map((course) => (
              <div key={course.id} className="course-item">
                <div className="course-icon"></div>
                <div className="course-info">
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-status">{course.status} <span>{course.visibility}</span></p>
                  {course.progress && (
                    <div className="course-progress">
                      <span>Kết thúc khóa học của bạn</span>
                      <div className="progress-bar">
                        <div
                          className="progress-bar-fill"
                          style={{ width: course.progress }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSection === "Hoidap" && (
        <div className="course-list-container">
          <h1>Hỏi đáp</h1>
          <p>Nội dung cho phần hỏi đáp...</p>
        </div>
      )}
    </div>
  );
};

export default CourseListByTeaching;
