import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import VideoModal from './VideoModal';

const CourseContent = () => {
  const [sections, setSections] = useState([]);
  const [activeSection, setActiveSection] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const location = useLocation();
  const courseId = location.state?.courseId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sectionsResponse = await axios.get(`https://localhost:7298/api/GetData/sectionId/${encodeURIComponent(courseId)}`);
        setSections(sectionsResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, [courseId]);

  const toggleSection = (index) => {
    setActiveSection(activeSection === index ? null : index);
  };

  const openModal = (videoUrl) => {
    setCurrentVideoUrl(videoUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentVideoUrl('');
  };

  return (
    <div className="course-content">
      {sections.map((section, index) => (
        <div key={index} className="course-section">
          <div className="section-header" onClick={() => toggleSection(index)}>
            <h2>{section.title}</h2>
            <span className="toggle-icon">{activeSection === index ? '-' : '+'}</span>
          </div>
          <div className={`section-content ${activeSection === index ? 'active' : ''}`}>
            {section.lessons.map((lesson, lessonIndex) => (
              <div key={lessonIndex} className="lesson">
                <a href="#" onClick={() => openModal(lesson.videoUrl)}>{lesson.title}</a>
                <p>{lesson.description}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <VideoModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        videoUrl={currentVideoUrl} 
      />
    </div>
  );
};

export default CourseContent;
