//AssignHead.js

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import CloseButton from "../../../../Component/Utils/CloseButton";
import DatePicker from "../../../utilsUser/DatePicker";

import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { assignHead } from "../../../services/Operations/headAPI";
import { Spinner } from "../../../../utils/Spinner";

import ConfirmationModal from "./ConfirmationModal";
import IconButton from "@mui/material/IconButton";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { getRegisteredOffices } from "../../../services/Operations/officeAPI";


const AssignHead = ({
  closeAssignHeadDialog,
  selectedOfficeId,
  selectedHeadId,
}) => {

  const [submittedData, setSubmittedData] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [phoneWarning, setPhoneWarning] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      office_id: selectedOfficeId || "", // Update office_id if selectedOfficeId changes
    }));
  }, [selectedOfficeId]);

  const [formData, setFormData] = useState({
    office_id: selectedOfficeId,
    name: "",
    username: "",
    role: "Head",
    email: "",
    phone: "",
    dob: "",
    password: "",
  });

  const { office_id, name, username, role, email, phone, dob, password } =
    formData;

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      dob: date,
    }));
  };

  const handleChange = (field) => (event) => {
    let value = event.target.value;

    if (field === "phone") {
      // Remove non-numeric characters from the phone number
      value = value.replace(/\D/g, "");

      if (value.length > 10) {
        setPhoneWarning("Phone number should not exceed 10 digits");
        value = value.slice(0, 10);
      } else {
        setPhoneWarning("");
      }
    }
    if (field === "confirmPassword") {
      setConfirmPassword(value);

      // Check if passwords match
      if (formData.password !== value) {
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const alphaRegex = /^[A-Za-z]+$/;

    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    if (field === "email") {
      if (!emailRegex.test(value)) {
        setEmailError("Enter a valid email address");
      } else {
        setEmailError("");
      }
    }

    if (field === "password") {
      setConfirmPassword("");
    }

    if (field === "confirmPassword") {
      setConfirmPassword(value);
    }

    if (field === "name") {
      value = value.replace(/[^A-Za-z\s]/g, "");
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }

    if (field === "username") {
      value = value.replace(/[^A-Za-z0-9\s]/g, "");

      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  const handleSubmit = () => {

    if (emailError) {
      alert("Please fill in a valid Email ID before submitting.");
      return;
    }

    if (passwordError) {
      alert("Please check if the Password and Confirm Password is same.");
      return;
    }

    if (phoneWarning) {
      alert("The phone Number should not be more than 10 digits.");
      return;
    }

    for (const key in formData) {
      if (formData[key] === "") {
        alert("Please fill in all fields before submitting.");
        return;
      }
    }

    if (selectedHeadId) {
      setShowConfirmationModal(true);
    } else {
      setBackendData();
    }
  };

  const setBackendData = async (vari) => {
    setLoading(true);
    try {
      const reassign = vari;
      dispatch(
        assignHead(
          office_id,
          name,
          username,
          role,
          email,
          phone,
          dob,
          password,
          reassign,
          navigate
        )
      );
      closeAssignHeadDialog();
      dispatch(getRegisteredOffices(
        "All",
        "false"
      ))
    } catch (error) {
      console.error("Dispatch Error:", error);
      alert("Failed to submit data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmationYes = () => {
    setShowConfirmationModal(false);
    setBackendData(true);
  };

  const handleConfirmationNo = () => {
    setShowConfirmationModal(false);
  };

  const clearData = () => {
    setFormData((prevData) => ({
      ...prevData,
      name: "",
      username: "",
      email: "",
      phone: "",
      dob: "",
      password: "",
    }));
    setEmailError("");
  };

  useEffect(() => {
    clearData();
  }, [submittedData]);
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const closeDialog = () => {
    setIsDialogOpen(false);
    closeAssignHeadDialog();
  };

  return (
    <>
      {loading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner />
        </div>
      )}

      <Modal
        isOpen={isDialogOpen}
        onRequestClose={closeDialog}
        contentLabel="Assign Head Dialog"
        style={{
          overlay: {
            backgroundColor: "rgba(255, 255, 255, 0.1)", // Adjust the overlay background color and opacity
            backdropFilter: "blur(4px)",
            zIndex: 100,
          },
          content: {
            width: "63vw",
            maxHeight: "90vh",
            margin: "auto",
            overflow: "hidden", // Ensure the modal itself doesn't have scrolling
            borderRadius: "25px",
          },
        }}
      >
        <div
          className="mx-auto mt-[2vw] dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 relative"
          style={{
            width: "60vw",
            height: "55vh",
            backgroundColor: "white",
          }}
        >
          <div className="absolute mt-[-30px] right-[-5px] w-8 h-8 flex items-center justify-center">
            <div className=" cursor-pointer" onClick={closeAssignHeadDialog}>
              <CloseButton />
            </div>
          </div>
          <div className="flex mt-[-1rem] justify-center items-center">
            <div>
              <h2 className="font-poppins text-left text-2xl font-bold ml-6">
                {selectedHeadId ? "ReAssign Head" : "Assign Head"}
              </h2>
            </div>
          </div>

          <div className="flex flex-col font-poppins mt-[1vw] border-2 border-orange-500 rounded-lg w-[60vw] h-auto">
            <div className="h-10 mb-[3vw]"></div>
            <div
              className="mt-[-2rem] ml-10 text-left text-lg"
              style={{
                fontWeight: 700,
                lineHeight: "24px",
                letterSpacing: "0em",
                color: "#00000",
              }}
            >
              Enter your details
            </div>
            <div className="grid grid-cols-2 gap-2 justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <label
                  className="flex mb-2 text-black font-semibold item-left text-sm"
                  htmlFor="text-field"
                  style={{ marginBottom: "-0.1rem", width: "75%" }}
                >
                  Office ID
                </label>
                <TextField
                  label=""
                  variant="outlined"
                  size="small"
                  value={formData.office_id}
                  onChange={handleChange("office_id")}
                  placeholder=""
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    width: "75%",
                    height: "60%",
                    color: "black",
                  }}
                />
              </div>

              <div className="flex flex-col justify-center items-center">
                <label
                  className="flex mb-2 text-black font-semibold item-left text-sm"
                  htmlFor="text-field"
                  style={{ marginBottom: "-0.1rem", width: "75%" }}
                >
                  Full Name
                </label>
                <TextField
                  label=""
                  variant="outlined"
                  size="small"
                  value={formData.name}
                  onChange={handleChange("name")}
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    width: "75%",
                    height: "60%",
                    color: "black",
                  }}
                />
              </div>

              <div className="flex flex-col justify-center items-center">
                <label
                  className="w-3/4 flex mb-2 text-black font-semibold item-left text-sm"
                  htmlFor="text-field"
                  style={{
                    marginBottom: "-0.1rem",
                    width: "75%",
                  }}
                >
                  Username
                </label>
                <TextField
                  label=""
                  variant="outlined"
                  size="small"
                  value={formData.username}
                  onChange={handleChange("username")}
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    width: "75%",
                    height: "60%",
                    color: "black",
                  }}
                />
              </div>

              <div className="flex flex-col justify-center items-center">
                <label
                  className="flex mb-2 text-black font-semibold item-left text-sm"
                  htmlFor="text-field"
                  style={{ marginBottom: "-0.1rem", width: "75%" }}
                >
                  Role
                </label>
                <TextField
                  label=""
                  variant="outlined"
                  size="small"
                  value={formData.role}
                  onChange={handleChange("role")}
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    width: "75%",
                    height: "60%",
                    color: "black",
                  }}
                />
              </div>

              <div className="flex flex-col justify-center items-center">
                <label
                  className="flex mb-2 text-black font-semibold item-left text-sm"
                  htmlFor="text-field"
                  style={{ marginBottom: "-0.1rem", width: "75%" }}
                >
                  Email ID
                </label>
                <TextField
                  label=""
                  variant="outlined"
                  size="small"
                  value={formData.email}
                  onChange={handleChange("email")}
                  error={Boolean(emailError)}
                  helperText={emailError}
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    width: "75%",
                    height: "60%",
                    color: "black",
                  }}
                />
              </div>

              <div className="flex flex-col justify-center items-center">
                <label
                  className="flex mb-2 text-black font-semibold item-left text-sm"
                  htmlFor="text-field"
                  style={{ marginBottom: "-0.1rem", width: "75%" }}
                >
                  Phone No.
                </label>
                <TextField
                  label=""
                  variant="outlined"
                  size="small"
                  value={formData.phone}
                  onChange={handleChange("phone")}
                  error={Boolean(phoneWarning)}
                  helperText={phoneWarning}
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    width: "75%",
                    height: "60%",
                    color: "black",
                  }}
                />
              </div>

              <div className="flex flex-col justify-center items-center">
                <label
                  className="flex mb-2 text-black font-semibold item-left text-sm"
                  htmlFor="text-field"
                  style={{ marginBottom: "-0.1rem", width: "75%" }}
                >
                  DOB
                </label>
                <div className="cursor-pointer" style={{ width: "75%" }}>
                  <DatePicker onDateChange={handleDateChange} />
                </div>
              </div>

              <div className="flex flex-col justify-center items-center">
                <label
                  className="w-3/4 flex mb-2 text-black font-semibold item-left text-sm"
                  htmlFor="text-field"
                ></label>
              </div>

              <div className="flex flex-col justify-center items-center">
                <label
                  className="flex mb-2 text-black font-semibold item-left text-sm"
                  htmlFor="text-field"
                  style={{ marginBottom: "-0.1rem", width: "75%" }}
                >
                  Password
                </label>
                <TextField
                  label=""
                  variant="outlined"
                  size="small"
                  value={formData.password}
                  onChange={handleChange("password")}
                  type={passwordVisible ? "text" : "password"}
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    width: "75%",
                    height: "60%",
                    color: "black",
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        style={{ marginLeft: "-1rem" }} // Adjust the margin as needed
                      >
                        {passwordVisible ? <IoMdEye /> : <IoMdEyeOff />}
                      </IconButton>
                    ),
                  }}
                />
              </div>

              <div className="flex flex-col justify-center items-center">
                <label
                  className="flex mb-2 text-black font-semibold item-left text-sm"
                  htmlFor="text-field"
                  style={{ marginBottom: "-0.1rem", width: "75%" }}
                >
                  Confirm Password
                </label>
                <TextField
                  label=""
                  variant="outlined"
                  size="small"
                  value={confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  error={Boolean(passwordError)}
                  helperText={passwordError}
                  type={confirmPasswordVisible ? "text" : "password"}
                  sx={{
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    width: "75%",
                    height: "60%",
                    color: "black",
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={toggleConfirmPasswordVisibility}
                        edge="end"
                        style={{ marginLeft: "-1rem" }}
                      >
                        {confirmPasswordVisible ? <IoMdEye /> : <IoMdEyeOff />}
                      </IconButton>
                    ),
                  }}
                />
              </div>
            </div>
            <div
              className="flex justify-center items-center"
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: "205.87px",
                height: "15vh", // Added height property for vertical centering
                display: "flex", // Added display flex
                flexDirection: "column", // Adjusted flexDirection for vertical centering
              }}
            >
              <Button
                type="button"
                className="mt-[-3rem] mb-20"
                onClick={handleSubmit}
                disabled={Boolean(emailError) || Boolean(phoneWarning)}
                style={{
                  width: "205px",
                  height: "47px",
                  backgroundColor: "#ff6100",
                  borderRadius: "4px",
                  color: "#FFF",
                  textAlign: "center",
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {showConfirmationModal && (
        <div className="flex justify-center items-center">
          <ConfirmationModal
            handleConfirmationYes={handleConfirmationYes}
            handleConfirmationNo={handleConfirmationNo}
          />
        </div>
      )}
    </>
  );
};

export default AssignHead;
