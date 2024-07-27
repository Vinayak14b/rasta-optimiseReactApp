import { Tooltip } from '@mui/material';

const MapLayers = ({ onLayer1, onLayer2, onLayer3, onLayer4, isSecondSidebarOpen }) => {

  return (
    <div className='flex gap-4'>
      <Tooltip title="Default" arrow placement="bottom">
        <div className="">
          <img
            src="icons/layer1.png"
            alt=""
            width={33}
            className='cursor-pointer bg-white p-[1px] rounded-full'
            onClick={onLayer1}
          />
        </div>
      </Tooltip>
      <Tooltip title="Light" arrow placement="bottom">
        <div>
          <img
            src="icons/layer2.png"
            alt=""
            width={33}
            className='cursor-pointer bg-white p-[1px] rounded-full'
            onClick={onLayer2}
          />
        </div>
      </Tooltip>
      <Tooltip title="Dark" arrow placement="bottom">
        <div>
          <img
            src="icons/layer3.png"
            alt=""
            width={33}
            className='cursor-pointer bg-white bg-cover  p-[1px] rounded-full'
            onClick={onLayer3}
          />
        </div>
      </Tooltip>
      <Tooltip title="Satellite" arrow placement="bottom">
        <div>
          <img
            src="icons/layer4.png"
            alt=""
            width={33}
            className='cursor-pointer bg-white bg-cover p-[1px] rounded-full'
            onClick={onLayer4}
          />
        </div>
      </Tooltip>
    </div>
  );
};

export default MapLayers;
