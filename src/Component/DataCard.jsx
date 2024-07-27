// DataCard.js
const DataCard = ({ imagePath, title, content, bgColor }) => {
  return (
    <div style={{ backgroundColor: bgColor }} className={` w-full h-18 flex items-center mb-1`}>
      {/* First Column (Image) */}
      <div className="flex-none">
        <img src={imagePath} alt="Description" className="h-10 w-10 mx-auto ml-4" />
      </div>

      {/* Second Column (Text) */}
      <div className="flex-grow p-4">
        <h5 className={`text-white pb-1 text-4 mb-2 font-inter   font-semibold leading-3 tracking-normal text-left`}>
          {title}
        </h5>
        <p className="text-white text-xs font-normal leading-3 tracking-wide text-left mt-2">
          {content}
        </p>
      </div>
    </div>
  );
};

export default DataCard;
