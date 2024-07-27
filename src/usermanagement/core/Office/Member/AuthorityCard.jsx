import { formatDate } from "../../../utilsUser/formDate";
import { RiDeleteBin6Line } from "react-icons/ri";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ShowForPermission } from "../../../accesscontrol/ShowPermissionComponent";
import { ConfirmModal } from "../../../utilsUser/ConfirmModal";
import { useModal } from "../../../hooks/useModal";
import { selectAuth } from "../../../slices/authSlice";
// import { delelteAdminReq } from '../../../services/Operations/adminAPI';
import {
  deleteAdminByOwner,
  deleteAdminReqtoOwner,
} from "../../../services/Operations/adminAPI";
import { deleteOfficeReqtoOwner } from "../../../services/Operations/adminAPI";
import { useDispatch } from "react-redux";
import { modalText } from "../../../data/ModalArray";
import { Box, Modal, Typography } from "@mui/material";
import { deleteHeadByOwner } from "../../../services/Operations/headAPI";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 2,
  p: 4,
  fontWeight: "bold",
};

export const AuthorityCard = ({ admin, office, head }) => {
  const { isAuthenticated, userType } = useSelector(selectAuth);
  const { isOpen, openModal, closeModal, modalConfig } = useModal();
  const dispatch = useDispatch();

  const handleOpen = (action) => {
    let text = "";
    let onConfirm = null;
    const scenario = modalText.find((item) => item[action]);

    if (scenario) {
      text = scenario[action][userType];
      const onConfirmFunctionName = scenario[action].onConfirm;
      const functionLookup = {
        handleDelAdminReq,
        handleDelOfficeReq,
      };
      const selectedFunction = functionLookup[onConfirmFunctionName];
      if (typeof selectedFunction === "function") {
        onConfirm = selectedFunction;
      } else {
        console.error(`Function "${onConfirmFunctionName}" not found.`);
      }
    }

    openModal({
      text,
      onConfirm,
    });
  };

  // admin will request to owner to delete admin
  const handleDelAdminReq = () => {
    // api call hogi yaha on basis of userType
    if (isAuthenticated && userType === "Owner") {
    } else if (isAuthenticated && userType === "Admin") {
      dispatch(deleteAdminReqtoOwner(office.office_id));
    }

    closeModal();
  };

  const handleDelOfficeReq = () => {
    // api call hogi yaha on basis of userType
    if (isAuthenticated && userType === "Owner") {
    } else if (isAuthenticated && userType === "Admin") {
      dispatch(deleteOfficeReqtoOwner(office.office_id));
    }
    closeModal();
  };

  const [modelOpen, setmodelOpen] = useState(false);
  const [model2Open, setmodel2Open] = useState(false);
  const handleClose = () => {
    setmodelOpen(false);
  };

  const handleClose2 = () => {
    setmodel2Open(false);
  };

  return (
    <>
      <div className="h-fit flex  justify-center mt-6 mb-10">
        <ConfirmModal
          isOpen={isOpen}
          closeModal={closeModal}
          modalConfig={modalConfig}
        />
        <div>
          <ShowForPermission permission="VIEW_OFFICE">
            <div className="flex items-center justify-center">
              <div className="border-[1px] border-[#FE6100] min-h-64  w-[350px] rounded-md p-3 font-poppins gap-y-5">
                <div className="flex flex-col">
                  <div className="flex items-center justify-center">
                    <h2 className="font-bold text-xl mt-2">Office</h2>
                  </div>

                  <div className="flex items-center mt-2 gap-x-3">
                    <div className="flex w-1/2 gap-3  justify-between">
                      <p className="font-semibold">Office Name</p>
                      <p>:</p>
                    </div>
                    <p className="font-normal text-sm flex-1 justify-start">
                      {office?.name}
                    </p>
                  </div>

                  <div className="flex items-center mt-2 gap-x-3">
                    <div className="flex w-1/2 gap-3  justify-between">
                      <p className="font-semibold">Office Level</p>
                      <p>:</p>
                    </div>
                    <p className="font-normal text-sm flex-1 justify-start">
                      {office?.level}
                    </p>
                  </div>

                  <div className="flex items-center mt-2 gap-x-3">
                    <div className="flex w-1/2 gap-3  justify-between">
                      <p className="font-semibold">Registered:</p>
                      <p>:</p>
                    </div>
                    <p className="font-normal text-sm flex-1 justify-start">
                      {office?.registered ? "Yes" : "No"}
                    </p>
                  </div>

                  <div className="flex items-center mt-2 gap-x-3">
                    <div className="flex w-1/2 gap-3  justify-between">
                      <p className="font-semibold">Subscription</p>
                      <p>:</p>
                    </div>
                    <p className="font-normal text-sm flex-1 justify-start">
                      {office?.subscription}
                    </p>
                  </div>

                  <div className="flex justify-between mt-8">
                    <div className="flex items-center ">
                      <p className="text-sm font-semibold ">
                        {formatDate(office?.created_at)}
                      </p>
                    </div>

                    {userType === "Owner" ? null : (
                      <ShowForPermission permission="DELETE_OFFICE">
                        <div
                          className="cursor-pointer"
                          onClick={() => handleOpen("deleteOfficeReq")}
                        >
                          <RiDeleteBin6Line className="h-5 w-5 text-primary hover:shadow-sm hover:scale-125 transition-all 200ms ease-in mr-2" />
                        </div>
                      </ShowForPermission>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ShowForPermission>

          <div
            className="grid grid-cols-2 gap-x-20 gap-y-5 justify-center items-center"
            style={{ marginTop: "3rem" }}
          >
            {head && (
              <div className="flex items-center justify-center">
                <div className="border-[1px] border-[#FE6100] min-h-64  w-[400px] rounded-md p-3 font-poppins gap-y-5">
                  <div className="flex flex-col">
                    <div className="flex items-center justify-center">
                      <h2 className="font-bold text-xl mt-2 flex-1">
                        <div className="flex justify-center items-center">
                          Head
                        </div>
                      </h2>
                      <div className="floot-right">
                        <ShowForPermission permission="DELETE_HEAD_BY_OWNER">
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              setmodelOpen(true);
                            }}
                          >
                            <RiDeleteBin6Line className="h-5 w-5 text-primary hover:shadow-sm hover:scale-125 transition-all 200ms ease-in mr-2" />
                          </div>
                        </ShowForPermission>
                      </div>
                    </div>

                    <div className="flex items-center mt-2 gap-x-3">
                      <div className="flex w-1/2 gap-3  justify-between">
                        <p className="font-semibold">Full Name</p>
                        <p>:</p>
                      </div>
                      <p className="font-normal text-sm flex-1 justify-start">
                        {head?.name}
                      </p>
                    </div>
                    <ShowForPermission permission="VIEW_USERNAME">
                      <div className="flex items-center mt-2 gap-x-3">
                        <div className="flex w-1/2 gap-3  justify-between">
                          <p className="font-semibold">Username</p>
                          <p>:</p>
                        </div>
                        <p className="font-normal text-sm flex-1 justify-start">
                          {head?.username}
                        </p>
                      </div>
                    </ShowForPermission>

                    {/* <div className="flex items-center mt-2 gap-x-3">
										<div className="flex w-1/2 gap-3  justify-between">
											<p className="font-semibold">
												Role
											</p>
											<p>:</p>
										</div>
										<p className="font-normal text-sm flex-1 justify-start">
											{head?.role}
										</p>
									</div> */}

                    <div className="flex items-center mt-2 gap-x-3">
                      <div className="flex w-1/2 gap-3  justify-between">
                        <p className="font-semibold">Email ID</p>
                        <p>:</p>
                      </div>
                      <p className="font-normal text-sm flex-1 justify-start">
                        {head?.email}
                      </p>
                    </div>

                    <div className="flex items-center mt-2 gap-x-3">
                      <div className="flex w-1/2 gap-3  justify-between">
                        <p className="font-semibold">Phone No.</p>
                        <p>:</p>
                      </div>
                      <p className="font-normal text-sm flex-1 justify-start">
                        {head?.phone}
                      </p>
                    </div>

                    <div className="flex items-center mt-2 gap-x-3">
                      <div className="flex w-1/2 gap-3  justify-between">
                        <p className="font-semibold">DOB</p>
                        <p>:</p>
                      </div>
                      <p className="font-normal text-sm flex-1 justify-start">
                        {formatDate(head?.dob)}
                      </p>
                      <ShowForPermission permission="DELETE_HEAD">
                        <div className="cursor-pointer">
                          <RiDeleteBin6Line className="h-5 w-5 text-primary hover:shadow-sm hover:scale-125 transition-all 200ms ease-in mr-2" />
                        </div>
                      </ShowForPermission>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {admin && (
              <div className="border-[1px] border-[#FE6100] h-64 w-68 rounded-md p-3 font-poppins gap-y-5">
                <div className="flex flex-col">
                  <div className="flex items-center justify-center">
                    <h2 className="font-bold text-xl mt-2 flex-1">
                      <div className="flex justify-center items-center">
                        Admin
                      </div>
                    </h2>
                    <div className="floot-right">
                      <ShowForPermission permission="DELETE_ADMIN_BY_OWNER">
                        <div
                          className="cursor-pointer"
                          onClick={() => {
                            setmodel2Open(true);
                          }}
                        >
                          <RiDeleteBin6Line className="h-5 w-5 text-primary hover:shadow-sm hover:scale-125 transition-all 200ms ease-in mr-2" />
                        </div>
                      </ShowForPermission>
                    </div>
                  </div>

                  <div className="flex items-center mt-2 gap-x-3">
                    <div className="flex w-1/2 gap-3  justify-between">
                      <p className="font-semibold">Full Name</p>
                      <p>:</p>
                    </div>
                    <p className="font-normal text-sm flex-1 justify-start">
                      {admin?.name}
                    </p>
                  </div>
                  <ShowForPermission permission="VIEW_USERNAME">
                    <div className="flex items-center mt-2 gap-x-3">
                      <div className="flex w-1/2 gap-3  justify-between">
                        <p className="font-semibold">Username</p>
                        <p>:</p>
                      </div>
                      <p className="font-normal text-sm flex-1 justify-start">
                        {admin?.username}
                      </p>
                    </div>
                  </ShowForPermission>

                  {/* <div className="flex items-center mt-2 gap-x-3">
									<div className="flex w-1/2 gap-3  justify-between">
										<p className="font-semibold">Role</p>
										<p>:</p>
									</div>
									<p className="font-normal text-sm flex-1 justify-start">
										{admin?.role}
									</p>
								</div> */}

                  <div className="flex items-center mt-2 gap-x-3">
                    <div className="flex w-1/2 gap-3  justify-between">
                      <p className="font-semibold">Email ID</p>
                      <p>:</p>
                    </div>
                    <p className="font-normal text-sm flex-1 justify-start">
                      {admin?.email}
                    </p>
                  </div>

                  <div className="flex items-center mt-2 gap-x-3">
                    <div className="flex w-1/2 gap-3  justify-between">
                      <p className="font-semibold">Phone No</p>
                      <p>:</p>
                    </div>
                    <p className="font-normal text-sm flex-1 justify-start">
                      {admin?.phone}
                    </p>
                  </div>

                  <div className="flex items-center mt-2 gap-x-3">
                    <div className="flex w-1/2 gap-3  justify-between">
                      <p className="font-semibold">DOB</p>
                      <p>:</p>
                    </div>
                    <p className="font-normal text-sm flex-1 justify-start">
                      {formatDate(admin?.dob)}
                    </p>
                    <ShowForPermission permission="DELETE_ADMIN">
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          handleOpen("deleteadminreq");
                        }}
                      >
                        <RiDeleteBin6Line className="h-5 w-5 text-primary hover:shadow-sm hover:scale-125 transition-all 200ms ease-in mr-2" />
                      </div>
                    </ShowForPermission>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* open conformation model for delete head */}

      <Modal
        open={modelOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete the Head ?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="flex justify-between gap-x-2">
              <button
                className="bg-[#FE6100] text-white px-4 py-2 rounded-md"
                onClick={handleClose}
              >
                No
              </button>
              <button
                className="bg-[#FE6100] text-white px-4 py-2 rounded-md"
                onClick={() => {
                  dispatch(deleteHeadByOwner(head.username));
                  handleClose();
                }}
              >
                Yes
              </button>
            </div>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={model2Open}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete the Admin ?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="flex justify-between gap-x-2">
              <button
                className="bg-[#FE6100] text-white px-4 py-2 rounded-md"
                onClick={handleClose2}
              >
                No
              </button>
              <button
                className="bg-[#FE6100] text-white px-4 py-2 rounded-md"
                onClick={() => {
                  dispatch(deleteAdminByOwner(admin.username));
                  handleClose2();
                }}
              >
                Yes
              </button>
            </div>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
