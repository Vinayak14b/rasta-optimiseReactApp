const ConditionColorComparision = ({ className, goodValue, goodColor }) => {
    const total = 100; // Total is fixed for two values
    const goodPercentage = goodValue.width;; // Width for the "good" value is fixed to 20%
    const remainingPercentage = total - goodPercentage; // Width for the remaining value
  
    const goodBackgroundColor = goodColor || "#5EC45C"; // Default to green color for the "good" value
    const remainingBackgroundColor = "#CCCCCC"; // Default to grey color for the remaining value
  
    return (
      <div
        className={`flex flex-col items-center w-full ${className}`}
        style={{ cursor: "pointer" }}
      >
        {/* Rendering "good" value */}
        <div
          className="flex justify-center items-center w-full"
          style={{ marginBottom: "5px" }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: goodBackgroundColor,
              marginRight: "5px",
            }}
          ></div>
          <div>{goodPercentage}%</div>
        </div>
        <div style={{ width: "100%", height: "15px", position: "relative" }}>
          <div
            style={{
              width: `${goodPercentage}%`,
              height: "100%",
              backgroundColor: goodBackgroundColor,
              position: "absolute",
              left: "0",
            }}
          ></div>
          <div
            style={{
              width: `${remainingPercentage}%`,
              height: "100%",
              backgroundColor: remainingBackgroundColor,
              position: "absolute",
              left: `${goodPercentage}%`,
            }}
          ></div>
        </div>
      </div>
    );
  };
  
  export default ConditionColorComparision;
  