import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import TempHeader from "./TempHeader";
import "../CSS/Utils.css";
import { useSelector } from "react-redux";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { Chart } from "react-google-charts";

const DetailedReports = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columns = [
    { field: "road_no", headerName: "Road Number", width: 150 },
    { field: "road_name", headerName: "Road Name", width: 200 },
    { field: "start_chainage", headerName: "Start Chainage", width: 150 },
    { field: "end_chainage", headerName: "End Chainage", width: 150 },
    {
      field: "type",
      headerName: "Type",
      width: 200,
      sortable: false,
      disableClickEventBubbling: true,
      //   renderCell: (params) => <TypeCol params={params}  onCheckboxClick={handleCheckboxClick}/>,
    },
    {
      field: "condition",
      headerName: "Condition",
      width: 500,
      sortable: false,
      disableClickEventBubbling: true,
      //   renderCell: (params) => <ConditionCol params={params} onCheckboxClick={handleCheckboxClick}/>,
    },
  ];

  let rows = [];
  const DetailedReports = useSelector((state) => state.aioutput.aioutputData);
  const aioutputData = DetailedReports.profile;

  // Check if aioutputData is an array
  if (Array.isArray(aioutputData)) {
    // Map through aioutputData and transform each object into the desired format
    rows = aioutputData.map((item, index) => ({
      id: index + 1, // You might adjust the way you generate IDs based on your application logic
      roadNo: item.roadNo,
      roadName: item.roadName,
      startChainage: item.startChainage,
      endChainage: item.endChainage,
      isAscending: item.isAscending,
    }));

    // Now rows array contains the specific values from aioutputData in the desired format
  } else {
    console.error("aioutputData is not an array");
    // Handle the case where aioutputData is not an array, perhaps by providing a default value or logging an error
  }
  // Add more sample data as needed

  const columnsWithoutCondition = columns.slice(0, -1);

  // this is for dialog selected dara
  const [selectedOption, setSelectedOption] = useState(null);
  const [showDiolog, setShowDialog] = useState(false);
  const [activePage, setActivePage] = useState("report");
  const [patholes, setPatholes] = useState(0);
  const [speedbreakers, setSpeedbreakers] = useState(0);
  const [manholes, setManholes] = useState(0);
  const [goodCount, setGoodCount] = useState(0);
  const [averageCount, setAverageCount] = useState(0);
  const [poorCount, setPoorCount] = useState(0);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    // Additional functionality based on the selected option
  };
 
  useEffect(() => {
    // This effect will run when the component is unmounted

    return () => {
      setSelectedOption(null);
    };
  }, []);
  const data = [
    { label: `${goodCount}%`, value: goodCount, color: "#01B700" }, // Good
    { label: `${averageCount}%`, value: averageCount, color: "#FF7D01" }, //Average
    { label: `${poorCount}%`, value: poorCount, color: "#FF2000" }, // Bad
  ];
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://107.21.38.45:2700/AI/total_detected"
        );
        const data = await response.json();
        const profile = data.profile[0];
        setPatholes(profile.total_potholedetected);
        setSpeedbreakers(profile.total_speedbreakersdetected);
        setManholes(profile.total_manholedetected);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "http://107.21.38.45:2700/AI/total_condition"
        );
        const data = await response.json();

        setGoodCount(data.Good);
        setAverageCount(data.Average);
        setPoorCount(data.Poor);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const databar = [
    ["Element", "Counts", { role: "style" }],
    ["Potholes", patholes, "#FF0000"], // RGB value
    ["Speed Breakers", speedbreakers, "#5E5CC3"], // English color name
    ["Manholes", manholes, "#FFBB56"],
    // CSS-style declaration
  ];
  useEffect(() => {
    fetch("http://107.21.38.45:2700/AI/total_detected")
      .then((response) => response.json())
      .then((data) => {
        const totalSpeedBreakers = data.total_speedbreakersdetected;
        const totalPotholes = data.total_potholedetected;
        const totalManholes = data.total_manholedetected;
        const newDataBar = [
          ["Element", "Counts", { role: "style" }],
          ["Potholes", totalPotholes, "#FF0000"], // Potholes count
          ["Speed Breakers", totalSpeedBreakers, "#5E5CC3"], // Speed breakers count
          ["Manholes", totalManholes, "#FFBB56"], // Manholes count
          // CSS-style declaration
        ];
        // setDataBar(newDataBar);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty

  const colors = ["#8884d8", "#82ca9d", "#ffc658"]; // Define colors for each category

  const sizing = {
    margin: { right: 5 },
    width: 200,
    height: 200,
    legend: { hidden: true },
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = (selectedOption) => {
    // Navigate to Pricinglan component with selectedOption as props
    navigate("/pricingplan", { state: { selectedOption } });
    setOpen(false);
  };
  const handleViewDetailSummaryClick = () => {
    navigate("/viewdetail");
  };
  const handleClickOpen = () => {
    setTimeout(() => {
      if (selectedOption) {
        setOpen(true);
      } else {
        // Handle case when no option is selected
      }
    }, 0);
  };

  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleClose = () => {
    setOpen(false);
    setShowDialog(false);
    setSelectedOption(null); // Reset selectedOption when closing the dialog
  };

  return (
    <>
      <div className=" ">
        <div className=" ">
          <Sidebar setActivePage={handlePageChange} activePage={activePage} />
        </div>

        <div className="ml-20 ">
          <TempHeader />
          <div className="flex justify-center  ">
            <div className="w-1/5  mb-20">
              <h1 className="font-poppins text-[30px] leading-9 text-center mt-2">
                Detailed Report
              </h1>
              <h5 className="font-poppins text-[10px] font-semibold leading-9 text-center mt-4">
                Get an overview of Data Collection
              </h5>

              <div className="w-[235px] h-[90px] mx-auto border-2 border-orange-400 bg-[#FFDDC7] rounded-md box-content p-4 flex flex-col justify-center items-center">
                <span className="font-poppins text-16 font-bold leading-24 text-left">
                  Overall Report
                </span>
                <span className="font-poppins text-14 font-medium leading-21 text-left">
                  Date:08/02/2024
                </span>
                <span className="font-poppins text-14 font-medium leading-21 text-left mt-2">
                  Total Distance
                </span>
                <span className="font-poppins text-20 font-bold leading-30 text-left">
                  {/* {totalroadsData.totalDistance_in_Km} Km */}
                  0 Km
                </span>
              </div>
            </div>

            {/* second box */}
            <div className="w-4/5 h-full p-[40px] relative  ">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "40%",
                    height: "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginRight: "30px",
                    borderRadius: "6px",
                    border: "1px solid black",
                    paddingRight: "10px",
                    paddingTop: "35px",
                  }}
                >
                  {/* Content for first div */}
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <PieChart
                      series={[
                        {
                          arcLabel: (item) => `${item.label}`,
                          arcLabelMinAngle: 45,
                          data,
                        },
                      ]}
                      sx={{
                        [`& .${pieArcLabelClasses.root}`]: {
                          fill: "white",
                          fontWeight: "bold",
                        },
                      }}
                      {...sizing} // Corrected from size to sizing
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "60%",
                        height: "50%",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            width: "40%",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              marginRight: "3px",
                              width: "15px",
                              height: "15px",
                              backgroundColor: "#01B700",
                              borderRadius: "50%",
                            }}
                          />
                          <span style={{ marginLeft: "10px" }}>Good</span>
                        </div>
                        <div style={{ width: "70%" }}>
                          <div
                            style={{
                              marginLeft: "10px",
                              width: `${parseInt(goodCount)}%`,
                              height: "20px",
                              backgroundColor: "#01B700",
                            }}
                          />
                        </div>
                      </div>

                      <br />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            width: "40%",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              marginRight: "3px",
                              width: "15px",
                              height: "15px",
                              backgroundColor: "#FF7D01",
                              borderRadius: "50%",
                            }}
                          />
                          <span style={{ marginLeft: "10px" }}>Average</span>
                        </div>
                        <div style={{ width: "70%" }}>
                          <div
                            style={{
                              marginLeft: "10px",
                              width: `${parseInt(averageCount)}%`,
                              height: "20px",
                              backgroundColor: "#FF7D01",
                            }}
                          />
                        </div>
                      </div>

                      <br />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            width: "40%",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              marginRight: "3px",
                              width: "15px",
                              height: "15px",
                              backgroundColor: "#FF2000",
                              borderRadius: "50%",
                            }}
                          />
                          <span style={{ marginLeft: "10px" }}>Bad</span>
                        </div>
                        <div style={{ width: "70%" }}>
                          <div
                            style={{
                              marginLeft: "10px",
                              width: `${parseInt(poorCount)}%`,
                              height: "20px",
                              backgroundColor: "#FF2000",
                            }}
                          />
                        </div>
                      </div>

                      <br />
                      {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{display:'flex',width:'40%',alignItems:'center'}}>
				<div
                    style={{
                        marginRight: '3px',
                        width: '15px',
                        height: '15px',
                        backgroundColor: '#FF2222',
                        borderRadius: '50%'
                    }}
                />
                <span style={{marginLeft:'10px'}}>Poor</span>
				</div>
<div style={{width:'70%'}}>
				<div
                    style={{
                        marginLeft: '10px',
                        width: `${parseInt(data[3].label)}%`,
                        height: '20px',
                        backgroundColor: '#FF2222',
                    }}
                />
             </div>
            </div> */}
                      <br />
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    width: "60%",
                    height: "50%",
                    borderRadius: "6px",
                    border: "1px solid black",
                    paddingLeft: "10px",
                  }}
                >
                  {/* Content for second div */}
                  <Chart
                    chartType="ColumnChart"
                    width="100%"
                    height="400px"
                    data={databar}
                  />
                </div>
              </div>

              {/* Road Table */}
              <br />

              <TableContainer
                style={{
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columnsWithoutCondition.map((column) => (
                        <TableCell
                          key={column.field}
                          //   align={column.align}
                          style={{
                            minWidth: column.width,
                            backgroundColor: "white",
                            color: "black",
                            border: "1px solid #FE6100",
                          }}
                        >
                          {column.headerName}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? rows.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                      : rows
                    ).map((row) => (
                      <TableRow
                        key={row.id}
                        hover
                        role="checkbox"
                        tabIndex={-1}
                      >
                        <TableCell>{row.roadNo}</TableCell>
                        <TableCell>{row.roadName}</TableCell>
                        <TableCell>{row.startChainage}</TableCell>
                        <TableCell>{row.endChainage}</TableCell>
                        <TableCell>
                          {row.isAscending === "1" ? (
                            <span>
                              Ascending
                              <span style={{ color: "green" }}>▲</span>
                            </span>
                          ) : row.isAscending === "2" ? (
                            <span>
                              Descending
                              <span style={{ color: "red" }}>▼</span>
                            </span>
                          ) : null}
                        </TableCell>{" "}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
            <Dialog open={open} onClose={handleClose}>
              <div className="fixed top-0 left-0 w-full  h-full flex justify-center items-center">
                <div className="bg-white   relative flex flex-col  justify-evenly ">
                  {/* Close button inside the dialog */}
                  <div
                    className="close-btn absolute top-[3.5rem] right-[3.5rem]"
                    onClick={handleClose}
                  ></div>
                  {/* Dialog content */}
                  <div className="w-screen h-screen mt-2 flex flex-col justify-evenly left-585  p-4 font-poppins text-white">
                    <h1
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "32px",
                        fontWeight: 600,
                        lineHeight: "48px",
                        letterSpacing: "0em",
                        textAlign: "center",
                      }}
                      className="text-black text-2xl text-center font-bold mb-4 "
                    >
                      Select The Report
                    </h1>
                    <div
                      className="flex justify-evenly items-center"
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontWeight: 700,
                        lineHeight: "24px",
                        letterSpacing: "0em",
                        textAlign: "center",
                      }}
                    >
                      {/* First Row */}
                      <button
                        onClick={() => handleButtonClick("Budget Report")}
                        className="w-[194px] h-[75px] rounded-md bg-[#FCBC95] focus:outline-none focus:bg-primary text-white"
                      >
                        Budget Report
                      </button>
                      <button
                        onClick={() => handleButtonClick("Estimate Report")}
                        className="w-[194px] h-[75px] rounded-md bg-[#FCBC95] focus:outline-none focus:bg-primary text-white"
                      >
                        Estimate Report
                      </button>
                    </div>
                    <div
                      className="flex justify-evenly items-center"
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontWeight: 700,
                        lineHeight: "24px",
                        letterSpacing: "0em",
                        textAlign: "center",
                      }}
                    >
                      {/* Second Row */}
                      <button
                        onClick={() =>
                          handleButtonClick("Road Roughness Report")
                        }
                        className="w-[194px] h-[75px] rounded-md bg-[#FCBC95] focus:outline-none focus:bg-primary text-white"
                      >
                        Road Roughness Report
                      </button>
                      <button
                        onClick={() => handleButtonClick("Comparison Report")}
                        className="w-[194px] h-[75px] rounded-md bg-[#FCBC95] focus:outline-none focus:bg-primary text-white"
                      >
                        Comparison Report
                      </button>
                    </div>{" "}
                    <div
                      className="flex justify-evenly items-center"
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "16px",
                        fontWeight: 700,
                        lineHeight: "24px",
                        letterSpacing: "0em",
                        textAlign: "center",
                      }}
                    >
                      {/* Second Row */}
                      <button
                        onClick={() =>
                          handleButtonClick("Detailed Road Report")
                        }
                        className="w-[194px] h-[75px] rounded-md bg-[#FCBC95] focus:outline-none focus:bg-primary text-white"
                      >
                        Detailed Road Report
                      </button>
                      <button
                        onClick={() =>
                          handleButtonClick("Arboriculture Report")
                        }
                        className="w-[194px] h-[75px] rounded-md bg-[#FCBC95] focus:outline-none focus:bg-primary text-white"
                      >
                        Arboriculture Report
                      </button>
                    </div>
                    {/* New content below */}
                  </div>
                </div>
              </div>
            </Dialog>

            {/* New content below */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedReports;
