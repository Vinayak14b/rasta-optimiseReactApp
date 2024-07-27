import React,{ useState } from "react";
import {
  Button,
  FormControlLabel,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import Dialog from "@mui/material/Dialog";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import Slide from "@mui/material/Slide";
import { LinearProgress } from "@mui/material";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import increaseIcon from "../assets/markers/increaseIcon.png";
import decreaseIcon from "../assets/markers/decreaseIcon.png";


const TypeCol = ({ params }) => {

  if (params.row.id % 2 == 0) {
    return (
      <>
   
      <div
        className="flex justify-between items-center w-full"
        style={{ cursor: "pointer" }}
      >
        <div>{params.row.type}</div>
        <FormControlLabel
          control={
            <IconButton
              color="secondary"
              aria-label="add an alarm"
              // onClick={handleEditClick}
            >
              <img src={decreaseIcon} alt="increaseIcon" />
            </IconButton>
          }
        />
      </div>
      </>
    );
  }

  return (
    <div
      className="flex justify-between items-center w-full"
      style={{ cursor: "pointer" }}
    >
      <div>{params.row.type}</div>
      <FormControlLabel
        control={
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            // onClick={handleEditClick}
          >
            <img src={increaseIcon} alt="increaseIcon" />
          </IconButton>
        }
      />
    </div>
  );
};

const ConditionCol = ({ params }) => {

  const total = params.row.condition.reduce((acc, value) => acc + value, 0);

  let offset = 0;

  return (
    <div
      className="flex flex-col items-center w-full"
      style={{ cursor: "pointer" }}
    >
      <div className="flex justify-evenly w-full">
        {params?.row?.condition.map((value, index) => {
          return (
            <div
              className="flex justify-center items-center w-full"
              key={index}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor:
                    index === 0
                      ? "#5EC45C"
                      : index === 1
                      ? "#FF8A00"
                      : "#FF2222",
                  marginRight: "5px",
                }}
              ></div>
              <div>{value}%</div>
            </div>
          );
        })}
      </div>
      <div style={{ width: "100%", height: "15px", position: "relative" }}>
        {params?.row?.condition.map((value, index) => {
          const percentage = (value / total) * 100;
          const backgroundColor =
            index === 0 ? "#5EC45C" : index === 1 ? "#FF8A00" : "#FF2222";

          const style = {
            width: `${percentage}%`,
            height: "100%",
            backgroundColor,
            position: "absolute",
            left: `${offset}%`,
          };

          offset += percentage;

          return <div key={index} style={style}></div>;
        })}
      </div>
    </div>
  );
};

const theme = createTheme({
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#FE6100",
          "&.Mui-checked": {
            color: "#FE6100",
          },
        },
      },
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const InventryAnalysis = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      renderCell: (params) => <TypeCol params={params} />,
    },
    {
      field: "condition",
      headerName: "Condition",
      width: 500,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => <ConditionCol params={params} />,
    },
  ];

  const rows = [
    {
      id: 1,
      road_no: "RN1",
      road_name: "Road A",
      start_chainage: 10,
      end_chainage: 20,
      type: "Type1",
      condition: [10, 20, 30],
    },
    {
      id: 2,
      road_no: "RN2",
      road_name: "Road B",
      start_chainage: 20,
      end_chainage: 30,
      type: "Type2",
      condition: [10, 20, 30],
    },
    {
      id: 3,
      road_no: "RN3",
      road_name: "Road C",
      start_chainage: 30,
      end_chainage: 40,
      type: "Type3",
      condition: [10, 55, 30],
    },
    {
      id: 4,
      road_no: "RN4",
      road_name: "Road D",
      start_chainage: 40,
      end_chainage: 50,
      type: "Type4",
      condition: [10, 20, 30],
    },
    {
      id: 5,
      road_no: "RN5",
      road_name: "Road E",
      start_chainage: 50,
      end_chainage: 60,
      type: "Type5",
      condition: [10, 20, 30],
    },
    {
      id: 6,
      road_no: "RN6",
      road_name: "Road F",
      start_chainage: 60,
      end_chainage: 70,
      type: "Type6",
      condition: [70, 20, 30],
    },
    {
      id: 7,
      road_no: "RN7",
      road_name: "Road G",
      start_chainage: 70,
      end_chainage: 80,
      type: "Type7",
      condition: [10, 20, 30],
    },
    {
      id: 8,
      road_no: "RN8",
      road_name: "Road H",
      start_chainage: 80,
      end_chainage: 90,
      type: "Type8",
      condition: [10, 20, 30],
    },
    {
      id: 9,
      road_no: "RN9",
      road_name: "Road I",
      start_chainage: 90,
      end_chainage: 100,
      type: "Type9",
      condition: [10, 20, 30],
    },
    {
      id: 10,
      road_no: "RN10",
      road_name: "Road J",
      start_chainage: 100,
      end_chainage: 110,
      type: "Type10",
      condition: [10, 20, 30],
    },
  ];

  // now create rows like before

  const data = [
    { value: 10, label: "B" },
    { value: 15, label: "C" },
    { value: 20, label: "D" },
    { value: 30, label: "A" },
  ];

  const size = {
    width: 400,
    height: 400,
  };

  const size2 = {
    width: 300,
    height: 300,
  };

  // dropdown data testing (will update this later)

  const dropdowndata = [
    {
      id: 1,
      name: "India",
      states: [
        {
          id: 11,
          name: "Bihar",
          cities: [
            {
              id: 111,
              name: "Patna",
              roads: [{ id: 1111, name: "NP Road" }],
            },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Pakistan",
      states: [
        {
          id: 21,
          name: "Punjab",
          cities: [
            {
              id: 211,
              name: "Lahore",
              roads: [{ id: 2111, name: "XYZ Road" }],
            },
          ],
        },
      ],
    },
  ];

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedRoad, setSelectedRoad] = useState(null);

  const handleCountryChange = (countryId) => {
    const country = dropdowndata.find(
      (item) => item.id === parseInt(countryId, 10)
    );
    setSelectedCountry(country);
    setSelectedState(null);
    setSelectedCity(null);
    setSelectedRoad(null);
  };

  const handleStateChange = (stateId) => {
    const state = selectedCountry.states.find(
      (item) => item.id === parseInt(stateId, 10)
    );
    setSelectedState(state);
    setSelectedCity(null);
    setSelectedRoad(null);
  };

  const handleCityChange = (cityId) => {
    const city = selectedState.cities.find(
      (item) => item.id === parseInt(cityId, 10)
    );
    setSelectedCity(city);
    setSelectedRoad(null);
  };

  const handleRoadChange = (roadId) => {
    const road = selectedCity.roads.find(
      (item) => item.id === parseInt(roadId, 10)
    );
    setSelectedRoad(road);
  };

  // dropdown for road, city, state, country

  const [openCountry, setOpenCountry] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [openRoad, setOpenRoad] = useState(false);

  const handleCloseDrop = (val) => {
    switch (val) {
      case "Select Country":
        setOpenCountry(false);
        break;
      case "Select State":
        setOpenState(false);
        break;
      case "Select City":
        setOpenCity(false);
        break;
      case "Select Road":
        setOpenRoad(false);
        break;
      default:
        break;
    }
  };

  const handleOpenDrop = (val) => {
    switch (val) {
      case "Select Country":
        setOpenCountry(true);
        break;
      case "Select State":
        setOpenState(true);
        break;
      case "Select City":
        setOpenCity(true);
        break;
      case "Select Road":
        setOpenRoad(true);
        break;
      default:
        break;
    }
  };

  const renderDropdown = (items, onSelect, placeholder) => {
    if (placeholder === "Select Country") {
      return (
        <>
       
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel
              id="demo-controlled-open-select-label"
              style={{ color: "#FE6100" }}
            >
              {placeholder}
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openCountry}
              onClose={() => handleCloseDrop(placeholder)}
              onOpen={() => handleOpenDrop(placeholder)}
              label={placeholder}
              onChange={(e) => onSelect(e.target.value)}
              value={items ? items.id : ""}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {items &&
                items.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </>
      );
    } else if (placeholder === "Select State") {
      return (
        <>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-controlled-open-select-label">
              {placeholder}
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openState}
              onClose={() => handleCloseDrop(placeholder)}
              onOpen={() => handleOpenDrop(placeholder)}
              label={placeholder}
              onChange={(e) => onSelect(e.target.value)}
              value={items ? items.id : ""}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {items &&
                items.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </>
      );
    } else if (placeholder === "Select City") {
      return (
        <>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-controlled-open-select-label">
              {placeholder}
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openCity}
              onClose={() => handleCloseDrop(placeholder)}
              onOpen={() => handleOpenDrop(placeholder)}
              label={placeholder}
              onChange={(e) => onSelect(e.target.value)}
              value={items ? items.id : ""}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {items &&
                items.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </>
      );
    } else if (placeholder === "Select Road") {
      return (
        <>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-controlled-open-select-label">
              {placeholder}
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={openRoad}
              onClose={() => handleCloseDrop(placeholder)}
              onOpen={() => handleOpenDrop(placeholder)}
              label={placeholder}
              onChange={(e) => onSelect(e.target.value)}
              value={items ? items.id : ""}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {items &&
                items.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </>
      );
    }
  };

  // this is for dialog selected dara
  const [selectedRowids, setSelectedRowids] = useState(null);
  const filteredRows = Array.isArray(selectedRowids)
    ? rows.filter((row) => selectedRowids.includes(row.id))
    : null;

  const columnsWithoutCondition = columns.slice(0, -1);

  return (
    <>
    {/* <Sidebar/> */}
   
      <ThemeProvider theme={theme}>
        <div className="w-full mb-5">
          <div className="flex justify-between pl-20 pr-20 pt-10 ml-[80px]">
            <div className="flex space-x-4">
              {renderDropdown(
                dropdowndata,
                handleCountryChange,
                "Select Country"
              )}

              {selectedCountry &&
                renderDropdown(
                  selectedCountry.states,
                  handleStateChange,
                  "Select State"
                )}

              {selectedState &&
                renderDropdown(
                  selectedState.cities,
                  handleCityChange,
                  "Select City"
                )}

              {selectedCity &&
                renderDropdown(
                  selectedCity.roads,
                  handleRoadChange,
                  "Select Road"
                )}
            </div>
            <div
              style={{
                width: "200px",
                height: "200px",
              }}
              className="mr-20 mb-10"
            >
              <PieChart
                series={[
                  {
                    arcLabel: (item) => `${item.value}`,
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
                {...size2}
                // slotProps={{ legend: { hidden: true } }}
              />
            </div>
          </div>

          <div className="w-[90%] h-[60vh] flex flex-col justify-between items-center ml-[140px]  mt-10 shadow-xl p-1">
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
              onRowSelectionModelChange={(e) => setSelectedRowids(e)}
              onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRowData = rows.filter((row) =>
                  selectedIDs.has(row.id.toString())
                );
                // setSelectedRowids(selectedRowData);
              }}
              // pageSizeOptions={[5, 10]}
              checkboxSelection
            />
          </div>

          <div className="flex justify-center items-start mt-10 ">
            <Button
              style={{
                background: "#FE6100",
                width: "300px",
                height: "50px",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
              variant="contained"
              onClick={handleClickOpen}
            >
              Analysis{" "}
            </Button>
          </div>
        </div>
      </ThemeProvider>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            width: "80vw",
            height: "80vh",
          },
        }}
        maxWidth="lg"
        sx={{
          ".MuiPaper-root": {
            padding: 4,
          },
        }}
      >
        <div className="w-[100%] h-[100%] ">
          <div className="flex justify-center items-center h-[50%]">
            <div className="mr-8">
              <PieChart
                series={[
                  {
                    arcLabel: (item) => `${item.value}`,
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
                {...size}
                // slotProps={{ legend: { hidden: true } }}
              />
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex justify-center items-center">
                <span className="text-red-600 mr-2">10%</span>
                <LinearProgress
                  color="error"
                  variant="determinate"
                  value={50}
                  style={{ height: "15px", width: "300px" }}
                />
              </div>
              <div className="flex justify-center items-center">
                <span className="text-red-600 mr-2">10%</span>
                <LinearProgress
                  color="error"
                  variant="determinate"
                  value={50}
                  style={{ height: "15px", width: "300px" }}
                />
              </div>
              <div className="flex justify-center items-center">
                <span className="text-red-600 mr-2">10%</span>
                <LinearProgress
                  color="error"
                  variant="determinate"
                  value={50}
                  style={{ height: "15px", width: "300px" }}
                />
              </div>
              <div className="flex justify-center items-center">
                <span className="text-red-600 mr-2">10%</span>
                <LinearProgress
                  color="error"
                  variant="determinate"
                  value={50}
                  style={{ height: "15px", width: "300px" }}
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-100 h-[50%] w-full">
            <Paper id="scroll-bar">
              <style>
                {`

 #scroll-bar::-webkit-scrollbar {
  width: 10px;
 }

 #scroll-bar::-webkit-scrollbar-thumb {
   background-color: #888;
   border-radius: 5px;
 }

 #scroll-bar::-webkit-scrollbar-track {
   background-color: #f0f0f0;
 }

 `}
              </style>
              <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columnsWithoutCondition.map((column) => (
                        <TableCell
                          key={column.field}
                          //   align={column.align}
                          style={{
                            minWidth: column.width,
                            backgroundColor: "#FE6100",
                            color: "white",
                          }}
                        >
                          {column.headerName}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRows &&
                      filteredRows.map((row) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={row.code}
                          >
                            {columnsWithoutCondition.map((column) => {
                              const value = row[column.field];
                              return (
                                <TableCell key={column.field}>
                                  {column.format && typeof value === "number"
                                    ? column.format(value)
                                    : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default InventryAnalysis;