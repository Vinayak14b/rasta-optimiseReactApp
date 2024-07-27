import { useState } from "react";
import Sidebar from "./Sidebar";
import TempHeader from "./TempHeader";
import Box from "@mui/material/Box";
import tickIcon from "../assets/img/Tick_icon.svg";

const ComparePlan = () => {
    const [activePage, setActivePage] = useState('notes');

    const handlePageChange = (page) => {
        setActivePage(page);
    };

    // Array of objects representing table data
    const tableData = [
        {
            feature: "Right Side Statistics Bar Features",
            plans: [" ", " ", " "],
            ticks: [false, false, false],
        },
        {
            feature: "Map Themes",
            plans: ["Customized", "", "Limited"],
            ticks: [false, true, false],
        },
        {
            feature: "Road Condition Report",
            plans: ["₹ 400/km", "₹ 600/km", "₹ 1000/km"],
            ticks: [true, true, true],
        },
        {
            feature: "Inventory Condition Report",
            plans: ["₹ 400/km", "₹ 600/km", "₹ 1000/km"],
            ticks: [true, true, true],
        },
        {
            feature: "Pothole Count Report",
            plans: ["₹ 400/km", "₹ 600/km", "₹ 1000/km"],
            ticks: [true, true, true],
        },
        {
            feature: "Major Bridges Report",
            plans: ["₹ 400/km", "₹ 600/km", "₹ 1000/km"],
            ticks: [true, true, true],
        },
        {
            feature: "Minor Bridges Report",
            plans: ["₹ 400/km", "₹ 600/km", "₹ 1000/km"],
            ticks: [true, true, true],
        },
        {
            feature: "Culvert Counts Report",
            plans: ["₹ 400/km", "₹ 600/km", "₹ 1000/km"],
            ticks: [true, true, true],
        },
        {
            feature: "Left Side Bar Features",
            plans: [" ", " ", " "],
            ticks: [false, false, false],
        },
        {
            feature: "View Icons in the left side bar",
            plans: ["Customized", "Plot & view defects", " "],
            ticks: [true, true, true],
        },
        {
            feature: "Plot all defects at once on the map",
            plans: [" ", " ", "Limited"],
            ticks: [true, true, false],
        },
        {
            feature: "Plot conditions",
            plans: ["More features available", " ", "Limited"],
            ticks: [true, true, false],
        },
        {
            feature: "Report Section (Pay for report and get download option)",
            plans: [" ", " ", "X"],
            ticks: [true, true, false],
        },
        {
            feature: "Calculator Section(Only View)",
            plans: [" ", " ", "View Only"],
            ticks: [true, true, false],
        },
        {
            feature: "Search Roads & Map compare",
            plans: ["List & Map mode", "Only Map mode", "Limited"],
            ticks: [true, true, false],
        },
        {
            feature: "Utilities Dashboard (Only View)",
            plans: ["Customized", "View Only", "View Only"],
            ticks: [true, true, true],
        },
        {
            feature: "Comparison Analysis (Only View)",
            plans: ["Customized", "With Trips Compare", "View Only"],
            ticks: [true, true, true],
        },

    ];

    return (
        <>
            <Sidebar setActivePage={handlePageChange} activePage={activePage} />
            <div className="w-[100%]">
                <Box sx={{ marginLeft: '120px' }}>
                    <TempHeader />
                </Box>
                <div className="flex items-center justify-center">
                    <div className="my-16">
                        {/* Table */}
                        <table className="table-auto w-[80vw]">
                            <thead>
                                <tr>
                                    <th className="border border-gray-800 px-4 py-2 w-[30%] align-top"> </th>

                                    <th className="border border-gray-800 px-4 py-2  w-[23%] align-top">
                                        <div className="flex flex-col text-left ml-[1vw]">
                                            <div><span className="font-bold font-poppins" style={{
                                                fontSize: '26px',
                                            }}>
                                                Enterprise Plan
                                            </span></div>
                                            <div className=""><span className="font-semibold font-poppins text-left" style={{
                                                fontSize: '14px',
                                                color: '#043D49',
                                            }}>Customized Plan</span></div>
                                        </div>
                                    </th>

                                    <th className="border border-gray-800 px-4 py-2  w-[24%]">
                                        <div className="flex flex-col text-left ml-[4vw]">
                                            <div><span className="font-bold font-poppins" style={{
                                                fontSize: '26px',
                                            }}>
                                                Gold Plan</span></div>
                                            <div><span className="font-semibold font-poppins" style={{
                                                fontSize: '26px',
                                            }}>₹14,999</span><span className="font-normal font-poppins" style={{
                                                fontSize: '22px',
                                            }}>/mo</span></div>
                                            <div><span className="font-semibold font-poppins" style={{
                                                fontSize: '14px',
                                                color: '#937C01',
                                            }}>Flexi Plan</span></div>
                                        </div>
                                    </th>

                                    <th className="border border-gray-800 px-4 py-2  w-[23%]">
                                        <div className="flex flex-col text-left ml-[4vw]">
                                            <div><span className="font-bold font-poppins" style={{
                                                fontSize: '26px',
                                            }}>
                                                Free Plan</span></div>
                                                <div><span className="font-semibold font-poppins" style={{
                                                fontSize: '26px',
                                            }}>₹0</span><span className="font-normal font-poppins" style={{
                                                fontSize: '22px',
                                            }}>/mo</span></div>
                                            <div><span className="font-semibold font-poppins" style={{
                                                fontSize: '14px',
                                                color: '#73DC42',
                                            }}>Activated Plan</span></div>
                                        </div>
                                    </th>
                                </tr>

                            </thead>
                            <tbody>
                                {tableData.map((row, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-800 px-4 py-2 font-poppins font-semibold" style={{ fontSize: row.feature === "Left Side Bar Features" || row.feature === "Right Side Statistics Bar Features" ? '17px' : '11px' }}>
                                            <div className="flex items-center justify-center">{row.feature}</div>
                                        </td>
                                        {row.plans.map((plan, planIndex) => (
                                            <td key={planIndex} className="border border-gray-800 px-4 py-2" style={{ fontSize: '11px' }}>
                                                <div className="flex items-left justify-left pl-[5vw] font-poppins">
                                                    <div className="">{row.ticks[planIndex] && <img src={tickIcon} alt="Tick Icon" style={{ marginRight: '20px' }} />}</div>
                                                    <div className="font-poppins">{plan}</div>
                                                </div>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ComparePlan;
