const ConditionCol = ({ params, className }) => {

  const total = params.row.condition.reduce((acc, value) => acc + value, 0);

  let offset = 0;

  return (
    <div
      className={`flex flex-col items-center w-full ${className}`}
      style={{ cursor: "pointer" }}
    >
      <div className="flex justify-evenly w-full">
        {params?.row?.condition.map((value, index) => {
          return (
            <div
              className="flex justify-center items-center w-full"
              key={index}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor:
                    index === 0
                      ? "#5EC45C"
                      : index === 1
                      ? "#FF8A00"
                      : "#FF2222",
                  marginRight: "5px",
                }}
              ></div>
              <div>{value}%</div>
            </div>
          );
        })}
      </div>
      <div style={{ width: "100%", height: "15px", position: "relative" }}>
        {params?.row?.condition.map((value, index) => {
          const percentage = (value / total) * 100;
          const backgroundColor =
            index === 0 ? "#5EC45C" : index === 1 ? "#FF8A00" : "#FF2222";

          const style = {
            width: `${percentage}%`,
            height: "100%",
            backgroundColor,
            position: "absolute",
            left: `${offset}%`,
          };

          offset += percentage;

          return <div key={index} style={style}></div>;
        })}
      </div>
    </div>
  );
};

export default ConditionCol;
