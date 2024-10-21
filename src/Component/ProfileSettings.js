import React, { useState } from 'react';
import '../Tepcss/profileSettings.css'; // Import CSS thông thường
import AvatarEditor from 'react-avatar-editor';
import axios from 'axios';
const ProfileSettings = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [editorRef, setEditorRef] = useState(null);
  const [selectedAll, setSelectedAll] = useState('profile');
  const [file, setFile] = useState(null);      // Quản lý file được chọn
  const [loading, setLoading] = useState("Upload");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFile(event.target.files[0]); // Cập nhật file khi người dùng chọn
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result)
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleAll = (index) =>{
      setSelectedAll(index);
  };
  // const handleSave = () => {
  //   if (editorRef) {
  //     const canvas = editorRef.getImageScaledToCanvas().toDataURL();
  //     // Lưu hoặc upload ảnh sau khi cắt
  //     console.log('Saved Image:', canvas);
  //   }
  // };
  const handleUpload = async () => {  
    if (!file) {
      console.log("No file selected");
      return;
    }
 
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Sử dụng await để chờ phản hồi từ server
      const response = await axios.post('https://localhost:7298/api/Upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

     
      
      // Cập nhật videoUrl với URL nhận được từ server
      console.log("File URL:", response.data.url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <div className="container">
      <h2 className="title">Hồ sơ & cài đặt</h2>
      <div className="tabs">
        <button className={selectedAll ==='profile' ? "activeTab":'activeTabs'} onClick={() => {toggleAll('profile')}}>Hồ sơ Udemy</button>
        <button className={selectedAll ==='picture' ? "activeTab":'activeTabs'} onClick={() => {toggleAll('picture')}}>Ảnh hồ sơ</button>
        <button className={selectedAll ==='hi' ? "activeTab":''}>Cài đặt bảo mật</button>
      </div>
      {selectedAll === 'profile' &&
      <form className="form">
       <div className='header-form1'> 

        <div className="formGroup">
          <label>Tên</label>
          <input type="text" placeholder="Thạch Anh" />
        </div>
        <div className="formGroup">
          <label>Họ</label>
          <input type="text" placeholder="Quốc" />
        </div>
        <div className="formGroup">
          <label>Headline</label>
          <input type="text" placeholder="Giảng viên tại Udemy" />
        </div>
        <div className="formGroup">
          <label>Tiểu sử</label>
          <textarea placeholder="Nhập tiểu sử của bạn"></textarea>
        </div>
        <div className="formGroup notetitle">
          <label>Để giúp học viên tìm hiểu thêm về bạn, tiểu sử của bạn phải phản ánh Độ uy tín, Sự thấu cảm, Niềm đam mê và Tính cách của bạn. Tiểu sử của bạn phải có ít nhất 50 từ, không được phép chứa đường liên kết và mã coupon.</label>
        </div>
        <div className='' >
            <button style={{padding:15}}>Lưu</button>
        </div>  

        </div>

        {/* <div className='header-form2'>  */}
        <div className="socialGroup">
          <div className="formGroup">
            <label>Trang web</label>
            <input type="text" placeholder="URL" />
          </div>
          <div className="formGroup">
            <label>Twitter</label>
            <input type="text" placeholder="http://www.twitter.com/" />
            <input type="text" placeholder="Tên người dùng" />
          </div>
          <div className="formGroup">
            <label>Facebook</label>
            <input type="text" placeholder="http://www.facebook.com/" />
            <input type="text" placeholder="Tên người dùng" />
          </div>
          <div className="formGroup">
            <label>LinkedIn</label>
            <input type="text" placeholder="http://www.linkedin.com/" />
            <input type="text" placeholder="ID tài nguyên" />
          </div>
          <div className="formGroup">
            <label>YouTube</label>
            <input type="text" placeholder="http://www.youtube.com/" />
            <input type="text" placeholder="Tên người dùng" />
          </div>
        </div>

        {/* </div> */}
      </form>
}
      {selectedAll === 'picture' && ( 
      <div className="profilePhotoSection">
        <label>Xem trước hình ảnh</label>
        <label>Tối thiểu 200x200 pixel, Tối đa 6000x6000 pixel</label>
        <div className="photoPreview">
        {selectedImage && (
            <AvatarEditor
              ref={(ref) => setEditorRef(ref)}  // Tham chiếu để tương tác với component AvatarEditor sau này
              image={selectedImage}             // Ảnh được hiển thị
              width={200}                       // Chiều rộng khung chỉnh sửa
              height={200}                      // Chiều cao khung chỉnh sửa
              border={50}                       // Viền của khung chỉnh sửa
              borderRadius={0}                  // Không bo góc, khung sẽ là hình vuông
              scale={1.2}                       // Phóng to ảnh 1.2 lần
              rotate={0}                        // Ảnh không bị xoay
            />
          )}

        </div>
        <input
          type="file"
          id="uploadPhoto"
          className="uploadInput"
          onChange={handleImageChange}
        />
        <label htmlFor="uploadPhoto" className="uploadButton">
          Tải hình ảnh lên
        </label>
        <button className="saveButton"  onClick={handleUpload}>
          Lưu
        </button>
      </div>
)}
    </div>
  );
};

export default ProfileSettings;
