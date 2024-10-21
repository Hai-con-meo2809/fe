import React, { useState } from 'react';
import '../Tepcss/RatingFeedback.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPen, faVideo, faFile,faTrash,faPlus,faStar } from '@fortawesome/free-solid-svg-icons';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { styled } from '@mui/material';
const RatingFeedback = ({onshow}) => {
  const [chancolor, setchancolor]  = useState(0);
  const [chancolors, setchancolors]  = useState(0);

  const color = (star) =>{
      setchancolor(star);
  };
  const getdatacolor = () =>{

  };
  return (
    <div className='toggle-rating'>
    <div className="rf-rating-container">
      <div className="rf-close-button" style={{fontSize:'30px'}} onClick={onshow}>&times;</div>
      <h2>Why did you leave this rating?</h2>
      <p>Amazing, above expectations!</p>
      <div className="rf-stars">
        {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesomeIcon icon={faStar}  className={`icon-rating ${star <= chancolor ? 'icon-ratings' : ''} ${star <= chancolors ? 'ratings' : ''}`} onMouseEnter={() => color(star)} onMouseLeave={() => setchancolor(0)} onClick={() => setchancolors(star)} />
                    // <StarBorderIcon className='icon-rating'/>
        ))}
      </div>
      <textarea 
        className="rf-feedback-input" 
        // rows="4"   
        defaultValue="Best Data engineering course on udemy. i"
      ></textarea>
      <button className="rf-submit-button">Save and Continue</button>
    </div>
    </div>
  );
};

export default RatingFeedback;