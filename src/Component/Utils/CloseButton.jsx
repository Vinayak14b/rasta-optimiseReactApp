// import cross from "../../assets/img/white_cross.png"
import { closeImg } from '../../assets/IconArray';

const CloseButton = ({onClick}) => {
  return (
    <button
      onClick={onClick}
      className="h-10 w-10 rounded-full p-2 text-white flex items-center justify-center"
    >
        <img src={closeImg.closeImg} alt="X"  />
    </button>
  );
};

export default CloseButton;   