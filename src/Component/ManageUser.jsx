// ManageUser.js
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import InnerSideBar from "./InnerSideBar";
import FilterIcon from "../assets/img/FilterIcon.png";
import { CurrentPlan } from "./Utils/CurrentPlan";
import { UserProfileIcons } from "../assets/IconArray";
import CloseButton from "./Utils/CloseButton";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LoginStatus } from "./Utils/LoginStatus";
import { selectProfile } from "../usermanagement/slices/profileSlice";
import {
  deleteVerifedUser,
  getAllVerifiedUserData,
} from "../usermanagement/services/Operations/profileAPI";
import { Spinner } from "../utils/Spinner";
import { ShowForPermission } from "../usermanagement/accesscontrol/ShowPermissionComponent";
// limit box
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useModal } from "../usermanagement/hooks/useModal";
import { ConfirmModal } from "../usermanagement/utilsUser/ConfirmModal";
import { modalText } from "../usermanagement/data/ModalArray";
import { selectAuth } from "../usermanagement/slices/authSlice";
import { toast } from "react-hot-toast";
import { Breadcrumbs, Link } from "@mui/material";

const ManageUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activePage, setActivePage] = useState("settings");
  const [userData, setUserData] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [clickedButton, setClickedButton] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { loading } = useSelector(selectProfile);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPagesCount, setTotalPagesCount] = useState(0);
  const [apiCallCount, setApiCallCount] = useState(0);
  const { userType } = useSelector(selectAuth);
  const [refresh, setRefresh] = useState(false);

  // modal data
  const { isOpen, openModal, closeModal, modalConfig } = useModal();

  // modal
  const handleOpen = (action, username) => {
    let text = "";
    let onConfirm = null;
    const scenario = modalText.find((item) => item[action]);

    if (scenario) {
      text = scenario[action][userType];
      const onConfirmFunctionName = scenario[action].onConfirm;
      const functionLookup = {
        handleDeleteVerifiedUser,
      };
      const selectedFunction = functionLookup[onConfirmFunctionName];
      if (typeof selectedFunction === "function") {
        onConfirm = () => selectedFunction(username);
      } else {
        console.error(`Function "${onConfirmFunctionName}" not found.`);
      }
    }
    openModal({
      text,
      onConfirm,
    });
  };

  const handleDeleteVerifiedUser = async (username) => {
    const data = await dispatch(deleteVerifedUser(username));
    if (data) {
      setRefresh(!refresh);
      closeModal();
    } else {
      toast.error("Failed to Delete User");
      closeModal();
    }
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleButtonClick = (buttonName) => {
    setClickedButton(buttonName);
  };

  const navigateToProfile = (userName, firstName, lastName) => {
    let ByAuthority = true;
    navigate(`/usermanagement/jeprofile/${userName}`, {
      state: { userName, ByAuthority },
    });
  };

  const customFontStyle = {
    fontFamily: "Poppins",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await dispatch(
          getAllVerifiedUserData(limit, skip, searchQuery)
        );
        setUserData(result?.allVerifiedUsers);
        calculateTotalPages(result?.totalUserCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [limit, skip, searchQuery, apiCallCount, refresh]);

  // limit changes
  useEffect(() => {
    setCurrentPage(1);
    setSkip(0);
    setApiCallCount(0);
  }, [limit, searchQuery]);

  const calculateTotalPages = (count) => {
    setTotalPagesCount(Math.ceil(count / limit));
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePrevPageChange = (event) => {
    if (currentPage > 1) {
      setSkip(limit * (currentPage - 2));
      setCurrentPage(currentPage - 1);
      setApiCallCount(apiCallCount + 1);
    }
  };

  const handleNextPageChange = (event) => {
    if (currentPage < totalPagesCount) {
      setSkip(limit * currentPage);
      setCurrentPage(currentPage + 1);
      setApiCallCount(apiCallCount + 1);
    }
  };

  // search functionlity of wt
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredTableBody = userData?.map((user, index) => (
    <tr key={index} className={`cursor-point hover:bg-gray-300}`}>
      <td
        className="bg-D9D9D9 text-black p-4  border-r border-gray-300"
        style={customFontStyle}
      >
        {user.Name}
      </td>
      <td
        className="bg-D9D9D9 text-black p-4  border-r border-gray-300"
        style={customFontStyle}
      >
        {user.role}
      </td>
      <td
        className="bg-D9D9D9 text-black p-4  border-r border-gray-300 text-left"
        style={customFontStyle}
      >
        {user.Username}
      </td>
      <td
        className="bg-D9D9D9 text-black p-4  border-r border-gray-300 text-left"
        style={customFontStyle}
      >
        {user?.TypeOfUser ? user?.TypeOfUser : "N/A"}
      </td>
      <td
        className="bg-D9D9D9 text-black p-4  border-r border-gray-300 text-left"
        style={customFontStyle}
      >
        {user?.TypeOfGovt ? user?.TypeOfGovt : "N/A"}
      </td>
      <td
        className="bg-D9D9D9 text-black p-4  border-r border-gray-300"
        style={customFontStyle}
      >
        <div className="flex gap-x-4 justify-center items-center box-content  ">
          <div
            className="h-4 w-4 cursor-pointer"
            onClick={() => {
              navigateToProfile(user.Username, user.FirstName, user.LastName);
            }}
          >
            <FaArrowUpRightFromSquare className="text-primary hover:shadow-sm hover:scale-125 transition-all 200ms ease-in" />
          </div>
          <ShowForPermission permission="DELETE_VERIFY_USER">
            <div
              className="cursor-pointer"
              onClick={() => handleOpen("deleteVerifedUser", user.Username)}
            >
              <RiDeleteBin6Line className="h-5 w-5 text-primary hover:shadow-sm hover:scale-125 transition-all 200ms ease-in" />
            </div>
          </ShowForPermission>
        </div>
      </td>
    </tr>
  ));

  function handleClick(event) {
    event.preventDefault();
    const url = event.currentTarget.getAttribute('href');
    navigate(url);
  }
  

  return (
    <>
      <div className="flex ">
        <div>
          <ConfirmModal
            isOpen={isOpen}
            closeModal={closeModal}
            modalConfig={modalConfig}
          />
        </div>
        <div className="">
          <InnerSideBar
            setActivePage={handlePageChange}
            activePage={activePage}
          />
        </div>

        <div className=" ml-20 flex-1 flex-col">
          <div className="mx-12 mt-2">
            <div role="presentation">
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  underline="hover"
                  color="inherit"
                  href="/home"
                  onClick={handleClick}
                >
                  Home
                </Link>
                <Link
                  underline="hover"
                  color="text.primary"
                  // href="/usermanagement"
                  // onClick={handleClick}
                >
                  Manage Users
                </Link>
              </Breadcrumbs>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div>
                <h1
                  className="font-Poppins text-3xl font-bold leading-48 tracking-normal text-left"
                  style={customFontStyle}
                >
                  Manage Users
                </h1>
                <hr className="w-[300px] mt-4 ml-[2px] h-[2px] bg-black"></hr>

                <h4
                  className="font-Poppins text-[16px] font-normal ml-[-5px]  tracking-normal text-left text-gray-400 p-2"
                  style={customFontStyle}
                >
                  Manage Filter and Search for all Users
                </h4>
              </div>
              <div className="flex  gap-3 items-center justify-center">
                <ShowForPermission permission="VIEW_PLAN">
                  <div className="">
                    <CurrentPlan />
                  </div>
                </ShowForPermission>
                <div className=" ml-[23px] ">
                  <LoginStatus />
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center  mt-[40px] mr-[30px]">
              <div className="flex justify-center">
                <div className="search__container bg-gray-200 w-[380px] rounded-lg">
                  <input
                    className="search__input w-[380px] px-6 py-3 font-poppins bg-transparent transition-transform duration-250 ease-in-out text-base leading-6 rounded-lg focus:outline-none"
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>

                {/* trigger above query on search icon */}
                <img
                  src={UserProfileIcons.search}
                  alt="Search"
                  className="relative h-6 w-6 top-[11px] right-[42px] cursor-pointer"
                />

                <button
                  className="ml-4 bg-primary px-4 py-3 text-white rounded-lg flex items-center"
                  onClick={openDialog}
                  style={customFontStyle}
                >
                  <img src={FilterIcon} alt="Icon" className="mr-2 h-5 w-5" />
                  Filter Status
                </button>
                {isDialogOpen && (
                  <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 p-7 font-poppins">
                    <div className="bg-white p-8 rounded-lg shadow-md relative ">
                      <button
                        className="absolute top-2 right-2 text-gray-500 cursor-pointer"
                        onClick={closeDialog}
                      >
                        <CloseButton />
                      </button>

                      <h3 className="text-lg font-semibold mb-4 font-poppins">
                        Access Level
                      </h3>
                      <div className="flex mb-4 space-x-4">
                        <button
                          style={{
                            backgroundColor: "white",
                            padding: "8px 16px",
                            margin: "4px",
                            border: "1px solid #ccc",
                            cursor: "pointer",
                            ...(clickedButton === "Owner" && {
                              backgroundColor: "#FE6100",
                              color: "White",
                            }),
                          }}
                          className={`bg-white px-4 py-2 text-primary rounded-lg border-2 border-[#FE6100] ${
                            clickedButton === "Owner"
                              ? "bg-primary text-white"
                              : ""
                          } transition-all duration-200 ease-in-out`}
                          onClick={() => handleButtonClick("Owner")}
                        >
                          Owner
                        </button>

                        <button
                          style={{
                            backgroundColor: "white",
                            padding: "8px 16px",
                            margin: "4px",
                            border: "1px solid #ccc",
                            cursor: "pointer",
                            ...(clickedButton === "Admin" && {
                              backgroundColor: "#FE6100",
                              color: "White",
                            }),
                          }}
                          className={`bg-white px-4 py-2 text-primary rounded-lg border-2 border-[#FE6100] ${
                            clickedButton === "Admin"
                              ? "bg-primary text-white"
                              : ""
                          } transition-all duration-200 ease-in-out`}
                          onClick={() => handleButtonClick("Admin")}
                        >
                          Admin
                        </button>
                        <button
                          style={{
                            backgroundColor: "white",
                            padding: "8px 16px",
                            margin: "4px",
                            border: "1px solid #ccc",
                            cursor: "pointer",
                            ...(clickedButton === "Member" && {
                              backgroundColor: "#FE6100",
                              color: "White",
                            }),
                          }}
                          className={`bg-white px-4 py-2 text-primary rounded-lg border-2 border-[#FE6100] ${
                            clickedButton === "Member"
                              ? "bg-primary text-white"
                              : ""
                          } transition-all duration-200 ease-in-out`}
                          onClick={() => handleButtonClick("Member")}
                        >
                          Member
                        </button>
                      </div>
                      <h3 className="text-lg font-semibold mb-4 font-poppins">
                        Privileges
                      </h3>

                      <div className="flex  mb-4 space-x-4">
                        <button
                          style={{
                            backgroundColor: "white",
                            padding: "8px 16px",
                            margin: "4px",
                            border: "1px solid #ccc",
                            cursor: "pointer",
                            ...(clickedButton === "Platform Access" && {
                              backgroundColor: "#FE6100",
                              color: "White",
                            }),
                          }}
                          className={`bg-white px-4 py-2 text-primary rounded-lg border-2 border-[#FE6100] ${
                            clickedButton === "Platform Access"
                              ? "bg-primary text-white"
                              : ""
                          } transition-all duration-200 ease-in-out`}
                          onClick={() => handleButtonClick("Platform Access")}
                        >
                          Platform Access
                        </button>

                        <button
                          style={{
                            backgroundColor: "white",
                            padding: "8px 16px",
                            margin: "4px",
                            border: "1px solid #ccc",
                            cursor: "pointer",
                            ...(clickedButton === "Data Collection Access" && {
                              backgroundColor: "#FE6100",
                              color: "White",
                            }),
                          }}
                          className={`bg-white px-4 py-2 text-primary rounded-lg border-2 border-[#FE6100] ${
                            clickedButton === "Data Collection Access"
                              ? "bg-primary text-white"
                              : ""
                          } transition-all duration-200 ease-in-out `}
                          onClick={() =>
                            handleButtonClick("Data Collection Access")
                          }
                        >
                          Data Collection Access
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* limit */}
              <div className="relative ml-30">
                <Box
                  sx={{
                    minWidth: 120,
                    // borderColor: 'orange',
                    // borderWidth: 2,
                    // borderStyle: 'solid',
                  }}
                >
                  <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel
                      id="demo-simple-select-label"
                      sx={{
                        backgroundColor: "white",
                        paddingLeft: 2,
                      }}
                    >
                      Limit
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={limit}
                      label="Limit"
                      onChange={handleLimitChange}
                      sx={{
                        backgroundColor: "white",
                      }}
                    >
                      <MenuItem
                        value={10}
                        sx={{
                          backgroundColor: "white",
                        }}
                      >
                        10
                      </MenuItem>
                      <MenuItem
                        value={20}
                        sx={{
                          backgroundColor: "white",
                        }}
                      >
                        20
                      </MenuItem>
                      <MenuItem
                        value={50}
                        sx={{
                          backgroundColor: "white",
                        }}
                      >
                        50
                      </MenuItem>
                      <MenuItem
                        value={100}
                        sx={{
                          backgroundColor: "white",
                        }}
                      >
                        100
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </div>

            <table className=" h-fit min-w-full mb-20 bg-white shadow-md rounded my-6 border border-collapse font-poppins ">
              <thead className="text-center">
                <tr>
                  <th
                    className="bg-primary text-white p-4 border border-white"
                    style={customFontStyle}
                  >
                    Name
                  </th>
                  <th
                    className="bg-primary text-white p-4 border border-white"
                    style={customFontStyle}
                  >
                    Role
                  </th>
                  <th
                    className="bg-primary text-white p-4 border border-white"
                    style={customFontStyle}
                  >
                    Email
                  </th>
                  <th
                    className="bg-primary text-white p-4 border border-white"
                    style={customFontStyle}
                  >
                    Type Of User
                  </th>

                  <th
                    className="bg-primary text-white p-4 border border-white"
                    style={customFontStyle}
                  >
                    Type Of Govt
                  </th>
                  <th
                    className="bg-primary text-white p-4 border border-white"
                    style={customFontStyle}
                  >
                    Manage Profile
                  </th>
                </tr>
              </thead>

              <tbody className="bg-D9D9D9 text-center justify-center">
                {loading ? (
                  <tr>
                    <td colSpan="6">
                      <Spinner />
                    </td>
                  </tr>
                ) : userData?.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6 "
                      className="font-poppins h-14 font-bold text-xl"
                    >
                      No data available
                    </td>
                  </tr>
                ) : (
                  filteredTableBody
                )}
              </tbody>
            </table>
          </div>

          {userData?.length === 0 || userData === undefined ? null : (
            <div className="fixed bottom-0 w-[100%]   bg-[#6d44fc] text-white  border-t-[1.5px] border-t-gray-500">
              <div className="flex items-center gap-x-3 w-full  mx-auto bg-slate-100 py-1 justify-evenly">
                <div className="flex-1">
                  <button
                    onClick={() => handlePrevPageChange()}
                    className={`h-[2.2rem] w-[6rem] border-2 font-poppins bg-[#FE6100] text-sm border-gray-300 py-1 px-4 rounded-md ml-[10px] ${
                      currentPage > 1 ? "" : "invisible"
                    }`}
                  >
                    Previous
                  </button>
                </div>
                <p className="flex-1 text-black text-center font-poppins text-sm font-semibold  mr-[80px]">
                  Page {currentPage} of{" "}
                  {loading ? <span>Loading...</span> : totalPagesCount}
                </p>
                <div className="flex-1 text-right">
                  <button
                    onClick={() => handleNextPageChange()}
                    className={`h-[2.2rem] w-[96px] border-2 font-poppins bg-[#FE6100] text-sm border-gray-300 py-1 px-4 rounded-md mr-[95px] ${
                      currentPage < totalPagesCount ? "" : "invisible"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageUser;
