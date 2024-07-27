// Sidebar.js
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import { FilterComponent } from "./Sidebar/Filter/FilterComponent";
import { useSidebar } from "./Context/SidebarContext";
import BudgetCard from "./BudgetCard";
import Settings from "./Settings";
import SettingIcons from "../assets/img/Settings.png";
import SettingIconsHover from "../assets/img/settingsActiveIcon.png";
import road1 from "../assets/img/road.png";
// import road2 from "../assets/img/roadwhite.png";
import div1 from "../assets/img/divorange.png";
import div2 from "../assets/img/divwhite.png";
// import filterIconDefault from "../assets/img/filter1.png";
import reportIconDefault from "../assets/img/Report icon.png";
import reportIconHover from "../assets/img/noteswhite.png";
import calculatorIconDefault from "../assets/img/calculator.png";
import calculatorIconHover from "../assets/img/Budget_Calculator_hover.png";
// import searchIconDefault from "../assets/img/search.png";
// import searchIconHover from "../assets/img/Search_History_hover.png";
import navlogo from "../assets/img/nav_logo.png";
import utilityIconDefault from "../assets/img/mail.png";
// import FilterIconActive from "../assets/img/FiltersIconActive.png";
import ReportActiveIcon from "../assets/img/ReportActiveIcon.png";
// import BudgetActiveIcon from "../assets/img/BudgetActiveIcon.png";
import CompareActiveIcon from "../assets/img/compareActiveIcon.png";
import RoadClassificationActiveIcon from "../assets/img/roadClassificationActiveIcon.png";
import SearchActiveIcon from "../assets/img/searchActiveIcon.png";
import utilityIconHover from "../assets/img/Mask group.png";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, setUserType } from "../usermanagement/slices/authSlice";
import {
    setModalData,
    setSegmentModalData,
} from "../mapbox/slices/filterSlice";
import { RemoveMarker, marker } from "../mapbox/points/Core/plotPoints";
import { removeHighlightedSegment } from "../mapbox/segments/PlotSegments";
import { selectSegmentModalData } from "../mapbox/slices/filterSlice";
import { selectProfile } from "../usermanagement/slices/profileSlice";
import SecondSidebar from "./SecondSidebar";

// import SearchComponent from './SearchComponent';
// import settingsActiveIcon from "../assets/img/settingsActiveIcon.png"
// import filterIconHover from "../assets/img/filter1.png";
// import Box from '@mui/material/Box';

const Sidebar = ({ activePage }) => {
    const { userType } = useSelector(selectAuth);
    const segmentModalData = useSelector(selectSegmentModalData);

    const [selectedButton, setSelectedButton] = useState(null);
    const [isFilterButton, setFilterButton] = useState(null);
    const [isSettingOpen, setSettingOpen] = useState(false);
    const [isSecondSidebarOpen, setSecondSidebarOpen] = useState(false);
    const [isFilterComponentOpen, setFilterComponentOpen] = useState(false);
    const [isFilterToggle, setFilterToggle] = useState(false);
    const [searchIconClicked, setSearchIconClicked] = useState(false);
    const [calculatorDialogOpen, setCalculatorDialogOpen] = useState(false);
    // const [showDialogChangePassword, setShowDialogChangePassword] =
    //     useState(false);
    const dispatch = useDispatch();
    const [hoveredButton, setHoveredButton] = useState(null);
    const { profileUserData } = useSelector(selectProfile);

    // const [selectedButton, setSelectedButton] = useState(null);
    // const previousRoadName = useRef('');
    // const roadName = useSelector((state) => state.searchvalue);

    useEffect(() => {
        handleButtonClick(activePage || null);
    }, [activePage]);

    // const onClickChangePassword = () => {
    //     setShowDialogChangePassword(!showDialogChangePassword);
    // };

    const closeSettingDialog = () => {
        setSettingOpen(false);
    };

    const navigate = useNavigate();

    const closeCalculatorDialog = () => {
        setCalculatorDialogOpen(false);
        setSelectedButton(null);
    };

    const firstSidebarWidth = 5;

    const settings = [
        {
            defaultIconPath: SettingIcons,
            hoverIconPath: SettingIconsHover,
            label: "settings",
        },
    ];

    const homeIcon = [
        {
            defaultIconPath: navlogo,
            hoverIconPath: navlogo,
            label: "Home",
        },
    ];

    const filterIcon = [
        {
            defaultIconPath: "https://rasta-icons.s3.ap-south-1.amazonaws.com/sidebar/filter1.png", // filterIconDefault
            hoverIconPath: "https://rasta-icons.s3.ap-south-1.amazonaws.com/sidebar/FiltersIconActive.png",
            label: "Filter",
            activeIconPath: "https://rasta-icons.s3.ap-south-1.amazonaws.com/sidebar/FiltersIconActive.png", // FilterIconActive,
        },
    ];

    const JEButtons = [
        {
            defaultIconPath: "https://rasta-icons.s3.ap-south-1.amazonaws.com/sidebar/search.png",
            hoverIconPath: "https://rasta-icons.s3.ap-south-1.amazonaws.com/sidebar/Search_History_hover.png", // searchIconHover
            label: "Search/Survey",
            activeIconPath: SearchActiveIcon,
        },
        {
            defaultIconPath: calculatorIconDefault,
            hoverIconPath: calculatorIconHover,
            label: "Budget calculator",
            activeIconPath: "https://rasta-icons.s3.ap-south-1.amazonaws.com/assets/rastaIcons/filterIcons/features/BudgetActiveIcon.png", // BudgetActiveIcon,
        },
        {
            defaultIconPath: road1,
            hoverIconPath: "https://rasta-icons.s3.ap-south-1.amazonaws.com/assets/sideBars/innerSideBar/roadWhite.png", // road2,
            label: "RoadClassification",
            activeIconPath: RoadClassificationActiveIcon,
        },
        {
            defaultIconPath: reportIconDefault,
            hoverIconPath: reportIconHover,
            label: "Report",
            activeIconPath: ReportActiveIcon,
        },
        {
            defaultIconPath: div1,
            hoverIconPath: div2,
            label: "Comparision Analysis",
            activeIconPath: CompareActiveIcon,
        },
    ];
    const buttons = [
        {
            defaultIconPath: "https://rasta-icons.s3.ap-south-1.amazonaws.com/sidebar/search.png",
            hoverIconPath: "https://rasta-icons.s3.ap-south-1.amazonaws.com/sidebar/Search_History_hover.png", // searchIconHover
            label: "Search/Survey",
            activeIconPath: SearchActiveIcon,
        },
        {
            defaultIconPath: calculatorIconDefault,
            hoverIconPath: calculatorIconHover,
            label: "Budget calculator",
            activeIconPath: "https://rasta-icons.s3.ap-south-1.amazonaws.com/assets/rastaIcons/filterIcons/features/BudgetActiveIcon.png", // BudgetActiveIcon,
        },
        {
            defaultIconPath: utilityIconDefault,
            hoverIconPath: utilityIconHover,
            label: "Utility Dashboard",
            activeIconPath: ReportActiveIcon,
        },
        {
            defaultIconPath: reportIconDefault,
            hoverIconPath: reportIconHover,
            label: "Report",
            activeIconPath: ReportActiveIcon,
        },
        {
            defaultIconPath: div1,
            hoverIconPath: div2,
            label: "Comparision Analysis",
            activeIconPath: CompareActiveIcon,
        },
        // Other buttons for non-'je' user type
    ];

    const ownerButtons = [
        {
            defaultIconPath: "https://rasta-icons.s3.ap-south-1.amazonaws.com/sidebar/search.png",
            hoverIconPath: "https://rasta-icons.s3.ap-south-1.amazonaws.com/sidebar/Search_History_hover.png", // searchIconHover
            label: "Search/Survey",
            activeIconPath: SearchActiveIcon,
        },
        // {
        //     defaultIconPath: calculatorIconDefault,
        //     hoverIconPath: calculatorIconHover,
        //     label: "Budget calculator",
        //     activeIconPath: "https://rasta-icons.s3.ap-south-1.amazonaws.com/assets/rastaIcons/filterIcons/features/BudgetActiveIcon.png", // BudgetActiveIcon,
        // },
        {
            defaultIconPath: utilityIconDefault,
            hoverIconPath: utilityIconHover,
            label: "Utility Dashboard",
            activeIconPath: ReportActiveIcon,
        },
        // {
        //     defaultIconPath: reportIconDefault,
        //     hoverIconPath: reportIconHover,
        //     label: "Report",
        //     activeIconPath: ReportActiveIcon,
        // },
        // {
        //     defaultIconPath: div1,
        //     hoverIconPath: div2,
        //     label: "Comparision Analysis",
        //     activeIconPath: CompareActiveIcon,
        // },
        
    ];

    const { listViewOpen, setListViewOpen } = useSidebar();

    const handleButtonClick = (label) => {
        if (
            (userType === "JE" && label === "Budget calculator") ||
            (profileUserData?.officeLevel === "Sub-division" &&
                label === "Budget calculator")
        ) {
            localStorage.setItem("fromRasta", "true");
            setListViewOpen(false);
            navigate("/budget");
            return;
        }
        if (userType === "JE" && label === "Comparision Analysis") {
            navigate("/listview");
            return;
        }
        if (label === "report") {
            dispatch(setSegmentModalData(null));
            setSelectedButton("Report");
            setSecondSidebarOpen(false);
            localStorage.setItem("fromRasta", "true");
            return;
        }

        setFilterButton(null);
        setSecondSidebarOpen(true);
        // list view open to make responsive
        if (label === "Search/Survey") {
            dispatch(setModalData(null));
            dispatch(setSegmentModalData(null));
            if (segmentModalData) {
                removeHighlightedSegment();
            }
            RemoveMarker();
            setSecondSidebarOpen(false);
            setListViewOpen((prev) => !prev);
            localStorage.setItem("fromRasta", "true");
        }

        if (selectedButton === label) {
            setSelectedButton(null);
        } else {
            setSelectedButton(label);
        }

        setSearchIconClicked(
            setFilterToggle(false) && label === "Search/Survey"
        );

        if (label === "Home") {
            // Handle the 'Home' button click
            setSecondSidebarOpen(false);
            navigate("/home");
            return;
        }

        if (label === "Filter") {
            setFilterToggle(!isFilterToggle);
            if (marker) {
                RemoveMarker();
            }
            return;
        }

        if (label === "Budget calculator") {
            setListViewOpen(false);
            localStorage.setItem("fromRasta", "true");
            // Open a confirmation dialog for the calculator
            setFilterToggle(false);
            setCalculatorDialogOpen(true);
            setSecondSidebarOpen(false);
            setFilterComponentOpen(false);
            // dispatch(setBudgetFlag(true));
            // navigate('/home')
            return;
        } else if (label === "Report") {
            dispatch(setSegmentModalData(null));
            setSecondSidebarOpen(false);
            setFilterToggle(false);
            localStorage.setItem("fromRasta", "true");
            navigate("/report");
            return;
        } else if (label === "Comparision Analysis") {
            setSecondSidebarOpen(false);
            setFilterToggle(false);
            navigate("/selectchoice");
            return;
        } else if (label === "Utility Dashboard") {
            setSecondSidebarOpen(false);
            setFilterToggle(false);
            if (userType === "JE") {
                navigate("/tripapproval");
            } else if (userType !== "JE") {
                navigate("/utilitiesdashboard");
            }
            return;
        } else if (label === "RoadClassification") {
            setSecondSidebarOpen(false);
            setFilterToggle(false);
            navigate("/roadclassification");
            return;
        } else if (label === "settings") {
            // Open the SettingComponent
            setSecondSidebarOpen(false);
            setFilterToggle(false);
            setListViewOpen(false);
            setSettingOpen((prevSettingOpen) => !prevSettingOpen);
            return;
        }

        // Handle other buttons and sidebar logic
        setSecondSidebarOpen(
            (prevOpen) => !prevOpen || selectedButton !== label
        );
        setFilterComponentOpen(
            (prevOpen) => !prevOpen || selectedButton !== label
        );
    };

    // const handleClose = () => {
    //      setSecondSidebarOpen(false);
    //      setSelectedButton(null);
    //      setSearchIconClicked(false);
    // };

    const handleButtonClickFilter = (label) => {
        if (!window.location.pathname.endsWith("/home")) {
            localStorage.setItem("fromRasta", "false");
            navigate("/home");
        } else {
            localStorage.setItem("fromRasta", "true");
            setSearchIconClicked(false);
            setFilterToggle(!isFilterToggle);
            setFilterButton((prev) => (prev === "Filter" ? "null" : "Filter"));
            setSelectedButton(null);
            setSecondSidebarOpen(false);
        }
    };

    return (
        <>
        {calculatorDialogOpen && (
            <div className="calculator-dialog-container">
                <div className="calculator-dialog-overlay">
                    <div className="calculator-dialog-box">
                        {/* Your custom calculator dialog box content */}
                        <BudgetCard
                            closeCalculatorDialog={closeCalculatorDialog}
                            selectedButton={selectedButton}
                            setSelectedButton={setSelectedButton}
                        />
                    </div>
                </div>
            </div>
        )}

        {isSettingOpen && (
            <div className="dialog-container">
                <div className="dialog-box">
                    <Settings
                        closeSettingDialog={closeSettingDialog}
                        selectedButton={selectedButton}
                        setSelectedButton={setSelectedButton}
                    />
                </div>
            </div>
        )}

        <>
            <div className="">
                <div
                    id="sidebar-mini"
                    className={`z bg-white hs-overlay transition-all duration-300 fixed top-0 start-0 bottom-0 z-[60] w-20 bg-wh border-e border-gray-200 lg:block lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500  dark:border-gray-700`}>
                    <div className="flex flex-col justify-center items-center p-4">
                        <Tooltip
                            title={homeIcon[homeIcon.length - 1].label}
                            placement="right">
                            <IconButton
                                className="w-[50px]"
                                style={{
                                    position: 'relative',
                                    // marginBottom: "2px",
                                    // marginTop: "80%",
                                }}
                                onClick={
                                    () =>
                                        handleButtonClick(
                                            homeIcon[homeIcon.length - 1]
                                                .label
                                        )
                                    // setSecondSidebarOpen(false)
                                }
                                disableRipple>
                                <img
                                    src={
                                        selectedButton ===
                                        homeIcon[homeIcon.length - 1].label
                                            ? homeIcon[homeIcon.length - 1]
                                                    .hoverIconPath
                                            : homeIcon[homeIcon.length - 1]
                                                    .defaultIconPath
                                    }
                                    alt={
                                        homeIcon[homeIcon.length - 1].label
                                    }
                                />
                            </IconButton>
                        </Tooltip>
                    </div>

                    <div>
                        {filterIcon.map((icon, index) => (
                            <div
                                key={index}
                                className={`flex flex-1 w-full h-full items-center justify-center hover:bg-orange-500 py-2 my-1 cursor-pointer
              ${
                    icon.label === selectedButton
                        ? 'bg-orange-500'
                        : 'bg-white'
                }`}
                                // onMouseEnter={() => {
                                //   setHoveredButton(icon.label);
                                // }}

                                // onMouseLeave={() => {
                                //   setHoveredButton(null);
                                // }}
                                onClick={() => {
                                    handleButtonClickFilter(icon.label);
                                    if (marker) {
                                        RemoveMarker();
                                    }
                                    dispatch(setModalData(null));
                                }}
                                style={{
                                    backgroundColor:
                                        hoveredButton === icon.label ||
                                        isFilterButton === icon.label
                                            ? '#fe6100'
                                            : null,
                                    transition:
                                        'background-color 0.3s ease-in-out',
                                }}>
                                <Tooltip
                                    className="flex-1"
                                    key={index}
                                    title={icon.label}
                                    placement="right">
                                    <IconButton
                                        className={`w-11 h-11 ${
                                            searchIconClicked && 'mb-3'
                                        }`}
                                        disableRipple>
                                        <img
                                            src={
                                                isFilterButton ===
                                                icon.label
                                                    ? icon.hoverIconPath
                                                    : hoveredButton ===
                                                      icon.label
                                                    ? icon.hoverIconPath
                                                    : icon.defaultIconPath
                                            }
                                            alt={icon.label}
                                        />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col justify-center items-center py-1">
                        {(userType === 'JE' ? JEButtons : userType === "Owner"? ownerButtons : buttons).map(
                            (button, index) => (
                                // userType === 'JE' &&
                                // button.label === 'Utility Dashboard' ? null : (

                                <div
                                    key={index}
                                    className={`flex flex-1 w-full h-full items-center justify-center hover:bg-orange-500 py-2 my-1 cursor-pointer
              ${
                    button.label === selectedButton
                        ? 'bg-orange-500'
                        : 'bg-white'
                }`}
                                    onMouseEnter={() => {
                                        setHoveredButton(button.label);
                                    }}
                                    onMouseLeave={() => {
                                        setHoveredButton(null);
                                    }}
                                    onClick={() =>
                                        handleButtonClick(button.label)
                                    }
                                    style={{
                                        backgroundColor:
                                            hoveredButton ===
                                                button.label ||
                                            selectedButton === button.label
                                                ? '#fe6100'
                                                : null,
                                        transition:
                                            'background-color 0.3s ease-in-out',
                                    }}>
                                    <Tooltip
                                        className="flex-1"
                                        key={index}
                                        title={button.label}
                                        placement="right">
                                        <IconButton
                                            // onClick={() => handleButtonClick(button.label)}
                                            className={`w-11 h-11 ${
                                                searchIconClicked && 'mb-3'
                                            }`}
                                            disableRipple>
                                            <img
                                                src={
                                                    selectedButton ===
                                                    button.label
                                                        ? button.hoverIconPath
                                                        : hoveredButton ===
                                                          button.label
                                                        ? button.hoverIconPath
                                                        : button.defaultIconPath
                                                }
                                                alt={button.label}
                                            />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            )
                        )}

                        <div
                            className={`flex flex-1 w-full items-center justify-center hover:bg-#fe6100 py-2 my-1 ${
                                settings[0].label === selectedButton ||
                                settings[0].label === hoveredButton
                                    ? 'bg-orange-500'
                                    : 'bg-white'
                            }`}
                            onMouseEnter={() => {
                                setHoveredButton(
                                    settings[settings.length - 1].label
                                );
                            }}
                            onMouseLeave={() => {
                                setHoveredButton(null);
                            }}
                            style={{
                                backgroundColor:
                                    hoveredButton ===
                                        settings[settings.length - 1]
                                            .label ||
                                    selectedButton ===
                                        settings[settings.length - 1].label
                                        ? '#fe6100'
                                        : null,
                                transition:
                                    'background-color 0.3s ease-in-out',
                            }}>
                            <Tooltip
                                title={settings[settings.length - 1].label}
                                placement="right">
                                <IconButton
                                    className="w-[50px]"
                                    style={{
                                        position: 'relative',
                                        // marginBottom: "2px",
                                        // marginTop: "80%",
                                    }}
                                    onClick={() => {
                                        handleButtonClick(
                                            settings[settings.length - 1]
                                                .label
                                        );
                                    }}
                                    disableRipple>
                                    <img
                                        src={
                                            selectedButton ===
                                            settings[settings.length - 1]
                                                .label
                                                ? settings[
                                                        settings.length - 1
                                                  ].hoverIconPath
                                                : hoveredButton ===
                                                  settings[
                                                        settings.length - 1
                                                  ].label
                                                ? settings[
                                                        settings.length - 1
                                                  ].hoverIconPath
                                                : settings[
                                                        settings.length - 1
                                                  ].defaultIconPath
                                        }
                                        alt={
                                            settings[settings.length - 1]
                                                .label
                                        }
                                    />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>

            {listViewOpen ? (
                <SecondSidebar
                    setSecondSidebarOpen={setSecondSidebarOpen}
                    isOpen={isSecondSidebarOpen}
                    firstSidebarWidth={firstSidebarWidth}
                    filterIconClicked={selectedButton === 'Filter'}
                    dataIconClicked={selectedButton === 'data'}
                    // searchIconClicked={selectedButton === "Search/Survey"}
                    // handleClose={handleClose}
                />
            ) : null}

            {isFilterToggle ? (
                <div className="ml-20 ">
                    <FilterComponent isOpen={isFilterToggle} />
                </div>
            ) : null}
        </>
    </>
    );
};

export default Sidebar;