import { useState } from "react";
import CloseButton from "./Utils/CloseButton";
import { FaDownload } from "react-icons/fa6";
import Box from "@mui/material/Box";

export default function BudgetReportModal(props) {
  const { onClickCloseModal } = props;

  const [data, setData] = useState([
    {
      report: "Sales Report",
      price: "7500 INR",
      selected: false,
    },
    {
      report: "Financial Summary",
      price: "8500 INR",
      selected: false,
    },
    {
      report: "User Engagement Report",
      price: "6000 INR",
      selected: false,
    },
    {
      report: "Product Inventory",
      price: "9500 INR",
      selected: false,
    },
    {
      report: "Customer Satisfaction Survey",
      price: "7000 INR",
      selected: false,
    },
    {
      report: "Employee Performance Analysis",
      price: "8200 INR",
      selected: false,
    },
    {
      report: "Marketing Campaign Report",
      price: "8800 INR",
      selected: false,
    },
  ]);

  const handlePaymentClick = () => {
    return;
  };

  const handleReportSelect = (index) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, selected: !item.selected } : item
      )
    );
  };

  return (
      // <>
      //   {isModalOpen && (
    <div
      className="h-screen w-screen bg-black bg-opacity-80 rounded-lg z-50 absolute top-0 pl-[79px] flex justify-center items-center"
      style={{
        backdropFilter: "blur(4px)",
        zIndex: 100,
        fontFamily: "Poppins",
      }}
    >
      <div className="h-[90vh] w-[70vw] bg-white text-black mt-8 flex items-center justify-center opacity-100 rounded-xl flex-col gap-y-4">
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
            width: "90%",
          }}
        >
          <div className="relative w-8 h-8 flex items-right justify-right">
            <div className="cursor-pointer" onClick={onClickCloseModal}>
              <CloseButton />
            </div>
          </div>
        </Box>

        <div className="w-[70vw] min-h-[2rem] mb-10">
          <table className="w-full border-collapse" style={{ tableLayout: "fixed" }}>
            <thead>
              <tr className="bg-orange-200 text-black font-bold">
                <th className="text-center py-2" style={{ width: "33.33%" }}>
                  Detailed Report
                </th>
                <th className="p-2 text-center" style={{ width: "33.33%" }}>
                  Price
                </th>
                <th className="text-center py-2" style={{ width: "33.33%" }}>
                  Select
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b-2 border-black ${
                    item.selected ? "" : ""
                  }`}
                >
                  <td className="text-center py-2" style={{ width: "33.33%" }}>
                    {item.report}
                  </td>
                  <td className="text-center py-2" style={{ width: "33.33%" }}>
                    <div
                      className={`p-2 py-1 rounded-xl mx-auto ${
                        item.selected ? "border-2 border-orange-500" : "border-2 border-grey-500"
                      }`}
                      style={{
                        width: "150px",
                      }}
                    >
                      {item.price}
                    </div>
                  </td>
                  <td className="text-center py-2" style={{ width: "33.33%" }}>
                    <input
                      onClick={() => handleReportSelect(index)}
                      className="h-4 w-4 text-orange-500"
                      checked={item.selected}
                      type="checkbox"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex gap-x-8 mb-10">
          <button className="bg-orange-200 text-black px-8 py-2 rounded-lg flex gap-x-2 items-center">
            <FaDownload />
            <p onClick={handlePaymentClick} className="text-base font-semibold">
              Upgrade & Free Download
            </p>
          </button>
          <button className="bg-orange-500 text-white px-8 py-2 rounded-lg flex gap-x-2 items-center">
            <FaDownload />
            <p onClick={handlePaymentClick} className="text-base font-semibold">
              Pay & Download Report
            </p>
          </button>
        </div>
      </div>
    </div>
    // )}
    // </>
  );
}
