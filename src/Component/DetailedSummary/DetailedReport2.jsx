import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import TempHeader from "../TempHeader";
import DetailedReportSearchBox from "./DetailedReportSearchBox";
import DetailedReportTitle from "./DetailedReportTitle";
import DetailedReportRoad from "./DetailedReportRoad";
import "./DetailedReport.css";
import DetailedReportPieChart from "./DetailedReportPieChart";
import DetailedReportBarChart from "./DetailedReportBarChart";
import DetailedReportPagination from "./DetailedReportPagination";
import { selectTrip } from "../../mapbox/slices/tripSlice";
import { useSelector, useDispatch } from "react-redux";
import {
    getSurveyedRoadData,
    getAssetsDefectsOfRoad,
} from "../../mapbox/services/Operations/RoadsAPI";
import { Spinner } from "../../utils/Spinner";

function DetailedReport2() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(null);
    const [assetsDefectsLoading, setAssetsDefectsLoading] = useState(null);
    const [assetsDefects, setAssetsDefects] = useState({});
    const [roadList, setRoadList] = useState([]);
    const { selectedOfficeName, selectedOfficeLevel } = useSelector(selectTrip);
    const searchQuery = {
        officeLevel: selectedOfficeLevel,
        officeName: selectedOfficeName,
    };
    const [activePage, setActivePage] = useState("report");
    const [selectedRoad, setSelectedRoad] = useState(null);
    const handlePageChange = (page) => {
        setActivePage(page);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await dispatch(
                    getSurveyedRoadData(setLoading, searchQuery)
                );
                setRoadList(result);
                setSelectedRoad((prev) => (prev ? prev : result[0]));
            } catch (error) {
                console.error("Error fetching road data: ", error);
            }
            setLoading(false);
        };

        fetchData();
    }, [selectedOfficeName, selectedOfficeLevel]);

    useEffect(() => {
        const fetchAssetsDefects = async () => {
            setAssetsDefectsLoading(true);
            if (selectedRoad == null) return;
            try {
                const result = await dispatch(
                    getAssetsDefectsOfRoad(
                        setAssetsDefectsLoading,
                        selectedRoad?.roadName,
                        selectedRoad?.roadNo
                    )
                );
                setAssetsDefects(result?.data[0]);
            } catch (error) {
                console.error("Error fetching road data: ", error);
            }
            setAssetsDefectsLoading(false);
        };

        fetchAssetsDefects();
    }, [selectedRoad]);

    return (
        <div>
            <div className="detailedReportPageSidebar">
                <Sidebar
                    setActivePage={handlePageChange}
                    activePage={activePage}
                />
            </div>
            <div id="detailedReport" className="ml-20">
                <TempHeader></TempHeader>
                <div className="detailedReportContent w-full h-full flex items-center">
                    <div className="detailedReportBox1">
                        <div className="leftBox1 upperSection">
                            <DetailedReportTitle></DetailedReportTitle>
                            <DetailedReportSearchBox
                                selectedRoad={selectedRoad}
                                setSelectedRoad={setSelectedRoad}
                                rows={roadList}
                                rowsLoading={loading}
                            ></DetailedReportSearchBox>
                            <DetailedReportRoad
                                road={selectedRoad}
                            ></DetailedReportRoad>
                        </div>
                        {assetsDefectsLoading ? (
                            <Spinner />
                        ) : (
                            <DetailedReportPieChart
                                defects={assetsDefects.defects}
                            ></DetailedReportPieChart>
                        )}
                    </div>
                    <div className="detailedReportBox2">
                        <DetailedReportPagination
                            selectedRoad={selectedRoad}
                            setSelectedRoad={setSelectedRoad}
                            rows={roadList}
                            rowsLoading={loading}
                        ></DetailedReportPagination>
                        {assetsDefectsLoading ? (
                            <Spinner />
                        ) : (
                            <DetailedReportBarChart
                                assets={assetsDefects.assets}
                            ></DetailedReportBarChart>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailedReport2;
