import "./index.css";
import ChangeDefaultIcon from "../../assets/sidebar/changedefaulticon.png";
import Box from "@mui/material/Box";
import { useState } from "react";
import CloseButton from "../Utils/CloseButton";
import { LoginStatus } from "../Utils/LoginStatus";

const ChangeDefaultValues = (props) => {
  const { onClickTabItem, onClickSubmitDefault } = props;
  const [selectedValue, setSelectedValue] = useState("");

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const onClickSubmit = () => {
    if (selectedValue.length === 0) {
      alert("kindly select points or segments");
    } else {
      onClickSubmitDefault(selectedValue);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // marginTop: "10%",
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
      <img
        src={ChangeDefaultIcon}
        alt="change default icon"
        className="change-default-icon"
      />
      <p className="default-value-text">
        Change Default Platform views here. Refresh to view changes after
        clicking is done
      </p>
      <p className="plaform-view">Platform Default View</p>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "60%",
            marginTop: "10%",
            paddingRight: "8px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <input
              type="radio"
              id="points"
              className="radio-points"
              name="default"
              checked={selectedValue === "points"}
              onChange={handleRadioChange}
              value="points"
            />
            <label for="points" className="points-label">
              Points
            </label>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <input
              type="radio"
              id="segments"
              name="default"
              value="segments"
              checked={selectedValue === "segments"}
              onChange={handleRadioChange}
            />
            <label for="segments" className="points-label">
              Segments
            </label>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "10%",
            width: "60%",
          }}
        >
          <input type="checkbox" />
          <p className="view-minor">View Minor Potholes by Default</p>
        </Box>
      </Box>
      <Box sx={{ marginTop: "10%" }}>
        <button className="close-button1" onClick={() => onClickTabItem(1)}>
          Close
        </button>
        <button className="submit-button" onClick={onClickSubmit}>
          Submit
        </button>
      </Box>
    </Box>
  );
};
export default ChangeDefaultValues;
