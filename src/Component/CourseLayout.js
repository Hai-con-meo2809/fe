import React, { useState } from 'react';
import CourseContentComponent from './CourseContentComponent';
import CoursePreviewComponent from './CoursePreviewComponent';
import '../Tepcss/courseLayout.css';

const CourseLayout = () => {
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");

  const handleVideoSelect = (url) => {
    setSelectedVideoUrl(url);  // Cập nhật URL video
  };

  return (
    <div className="custom-course-container">
      {/* Truyền URL video vào CoursePreviewComponent */}
      <CoursePreviewComponent videoUrl={selectedVideoUrl} />
      
      {/* Truyền hàm handleVideoSelect để cập nhật URL video */}
      <CourseContentComponent onVideoSelect={handleVideoSelect} />
    </div>
  );
};

export default CourseLayout;
