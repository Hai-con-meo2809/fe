import React, { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css'; // Import CSS của Plyr

const VideoPlayer = ({ videoUrl }) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null); // Thêm ref để lưu Plyr instance

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.destroy(); // Hủy Plyr cũ
    }
  
    if (videoRef.current) {
      playerRef.current = new Plyr(videoRef.current, {
        controls: ['rewind','play-large','fast-forward', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen','lenguage'],
        autoplay: true,
        quality: {
          default: 720,
          options: [360, 720, 1080],
          forced: true,
          onChange: e => console.log(e),
        },
        captions:{ active: true , language: 'auto', update: false},
        
      });
  

    }
  
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []); // Khi videoUrl thay đổi, Plyr được khởi tạo lại
  

  return (
    <div className='settingvideo'>
      <video ref={videoRef} className="plyr-react plyr">
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
