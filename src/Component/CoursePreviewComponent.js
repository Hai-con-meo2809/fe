import React from 'react';
import VideoPlayer from './VideoPlayer';
import CourseFeedback from './CourseFeedback';
const CoursePreviewComponent = ({ videoUrl }) => {
  return (
    <div className="custom-course-preview">
      <VideoPlayer key={videoUrl} videoUrl={videoUrl}/> {/* Chèn video player vào */}
   <CourseFeedback/>
    </div>
  );
};

export default CoursePreviewComponent;
