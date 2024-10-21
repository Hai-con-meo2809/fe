  import React, { useState,useRef } from 'react';
  import '../Tepcss/courseProgram.css'; // Import file CSS đã tùy chỉnh
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faPenToSquare, faPen, faVideo, faFile,faTrash,faPlus } from '@fortawesome/free-solid-svg-icons';
  import Confetti from 'react-confetti';
  import Swal from 'sweetalert2';
  import axios from 'axios';
  const CourseProgram = () => {
    const [sections, setSections] = useState([{ id: 1, title: 'Giới thiệu', lectures: [{ id: 1, title: 'Giới thiệu' }] }]);
    const [selectSection, setSelectSetion] = useState([]);
    const [selectAll, setSelectAll] = useState([]); // Trạng thái để quản lý các bài giảng đang chỉnh sửa
    const [showCourse, setShowCourse] = useState([]); // Trạng thái để quản lý các bài giảng có phần nội dung được hiển thị
    const [fileSelected, setFileSelected] = useState([]); // Trạng thái để quản lý file được chọn
    const [selectInputByLectureId, setSelectInputByLectureId] = useState([]); // Trạng thái để hiển thị input video cho từng bài giảng
    const [selectVideo, setSelectVideo] = useState({});
    const [changeTiltleSection, setchangeTiltleSection] = useState([]);
    const [showConfetti, setShowConfetti] = useState(false);
    const [c, setc] = useState(false);
    const fileInputRef = useRef({});
    const fileInputRefs = useRef({});
    const [title, setTitle] = useState('python hay');
    const [subtitle, setSubtitle] = useState('');
    const [description, setDescription] = useState('');
    const [topic, setTopic] = useState('');
    const [courseImage, setCourseImage] = useState(null);
    const [promoVideo, setPromoVideo] = useState(null);
  
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleSubtitleChange = (e) => setSubtitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleTopicChange = (e) => setTopic(e.target.value);
    const handleCourseImageChange = (e) => setCourseImage(e.target.files[0]);
    const handlePromoVideoChange = (e) => setPromoVideo(e.target.files[0]);
    const handleSubmit = () => {
      const checksubmit = () => {
        let hasError = false; // Biến kiểm soát lỗi
        sections.forEach((section) => {
          if(section.lectures.length === 0){
            if (!hasError) {
              alert('Bổ sung bài giảng cho phần còn thiếu!'); // Chỉ báo lỗi lần đầu
              hasError = true; // Đánh dấu có lỗi
          }
          }
            section.lectures.forEach((lecture) => {
                const videoKey = `${section.id}-${lecture.id}`; // Tạo ra khóa duy nhất
                console.log(lecture.title);
                      if (!selectVideo[videoKey]) { // Kiểm tra nếu không có video
                        if (!hasError) {
                            alert('Bài giảng hiện tại chưa có video hoặc khóa học!'); // Chỉ báo lỗi lần đầu
                            hasError = true; // Đánh dấu có lỗi
                        }
                    }
                
            });
        });
    

        if (!hasError) { // Nếu không có lỗi nào thì báo đủ
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000); // Tắt sau 5 giây
        }
    };
    
        checksubmit();

    };

    const Upload_Video = async () =>{

        const formData = new FormData();
    
        // Chuyển đổi dữ liệu sections thành chuỗi JSON
        const sectionsJSON = JSON.stringify(sections);
        formData.append("sections", sectionsJSON);
    
        Object.keys(selectVideo).forEach((key) => {
          const videoData = selectVideo[key]; 


          const metadata = { ...videoData, files: undefined }; 
          formData.append(`DetailVideoMetadata_${key}`, JSON.stringify(metadata));

          // Gửi tệp video cho từng video
          const videoFile = videoData.files; 
          formData.append(`DetailVideoFiles_${key}`, videoFile);
    });

        const response = await axios.post('https://localhost:7298/api/Upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      
        console.log('Upload successful:', response.data);
        

    };






    const handleVideoClick = (sectionId, lectureId) => {
      // Sử dụng tham chiếu cụ thể cho mỗi input file
      const inputKey = `${sectionId}-${lectureId}`;
      if (fileInputRef.current[inputKey]) {
        fileInputRef.current[inputKey].click();
      }
    };
    
    const handleVideoClicks = (sectionId, lectureId) => {
      // Sử dụng tham chiếu cụ thể cho mỗi input file
      const inputKey = `${sectionId}-${lectureId}`;
      if (fileInputRefs.current[inputKey]) {
        fileInputRefs.current[inputKey].click();
      }
    };
  //   const AddFile = (sectionId, lectureId) =>{
  //     console.log(fileSelected);
  //   setFileSelected(prevState => {
  //   const existingItem = prevState.find(item => item.sectionId === sectionId && item.lectureId === lectureId);
  //   if (existingItem) {
  //     return prevState.filter(item => !(item.sectionId === sectionId && item.lectureId === lectureId));
  //   } else {
  //     return [...prevState, { sectionId, lectureId }];
  //   }
  // });
  //   }; 
    // Hàm để thay đổi trạng thái hiển thị input cho video của từng bài giảng
    const changeInput = (sectionId, lectureId) => {
  
      setSelectInputByLectureId(prevState => {
        const existingItem = prevState.find(item => item.sectionId === sectionId && item.lectureId === lectureId);
        
        if (existingItem) {
          return prevState.map(c =>({
            ...c
          }));
        } else {
      
          return [...prevState, { sectionId, lectureId }];
        
        }
      });
    };


    // hàm lưu thông tin file upload
    
    const handleFileUpload = (e, sectionId, lectureId) => {

        const videoKey = `${sectionId}-${lectureId}`;
        const file = e.target.files[0];
        if(!file) return;
      const newfileData = {
        name: file.name,
        type: file.type,
        date: new Date().toLocaleDateString(),
        status: 'Đang xử lý',
        files: e.target.files[0],
        
      };
      setSelectVideo(c => ({
        // Tìm và cập nhật hoặc thêm mới
          ...c,
          [videoKey]: newfileData
          
      }));
      console.log(newfileData);
        changeInput(sectionId,lectureId);
    
    };





  // hàm xóa các phần
  const deleleSection = (sectionId) => {
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: "Bạn sẽ không thể hoàn tác hành động này!",
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng, xóa nó!',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        // Nếu người dùng xác nhận, tiến hành xóa section
        setSections(prevState => {
          const SelectedSection = prevState.filter(c => !(c.id === sectionId));
          const UpdateIdsection = SelectedSection.map((item, index) => ({
            ...item,
            id: index + 1,
          }));
          return UpdateIdsection;
        });
  
        // Hiển thị thông báo đã xóa thành công
        Swal.fire(
          'Đã xóa!',
          'Section đã được xóa thành công.',
          'success'
        );
      }
    });
  };
  

  // hàm xóa từng bài giảng
  const deleteLection = (sectionId, lectureId) =>{
    const SelectedSection = sections.filter(c => (c.id == sectionId));
    const getdatafirst = SelectedSection[0];
    const getdata = getdatafirst.lectures.filter(c => !(c.id == lectureId));
    console.log(getdata);
    const getlectureIdbySectionId = getdata.map((c1,index) =>(
          {
            ...c1,
            id: index + 1,          
          }
    ))
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        return { ...section, lectures: getlectureIdbySectionId };  // Thay đổi lectures của section
      }
      return section;  // Các section khác không thay đổi
    });
    Swal.fire({
      title: 'Bạn có chắc chắn?',
      text: "Bạn sẽ không thể hoàn tác hành động này!",
      // icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng, xóa nó!',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
      setSections(updatedSections);
      Swal.fire(
        'Đã xóa!',
        'Section đã được xóa thành công.',
        'success'
      );
    }
  });
  };

    // Hàm để bật/tắt nội dung của một bài giảng
    const toggleAddCourse = (sectionId, lectureId) => {
      const videoKey = `${sectionId}-${lectureId}`;
      const existing = showCourse.find((c) => c.sectionId === sectionId && c.lectureId === lectureId);
      if (existing) {
        setShowCourse(showCourse.filter((c) => !(c.sectionId === sectionId && c.lectureId === lectureId)));
        setSelectInputByLectureId(selectInputByLectureId.filter((c) => !(c.sectionId === sectionId && c.lectureId === lectureId)));
        // setSelectVideo(prevState => prevState.filter(item => !(item.sectionId === sectionId && item.lectureId === lectureId)));
        setSelectVideo((prevState) =>{
          const updateSelectVideo = {...prevState};
          delete updateSelectVideo[videoKey];
          return updateSelectVideo;
        })
      } else {
        setShowCourse([...showCourse, { sectionId, lectureId }]);
      }
    };

    // Hàm để bật/tắt chế độ chỉnh sửa tên bài giảng
    const cancelLecture = (sectionId, lectureId) => {
      // setSelectAll(selectAll.filter((id) => id !== lectureId))
      setSections(prevSections =>
        prevSections.map(section => 
          section.id === sectionId
            ? {
                ...section,
                lectures: section.lectures.map(lecture =>
                  lecture.id === lectureId
                    ? { ...lecture, title: '' } // Hoặc khôi phục tiêu đề cũ nếu bạn l ưu trước đó
                    : ''
                )
              }
            : section
        )
      );
    };
    
    const cancelSection = (sectionId) =>{
    
        setSections(c =>
          c.map(c =>
            c.id === sectionId ?
            
              {...c, title: ''}
          : c
          )
        )
       
    };

    // hàm thay đổi tiêu đề từng phần bài giảng
    const changetiltleSection = (sectionId) => {
      const getdata = changeTiltleSection.find(c => c.sectionId === sectionId);

      const section = sections.find((c) => c.id === sectionId);
      if (!section.title.trim()) {
        alert('Không được để trống tiêu đề');
        return; // Dừng hàm nếu tiêu đề không hợp lệ
      }
        else{
          if (getdata) {
            setchangeTiltleSection(changeTiltleSection.filter((c) => !(c.sectionId === sectionId)));
            
          } else {
            setchangeTiltleSection([...changeTiltleSection,  {sectionId} ]); // Lưu đối tượng {sectionId} vào mảng
          }
        }
    
      // if (getdata) {
      //   setchangeTiltleSection(changeTiltleSection.filter((c) => !(c.sectionId === sectionId)));
        
      // } else {
      //   setchangeTiltleSection([...changeTiltleSection,  {sectionId} ]); // Lưu đối tượng {sectionId} vào mảng
      // }
    };

    // hàm thay đổi tiêu đề bài giảng
    const changetiltleLecture = (sectionId,lectureId) => {
    
      const Sections = sections.find(c => (c.id === sectionId));
      const datas = Sections.lectures.find(c => (c.id === lectureId));
      if (!datas.title.trim()) {
        alert('Không được để trống tiêu đề');
        return; // Dừng hàm nếu tiêu đề không hợp lệ
      }
      else{
      if (selectAll.includes(lectureId)) {
        setSelectAll(selectAll.filter((c) => c !== lectureId));
      
      } else {
        setSelectAll([...selectAll, lectureId]);
      }
    }
    };
    


    // hàm thay đổi tên từng phần bài giảng
    const toggleChangeInputSection = (sectionId, newTitle) => {
      console.log(newTitle);
      setSections(prevSections => 
        prevSections.map(section => 
          section.id === sectionId 
            ? { ...section, title: newTitle } 
            
            : section
        )
      );
    };
    
    // Hàm để thay đổi tên bài giảng
    const toggleChangeInputLecture = (sectionId, lectureId, newTitle) => {
      
      setSections(prevSections =>
        prevSections.map(section =>
          section.id === sectionId
            ? 
            {
                ...section,
                lectures: section.lectures.map(lecture =>
                  lecture.id === lectureId
                    ? { ...lecture, title: newTitle }
                    : lecture
                )
              }
            : section
        )
      );
    };

    // Hàm để thêm một phần mới vào chương trình
    const handleAddSection = () => {
      const newSection = {
        id: sections.length + 1,
        title: `Phần Mới`,
        lectures: []
      };
      setSections([...sections, newSection]);
    };

    // Hàm để thêm một bài giảng mới vào phần hiện tại
    const handleAddLecture = (sectionId) => {
      const updatedSections = sections.map(section => {
        if (section.id === sectionId) {
          const newLecture = {
            id: section.lectures.length + 1,
            title: `Bài giảng mới`
          };
          section.lectures.push(newLecture);
        }
        return section;
      });
      setSections(updatedSections);
    };

    return(
     
     <div className="course-both">

    <div className="special-course-content-container">
      <div className="special-section">
        <div className="special-section-title">Lên kế hoạch cho khóa học của bạn</div>
        <div className="special-content-item">Học viên mục tiêu</div>
        <div className="special-content-item">Cấu trúc khóa học</div>
        <div className="special-content-item">Thiết lập studio và tạo video thử nghiệm</div>
      </div>

      <div className="special-section">
        <div className="special-section-title">Tạo nội dung của bạn</div>
        <div className="special-content-item">Quay phim & chỉnh sửa</div>
        <div className="special-content-item">Chương trình giảng dạy</div>
        <div className="special-content-item">Phụ đề (tùy chọn)</div>
        <div className="special-content-item">Khả năng truy cập (tùy chọn)</div>
      </div>

      <div className="special-section">
        <div className="special-section-title">Xuất bản khóa học của bạn</div>
        <div className="special-content-item">Trang tổng quan khóa học</div>
        <div className="special-content-item">Định giá</div>
        <div className="special-content-item">Khuyến mại</div>
        <div className="special-content-item">Tin nhắn khóa học</div>
      </div>

      <button className="special-submit-button" onClick={() => setc(true)}>Gửi đi để xem xét</button>
    </div>

  

{c ? (
      <div className="course-program-container">
        <div className="course-program-tiltlebutton">
          <h2 className="course-program-title">Chương trình giảng dạy</h2>
          <button className="upload-button"onClick={Upload_Video} >Trình tải lên hàng loạt</button>
        </div>
        <p className="course-program-description">
          Hãy bắt đầu xây dựng khóa học của bạn bằng cách tạo các phần, bài giảng và bài thực hành (trắc nghiệm, bài tập coding và bài tập).
        </p>
        {sections.map(section => (
          <div key={section.id} className="course-section">

            <div className="section-header">
              <span style={{fontWeight:'bold'}}>{`Phần ${section.id}:`} </span>
              {changeTiltleSection.find(c => c.sectionId === section.id) ?
              (
                <>
                <div className="lecture-buttons">
                <input type='text' value={section.title} className='lecture-input' onChange={(e) => toggleChangeInputSection(section.id, e.target.value)} />
{/*                 
                <button onClick={() => changetiltleSection(section.id)}>lưu</button>
                <button onClick={() => cancelSection(section.id)}>hủy</button> */}
                <div className='toggle-save-cancel'>
                <div className='lecture-save-cancel lecture-save' onClick={() => changetiltleSection(section.id)}>lưu</div>
                <div className='lecture-save-cancel lecture-cancel' onClick={() => cancelSection(section.id)}>hủy</div>
                </div>
                </div>
                </>
              ):
                (
                  <span className='icon-header'>{`${section.title}`} 
                  <FontAwesomeIcon icon={faPenToSquare} style={{ fontSize: 15, marginLeft: 25, marginBottom: 1.5 }} onClick={() => changetiltleSection(section.id)} />
                  <FontAwesomeIcon icon={faTrash}  style={{ fontSize: 15, marginBottom: 1.5, marginLeft:10 }} onClick={() => deleleSection(section.id)}/></span>
                )}  
            </div>
            {section.lectures.map(lecture => (
              <div key={lecture.id} className='add-course-spaces'>
                <div className="lecture-item">
                  <div className='lecture-item-all'>
                    <p>Bài giảng {lecture.id}:</p>

                    {selectAll.includes(lecture.id) ? (
                      <input type='text' value={lecture.title} className='lecture-input' id={`file-upload-${section.id}-${lecture.id}`} onChange={(e) => toggleChangeInputLecture(section.id, lecture.id, e.target.value)} />
                    ) : (
                      <>
                        <span className='lecture-title'>{lecture.title}</span>
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          style={{ fontSize: 15, marginBottom: 1.5 }}
                          onClick={() => changetiltleLecture(section.id,lecture.id)}
                        />
                        <FontAwesomeIcon icon={faTrash}  style={{ fontSize: 15, marginBottom: 1.5, marginLeft:-10 }} onClick={() => deleteLection(section.id, lecture.id)}/>
                      </>
                    )}
                  </div>

                  {selectAll.includes(lecture.id) ? (
                    <div className="lecture-buttons">
                      <button className="add-content-button" onClick={() => changetiltleLecture(section.id,lecture.id)}>Lưu</button>
                      <button className="add-content-button" onClick={() => cancelLecture(section.id,lecture.id)}>Hủy</button>
                    </div>
                  ) : (
                    showCourse.find((c) => c.sectionId === section.id && c.lectureId === lecture.id) ? (
                      <button className="add-content-button" onClick={() => toggleAddCourse(section.id, lecture.id)}>Hủy</button>
                    ) : (
                      <button className="add-content-button" onClick={() => toggleAddCourse(section.id, lecture.id)}>Nội dung</button>
                    )
                  )}
                </div>

                {showCourse.find((c) => c.sectionId === section.id && c.lectureId === lecture.id) && (
                  <div className="add-course-video">
                    {!selectInputByLectureId.find(c => c.sectionId === section.id && c.lectureId === lecture.id) ? (
                      <>
                        <p >Chọn loại nội dung chính. Có thể thêm file và đường liên kết dưới dạng tài nguyên.Tìm hiểu về loại nội dung.</p>
                        <div className='add-course-video2'>
                          <div className='add-video' onClick={() => handleVideoClick(section.id,lecture.id)}>
                                                      <input
                                                        type="file"
                                                        id="file-upload"
                                                        style={{ display: 'none' }}
                                                        onChange={(e) => handleFileUpload(e, section.id, lecture.id)}
                                                        ref={el => fileInputRef.current[`${section.id}-${lecture.id}`] = el}
                                                        />
                  
                            <FontAwesomeIcon icon={faVideo} className='icon-video'  />
                            <p>Video</p>
                          </div>
                          <div className='add-video'>
                            <FontAwesomeIcon icon={faPenToSquare} className='icon-video' />
                            <p>Write</p>
                          </div>
                          <div className='add-video'>
                            <FontAwesomeIcon icon={faFile} className='icon-video' />
                            <p>Docx</p>
                          </div>
                        </div>
                      </>
                    ) : (
                        


                      <div className="file-uploader-container">
                        {selectVideo[`${section.id}-${lecture.id}`] ? (
                                          <div className="file-details">
                                          <table className="file-info-table">
                                            <thead>
                                              <tr>
                                                <th>Tên file</th>
                                                <th>Loại</th>
                                                <th>Trạng thái</th>
                                                <th>Ngày</th>
                                              </tr>
                                            </thead>
                                            <tbody>
                                              <tr>
                                              <td>{selectVideo[`${section.id}-${lecture.id}`].name}</td>
                                                <td>{selectVideo[`${section.id}-${lecture.id}`].type.includes('video') ? 'Video' : 'File'}</td>
                                                <td>{selectVideo[`${section.id}-${lecture.id}`].status}</td>
                                                <td>{selectVideo[`${section.id}-${lecture.id}`].date}</td>
                                                <td>
                                                    {/* <label onClick={() => handleVideoClick(section.id,lecture.id)} >
                                                      Thay video
                                                    </label> */}
                                                 <input
                                                    type="file"
                                                    id={`file-upload-${section.id}-${lecture.id}`}
                                                    style={{ display: 'none' }}
                                                    onChange={(e) => handleFileUpload(e, section.id, lecture.id)}
                                                    ref={el => fileInputRefs.current[`${section.id}-${lecture.id}`] = el}
                                                  
                                                  />
                                                    {/* <p onClick={() => handleVideoClick(section.id,lecture.id)}> Thay video  </p> */}
                                                    <button onClick={() => handleVideoClicks(section.id, lecture.id)} style={{padding:0, backgroundColor:'transparent', color:'black'}}>
                                                        Thay video
                                                    </button>
                                              </td>
                    
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                        ):''} 
                        {/* <input
                        type="file"
                        id={`file-upload-${section.id}-${lecture.id}`}
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileUpload(e, section.id, lecture.id)}
                        ref={el => fileInputRefs.current[`${section.id}-${lecture.id}`] = el}
                      
                      /> */}

                        
                        
  {/* 
                      // <div className="file-input-section">
                      //                                 <input
                      //                                   type="file"
                      //                                   id="file-upload"
                      //                                   style={{ display: 'none' }}
                      //                                   onChange={(e) => handleFileUpload(e, section.id, lecture.id)}
                      //                                 />
                      //                                 <label htmlFor="file-upload" className="custom-file-upload" onClick={() => AddFile(section.id, lecture.id)} >
                      //                                 {fileSelected.find(c => c.sectionId == section.id && c.lectureId == lecture.id) 
                      //                                       ? 
                      //                                       // {selectVideo[`${section.id}-${lecture.id}`].name} 
                      //                                       ""
                      //                                       : 
                      //                                       'Không có file nào được chọn'}                        </label>
                      //                                 <label htmlFor="file-upload" className="choose-file-button" onClick={() => AddFile(section.id, lecture.id)}>Chọn video</label>
                      //                                 <p  >check</p>
                      //                               </div>
                        } */}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div className="add-lecture-button-container">
              <button className="add-lecture-button" onClick={() => handleAddLecture(section.id)}><FontAwesomeIcon icon={faPlus} style={{ marginRight:10 }} />Thêm bài giảng</button>
            </div>
          </div>
        ))}
        <div className="add-section-button-container">
          <button className="add-section-button" onClick={handleAddSection}><FontAwesomeIcon icon={faPlus} style={{ marginRight:10 }} />Thêm phần mới</button>
          <button className="handle-submit" onClick={handleSubmit}>Gửi khóa học</button>
          {showConfetti && <Confetti />}
        </div>
      

      </div>
  ) : 

      <div className="course-overview">
      <h1 className="course-overview__title">Trang tổng quan khóa học</h1>
      <p className="course-overview__description">
        Trang tổng quan khóa học của bạn rất quan trọng đối với thành công của bạn trên Udemy. Nếu được thực hiện đúng, trang này cũng có thể giúp bạn hiển thị trong các công cụ tìm kiếm như Google. Khi bạn hoàn thành phần này, hãy nghĩ đến việc tạo Trang tổng quan khóa học hấp dẫn để hiển thị ai đó muốn ghi danh khóa học của bạn. Tìm hiểu thêm về <a href="#" className="course-overview__link">cách tạo trang tổng quan khóa học của bạn</a> và <a href="#" className="course-overview__link">các tiêu chuẩn tiêu đề khóa học</a>.
      </p>
      
      <div className="course-overview__form-group">
        <label htmlFor="course-title" className="course-overview__label">Tiêu đề khóa học</label>
        <input 
          type="text" 
          id="course-title" 
          value={title} 
          onChange={handleTitleChange}
          className="course-overview__input"
        />
        <div className="course-overview__char-count">{title.length}/50</div>
      </div>
      
      <div className="course-overview__form-group">
        <label htmlFor="course-subtitle" className="course-overview__label">Phụ đề khóa học</label>
        <input 
          type="text" 
          id="course-subtitle" 
          placeholder="Chèn phụ đề khóa học."
          value={subtitle}
          onChange={handleSubtitleChange}
          className="course-overview__input"
        />
        <div className="course-overview__char-count">{subtitle.length}/120</div>
      </div>
      
      <div className="course-overview__form-group">
        <label htmlFor="course-description" className="course-overview__label">Mô tả khóa học</label>
        <div className="course-overview__editor-toolbar">
          <button className="course-overview__toolbar-button"><i className="fas fa-bold"></i></button>
          <button className="course-overview__toolbar-button"><i className="fas fa-italic"></i></button>
          <button className="course-overview__toolbar-button"><i className="fas fa-list-ul"></i></button>
          <button className="course-overview__toolbar-button"><i className="fas fa-list-ol"></i></button>
        </div>
        <textarea 
          id="course-description" 
          placeholder="Chèn mô tả khóa học."
          value={description}
          onChange={handleDescriptionChange}
          className="course-overview__textarea"
        ></textarea>
        <div className="course-overview__char-count">Mô tả phải dài ít nhất là 200 từ.</div>
      </div>
      
      <div className="course-overview__form-row">
        <div className="course-overview__form-group">
          <label htmlFor="language" className="course-overview__label">Thông tin cơ bản</label>
          <select id="language" className="course-overview__select">
            <option>Tiếng Việt</option>
          </select>
        </div>
        <div className="course-overview__form-group">
          <label htmlFor="level" className="course-overview__label">-- Chọn trình độ --</label>
          <select id="level" className="course-overview__select">
            <option>-- Chọn trình độ --</option>
          </select>
        </div>
        <div className="course-overview__form-group">
          <label htmlFor="category" className="course-overview__label">CNTT & Phần mềm</label>
          <select id="category" className="course-overview__select">
            <option>CNTT & Phần mềm</option>
          </select>
        </div>
      </div>
      
      <div className="course-overview__form-row">
        <div className="course-overview__form-group">
          <label htmlFor="subcategory" className="course-overview__label">-- Chọn thể loại con --</label>
          <select id="subcategory" className="course-overview__select">
            <option>-- Chọn thể loại con --</option>
          </select>
        </div>
      </div>
      
      <div className="course-overview__form-group">
        <label htmlFor="primary-topic" className="course-overview__label">
          Khóa học của bạn chủ yếu giảng dạy nội dung nào? 
          <i className="fas fa-info-circle course-overview__info-icon"></i>
        </label>
        <input 
          type="text" 
          id="primary-topic" 
          placeholder="Ví dụ: Nghệ thuật chụp ảnh phong cảnh"
          value={topic}
          onChange={handleTopicChange}
          className="course-overview__input"
        />
      </div>


      <div className="course-overview__form-group">
        <label htmlFor="course-content" className="course-overview__label">
          Khóa học của bạn chủ yếu giảng dạy nội dung nào?
          <i className="fas fa-info-circle course-overview__info-icon"></i>
        </label>
        <input 
          type="text" 
          id="course-content" 
          placeholder="Ví dụ: Nghệ thuật chụp ảnh phong cảnh"
          value={topic}
          onChange={handleTopicChange}
          className="course-overview__input"
        />
      </div>

      <div className="course-overview__form-group">
        <div className="course-overview__section-title">Hình ảnh khóa học</div>
        <div className="course-overview__image-placeholder">
          <img 
            src="https://storage.googleapis.com/a1aa/image/rSWbwolWBwq5JFA8h6e0FR3HoosZJcYO7RAuy4f54ZuiJGkTA.jpg" 
            alt="Placeholder image for course content" 
            width="300" 
            height="300"
          />
        
        <div className="course-overview__upload-instructions">
          Tải hình ảnh khóa học lên tại đây. Để được chấp nhận, hình ảnh phải đáp ứng
          <a href="#" className="course-overview__link"> tiêu chuẩn chất lượng hình ảnh khóa học</a>
          Hướng dẫn quan trọng: 750x422 pixel; .jpg, .jpeg, .gif, hoặc .png. và không có chữ trên hình ảnh.
        
        <div className="course-overview__upload-buttons">
          <label htmlFor="course-image-upload" className="course-overview__upload-label">
            Tải file lên
          </label>
          <input 
            type="file" 
            id="course-image-upload" 
            onChange={handleCourseImageChange}
            className="course-overview__file-input"
          />
          <span className="course-overview__file-name">
            {courseImage ? courseImage.name : 'Không có file nào được chọn'}
          </span>
        </div>
        </div>


      </div>
      </div>

      <div className="course-overview__form-group">
        <div className="course-overview__section-title">Hình ảnh khóa học</div>
        <div className="course-overview__image-placeholder">
          <img 
            src="https://storage.googleapis.com/a1aa/image/rSWbwolWBwq5JFA8h6e0FR3HoosZJcYO7RAuy4f54ZuiJGkTA.jpg" 
            alt="Placeholder image for course content" 
            width="300" 
            height="300"
          />
        
        <div className="course-overview__upload-instructions">
          Tải hình ảnh khóa học lên tại đây. Để được chấp nhận, hình ảnh phải đáp ứng
          <a href="#" className="course-overview__link"> tiêu chuẩn chất lượng hình ảnh khóa học</a>
          Hướng dẫn quan trọng: 750x422 pixel; .jpg, .jpeg, .gif, hoặc .png. và không có chữ trên hình ảnh.
        
        <div className="course-overview__upload-buttons">
          <label htmlFor="course-image-upload" className="course-overview__upload-label">
            Tải file lên
          </label>
          <input 
            type="file" 
            id="course-image-upload" 
            onChange={handleCourseImageChange}
            className="course-overview__file-input"
          />
          <span className="course-overview__file-name">
            {courseImage ? courseImage.name : 'Không có file nào được chọn'}
          </span>
        </div>
        </div>


      </div>
      </div>
  
    </div>
  }

      </div>
    );
  };

  export default CourseProgram;
