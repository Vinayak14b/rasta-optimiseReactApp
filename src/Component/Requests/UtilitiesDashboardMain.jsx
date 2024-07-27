import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import InnerSideBar from "../InnerSideBar";
import "../../CSS/UtilityDashboard.css";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import { IoFilter } from "react-icons/io5";

import {
  approveUtilityRequest,
  getUtilityRequest,
} from "../../usermanagement/services/Operations/utilityAPI";
import { useDispatch, useSelector } from "react-redux";
import { GoDash } from "react-icons/go";
import { Box, Modal, Typography } from "@mui/material";
// import { selectUtility } from "../../usermanagement/slices/utilitySlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 2,
  p: 4,
  fontWeight: "bold",
};

const UtilitiesDashboardMain = () => {
  const [highlightedRow, setHighlightedRow] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const [activePage, setActivePage] = useState("dashboard");
  const dispatch = useDispatch();
  const { utilityData, loading } = useSelector((state) => state.utility);
  const [filterOption, setFilterOption] = useState("all");
  const [openModal, setOpenModal] = useState(false);
  const [reqId, setReqId] = useState(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  // const handleFilterChange = (selectedFilter) => {
  //   if (selectedFilter === "All") {
  //     setFilterStatus("");
  //   } else {
  //     let filterValue = selectedFilter;

  //     // Map the selectedFilter to match the values in your data
  //     const filterMapping = {
  //       Superadmin: "Super Admin",
  //       Owner: "Owner",
  //     };

  //     if (filterMapping[selectedFilter] !== undefined) {
  //       filterValue = filterMapping[selectedFilter];
  //     }

  //     setFilterStatus(filterValue);
  //   }
  //   setOpen(false);
  // };

  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const handleRowMouseEnter = (rowIndex) => {
    setHighlightedRow(rowIndex);
  };

  const handleRowMouseLeave = () => {
    setHighlightedRow(null);
  };

  const isHighlighted = (rowIndex) => {
    return rowIndex === highlightedRow;
  };

  const customFontStyle = {
    fontFamily: "Poppins",
  };
  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const direct = (url, name) => {
    const user = name.toLowerCase();
    navigate(`/viewPosting/${user}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getUtilityRequest(filterOption));

      //   setUserData(result);
    };

    fetchData();
  }, [filterOption]);

  const handleCloseModel = () => {
    setOpenModal(false);
    setReqId(null);
  };

  const handleOpenModel = (id) => {
    setOpenModal(true);
    setReqId(id);
  };

  return (
    <>
      <InnerSideBar setActivePage={handlePageChange} activePage={activePage} />
      {/* {data ? (
				<NoRequestFoundPage />
			) : ( */}
      <div className="p-10">
        <div className="utility-dashboard-container">
          <h1 className="font-poppins text-4xl font-bold dashboard-heading">
            Utilities Dashboard
          </h1>
          <div className="filter-button-container">
            <div className="relative">
              <Button
                ref={anchorRef}
                id="filter-dropdown-button"
                aria-controls={open ? "filter-dropdown-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
                style={{
                  backgroundColor: "#FE6100",
                  color: "white",
                  textTransform: "none",
                  display: "flex",
                  alignItems: "center",
                  width: "150px",
                  padding: "8px",
                }}
              >
                {/* <img
                  src="icons/AddUser.png"
                  alt="Filter Icon"
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "8px",
                  }}
                /> */}
                <IoFilter
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "8px",
                  }}
                />
                {filterOption || "Filter Requests"}
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom-start"
                          ? "left top"
                          : "left bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="filter-dropdown-menu"
                          aria-labelledby="filter-dropdown-button"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem
                            onClick={() => {
                              setFilterOption("all");
                              setOpen(false);
                            }}
                            style={{
                              fontSize: "16px",
                              minWidth: "150px",
                            }}
                          >
                            All
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setFilterOption("delete");
                              setOpen(false);
                            }}
                            style={{
                              fontSize: "16px",
                              minWidth: "150px",
                            }}
                          >
                            Delete
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setFilterOption("update");
                              setOpen(false);
                            }}
                            style={{
                              fontSize: "16px",
                              minWidth: "150px",
                            }}
                          >
                            Update
                          </MenuItem>
                          <MenuItem
                            onClick={() => {
                              setFilterOption("posting");
                              setOpen(false);
                            }}
                            style={{
                              fontSize: "16px",
                              minWidth: "150px",
                            }}
                          >
                            Posting
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </div>
        </div>
        <table className="min-w-full bg-white shadow-md rounded my-4 ml-10">
          <thead className="text-center">
            <tr style={customFontStyle}>
              <th className="bg-primary text-white p-4">Type</th>
              <th className="bg-primary text-white p-4">Request Type</th>
              <th className="bg-primary text-white p-4">Authority</th>
              <th className="bg-primary text-white p-4">State</th>
              <th className="bg-primary text-white p-4">Jurisdiction</th>
              <th className="bg-primary text-white p-4">Reporting office</th>
              <th className="bg-primary text-white p-4">Subscription</th>
              <th className="bg-primary text-white p-4">Designation</th>
              <th className="bg-primary text-white p-4">Name</th>
              <th className="bg-primary text-white p-4">Email</th>
              <th className="bg-primary text-white p-4">Username</th>
              <th className="bg-primary text-white p-4">Phone</th>
              <th className="bg-primary text-white p-4">Action</th>
            </tr>
          </thead>
          <tbody className="bg-D9D9D9 text-center">
            {utilityData &&
              utilityData.map((row, index) => (
                <tr
                  key={index}
                  // onMouseEnter={() => handleRowMouseEnter(index)}
                  // onMouseLeave={handleRowMouseLeave}
                  style={{
                    backgroundColor: isHighlighted(index)
                      ? "lightblue"
                      : "white",
                    fontFamily: "Poppins",
                  }}
                >
                  <td className="bg-D9D9D9 text-black p-7 shadow-md">
                    {row.type ? (
                      row.type
                    ) : (
                      <div className="flex items-center justify-center">
                        <GoDash />
                      </div>
                    )}
                  </td>
                  <td className="bg-D9D9D9 text-black p-2 shadow-md">
                    {row.request_type ? (
                      row.request_type
                    ) : (
                      <div className="flex items-center justify-center">
                        <GoDash />
                      </div>
                    )}
                  </td>
                  <td className="bg-D9D9D9 text-black p-2 shadow-md">
                    {row.authority ? (
                      row.authority
                    ) : (
                      <div className="flex items-center justify-center">
                        <GoDash />
                      </div>
                    )}
                  </td>
                  <td className="bg-D9D9D9 text-black p-2 shadow-md">
                    {row.state ? (
                      row.state
                    ) : (
                      <div className="flex items-center justify-center">
                        <GoDash />
                      </div>
                    )}
                  </td>
                  <td className="bg-D9D9D9 text-black p-2 shadow-md">
                    {row.jurisdiction ? (
                      row.jurisdiction
                    ) : (
                      <div className="flex items-center justify-center">
                        <GoDash />
                      </div>
                    )}
                  </td>
                  <td className="bg-D9D9D9 text-black p-2 shadow-md">
                    {row.reporting_office ? (
                      row.reporting_office
                    ) : (
                      <div className="flex items-center justify-center">
                        <GoDash />
                      </div>
                    )}
                  </td>
                  <td className="bg-D9D9D9 text-black p-2 shadow-md">
                    {row.subscription ? (
                      row.subscription
                    ) : (
                      <div className="flex items-center justify-center">
                        <GoDash />
                      </div>
                    )}
                  </td>
                  <td className="bg-D9D9D9 text-black p-2 shadow-md">
                    {row.designation ? (
                      row.designation
                    ) : (
                      <div className="flex items-center justify-center">
                        <GoDash />
                      </div>
                    )}
                  </td>
                  <td className="bg-D9D9D9 text-black p-2 shadow-md">
                    {row.name ? (
                      row.name
                    ) : (
                      <div className="flex items-center justify-center">
                        <GoDash />
                      </div>
                    )}
                  </td>
                  <td className="bg-D9D9D9 text-black p-2 shadow-md">
                    {row.email ? (
                      row.email
                    ) : (
                      <div className="flex items-center justify-center">
                        <GoDash />
                      </div>
                    )}
                  </td>
                  <td className="bg-D9D9D9 text-black p-2 shadow-md">
                    {row.username ? (
                      row.username
                    ) : (
                      <div className="flex items-center justify-center">
                        <GoDash />
                      </div>
                    )}
                  </td>
                  <td className="bg-D9D9D9 text-black p-2 shadow-md">
                    {row.phone ? (
                      row.phone
                    ) : (
                      <div className="flex items-center justify-center">
                        <GoDash />
                      </div>
                    )}
                  </td>

                  <td
                    className="bg-D9D9D9 p-4"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <button
                      className=" text-white font-bold py-1 px-2 rounded mr-2 hover:text-primary transition-colors duration-300 focus:outline-none focus:ring focus:border-blue-300"
                      // onClick={
                      //   () => direct("viewrequest", `${row.name}`)
                      // }
                      onClick={() => {
                        handleOpenModel(row.request_id);
                      }}
                      style={{
                        borderRadius: "4px",
                        padding: "8px 12px",
                      }}
                    >
                      <FaArrowUpRightFromSquare className="text-primary hover:shadow-sm hover:scale-125 transition-all 200ms ease-in" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {/* )} */}

      <Modal
        open={openModal}
        onClose={handleCloseModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Deletion ?
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h5">
            Please review once again before deleting !!!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="flex justify-between gap-x-2">
              <button
                className="bg-[#FE6100] text-white px-4 py-2 rounded-md"
                onClick={handleCloseModel}
              >
                Cancel
              </button>
              <button
                className="bg-[#FE6100] text-white px-4 py-2 rounded-md"
                onClick={() => {
                  dispatch(approveUtilityRequest(reqId));
                  handleCloseModel();
                }}
              >
                Confirm
              </button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default UtilitiesDashboardMain;
