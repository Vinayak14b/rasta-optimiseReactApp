import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import GaugeChart from "react-gauge-chart";
import { TfiWorld } from "react-icons/tfi";
import "../../App.css";
import { MdDateRange, MdOutlineWarning } from "react-icons/md";
import {
  FaCirclePlay,
  FaDiamondTurnRight,
  FaLocationDot,
  FaRoad,
} from "react-icons/fa6";
import { getSingleSegmentData } from "../services/Operations/SegmentAPI";
import { Spinner } from "../../utils/Spinner";
import { removeHighlightedSegment } from "./PlotSegments";
import {marker,RemoveMarker}  from "../points/Core/plotPoints";

const SegmentDetails = ({
  onClose,
  segmentData,
}) => {
  const { chainage, roadName, roadNo } = segmentData;
  const [onclickSegmentData, setOnclickSegmentData] = useState(null);
  const [noDataFound, setNoDataFound] = useState(false);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await dispatch(
          getSingleSegmentData(chainage, roadName, roadNo)
        );
        if (data && data.length !== 0 && Object.keys(data).length !== 0) {
          setOnclickSegmentData(data);
          setNoDataFound(false);
        } else {
          setNoDataFound(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [dispatch, segmentData]);


  const [arg1, arg2] = [
    onclickSegmentData?.defectPercentage.condition,
    onclickSegmentData?.defectPercentage.percentage,
  ]; //customFunctionArgs;
  const rciRound = arg2;
  const rciIndex = Math.floor(arg2);
  //   const { showRci, setShowRci } = useSelectedData() ;
  const cardData = [
    {
      icon: <FaLocationDot className="h-8 w-8 text-orange-500" />,
      leftBarTitle: "Road Numbers",
      leftBarValue: onclickSegmentData?.roadNo,
    },
    {
      icon: <FaRoad className="h-8 w-8 text-orange-500" />,
      leftBarTitle: "Start Chainage",
      leftBarValue: onclickSegmentData?.chainnage,
    },
    {
      icon: <FaDiamondTurnRight className="h-8 w-8 text-orange-500" />,
      leftBarTitle: "Road Name",
      leftBarValue: onclickSegmentData?.roadName,
    },
    {
      icon: <TfiWorld className="h-8 w-8 text-orange-500" />,
      leftBarTitle: "Latitude & Longitude",
      leftBarValue: onclickSegmentData?.lat_long
        ? `${onclickSegmentData.lat_long[0]} & ${onclickSegmentData.lat_long[1]}`
        : "",
    },
    {
      icon: <MdDateRange className="h-8 w-8 text-orange-500" />,
      leftBarTitle: "Date and Time",
      leftBarValue: onclickSegmentData?.Date,
      // rightBarTitle: "05-11-2023, 5:52",
      // rightBarValue: "",
    },
    {
      icon: <MdOutlineWarning className="h-8 w-8 text-orange-500" />,
      leftBarTitle: "Defect",
      leftBarValue: onclickSegmentData?.defects?.join(','),
      // rightBarTitle: "Major Potholes & Cracks",
      // rightBarValue: "",
    },
  ];

  const modalClassName = `z-30 fixed top-0 right-0 h-full w-[30%] bg-white shadow-md transition-transform transform hide-scrollbar`;

  return (
    <div  className={modalClassName}>
    <div 
    // className="z-10 h-screen w-90 absolute right-0 top-0 bg-white flex flex-col border-2 border-orange-500" 
    // style={{ 
    //   marginRight: "-11.8%" 
    // }}
    >
      <div
        onClick={() => {
          onClose();
          removeHighlightedSegment(); // Call the onClose function passed from parent
          if (marker){
            RemoveMarker();
          }
          // handleSidebarToggle()
        }}
        className="h-8 w-8 absolute top-[50%] cursor-pointer"
      >
        <FaCirclePlay className="h-8 w-8 text-orange-500" />
      </div>
      {loading ? (
        <Spinner />
      ) : noDataFound ? (
        <>
          <div
            className="flex justify-center items-center font-poppins"
            style={{ height: "90vh", fontSize: "20px", color: "#ff8437" }}
          >
            NO DATA AVAILABLE FOR THIS SEGMENT
          </div>
        </>
      ) : (
        <>
          <div className="py-4 px-2 bg-orange-600 text-center">
            <h1 className="font-bold text-base text-white">
              Road Condition Index (RCI): {rciRound}
            </h1>
          </div>
          <div className="flex flex-col items-center mt-4">
            <GaugeChart
              id="gauge-chart"
              arcPadding={0}
              cornerRadius={0}
              nrOfLevels={7}
              arcWidth={0.3}
              percent={rciRound / 100}
              style={{ width: "80%" }}
              colors={[
                "#029146",
                "#3AB54A",
                "#FAD200",
                "#F05A27",
                "#EE1C25",
                "#BE292F",
                "#666666",
              ]}
              textColor="black "
              formatTextValue={() => `${rciRound}`}
/>
            {/* Buttons */}
            <div className="flex p-8 gap-x-4">
              <div className="flex-1 py-2 px-8 font-bold text-xs bg-orange-600 rounded-lg text-center -mt-8">
                <h3 className=" text-white">Condition: {arg1}</h3>
              </div>
              <div className="flex-1 py-2 px-8 font-bold text-xs rounded-lg text-center bg-gray-500 text-white -mt-8">
                <h3 className=" text-white"> 100 M</h3>
                <h3 className="text-white">Length</h3>
              </div>
            </div>
          </div>
          {/* Cards Container */}
          <div className="flex flex-col gap-y-2 min-h-0 ">
            {cardData.map((item, index) => (
              <div
                id={index}
                key={index}
                className="flex mx-8 py-1 border-t-orange-400 border-t-2 h-16 gap-x-2 items-center "
              >
                {/* <FaLocationDot className="h-8 w-8 text-orange-500" /> */}
                {item.icon}
                <div className="flex-1 flex justify-between items-center">
                  <div className="flex-1">
                    <p className="text-xs font-bold">{item.leftBarTitle}</p>
                  </div>
                  <div className="flex-1 flex flex-col items-end">
                    <p className="text-xs font-bold">{item.leftBarValue}</p>
                    {/* <p className="text-xs font-bold">{item.rightBarTitle}</p> 
                  <p className="text-xs">{item.rightBarValue}</p> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default SegmentDetails;
