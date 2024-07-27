import { useState } from "react";
import Box from "@mui/material/Box";
import "./index.css";
import { useDispatch } from "react-redux";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { ChangePasswordApi } from "../../usermanagement/services/Operations/profileAPI";
import { toast } from "react-hot-toast";
import { LoginStatus } from "../Utils/LoginStatus";
import CloseButton from "../Utils/CloseButton";

const ChangePassword = (props) => {
  const dispatch = useDispatch();
  const { onClickTabItem } = props;
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPasswordsecond, setshowConfirmPasswordsecond] =
    useState(false);
  const [showConfirmPassword, setShowConfirmNewPassword] = useState(false);
  const [visiblefirst, setVisiblefirst] = useState(false);
  const [visiblesecond, setVisiblesecond] = useState(false);
  const [visibleThird, setVisibleThird] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const onClickShowConfirmfirst = () => {
    setShowConfirmNewPassword(!showConfirmPassword);
    setVisiblefirst(!visiblefirst);
    setShowNewPassword(!showNewPassword);
  };
  const onClickShowConfirmsecond = () => {
    setShowConfirmNewPassword(!showConfirmPassword);
    setVisiblesecond(!visiblesecond);
    setshowConfirmPasswordsecond(!showConfirmPasswordsecond);
  };

  const onClickShowConfirmThird = () => {
    setShowConfirmNewPassword(!showConfirmPassword);
    setVisibleThird(!visibleThird);
    setShowCurrentPassword(!showCurrentPassword);
  };

  const onChangeCurrentPassword = (event) => {
    setErrorMsg(null);
    setCurrentPassword(event.target.value);
  };

  const onChangeNewPassword = (event) => {
    setErrorMsg(null);
    setNewPassword(event.target.value);
  };

  const onChangeConfirmPassword = (event) => {
    if (newPassword !== event.target.value) {
      setErrorMsg("New password and confirm password do not match.");
      setConfirmPassword(event.target.value);
    } else {
      setErrorMsg(null);
      setConfirmPassword(event.target.value);
    }
  };

  const onChangeEmail = (event) => {
    setErrorMsg(null);
    setEmail(event.target.value);
  };

  const onClickSubmit = () => {
    // Check if either currentPassword or email is entered
    if (!currentPassword && !email) {
      // toast.error('Please enter either your current password or email.', {
      // 	className: 'font-poppins text-red-500',
      // 	bodyClassName: 'font-poppins',
      // });
      setErrorMsg("Please enter either your current password or email.");
      return;
    }

    // Check if both newPassword and confirmPassword are entered
    if (!newPassword || !confirmPassword) {
      // toast.error('Please fill in both new password fields.', {
      // 	className: 'font-poppins text-red-500',
      // 	bodyClassName: 'font-poppins',
      // });
      setErrorMsg("Please fill all required fields.");
      return;
    }

    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      // toast.error('New password and confirm password do not match.', {
      // 	className: 'font-poppins text-red-500',
      // 	bodyClassName: 'font-poppins',
      // });
      setErrorMsg("Password do not match!!");
      return;
    }

    dispatch(
      ChangePasswordApi(currentPassword, email, newPassword, confirmPassword)
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div className="flex justify-between items-center w-full p-5">
        <div
          style={{
            marginTop: "-50px",
            marginLeft: "-20px",
          }}
        >
          <CloseButton onClick={() => onClickTabItem(1)} />
        </div>
        <LoginStatus />
      </div>
      <h3 className="change-password-heading">Change Password</h3>

      <div className="input-with-icon w-[300px] h-10 bg-white border border-gray-300 shadow-md p-2 rounded-md input-password">
        <input
          type={showCurrentPassword ? "value" : "password"}
          id=""
          className="new-password text-sm"
          placeholder="Current Password"
          onChange={onChangeCurrentPassword}
          value={currentPassword}
        />
        {visibleThird ? (
          <IoMdEye
            className="h-5 w-5 cursor-pointer"
            style={{
              color: "#ea580c",
            }}
            onClick={onClickShowConfirmThird}
          />
        ) : (
          <IoMdEyeOff
            className="h-5 w-5 cursor-pointer"
            style={{
              color: "#ea580c",
            }}
            onClick={onClickShowConfirmThird}
          />
        )}
      </div>

      <p className="font-poppins">Or</p>
      <p className="enter-your-email">
        Enter your Registered User/ Email ID associated with your account, to
        get a link to reset your password{" "}
      </p>

      <input
        type="text"
        className="w-[300px] h-10 bg-white border border-gray-300 shadow-md p-2 rounded-md input-field text-sm"
        placeholder="Email"
        onChange={onChangeEmail}
        value={email}
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="350"
        height="2"
        viewBox="0 0 463 2"
        fill="none"
      >
        <path d="M0.5 1H463" stroke="#75767A" />
      </svg>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignSelf: "flex-start",
          marginTop: "8%",
        }}
      >
        <label for="newpassword" className="label-new-password ">
          {/* New Password */}
        </label>
      </Box>
      <div className="input-with-icon w-[300px] h-10 bg-white border border-gray-300 shadow-md p-2 rounded-md input-password">
        <input
          type={showNewPassword ? "value" : "password"}
          id="newpassword"
          className="new-password text-sm"
          placeholder="New Password"
          onChange={onChangeNewPassword}
          value={newPassword}
        />
        {visiblefirst ? (
          <IoMdEye
            className="h-5 w-5 cursor-pointer"
            style={{
              color: "#ea580c",
            }}
            onClick={onClickShowConfirmfirst}
          />
        ) : (
          <IoMdEyeOff
            className="h-5 w-5 cursor-pointer"
            style={{
              color: "#ea580c",
            }}
            onClick={onClickShowConfirmfirst}
          />
        )}
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignSelf: "flex-start",
          marginTop: "2%",
        }}
      >
        <label for="confirmpassword" className="label-new-password">
          {/* Confirm New Password */}
        </label>
      </Box>
      <div className="input-with-icon w-[300px] h-10 bg-white border border-gray-300 shadow-md p-2 rounded-md input-password">
        <input
          type={showConfirmPasswordsecond ? "value" : "password"}
          id="confirmpassword"
          className="new-password text-sm"
          placeholder="Confirm Password"
          onChange={onChangeConfirmPassword}
          value={confirmPassword}
        />

        {visiblesecond ? (
          <IoMdEye
            className="h-5 w-5 cursor-pointer"
            style={{
              color: "#ea580c",
            }}
            onClick={onClickShowConfirmsecond}
          />
        ) : (
          <IoMdEyeOff
            className="h-5 w-5 cursor-pointer"
            style={{
              color: "#ea580c",
            }}
            onClick={onClickShowConfirmsecond}
          />
        )}
      </div>
      <div>
        <p
          style={{
            color: "red",
            fontSize: "12px",
            marginBottom: "2%",
            textAlign: "center",
          }}
        >
          {errorMsg}
        </p>
      </div>

      <Box sx={{ marginTop: "3%" }}>
        <button className="close-button1" onClick={() => onClickTabItem(1)}>
          Back
        </button>
        <button className="submit-button" onClick={onClickSubmit}>
          Submit
        </button>
      </Box>
    </Box>
  );
};
export default ChangePassword;
