//AddMember.js

import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import CloseButton from "../../../../Component/Utils/CloseButton";
import DatePicker from "../../../utilsUser/DatePicker";

import { useDispatch } from "react-redux";
import { assignMember } from "../../../services/Operations/memberAPI";
import { Spinner } from "../../../../utils/Spinner";

import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import IconButton from "@mui/material/IconButton";
import { getOfficeDetails } from "../../../services/Operations/officeAPI";
import toast from "react-hot-toast";

const AddMember = ({ closeAddMemberDialog, officeId }) => {
  const [submittedData, setSubmittedData] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [phoneWarning, setPhoneWarning] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      office_id: officeId || "", // Update office_id if selectedOfficeId changes
    }));
  }, [officeId]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };


  const generatePassword = () => {
    // Define characters to include in the password
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&<>";

    // Set the desired length of the password
    const passwordLength = 12;

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }

    return password;
  };

  const [formData, setFormData] = useState({
    office_id: officeId,
    name: "",
    username: "",
    role: "Member",
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

    if (field === "office_id") {
      setFormData((prevData) => ({
        ...prevData,
        office_id: value,
      }));
    }

    if (field === "phone") {
      // Remove non-numeric characters from the phone number
      value = value.replace(/\D/g, "");

      if (value.length > 10) {
        setPhoneWarning("Phone number should not exceed 10 digits");
        value = value.slice(0, 10);
      } 
      else if (value.length < 10) {
        setPhoneWarning("Phone number should be 10 digits");
      }
      else {
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
      setConfirmPassword(""); // Reset confirm password when password changes
    }

    if (field === "confirmPassword") {
      setConfirmPassword(value);
    }

    if (field === "name") {
      // Remove non-alphabetic characters from the input
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

  const handleGeneratePassword = () => {
    // Generate a new password when the button is clicked
    const newPassword = generatePassword();

    setFormData((prevData) => ({
      ...prevData,
      password: newPassword,
    }));

    // setConfirmPassword(newPassword);
    setPasswordError("");
  };

  const handleSubmit = async () => {
   
    if (emailError) {
      toast.error("Please fill in a valid Email ID before submitting.");
      return;
    }

    if (passwordError) {
      toast.error("Please check if the Password and Confirm Password is same.");
      return;
    }

    if (phoneWarning) {
      toast.error(phoneWarning);
      return;
    }

    for (const key in formData) {
      if (formData[key] === "") {
        toast.error("Please fill in all fields before submitting.");
        return;
      }
    }

    setLoading(true);
    try {
      // Dispatch the action
      dispatch(
        assignMember(
          office_id,
          name,
          username,
          role,
          email,
          phone,
          dob,
          password,
          navigate
        )
      );
      dispatch(getOfficeDetails());
      closeAddMemberDialog();
      clearData();
    } catch (error) {
      console.error("Dispatch Error:", error);
      alert("Failed to submit data. Please try again.");
    } finally {
      setLoading(false);
    }
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
    setFormData((prevData) => ({
      ...prevData,
      office_id: officeId || "", // Update office_id if selectedOfficeId changes
    }));
  }, [officeId]);

  useEffect(() => {
    // This effect will run every time submittedData changes
    clearData();
  }, [submittedData]);

  // const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(true);

  const closeDialog = () => {
    closeAddMemberDialog();
    setIsDialogOpen(false);
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
        contentLabel="Assign Member Dialog"
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
            height: "75vh",
            backgroundColor: "white",
          }}
        >
          <div className="absolute mt-[-30px] right-[-5px] w-8 h-8 flex items-center justify-center">
            <div className=" cursor-pointer" onClick={closeAddMemberDialog}>
              <CloseButton />
            </div>
          </div>
          <div className="flex mt-[-1rem] justify-center items-center">
            <div>
              <h2 className="font-poppins text-left text-2xl font-bold ml-6">
                Add New Member
              </h2>
            </div>
          </div>

          <div className="flex flex-col font-poppins mt-[1vw] border-2 border-orange-500 rounded-lg w-[60vw] h-[75vh]">
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
              Enter Member’s details
            </div>
            <div className="grid grid-cols-2 gap-2 justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <label
                  className="w-3/4 flex mb-2 text-black font-semibold item-left text-sm"
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
                  className="w-3/4 flex mb-2 text-black font-semibold item-left text-sm"
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
                  style={{ marginBottom: "-0.1rem", width: "75%" }}
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
                  className="w-3/4 flex mb-2 text-black font-semibold item-left text-sm"
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
                  className="w-3/4 flex mb-2 text-black font-semibold item-left text-sm"
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
                  className="w-3/4 flex mb-2 text-black font-semibold item-left text-sm"
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
                  className="w-3/4 flex mb-2 text-black font-semibold item-left text-sm"
                  htmlFor="text-field"
                  style={{ marginBottom: "-0.1rem", width: "75%" }}
                >
                  DOB
                </label>
                <div className="cursor-pointer">
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
                  style={{
                    marginBottom: "-0.1rem",
                    width: "75%",
                  }}
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
                  style={{
                    marginBottom: "-0.1rem",
                    width: "75%",
                  }}
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
              className="d-flex justify-center items-center"
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
                className="mt-[-3rem] mb-10"
                onClick={handleSubmit}
                disabled={emailError || phoneWarning}
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
    </>
  );
};

export default AddMember;
