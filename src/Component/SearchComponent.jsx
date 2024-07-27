import { useState, useEffect } from "react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { viewLevel } from "../constants/constants.js";
import { useDispatch, useSelector } from "react-redux";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { ImSearch } from "react-icons/im";
import { setSearchQueryMap } from "../mapbox/slices/mapSlice.js";
import { ShowForPermission } from "../usermanagement/accesscontrol/ShowPermissionComponent.js";
import { SingleMapIcons } from "../assets/IconArray.js";
import { getDefaultRegionValues } from "../mapbox/services/Operations/JurisdictionAPI.js";
import { Spinner } from "../utils/Spinner.jsx";
import { surveyAccessControl } from "./SearchandSurvery/AccessControlForSurvey.js";
import { selectProfile } from "../usermanagement/slices/profileSlice.js";
import { getJusridictionData } from "../mapbox/services/Operations/JurisdictionAPI.js";
import {
  setSelectedOfficeLevel,
  setSelectedOfficeName,
} from "../mapbox/slices/tripSlice.js";
import { useSidebar } from "./Context/SidebarContext.jsx";
import { selectAuth } from "../usermanagement/slices/authSlice.js";

const SearchComponent = ({
  setSecondSidebarOpen,
  // handleClose,
  searchIconClicked,
}) => {
  const { userType } = useSelector(selectAuth);
  const { listViewOpen, setListViewOpen } = useSidebar();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState(null);
  const [selectedViewLevel, setSelectedViewLevel] = useState(null);
  const [currentViewLevel, setCurrentViewLevel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [optionsData, setOptionsData] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);
  const [selectedSubDivision, setSelectedSubDivision] = useState(null);
  const [officeLevelList, setOfficeLevelList] = useState(null);
  const [officeNameList, setOfficeNameList] = useState(null);

  const [dropDownExpanded, setDropDownExpanded] = useState(false);

  const navigate = useNavigate();

  const { profileUserData } = useSelector(selectProfile);
  console.log("profileUserData", profileUserData);

  const [defaultData, setDefaultData] = useState({
    region:
      profileUserData.officeLevel === "Region"
        ? profileUserData.officeName
        : "",
    circle: "",
    division: "",
    subDivision: "Select Sub-Division",
  });

  const [regionData, setRegionData] = useState({
    state: "Maharashtra",
    region:
      profileUserData.officeLevel === "Region"
        ? profileUserData.officeName
        : "",
    circle: "",
    division: "",
    subDivision: "",
  });

  useEffect(() => {
    if (
      selectedViewLevel &&
      currentViewLevel &&
      currentViewLevel === selectedViewLevel
    ) {
      setDropDownExpanded(false);
      setSelectedViewLevel(null);
      setCurrentViewLevel(null);
      // handleClose();
      setListViewOpen(false);
      dispatch(setSelectedOfficeLevel(officeLevelList));
      dispatch(setSelectedOfficeName(officeNameList));
      navigate("/listview");
    }
  }, [currentViewLevel]);

  useEffect(() => {
    const fetchDefaultRegionData = async () => {
      setLoading(true);
      try {
        const result = await dispatch(getDefaultRegionValues());
        setDefaultData((prevData) => ({
          ...prevData,
          region:
            profileUserData.officeLevel === "Region"
              ? profileUserData.officeName
              : result?.regionName
              ? result.regionName
              : "Select Region",
          circle: result?.circleName ? result.circleName : "Select Circle",
          division: result?.divisionName
            ? result.divisionName
            : "Select Division",
        }));

        setRegionData((prevData) => ({
          ...prevData,
          region:
            profileUserData.officeLevel === "Region"
              ? profileUserData.officeName
              : result?.regionName
              ? result.regionName
              : "",
          circle: result?.circleName ? result.circleName : "",
          division: result?.divisionName ? result.divisionName : "",
        }));

        // Rest of your logic
      } catch (error) {
        console.error("Error fetching default data:", error);
      }
      setLoading(false);
    };

    fetchDefaultRegionData();
  }, []); // Add defaultData as a dependency

  // Ensure to call fetchDropdownData after defaultData has been set
  useEffect(() => {
    const fetchDropdownData = async (data) => {
      try {
        setLoading(true);
        const result = await dispatch(getJusridictionData(data));
        setOptionsData(result.data);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
      setLoading(false);
    };

    fetchDropdownData(regionData);
  }, [regionData]);

  const handleDropdownClick = () => {
    setDropDownExpanded(!dropDownExpanded);
  };

  const handleDropDownItemClick = (selectionObject) => {
    switch (currentViewLevel) {
      case 1:
        setSelectedRegion(selectionObject);
        setCurrentViewLevel(2);
        setRegionData((prev) => ({
          ...prev,
          region: selectionObject.name,
        }));
        setOfficeLevelList("Region");
        setOfficeNameList(selectionObject.name);
        break;
      case 2:
        setSelectedCircle(selectionObject);
        setCurrentViewLevel(3);
        setRegionData((prev) => ({
          ...prev,
          region: profileUserData.officeName,
          circle: selectionObject.name,
        }));
        setOfficeLevelList("Circle");
        setOfficeNameList(selectionObject.name);
        break;
      case 3:
        setSelectedDivision(selectionObject);
        setCurrentViewLevel(4);
        setRegionData((prev) => ({
          ...prev,
          division: selectionObject.name,
        }));
        setOfficeLevelList("Division");
        setOfficeNameList(selectionObject.name);
        break;
      case 4:
        setSelectedSubDivision(selectionObject);
        setCurrentViewLevel(5);
        setRegionData((prev) => ({
          ...prev,
          subDivision: selectionObject.name,
        }));
        setOfficeLevelList("Sub-division");
        setOfficeNameList(selectionObject.name);
        break;
      default:
        break;
    }
  };

  const handleSelectedViewLevelChange = (level) => {
    if (level === 1 && profileUserData.officeLevel === "Region") {
      setListViewOpen(false);
      setSecondSidebarOpen(false);
      navigate("/listview");
      dispatch(setSelectedOfficeLevel(profileUserData.officeLevel));
      dispatch(setSelectedOfficeName(profileUserData.officeName));
    }
    if (level === 2 && profileUserData.officeLevel === "Circle") {
      setListViewOpen(false);
      setSecondSidebarOpen(false);
      navigate("/listview");
      dispatch(setSelectedOfficeLevel(profileUserData.officeLevel));
      dispatch(setSelectedOfficeName(profileUserData.officeName));
    }
    if (level === 3 && profileUserData.officeLevel === "Division") {
      setListViewOpen(false);
      setSecondSidebarOpen(false);
      navigate("/listview");
      dispatch(setSelectedOfficeLevel(profileUserData.officeLevel));
      dispatch(setSelectedOfficeName(profileUserData.officeName));
    }
    if (level === 4 && profileUserData.officeLevel === "Sub-division") {
      setListViewOpen(false);
      setSecondSidebarOpen(false);
      navigate("/listview");
      dispatch(setSelectedOfficeLevel(profileUserData.officeLevel));
      dispatch(setSelectedOfficeName(profileUserData.officeName));
    }
    if (profileUserData.officeLevel === "Region") {
      setCurrentViewLevel(2);
    }
    if (profileUserData.officeLevel === "Circle") {
      setCurrentViewLevel(3);
    }
    if (profileUserData.officeLevel === "Division") {
      setCurrentViewLevel(4);
    }
    setSelectedViewLevel(level + 1);
    // setCurrentViewLevel(1);
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(setSearchQueryMap(e.target.value));
      navigate("/home");
    }
  };
  const searchClick = (e) => {
    dispatch(setSearchQueryMap(searchQuery));
    navigate("/home");
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="z-50 h-screen w-80 bg-white flex flex-col p-4 hide-scrollbar">
      <div className="bg-orange-500 py-2 px-4 text-white font-semibold text-lg -mx-4 font-inter">
        Search
      </div>

      <div className="relative mt-4  font-inter items-center">
        <input
          type="search"
          placeholder="Search area"
          className="text-base  w-full text-primary focus:outline-none px-2 py-2 pr-10 rounded-lg bg-[#E4E4E4] shadow-sm"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleEnterKeyPress}
        />
        <img
          className="w-48 mx-auto"
          src={SingleMapIcons.mapsearch}
          alt="Search Icon"
        />
        <ImSearch
          // onClick={handleEnterKeyPress('icon')}
          onClick={searchClick}
          className="text-black text-lg absolute right-2 top-2 cursor-pointer"
        />
      </div>

      <div className="mt-5 flex flex-row justify-around items-center">
        <button
          onClick={() => {
            dispatch(setSelectedOfficeLevel(profileUserData.officeLevel));
            dispatch(setSelectedOfficeName(profileUserData.officeName));
            setListViewOpen(false);
            setSecondSidebarOpen(false);
            navigate("/listview");
          }}
          className="hover:bg-orange-500 py-2 px-4 hover:text-white font-semibold text-base rounded-lg text-orange-500 bg-orange-100 transition-colors font-poppins shadow-md"
        >
          List Mode
        </button>
      </div>

      <div className="border-t my-4"></div>

      <ShowForPermission permission="SURVEY_HISTORY">
        {profileUserData.officeLevel !== "Sub-division" ? (
          <div className="mb-[20%]">
            <h1 className="font-inter text-gray-400 text-base font-bold">
              Survey History
            </h1>
            {!selectedViewLevel && (
              <div className="px-8 flex flex-col gap-y-4 mt-2">
                {Object.entries(defaultData).map(([key, value], index) => (
                  <button
                    key={index}
                    className="hover:bg-orange-500 py-2 px-4 hover:text-white font-semibold text-base rounded-lg text-orange-500 bg-orange-100 transition-colors"
                    onClick={() => {
                      if (
                        surveyAccessControl[profileUserData.officeLevel][
                          key
                        ] === 1
                      ) {
                        handleSelectedViewLevelChange(index + 1);
                      }
                    }}
                  >
                    {value}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : null}

        <div className="px-8 flex flex-col gap-y-4 mt-2 ">
          {currentViewLevel &&
            selectedViewLevel &&
            currentViewLevel != selectedViewLevel && (
              <div
                className="bg-orange-100 w-[224px] flex items-center justify-around py-2 text-orange-500 font-semibold text-base rounded-lg hover:bg-orange-200 transition-colors cursor-pointer relative"
                onClick={() => {
                  handleDropdownClick();
                }}
              >
                <p>Select Your {viewLevel[currentViewLevel]}</p>
                <IoMdArrowDropdownCircle className="inline-block" />
                {dropDownExpanded && (
                  <div className="dropDownDiv h-36 w-[224px] -bottom-36 left-0 bg-white absolute overflow-y-scroll flex border-[1px] border-gray-500 ">
                    {!selectedCircle && (
                      <div className="flex flex-col flex-1">
                        {optionsData.map((circle, index) => (
                          <div
                            key={index}
                            className="py-2 px-4 hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"
                            onClick={() => handleDropDownItemClick(circle)}
                          >
                            {circle.name}
                          </div>
                        ))}
                      </div>
                    )}
                    {!selectedDivision && selectedCircle && (
                      <div className="flex flex-col flex-1">
                        {optionsData.map((division, index) => (
                          <div
                            key={index}
                            className="py-2 px-4 hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"
                            onClick={() => handleDropDownItemClick(division)}
                          >
                            {division.name}
                          </div>
                        ))}
                      </div>
                    )}
                    {!selectedSubDivision &&
                      selectedDivision &&
                      selectedCircle && (
                        <div className="flex flex-col flex-1">
                          {optionsData.map((subdivision, index) => (
                            <div
                              key={index}
                              className="py-2 px-4 hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"
                              onClick={() =>
                                handleDropDownItemClick(subdivision)
                              }
                            >
                              {subdivision.name}
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                )}
              </div>
            )}
        </div>
      </ShowForPermission>
    </div>
  );
};

export default SearchComponent;
