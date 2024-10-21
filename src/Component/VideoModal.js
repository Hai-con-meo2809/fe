import React, { useEffect, useRef } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

const VideoModal = ({ isOpen, onClose, videoUrl }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const player = new Plyr(videoRef.current, {
        controls: [
          'play-large', 'play', 'progress', 'current-time', 'mute',
          'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'
        ],
      });

      // Clean up the player instance on component unmount
      return () => {
        player.destroy();
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <video ref={videoRef} className="plyr-react plyr">
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default VideoModal;
