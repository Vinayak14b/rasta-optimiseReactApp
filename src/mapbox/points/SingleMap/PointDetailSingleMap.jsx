import React, { useEffect, useRef, useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSinglePointData } from "../../services/Operations/PointsAPI";
import { Spinner } from "../../../utils/Spinner";
import { closeImg } from "../../../assets/IconArray";
import { selectModalData, setModalData } from "../../slices/filterSlice";
import { pointDetailIcons } from "../../../assets/IconArray";
import {
    RemoveMarkerSingleMap,
    AddMarkerSingleMap,
} from "../../mapcontexts/MapContext";
import { selectProfile } from "../../../usermanagement/slices/profileSlice";
import { selectAuth } from "../../../usermanagement/slices/authSlice";
import { sendCommentData } from "../../services/Operations/CommentAPI";
import { getCommentForPoint } from "../../services/Operations/CommentAPI";
import { ItemCol2, ItemCol3 } from "../PointDetails/GridItems";
import { setPointDataArray } from "../PointDetails/PointDetailsData";
import pointDetailsStyles from "../PointDetails/PointDetails.module.css";
import {
    ParentContainer,
    GridContainer,
    GridItem,
    ImageContainer,
    TopContainer,
    ChildContainer,
    conditionOfPoint,
} from "../PointDetails/PointDetailsComponents";
import {
    CommentContainer,
    CommentTitle,
    CommentForm,
    CommentBox,
    CommentItem,
    scrollToComments,
} from "../PointDetails/PointDetailsComment";
import toast from "react-hot-toast";
import { FaRegEdit } from "react-icons/fa";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

// import Box from "@mui/material/Box";
// import { useNavigate } from "react-router-dom";
// import { CloseButton } from "../../../Component/Utils/CloseButton";
// import { IoIosCloseCircle } from "react-icons/io";
// import { points } from "@turf/turf";

export const PointDetailSingleMap = ({
    latitude,
    longitude,
    coordinates,
    onClose,
    isOpen,
    pointsData,
}) => {
    // const navigate = useNavigate();
    const modalRef = useRef(null);
    const dispatch = useDispatch();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [singlePointData, setSignalPointsData] = useState(null);
    const [condition, setCondition] = useState(null);
    const [loading, setLoading] = useState(false);
    const [noDataFound, setNoDataFound] = useState(false);
    const [commentInput, setCommentInput] = useState("");
    const [comment, setComment] = useState(null);
    const [commentBtn, setCommentBtn] = useState(false);
    const [commentOfUsers, setCommentOfUsers] = useState(null);
    const [showComment, setShowComment] = useState(false);
    const [flag, setFlag] = useState(false);
    const { username, userType, name } = useSelector(selectAuth);
    const [IsPredImg, setIsPredImg] = useState(false);
    const profileUserData = useSelector(selectProfile);
    const modalData = useSelector(selectModalData);
    const [commentData, setCommentData] = useState({
        comment: "",
        officeLevel: profileUserData.profileUserData.officeLevel,
        currentChainage: "",
        drivingCoords: "",
        roadName: "",
        roadNo: "",
        username: username,
        user_type: userType,
        user_details: name,
    });

    const closeModalOnOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
            setCommentOfUsers(null);
            setShowComment(null);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const points_lat_long = {
                    lat: coordinates[1],
                    long: coordinates[0],
                    predImg: null,
                };

                const data = await dispatch(
                    getSinglePointData(points_lat_long)
                );

                if (
                    data &&
                    data.length !== 0 &&
                    Object.keys(data).length !== 0
                ) {
                    setCommentOfUsers(null);
                    setSignalPointsData(data);
                    setIsPredImg(data?.res);
                    checkPredImage(data);
                    setCondition(conditionOfPoint(data));
                    setNoDataFound(false);
                    setCommentData({
                        officeLevel:
                            profileUserData.profileUserData.officeLevel,
                        currentChainage: data.currentChainage || "",
                        drivingCoords: data.coordinates || "",
                        roadName: data.roadName || "",
                        roadNo: data.roadNo || "",
                        username: username,
                    });
                } else {
                    setNoDataFound(true);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
            setLoading(false);
        };

        fetchData();
    }, [dispatch, coordinates]);

    useEffect(() => {
        const fetchDataForComment = async () => {
            if (userType === "Owner") {
                return;
            }
            setCommentBtn(true);
            if (singlePointData) {
                const data = await dispatch(getCommentForPoint(commentData));
                if (
                    data &&
                    data.length !== 0 &&
                    Object.keys(data).length !== 0
                ) {
                    setCommentOfUsers(data);
                }
            }
        };

        fetchDataForComment();
    }, [singlePointData, flag]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", closeModalOnOutsideClick);
        }

        return () => {
            document.removeEventListener("mousedown", closeModalOnOutsideClick);
        };
    }, [isOpen, onClose]);

    // wt code
    const imagePath = singlePointData && singlePointData.base64Data;
    const imgsrc = `data:image/jpeg;base64,${imagePath}`;
    const data = setPointDataArray(singlePointData, pointDetailIcons);
    const splitChainage = data[1].col3.split("/");

    function openGmaps() {
        const zoom = 20;
        const lat = coordinates[1] || null;
        const lon = coordinates[0] || null;

        // const mapsUrl = `https://www.google.com/maps/@${lat},${lon},${zoom}z`;

        const mapsUrl = `https://www.google.com/maps?q=${lat},${lon}&markers=color:red%7C<label>%7C${lat},${lon}`;

        window.open(mapsUrl, "_blank");
    }

    function maximize(label) {
        let flag;
        if (label === "fullscreen") {
            flag = true;
        } else if (label === "redirect") {
            flag = false;
        }
        const Url = `/maximize-image/${coordinates[1]}/${coordinates[0]}/${flag}`;
        window.open(Url, "_blank");
    }

    const checkPredImage = (data) => {
        if (
            data?.res === null ||
            !data?.res ||
            (data?.res?.asset &&
                Object.keys(data?.res?.asset).length === 0 &&
                data?.res?.defect &&
                Object.keys(data?.res?.defect).length === 0)
        ) {
            setIsPredImg(false);
        } else {
            setIsPredImg(true);
        }
    };

    // Next , Prev and SlideShow functionality
    function searchIndex() {
        const [searchLng, searchLat] = modalData;
        let foundIndex = -1;
        for (let i = 0; i < pointsData.length; i++) {
            const point = pointsData[i];
            if (point.lat === searchLat && point.long === searchLng) {
                foundIndex = i;
                break;
            }
        }
        return foundIndex;
    }

    const updateMap = useCallback((nextCoordinates) => {
        dispatch(setModalData(nextCoordinates));
        RemoveMarkerSingleMap();
        AddMarkerSingleMap(nextCoordinates);
    }, [dispatch]);

    useEffect(() => {
        let intervalId;

        if (isPlaying) {
            intervalId = setInterval(() => {
                setCurrentIndex((prevIndex) => {
                    const nextIndex = prevIndex + 1;
                    if (nextIndex < pointsData.length) {
                        const nextPoint = pointsData[nextIndex];
                        const nextCoordinates = [nextPoint.long, nextPoint.lat];
                        updateMap(nextCoordinates);

                        return nextIndex;
                    } else {
                        clearInterval(intervalId);
                        setIsPlaying(false);
                        return prevIndex;
                    }
                });
            }, 3000); 
        }

        return () => clearInterval(intervalId);
    }, [isPlaying, pointsData, updateMap]);

    function handleSlideShow() {
        setIsPlaying((prevState) => !prevState);
        if (!isPlaying) {
            setCurrentIndex(searchIndex());
        }
    }

    function handleNext() {
        setCommentOfUsers(null);
        const foundIndex = searchIndex();
        if (foundIndex !== -1 && foundIndex < pointsData.length - 1) {
            let nextIndex = foundIndex + 1;
            while (noDataFound) {
                nextIndex += 1;
            }
            const nextPoint = pointsData[nextIndex];
            if (
                nextPoint &&
                nextPoint.long !== undefined &&
                nextPoint.lat !== undefined
            ) {
                const nextCoordinates = [nextPoint.long, nextPoint.lat];
                dispatch(setModalData(nextCoordinates));
                RemoveMarkerSingleMap();
                AddMarkerSingleMap(nextCoordinates);
            } else {
                //console.log("Next point is undefined or missing required properties.");
            }
        } else {
            // //console.log(
            //   "Next index is out of bounds or point data is not available."
            // );
        }
    }

    function handlePrev() {
        setCommentOfUsers(null);
        const foundIndex = searchIndex();
        if (foundIndex !== -1 && 0 < foundIndex) {
            const nextPoint = pointsData[foundIndex - 1];
            if (
                nextPoint &&
                nextPoint.long !== undefined &&
                nextPoint.lat !== undefined
            ) {
                const prevCoordinates = [nextPoint.long, nextPoint.lat];
                dispatch(setModalData(prevCoordinates));
                RemoveMarkerSingleMap();
                AddMarkerSingleMap(prevCoordinates);
            } else {
                //console.log("Prev point is undefined or missing required properties.");
            }
        } else {
            // //console.log(
            //   "Prev index is out of bounds or point data is not available."
            // );
        }
    }

    const handleButtonClick = async () => {
        const inputValue = commentInput;

        if (!commentInput || commentInput === "") {
            toast.error("Can't add empty comment!");
            return;
        }

        // Update the commentData state with the latest comment value
        setCommentData((prevCommentData) => ({
            ...prevCommentData,
            comment: inputValue,
        }));

        try {
            const data = await dispatch(
                sendCommentData(inputValue, commentData)
            );
            setCommentInput("");
            setFlag((prev) => !prev);
        } catch (error) {
            console.error("Error sending comment:", error);
        }
    };

    const handleEditButton = () => {

		const queryParams = new URLSearchParams({
		  lat: coordinates[1],
		  long: coordinates[0],
		  predImage: IsPredImg,
		//   roadName: singlePointData.roadName,
		//   roadNo: singlePointData.roadNo,
		}).toString();
	
		// window.open(`/tool?${queryParams}`, '_blank');
		window.open(`/edit?${queryParams}`, '_blank');
	  };

    return (
        <div
            className={`fixed top-0 right-1/3 h-full w-1/3 bg-white shadow-md transition-transform transform ${isOpen ? "translate-x-0" : "translate-x-full z-50"
                }`}
            ref={modalRef}
            style={{ zIndex: 50 }}
        >
            {loading ? (
                <Spinner />
            ) : (
                <div
                    className="z-10 bg-white flex flex-col hide-scrollbar"
                    style={{
                        zIndex: 40,
                    }}
                >
                    <ParentContainer className="mx-2">
                        {noDataFound ? (
                            <>
                                <div className="w-full flex justify-end cursor-pointer">
                                    <img
                                        className="mr-2 mb-2"
                                        src={closeImg.closeImg}
                                        alt="Close Button"
                                        onClick={() => {
                                            onClose();
                                            RemoveMarkerSingleMap();
                                            setCommentOfUsers(null);
                                            setShowComment(null);
                                        }}
                                        width={20}
                                        height={20}
                                    />
                                </div>
                                <div
                                    className={`${pointDetailsStyles.noDataContainer} flex justify-center items-center font-poppins`}
                                >
                                    NO DATA AVAILABLE FOR THIS POINT
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-full flex justify-end cursor-pointer">
                                    <img
                                        className="mr-2 mb-2"
                                        src={closeImg.closeImg}
                                        alt="Close Button"
                                        onClick={() => {
                                            onClose();
                                            RemoveMarkerSingleMap();
                                        }}
                                        width={22}
                                        height={22}
                                    />
                                </div>
                                <TopContainer>
                                    <ChildContainer condition={condition}>
                                        <p>{condition}</p>
                                    </ChildContainer>
                                </TopContainer>
                                <div
                                    className={
                                        pointDetailsStyles.imageOuterContainer
                                    }
                                >
                                    <div
                                        className={
                                            pointDetailsStyles.imageInnerContainer
                                        }
                                    >
                                        {imgsrc ? (
                                            <div
                                                className={
                                                    pointDetailsStyles.imageBox
                                                }
                                            >
                                                <img
                                                    src={imgsrc}
                                                    className={
                                                        pointDetailsStyles.pointImg
                                                    }
                                                    style={{
                                                        maxWidth: IsPredImg
                                                            ? "100%"
                                                            : "38vh",
                                                        maxHeight: IsPredImg
                                                            ? "100%"
                                                            : "30vw",
                                                        transform: IsPredImg
                                                            ? "none"
                                                            : "rotate(-90deg)",
                                                    }}
                                                    alt="Point Image"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center underline-offset-1 w-full h-full font-poppins text-xl">
                                                <h3>
                                                    Sorry, No Image to display
                                                </h3>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div
                                    className={`${pointDetailsStyles.options} flex relative justify-between items-center mt-2`}
                                >
                                    <div className="flex relative items-center space-x-2">
                                        <img
                                            src={pointDetailIcons.pointprev}
                                            alt="next"
                                            className="w-6 h-6 cursor-pointer"
                                            onClick={handlePrev}
                                        />
                                        <img
                                            src={pointDetailIcons.pointnext}
                                            alt="next"
                                            className="w-6 h-6 cursor-pointer"
                                            //call here on click function
                                            onClick={handleNext}
                                        />
                                    </div>

                                    <div
                                        className={`${pointDetailsStyles.optionsImgBox} flex justify-center items-center`}
                                    >
                                        {userType==="Owner" &&
                                        (<div className="flex relative items-left space-x-2 ml-20 mr-2">
											<div
												className="flex justify-center text-primary items-center cursor-pointer"
												onClick={handleEditButton}>
												<FaRegEdit className="w-6 h-6" />
											</div>
										</div>)}
                                    
                                    <div 
                                        onClick={handleSlideShow} className="w-6 h-6 cursor-pointer"
                                    >
                                        { 
                                            isPlaying ? 
                                                <FaPauseCircle style={{color: "#fe6000"}}  className="w-6 h-6" alt="pause" /> : 
                                                <FaPlayCircle style={{color: "#fe6000"}} className="w-6 h-6" alt="play" />
                                        }
                                    </div>

                                        {commentBtn && (
                                            <img
                                                src={
                                                    pointDetailIcons.pointcomment
                                                }
                                                alt="message"
                                                className="w-6 h-6 cursor-pointer"
                                                onClick={() => {
                                                    setShowComment(
                                                        (prev) => !prev
                                                    );
                                                    scrollToComments();
                                                }}
                                            />
                                        )}
                                        {IsPredImg ? (
                                            <img
                                                src={
                                                    pointDetailIcons.pointfullscreen
                                                }
                                                alt="exit"
                                                className="w-6 h-6 cursor-pointer"
                                                onClick={() =>
                                                    maximize("fullscreen")
                                                }
                                            />
                                        ) : (
                                            ""
                                        )}

                                        <img
                                            src={
                                                pointDetailIcons.pointgooglemap
                                            }
                                            alt="send"
                                            className="w-6 h-6 cursor-pointer"
                                            onClick={openGmaps}
                                        // onClick={handleMapClick}
                                        />
                                        <img
                                            src={pointDetailIcons.pointmaximize}
                                            alt="maximize"
                                            className="w-6 h-6 cursor-pointer"
                                            onClick={() => maximize("redirect")}
                                        />
                                    </div>
                                </div>

                                <div
                                    className={`${pointDetailsStyles.gridContainerBox} flex flex-col mt-4 items-center`}
                                >
                                    {data.map(
                                        ({ row, col1Image, col2, col3 }) => (
                                            <GridContainer key={row} row={row}>
                                                <>
                                                    <ImageContainer>
                                                        <img
                                                            className={`${pointDetailsStyles.iconImage}`}
                                                            src={col1Image}
                                                            alt={`Icon ${row}`}
                                                        />
                                                    </ImageContainer>
                                                    <GridItem column="2">
                                                        <ItemCol2
                                                            col2={col2}
                                                        ></ItemCol2>
                                                    </GridItem>
                                                    <GridItem
                                                        column="3"
                                                        key={row}
                                                        row={row}
                                                        isCol3={col3}
                                                        singlePointData={
                                                            singlePointData
                                                        }
                                                    >
                                                        <ItemCol3
                                                            row={row}
                                                            col2={col2}
                                                            col3={col3}
                                                            splitChainage={
                                                                splitChainage
                                                            }
                                                        />
                                                    </GridItem>
                                                </>
                                            </GridContainer>
                                        )
                                    )}
                                </div>
                                {commentBtn && (
                                    <CommentContainer>
                                        <CommentTitle
                                            showComment={showComment}
                                            setShowComment={setShowComment}
                                        />
                                        {showComment ? (
                                            <CommentForm
                                                commentInput={commentInput}
                                                setCommentInput={
                                                    setCommentInput
                                                }
                                                handleButtonClick={
                                                    handleButtonClick
                                                }
                                                setShowComment={setShowComment}
                                            />
                                        ) : (
                                            <div id="commentForm"></div>
                                        )}
                                        <CommentBox>
                                            {commentOfUsers?.comments.map(
                                                (comment, key) => (
                                                    <CommentItem
                                                        key={key}
                                                        comment={comment}
                                                    />
                                                )
                                            )}
                                        </CommentBox>
                                    </CommentContainer>
                                )}
                            </>
                        )}
                    </ParentContainer>
                </div>
            )}
        </div>
    );
};
