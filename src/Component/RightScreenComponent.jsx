import { Tooltip } from '@mui/material';

const RightScreenComponent = ({ onZoomIn, onZoomOut, onRotate, onLocator, onResize }) => {
  const divStyle = {
    backgroundColor: 'white',
    borderRadius: '10%',
    padding : '4px',
    width :'29px',
     
  };

  const iconStyle = {
    width: '24px',
    height: '24px',
    objectFit: 'contain',
  };

  return (
    <div style={{ float: 'right' }}>  
      <div style={divStyle} className="mb-2">
        <Tooltip title="Location" arrow placement="left">
          <img
            src='icons/locator.png'
            className='w-12 h-auto object-scale-down'
            style={iconStyle}
            alt='cam'
            onClick={onLocator}
          />
        </Tooltip>
      </div>

      <div style={divStyle} className="mb-2" >
        <Tooltip title="Zoom In" arrow placement="left">
          <img
            src='icons/zoom_in.png'
            className='w-12 h-auto object-scale-down'
            style={iconStyle}
            alt='360s'
            onClick={onZoomIn}
          />
        </Tooltip>
        <Tooltip title="Zoom Out" arrow placement="left">
          <img
            src='icons/zoom_out.png'
            className='w-12 h-auto object-scale-down'
            style={iconStyle}
            alt='360s'
            onClick={onZoomOut}
          />
        </Tooltip>
        <Tooltip title="Compass" arrow placement="left">
          <img
            src='icons/compass.png'
            className='w-12 h-auto object-scale-down'
            style={iconStyle}
            alt='cam'
            onClick={onRotate}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default RightScreenComponent;
