  import { Tooltip } from '@mui/material';
  import { commentoff} from '../mapbox/slices/filterSlice';
import { commenton} from '../mapbox/slices/filterSlice';
import { useDispatch } from 'react-redux';
import {React,useState} from 'react';
import { BiSolidCommentDetail } from "react-icons/bi";

  const ScreenComponent = ({
    
    
    onRotationClick,
    // onPolygonClick,
    // onRoadwidthClick,
    rotationIcon
    
  }) => {
    const icons = [    
      {
        src: '360s.png',
        alt: '360s',
        onClick: onRotationClick,
        title: '360 View',
        id:rotationIcon?.id
      },
    
    ];

    const dispatch= useDispatch();
    const [isCommentOff, setIsCommentOff] = useState(true);

    const handleCommentClick = () => {
        if (isCommentOff) {
            dispatch(commentoff());
        } else {
            dispatch(commenton());
        }
        setIsCommentOff(!isCommentOff);
    };
	
    return (
<>
      <div className='justify-center items-center'>
      <Tooltip  title="comments" arrow placement='right'>
	<button
            className="w-7 py-1 bg-white rounded-sm  hover:bg-orange-500"
            onClick={handleCommentClick}
        >
            <div className="flex gap-x-0 justify-center items-center ">
               
                <BiSolidCommentDetail className="hover:white" style={{ width: '1rem', height: '1rem' }} />
            </div>
        </button>
        </Tooltip>
		</div>
      <div className='w-7 bg-white rounded-sm mt-2'>
        {icons.map((icon, index) => (
          <Tooltip key={index} title={icon.title} arrow placement='right'>
            <img
              src={icon.src}
              
              className={`w-8 h-auto object-scale-down ${icon.title === 'Camera' ? 'cursor-pointer' : ''}`}
              alt={icon.alt}
              id={icon.id}
              onClick={icon.onClick}
              style={{ cursor: icon.title === 'Camera' ? 'default' : 'pointer' }}
            />
          </Tooltip>
          
        ))}
        
      </div>
      </>
    );
  };

  export default ScreenComponent;
