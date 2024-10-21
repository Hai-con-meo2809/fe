import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css'; // Import CSS của Plyr

const RandomDogImage = () => {
  const [file, setFile] = useState(null);      // Quản lý file được chọn
  const [videoUrl, setVideoUrl] = useState(""); // Quản lý URL của video tải lên
  const videoRef = useRef(null);               // Sử dụng ref để tham chiếu đến thẻ video
  const playerRef = useRef(null);              // Sử dụng ref cho Plyr instance
  const [loading, setLoading] = useState("Upload");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Cập nhật file khi người dùng chọn
  };

  const handleUpload = async () => {  
    if (!file) {
      console.log("No file selected");
      return;
    }
    setLoading("Uploading");
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Sử dụng await để chờ phản hồi từ server
      const response = await axios.post('https://localhost:7298/api/Upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if(response.data){
        setLoading("Upload");
      }
      
      // Cập nhật videoUrl với URL nhận được từ server
      setVideoUrl(response.data.url);
      console.log("File URL:", response.data.url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  useEffect(() => {
    // Khởi tạo Plyr khi videoUrl thay đổi
    if (videoUrl) {
      if (playerRef.current) {
        playerRef.current.destroy(); // Hủy Plyr cũ nếu tồn tại để tránh lỗi
      }

      playerRef.current = new Plyr(videoRef.current, {
        controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
        autoplay: true,
        quality: {
          default: 720, // Đặt chất lượng mặc định là 720p
          options: [360, 720, 1080],
        },
      });
   
      console.log("Plyr initialized for video:", videoUrl);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy(); // Hủy Plyr khi component unmount
      }
    };
  }, [videoUrl]); // useEffect chạy khi videoUrl thay đổi

  return (
    <div style={{ marginTop: 100 }}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>{loading}</button>
    <img src={videoUrl} style={{width:500, height:500}}/>
      {/* Chỉ hiển thị video khi videoUrl không rỗng */}
        <video ref={videoRef} className="plyr-react plyr" controls style={{width:300, height:300}}>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
    
    </div>
  );
};

export default RandomDogImage;
