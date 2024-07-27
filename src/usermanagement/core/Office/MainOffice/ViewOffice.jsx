import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import InnerSideBar from "../../../../Component/InnerSideBar";
import TempHeader from "../../../../Component/TempHeader";
import DropdownBlock from "../../../../Component/Utils/DropdownBlock";
import { levelArray } from "../../../data/constantdata";
import AssignAdmin from "../Admin/AssignAdmin";
import AssignHead from "../Head/AssignHead";
import {
  getRegisteredOffices,
  getStateList,
} from "../../../services/Operations/officeAPI";
import { useSelector } from "react-redux";
import { Spinner } from "../../../../utils/Spinner";
import { formatDate } from "../../../utilsUser/formDate";
import { CreateOffice } from "./CreateOffice";
import { ShowForPermission } from "../../../accesscontrol/ShowPermissionComponent";
import OfficeList from "./OfficeList";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { FaPlus } from "react-icons/fa";

export const ViewOffice = () => {
  // States
  const dispatch = useDispatch();
  const [assignAdminDialog, setAssignAdminDialogOpen] = useState(false);
  const [assignHeadDialog, setAssignHeadDialogOpen] = useState(false);
  const [createOfficeDialog, setCreateOfficeDialog] = useState(false);
  const { loading } = useSelector((state) => state.office);
  const { officesData } = useSelector((state) => state.office);
  const [selectedOfficeId, setSelectedOfficeId] = useState(null);

  const [selectedHeadId, setSelectedHeadId] = useState(null);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [activePage, setActivePage] = useState("office");
  const [stateList, setStateList] = useState([]);
  const [level, setLevel] = useState(levelArray);
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [registerdCheck, setRegisterdCheck] = useState(false);

  // use Effect
  useEffect(() => {
    const fetchData = async () => {
      // called to offices
      dispatch(getRegisteredOffices(selectedLevel, registerdCheck));
    };

    fetchData();
  }, [dispatch, level, registerdCheck]);

  const closeAssignAdminDialog = () => {
    setAssignAdminDialogOpen(false);
  };

  const closeAssignHeadDialog = () => {
    setAssignHeadDialogOpen(false);
  };

  const openAssignHeadDialog = (officeId, headId) => {
    setAssignHeadDialogOpen(true);
    setSelectedOfficeId(officeId);
    setSelectedHeadId(headId); // Assuming you have a state variable to store the selected office_id
  };

  const openAssignAdminDialog = (officeId, adminId) => {
    setAssignAdminDialogOpen(true);
    setSelectedOfficeId(officeId);
    setSelectedAdminId(adminId); // Assuming you have a state variable to store the selected office_id
  };

  const handleCheckboxChange = (_, index) => {
    const updatedData = level.map((item, i) => ({
      ...item,
      checked: i === index ? !item.checked : false,
    }));
    setLevel(updatedData);
    setSelectedLevel(updatedData[index].name);
  };

  const handleRegisterdCheck = (e) => {
    setRegisterdCheck(e.target.checked);
  };

  const closeCreateOffice = () => {
    setCreateOfficeDialog(false);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const getStateListCall = async () => {
    try {
      const response = await dispatch(getStateList());

      setStateList(response.state);
    } catch (error) {
      console.error("Error Fetching Office names", error);
    }
  };

  return (
    <>
      {/* {loading ? (
        <Spinner />
      ) : ( */}
      <>
        {assignHeadDialog && (
          <div className="AssignHead-dialog-container">
            <div className="AssignHead-dialog-overlay">
              <div className="AssignHead-dialog-box">
                {loading ? (
                  <Spinner />
                ) : (
                  <AssignHead
                    closeAssignHeadDialog={closeAssignHeadDialog}
                    selectedOfficeId={selectedOfficeId}
                    selectedHeadId={selectedHeadId}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        {assignAdminDialog && (
          <div className="AssignAdmin-dialog-container">
            <div className="AssignAdmin-dialog-overlay">
              <div className="AssignAdmin-dialog-box">
                {loading ? (
                  <Spinner />
                ) : (
                  <AssignAdmin
                    closeAssignAdminDialog={closeAssignAdminDialog}
                    selectedOfficeId={selectedOfficeId}
                    selectedAdminId={selectedAdminId}
                  />
                )}
              </div>
            </div>
          </div>
        )}
        {createOfficeDialog && (
          <CreateOffice onClose={closeCreateOffice} stateList={stateList} />
        )}

        <div className="flex">
          <section className="w-20">
            <InnerSideBar
              setActivePage={handlePageChange}
              activePage={activePage}
            />
          </section>
          <section className=" flex-1 flex-col h-screen  ">
            <div>
              <TempHeader />
            </div>
            <div className="flex flex-col  h-fit">
              <div className="h-18 flex items-center justify-between">
                <span className="  w-[20%] font-poppins font-bold  text-2xl ml-8 flex-col">
                  <p>Office Details</p>
                  <div className="border-[0.5px] border-black w-[165px] "></div>
                </span>
                <div className=" flex  items-center mx-5 box gap-x-1">
                  <div className="flex items-center">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox
                            sx={{
                              color: "#E55B0D",
                              "&.Mui-checked": {
                                color: "#E55B0D",
                              },
                            }}
                            checked={registerdCheck}
                            onChange={(e) => {
                              handleRegisterdCheck(e);
                            }}
                          />
                        }
                        label="Registered Office"
                      />
                    </FormGroup>
                  </div>
                  <div className="">
                    <DropdownBlock
                      heading={"Select Level"}
                      options={level}
                      handleCheckboxChange={handleCheckboxChange}

                      // category={'Select Level'}
                    />
                  </div>
                  <ShowForPermission permission="CREATE_OFFICE">
                    <button
                      className="flex justify-center items-center bg-[#FE6100] text-xs font-poppins border-[1px] border-[#FE6100] font-semibold p-2 rounded-md  text-white hover:bg-white hover:border-[1px] hover:border-[#FE6100] hover:text-black transition-all 200ms ease-in"
                      onClick={() => {
                        setCreateOfficeDialog(true);
                        getStateListCall();
                      }}
                    >
                      <FaPlus className="mr-2" />
                      Create Office{" "}
                    </button>
                  </ShowForPermission>
                </div>
              </div>
              {loading ? (
                <Spinner />
              ) : (
                <OfficeList
                  loading={loading}
                  officesData={officesData}
                  // deleteOffice={deleteOfficeCall}
                  openAssignHeadDialog={openAssignHeadDialog}
                  openAssignAdminDialog={openAssignAdminDialog}
                  formatDate={formatDate}
                />
              )}
            </div>
          </section>
        </div>
      </>
      {/* // )} */}
    </>
  );
};
