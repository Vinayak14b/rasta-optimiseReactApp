
const ScreenShotComponent = ({ onClose, onDownload,screenshotURL }) => {

  return (
    <div className="relative p-8">

      <img src='icons/screenshots.png'
        className=" w-[124px] h-[119px] mx-auto"
        alt="Screenshots"
      />

      <p className="text-gray-400 mt-2 font-poppins text-base font-normal leading-6 tracking-normal text-center">
        Download a Screenshot of the Platform map
      </p>
      {screenshotURL && (
  <img
    src={screenshotURL}
    alt="Captured Screenshot"
    className="mt-2 rounded-xl w-[200px] h-[150px] mx-auto"
  />
)}
      

      <div className="flex justify-center mt-4">
        <button className="bg-black text-white py-2 px-4 mr-2 rounded-lg" onClick={onDownload}>
          Download
        </button>
        <button className="bg-red-600 rounded-lg text-white py-2 px-4" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ScreenShotComponent;
