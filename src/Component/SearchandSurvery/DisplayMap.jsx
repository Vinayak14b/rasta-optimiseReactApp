import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaCircle } from "react-icons/fa";
import Sidebar from "../Sidebar";
import { Spinner } from "../../utils/Spinner";
import { SingleMapIcons } from "../../assets/IconArray";
import {
  getAllChainges,
  getSingleRoadPointData,
} from "../../mapbox/services/Operations/RoadsAPI";
import SingleMap, { removeMarker } from "../../mapbox/mapcomponents/SingleMap";
import { useSidebar } from "../Context/SidebarContext";
import { ListViewModal } from "../ListView/ListViewModal";
import { BackButton } from "../Utils/BackButton";
import { setModalData } from "../../mapbox/slices/filterSlice";
import TripHistory from "../CompareTrips/DialogBox/TripHistory";
import {
  setDateAvailable,
  setSelectedOfficeLevel,
  setSelectedOfficeName,
  setselectedCompareOffices,
} from "../../mapbox/slices/tripSlice";
import {
  getDatesForOffice,
  getSingleRoadTripHistory,
} from "../../mapbox/services/Operations/CompareTripAPI";

import StatisticBarSingleMap from "../Statistics/StatisticBarSingleMap";

const DisplayMap = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pointData, setPointData] = useState([]);
  const [date, setDate] = useState("");
  const { flag, id1, id2 } = useParams();
  const [mapLoading, setMapLoading] = useState(false);
  const [roadNumber, setRoadNumber] = useState("");
  const [greenPointPercentage, setGreenPointPercentage] = useState(0);
  const [redPointPercentage, setRedPointPercentage] = useState(0);
  const [yellowPointPercentage, setyellowPointPercentage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [tripHistory, setTripHistroy] = useState([]);
  const [checkComparison, setCheckComparison] = useState(false);
  const [dropdownDates, setDropdownDates] = useState([]);
  const [open, setOpen] = useState(false);
  const { listViewOpen, setListViewOpen } = useSidebar();
  const [chainagesData, setChainagesData] = useState([]);
  const [currChainage, setCurrChainage] = useState(null);
  const [currCoordinates, setCurrCoordinates] = useState(null);
  const [currCoordinates2, setCurrCoordinates2] = useState(null);
  const [removeBtn, setRemoveBtn] = useState(null);
  const [queryObject1, setQueryObjec1] = useState(null);
  const markerRef1 = useRef(null);
  const markerRef2 = useRef(null);
  const location = useLocation();
  const { showChainage } = location.state || { showChainage: true };
  const [loadingChainage, setLoadingChainage] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filteredChainages, setFilteredChainages] = useState(chainagesData);
  const [showStatisticBar, setShowStatisticBar] = useState(false);

  useEffect(() => {
    setFilteredChainages(chainagesData);
  }, [chainagesData]);

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);

    // Check if the input contains a range (e.g., "17-18")
    const rangeMatch = value.match(/(\d+)-(\d+)/);
    if (rangeMatch) {
      const startRange = parseInt(rangeMatch[1]);
      const endRange = parseInt(rangeMatch[2]);

      const filtered = chainagesData.filter((chainageData) => {
        const [major, minor] = chainageData.chainage.split("/").map(Number);
        return major >= startRange && major <= endRange;
      });
      setFilteredChainages(filtered);
    } else {
      const filtered = chainagesData.filter(
        (chainageData) =>
          chainageData.chainage.toString().includes(value) ||
          chainageData.roadCondition.toLowerCase().includes(value)
      );
      setFilteredChainages(filtered);
    }
  };

  const handleRemoveChainageMarker = () => {
    removeMarker(markerRef1);
    removeMarker(markerRef2);
    setRemoveBtn(false);
    setCurrCoordinates(null);
    setCurrCoordinates2(null);
    setCurrChainage(null);
  };

  let queryObject = {};
  // const derivedValues = useMemo(() => ({ flag, id1, id2 }), [flag, id1, id2]);

  const fetchOfficeDataDates = async (roadNo) => {
    try {
      let result;
      if (flag === "office") {
        result = await dispatch(
          getDatesForOffice(decodeURIComponent(id1), decodeURIComponent(id2))
        );
        const dates = result.map((item) => item.Date);
        setDropdownDates(dates);
        dispatch(setDateAvailable(dates));
      } else if (flag === "road") {
        result = await dispatch(
          getSingleRoadTripHistory(decodeURIComponent(id1), roadNo)
        );
        setTripHistroy(result);
        const dates = result.map((item) => item.Date);
        setDropdownDates(dates);
        dispatch(setDateAvailable(dates));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (flag === "road") {
      const decodedId2 = decodeURIComponent(id2);
      var dataPart = decodedId2.split("-date-");
      if (dataPart[1]) setDate(dataPart[1]);
      if (dataPart[0]) setRoadNumber(dataPart[0]);
      queryObject = {
        roadName: decodeURIComponent(id1),
        roadNo: dataPart[0],
      };

      setQueryObjec1(queryObject);
      fetchOfficeDataDates(dataPart[0]);
    } else if (flag === "office") {
      fetchOfficeDataDates();
      queryObject = {
        officeName: decodeURIComponent(id1),
        officeLevel: decodeURIComponent(id2),
      };
      dispatch(setselectedCompareOffices(queryObject));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMapLoading(true);
        const result = await dispatch(getSingleRoadPointData(queryObject));
        const isValid = CheckResponseInValidity(result?.result);
        if (isValid === true) {
          setIsOpen(true);
        } else {
          setPointData(isValid);
          setGreenPointPercentage(result?.percentage?.Good);
          setyellowPointPercentage(result?.percentage?.Average);
          setRedPointPercentage(result?.percentage?.Poor);
          // GetPointStatus(isValid);
          setListViewOpen(true);
          dispatch(setModalData(null));
        }
      } catch (error) {
        console.error("Error fetching road data:", error);
      }
      setMapLoading(false);
    };

    fetchData();
    // }, [derivedValues]);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingChainage(true);
      try {
        if (queryObject.roadName && queryObject.roadNo) {
          const result2 = await dispatch(
            getAllChainges(queryObject.roadName, queryObject.roadNo)
          );

          // Transform the chainage data
          const transformedData = result2?.roadData.map((item) => ({
            ...item,
            // chainage: item.chainage.replace(':', '/'),
          }));
          setChainagesData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching road data:", error);
      }
      setLoadingChainage(false);
    };

    fetchData();
  }, [queryObject.roadName, queryObject.roadNo]);

  const handleListViewButtonClick = useCallback(() => {
    if (flag === "road") {
      navigate("/listview");
    } else if (flag === "office") {
      navigate("/listview");
      dispatch(setSelectedOfficeLevel(decodeURIComponent(id2)));
      dispatch(setSelectedOfficeName(decodeURIComponent(id1)));
    }
  }, [flag, id1, id2]);

  const handleCompareButtonClick = useCallback(
    (id) => {
      if (dropdownDates.length <= 1) {
        setCheckComparison(true);
      } else {
        if (flag === "office") {
          navigate(id);
        } else if (flag === "road") {
          dispatch(setselectedCompareOffices(null));
          setOpen(true);
        }
      }
    },
    [flag, dropdownDates, navigate, dispatch]
  );

  const CheckResponseInValidity = (response) => {
    const isAllNull = response?.every((item) => item === null);
    if (isAllNull || !response?.length) {
      return true; // Entire array is null
    } else {
      // const filteredArray = response.filter((item) => item !== null);
      const allValuesPresent = response?.filter(
        (item) =>
          item.lat !== undefined &&
          item.long !== undefined &&
          item.pred_image !== undefined &&
          item.defect !== undefined &&
          item.lat !== null &&
          item.long !== null &&
          item.pred_image !== null
      );
      if (allValuesPresent) {
        return allValuesPresent; // All values are present and not null
      } else {
        return true; // Some values are missing or null
      }
    }
  };

  const handleChainageClick = (chainage) => {
    // chainage = chainage.replace('/', ':');
    setCurrChainage(chainage);
    setRemoveBtn(true);

    dispatch(getSingleRoadPointData(queryObject1, chainage))
      .then((result) => {
        if (result?.result?.length > 0) {
          // Get the first element in the result array
          const firstElement = result.result[0];
          const { lat: firstLat, long: firstLong } = firstElement;

          // Get the last element in the result array
          const lastIndex = result.result.length - 1;
          const lastElement = result.result[lastIndex];
          const { lat: lastLat, long: lastLong } = lastElement;

          // Set the current coordinates to the first lat and long
          setCurrCoordinates([firstLong, firstLat]);

          // Set the current coordinates to the last lat and long
          setCurrCoordinates2([lastLong, lastLat]);
        } else {
          console.error("Result array is empty.");
        }
      })
      .catch((error) => {
        console.error("Error fetching road point data:", error);
      });
  };

  const handleStatisticsButtonClick = () => {
    setShowStatisticBar(!showStatisticBar); // Toggle the StatisticBar visibility
  };

  const getBackgroundColor = (roadCondition) => {
    switch (roadCondition) {
      case "good":
        return "#029146";
      case "satisfactory":
        return "#3AB54A";
      case "fair":
        return "#FAD200";
      case "poor":
        return "#F05A27";
      case "very poor":
        return "#EE1C25";
      case "serious":
        return "#BE292F";
      case "failed":
        return "#3B3B3B";
      default:
        return "#D1D5DB"; // default bg-slate-300 color
    }
  };

  return (
    <>
      {isOpen ? (
        <>
          <ListViewModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            text={"Data Not Present for this Survey"}
            flag={"survey"}
          />
        </>
      ) : (
        <>
          <Sidebar />

          {mapLoading ? (
            <div className="flex justify-center items-center h-full w-full">
              <Spinner />
            </div>
          ) : (
            <div
              className="flex flex-row "
              style={
                {
                  // zIndex:'-10',
                }
              }
            >
              <div className="flex-1 flex flex-col ml-20 h-screen">
                <div className="h-21 py-2 flex px-6 font-poppins text-sm grow-0 items-center">
                  <div onClick={() => dispatch(setModalData(null))}>
                    <BackButton direct={-1} />
                  </div>

                  <div className="w-[70%] xl:w-[50%] pl-8">
                    <h3 className="font-bold text-2xl">{id1}</h3>
                    <h2 className="text-base font-semibold">
                      {flag === "road"
                        ? date
                        : flag === "office"
                        ? decodeURIComponent(id2)
                        : ""}
                    </h2>
                  </div>
                  <div className="flex flex-1 select-none ">
                    <div className="flex flex-1 items-center justify-end gap-x-4">
                      <div className="flex items-center flex-col gap-y-1 ">
                        <div className="flex justify-center items-center gap-x-1 ">
                          <FaCircle className="text-mapgreen" />
                          <p className="text-sm font-bold">
                            {greenPointPercentage ? greenPointPercentage : "0"}%
                          </p>
                        </div>
                        <div className="font-bold text-mapgreen">Good</div>
                      </div>
                      <div className="flex items-center flex-col gap-y-1 ">
                        <div className="flex justify-center items-center gap-x-1 ">
                          <FaCircle className="text-maporange" />
                          <p className="text-sm font-bold">
                            {yellowPointPercentage
                              ? yellowPointPercentage
                              : "0"}
                            %
                          </p>
                        </div>
                        <div className="font-bold text-maporange">Average</div>
                      </div>
                      <div className="flex items-center flex-col gap-y-1 ">
                        <div className="flex justify-center items-center gap-x-1 ">
                          <FaCircle className="text-mapred" />
                          <p className="text-sm font-bold">
                            {redPointPercentage ? redPointPercentage : "0"}%
                          </p>
                        </div>
                        <div className="font-bold text-mapred">Bad</div>
                      </div>
                    </div>

                    <div className="flex flex-1 justify-center items-center gap-x-2 mr-8">
                      <button
                        onClick={() =>
                          handleCompareButtonClick("/comparison/office")
                        }
                        className="flex items-center flex-col px-3 py-1 gap-y-1 justify-center bg-transparent border-none focus:outline-none hover:bg-orange-300 hover:rounded-lg aspect-square transition-all 600 ease-in "
                      >
                        <img
                          src={SingleMapIcons.comparison}
                          alt="Compare"
                          className="h-9 hover:shadow-sm hover:scale-105 transition-all 600 ease-in"
                        />
                        <div className="font-bold text-xs font-poppins hover:text-slate-600">
                          Compare{" "}
                        </div>
                      </button>
                      <button
                        onClick={handleListViewButtonClick}
                        className="flex items-center flex-col px-3 py-1 gap-y-1 justify-center bg-transparent border-none focus:outline-none hover:bg-orange-300 hover:rounded-lg aspect-square transition-all 600 ease-in "
                      >
                        <img
                          src={SingleMapIcons.listview}
                          alt="ListView"
                          className="h-9 hover:shadow-sm hover:scale-105 transition-all 600 ease-in"
                        />
                        <div className="font-bold text-xs font-poppins hover:text-slate-600">
                          List View
                        </div>
                      </button>
                      <button
                        onClick={handleStatisticsButtonClick}
                        className="flex items-center flex-col px-3 py-1 gap-y-1 justify-center bg-transparent border-none focus:outline-none hover:bg-orange-300 hover:rounded-lg aspect-square transition-all 600 ease-in "
                      >
                        <img
                          src={SingleMapIcons.statistics}
                          alt="Statistics"
                          className="h-9 hover:shadow-sm hover:scale-105 transition-all 600 ease-in"
                        />
                        <div className="font-bold text-xs font-poppins hover:text-slate-600">
                          Statistics
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  id="comparision-section"
                  className=" flex-1 flex h-3 px-6 pb-3 gap-4 "
                >
                  <div className="mapSection flex-1 flex flex-col gap-y-2 rounded-lg w-full aspect-video h-full shadow-md overflow-hidden  ">
                    {/* map component */}

                    <SingleMap
                      pointData={pointData}
                      currCoordinates={currCoordinates}
                      currCoordinates2={currCoordinates2}
                      markerRef1={markerRef1}
                      markerRef2={markerRef2}
                    />
                  </div>
                  {showChainage && (
                    <div className="rounded-lg w-[10vw] font-light h-auto relative overflow-y-scroll overflow-x-hidden hide-scrollbar  shadow-lg outline-2">
                      {loadingChainage ? (
                        <div className="h-full -mt-8 ">
                          <Spinner />
                        </div>
                      ) : (
                        <>
                          <input
                            type="text"
                            placeholder="Search Chainage"
                            value={searchValue}
                            onChange={handleSearchChange}
                            className="border border-gray-600 sticky top-0 rounded-md w-full p-1 mb-3 focus:outline-none focus:border-blue-500  z-20"
                          />
                          {filteredChainages && filteredChainages.length > 0 ?
                            filteredChainages.map(
                              (chainageData, index) => (
                                {
                                  chainageData,
                                },
                                (
                                  <div
                                    key={index}
                                    className={`  mx-2 mb-2 flex flex-col justify-center items-center cursor-pointer transition duration-300 transform hover:scale-105 border rounded-lg shadow
												  ${
                            currChainage === chainageData.chainage
                              ? "text-black scale-120 font-thin shadow-lg hover:scale-110"
                              : "text-white border-gray-300 shadow-md hover:scale-105"
                          }
												`}
                                    onClick={() =>
                                      handleChainageClick(chainageData.chainage)
                                    }
                                  >
                                    <div
                                      className=" w-full  py-1 rounded-lg  h-auto text-center font-light"
                                      style={{
                                        backgroundColor: getBackgroundColor(
                                          chainageData.roadCondition
                                        ),
                                      }}
                                    >
                                      {chainageData.chainage}
                                      <p className="text-xs font-light">
                                        {chainageData.roadCondition}
                                      </p>
                                    </div>
                                  </div>
                                )
                              )
                            ) :
							<div className="text-center text-gray-500">No chainages found</div>

							}
                          {removeBtn && (
                            <div
                              className="sticky bottom-0 text-center font-bold font-poppins w-full bg-gradient-to-r from-red-400 to-red-400 text-white py-2  shadow-md z-20 cursor-pointer"
                              onClick={() => handleRemoveChainageMarker()}
                            >
                              Remove
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
                {showStatisticBar && (
                  <div className="fixed top-0 right-0 w-[10vw] h-full bg-white shadow-lg z-50 transition-transform transform translate-x-0">
                    <StatisticBarSingleMap
                      setShowStatisticBar={setShowStatisticBar}
                      roadName={queryObject1.roadName} // Pass roadName as a prop
                      roadNo={queryObject1.roadNo}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          {checkComparison ? (
            <>
              <ListViewModal
                isOpen={checkComparison}
                setIsOpen={setCheckComparison}
                text={"No Comparison Available for This Survey"}
                flag={"compare"}
              />
            </>
          ) : (
            <>
              <TripHistory
                open={open}
                setOpen={setOpen}
                tripHistory={tripHistory}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default DisplayMap;
