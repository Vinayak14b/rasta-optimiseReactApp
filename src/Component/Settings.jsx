import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';
import Modal from "react-modal";
import ChangePassword from "./ChangePassword";
import ChangeDefaultValues from "./ChangeDefaultValues";
import "../CSS/settings.css";
import { store } from "../redux/store/aioutputstore";
import { ShowForPermission } from "../usermanagement/accesscontrol/ShowPermissionComponent";
import { LoginStatus } from "./Utils/LoginStatus";
import { CloseOutlined } from "@mui/icons-material";
import CloseButton from "./Utils/CloseButton";
import logutIcon from "../assets/img/logout.svg";

const SettingsDialog = (props) => {
  const { onClickSubmitDefault, setSelectedButton, closeSettingDialog } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tabItem, setTabItem] = useState(1);
  const navigate = useNavigate();

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const redirectToManageUser = () => {
    // Use the navigate function to redirect to the ManageUser component
    navigate("/usermanagement");
    closeSettingDialog();
  };

  const onClickTabItem = (value) => {
    setTabItem(value);
  };

  const handleSignout = () => {
    localStorage.clear();
    store.dispatch({ type: "RESET" });
    window.location.reload();
    toast.success('Sign out successfully!');
  };

  useEffect(() => {
    openDialog();
  }, []);

  return (
    <div>
      <Modal
        isOpen={isDialogOpen}
        // onRequestClose={closeDialog}
        contentLabel="Settings Dialog"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 60,
          },
          content: {
            width: "450px",
            // minHeight: "500px",
			height: "700px",
            margin: "auto",
            overflow: "hidden",
            padding: "3px",
          },
        }}
      >
        {tabItem === 1 ? (
          <div style={{ width: "100%" }}>
            <div className="flex justify-between items-center w-full p-5">
              <div
                style={{
                  marginTop: "-50px",
                  marginLeft: "-20px",
                }}
              >
                <CloseButton onClick={closeSettingDialog} />
              </div>
              <LoginStatus />
            </div>
            <div className="flex flex-col items-center">
              <div className="flex justify-center items-center w-full gap-x-3">
                <img
                  src="icons/innersettingicon.png"
                  alt=""
                  className="w-[80px] max-w-[200px] mb-2"
                />
                <p className="text-center text-gray-600 settings-heading">
                  Settings
                </p>
              </div>

              <p className=" text-center text-gray-600 settings-content">
                Use Settings to make Changes in your account
              </p>
            </div>
            <div className="flex flex-col gap-y-5 justify-center items-center mt-4">
              <ShowForPermission permission="MANAGE_USERS">
                <div
                  className=" p-4 flex items-center border-b border-gray-200"
                  style={{
                    width: "70%",
                  }}
                  onClick={redirectToManageUser}
                >
                  <img src="icons/umc.png" alt="" className="w-[30px] h-auto" />
                  <p className="ml-6 change-password">
                    User Management Console
                  </p>
                </div>
              </ShowForPermission>

              <div
                className=" p-4 flex items-center border-b border-gray-200"
                style={{
                  width: "70%",
                }}
              >
                <img
                  src="icons/changepassword.png"
                  alt=""
                  className="w-[30px] h-auto"
                />
                <p
                  className="ml-6 change-password"
                  onClick={() => onClickTabItem(2)}
                >
                  Change Password
                </p>
              </div>

              <div
                className=" p-4 flex items-center border-b border-gray-200"
                style={{
                  width: "70%",
                }}
              >
                <img
                  src="icons/Default.png"
                  alt=""
                  className="w-[30px] h-auto"
                />
                <p
                  className="ml-6 change-password"
                  onClick={() => onClickTabItem(3)}
                >
                  Change Default Values
                </p>
              </div>
              {/* <div className=" p-4 flex items-center">
                <img src={logutIcon} alt="" className="w-[25px] h-auto" />
                <p className="ml-8 change-password" onClick={handleSignout}>
                  Sign Out
                </p>
              </div> */}
            </div>
            <div className="flex flex-col items-center mt-10">
              <button
                className="bg-orange-500 text-white px-11 py-2 mb-2 w-[180px] signout "
                onClick={handleSignout}
              >
                <img src={logutIcon} alt="" className="w-[20px] h-auto mr-2" />
                Sign out
              </button>
              <button
                className="bg-gray-300 text-black px-11 py-2  w-[180px] close"
                onClick={closeSettingDialog}
              >
                Close{" "}
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        {tabItem === 2 ? (
          <ChangePassword onClickTabItem={onClickTabItem} />
        ) : (
          ""
        )}
        {tabItem === 3 ? (
          <ChangeDefaultValues
            onClickTabItem={onClickTabItem}
            onClickSubmitDefault={onClickSubmitDefault}
          />
        ) : (
          ""
        )}
      </Modal>
    </div>
  );
};

export default SettingsDialog;
