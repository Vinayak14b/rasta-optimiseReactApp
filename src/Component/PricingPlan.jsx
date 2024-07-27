import { useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import { Switch } from "@mui/material";
import TempHeader from "./TempHeader";
import Box from "@mui/material/Box";
import PhoneIcon from "../assets/img/Whatsapp_logo.svg"
const pricingData = [

  {
    title: "Free Plan",
    price: "₹0",
    monthlyPrice: "₹0",
    currentPlan: "Current Plan",
    buttonColor: "#FE6100",

    features: [
      "Map Themes (black and white)",
      "Road Condition, Inventory Condition, Pothole Count, Major Bridges, Minor Bridges, Culvert Counts (Tentative count with <> sign)",
      "View each and every Icon in the left bar to increase interaction with the features.",
      "Plot all defects at once on the map (Restrict plotting individual defects on the map)",
      "Plotting filter condition points",
      "Report Section (Pay for report and get download option)",
      "Search Roads",
      "Calculator Section(Only View)",
      "Utilities Dashboard (Only View)",
      "Comparison Analysis (Only View)",
    ],
    buttonText: "Already Activated",
    imageSrc: "icons/free_plan.png"
  },

  {
    title: "Gold Plan",
    monthlyPrice: "₹1,499",
    price: "₹14,999",
    currentPlan: "Flexi Plan",
    buttonColor: "#DCB855",

    features: [
      "All map themes present in free Plan + Blue and Satellite.",

      "Accurate detailed report with paid charges for Road Condition, Inventory Condition, Pothole Count, Major Bridges Count, Minor Bridges Count, Culvert Count (600 for Report per km).",

      "RCI",

      "Screenshot",

      "All features present in free + Plot and View specific road defect on the map.",

      "Show location, Road number, image, Start and End chainnage, date and time and defect.",

      "Lower price in report and Detailed Road Report, Road Roughness Report",

      "Enable Calculator Section.",

      "Map Comparison",

      "Utilities Dashboard (Only view)",

      "Comparison Analysis (Compare Trips)",
    ],
    buttonText: "Subscribe",
    imageSrc: "icons/gold_plan.png"
  },

  {
    title: "Enterprise Plan",
    price: "",
    buttonColor: "#7BC5D5",

    // currentPlan: "Customized Plan",
    features: [
      "All features present in Free and Gold plan + Customization according to the user.",

      "Accurate detailed report with paid charges for Road Condition, Inventory Condition, Pothole Count, Major Bridges Count, Minor Bridges Count, Culvert Count (400 for Report per km).",

      "Screenshot",

      "3D view",

      "Heat Map",

      "All features present in free and gold",

      "RCI",

      "Image enlargement, Play option, video link, navigate to google maps, and comment/feedback.",

      "Mentioned in Free Plan + Arboriculture, Public Works Department, Budget Report.",
    ],
    buttonText: "Contact Sales",
    // imageSrc: "icons/Bue.png",
    imageSrc: "icons/enterprise_plan.png",
  },
  // Add more pricing plans as needed
];

const PricingPlan = ({ selectedOption }) => {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(true);

  const label = { inputProps: { "aria-label": "Color switch demo" } };
  const [activePage, setActivePage] = useState('notes');

  const handleActivate = (pricingIndex) => {
    // Logic to activate the plan and update state or perform other actions
    // For example, you might want to store the activated plan in state
  };

  const handleToggle = () => {
    setIsYearly(!isYearly);
  };
  const handlePageChange = (page) => {
    setActivePage(page);
  };
  return (
    <>
      <Sidebar setActivePage={handlePageChange}/>

      <div className="w-[100%]">
        <Box sx={{ marginLeft: '120px' }}>
          <TempHeader />
        </Box>
        <Box sx={{ borderBottom: '2px solid #E5E5E5', width: '100%', marginTop: '-4px' }}></Box>

        <div className="flex flex-col justify-between ml-[120px] mb-[50px]">
          <div className="flex justify-between items-center mb-4">
            <div className="font-poppins text-[31px] font-semibold mt-5">
              <h1>This Feature is available for premium Users</h1>
            </div>

            <div className="flex items-center mr-10">
              <div
                className={`cursor-pointer mr-4 ${isYearly ? "text-gray-500" : "text-primary"
                  }`}
                onClick={() => setIsYearly(true)}
              >
                Monthly
              </div>

              <Switch
                {...label}
                defaultChecked
                onChange={handleToggle}
                color="primary"
              />

              <div
                className={`cursor-pointer ${!isYearly ? "text-gray-500" : "text-primary"
                  }`}
                onClick={() => setIsYearly(false)}
              >
                Yearly
              </div>
            </div>
          </div>

          <div className=" relative flex justify-around mt-10 w-full">
            {pricingData.map((pricing, index) => (
              <div key={index} className="flex relative">
                <div className="relative border-2  rounded-lg border-primary w-[28vw] mx-2 h-[120vh] p-5 shadow-2xl flex flex-col justify-between">
                  <div>
                    <h5
                      style={{
                        fontSize: "26px",
                        fontFamily: "poppins",
                      }}
                      className="font-poppins font-semibold  tracking-wide text-left"
                    >
                      {pricing.title}
                    </h5>

                    <h1 className="font-poppins text-[42px] font-semibold leading-6 mt-3 tracking-wider text-left">
                      {isYearly ? pricing.price : pricing.monthlyPrice}
                    </h1>
                    {pricing.title === "Enterprise Plan" && (
                      <div>
                        <h4 className="mt-9 font-poppins text-[12px] font-semibold leading-4 tracking-wide text-left">
                          Contact Us For More Details
                        </h4>
                        {/* Additional contact details or form can be added here */}
                      </div>
                    )}
                    <h4
                      style={{
                        color:
                          pricing.currentPlan === "Current Plan"
                            ? "green"
                            : pricing.buttonColor,
                        fontSize: "11px",
                        fontWeight: "600",
                        lineHeight: "17px",
                        letterSpacing: "0.035em",
                        textAlign: "left",
                      }}
                      className={`font-poppins text-[14px] mt-2 font-normal leading-4 tracking-wide text-left text-${pricing.buttonColor} text-white p-1`}
                    >
                      {pricing.currentPlan}
                    </h4>
                    <h2 className="mt-4 font-poppins text-[12px] font-semibold leading-4 tracking-wide text-left text-black">
                      Features
                    </h2>
                    {pricing.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center mt-4">
                        <div className="mt-1">
                          <svg
                            style={{ width: "12px", height: "12px" }}
                            className="h-4 w-4 text-gray-500 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                        <div className="leading-tight">
                          <span className="text-[14px] mb-0 pb-0">{feature}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className={`mt-5 flex items-center justify-center ${pricing.title === 'Gold Plan' ? '' : 'hidden'}`}
                    style={{
                      fontSize: '13px',
                      fontFamily: 'poppins',
                    }}>
                    <span className="cursor-pointer underline text-blue-500" onClick={() => navigate("/pricingplan/compareplan")}>Compare Plan</span>

                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      style={{
                        backgroundImage:
                          pricing.title === 'Free Plan'
                            ? 'linear-gradient(to bottom, #73DC42, #498E28, #7AED44, #35681E)'
                            : pricing.title === 'Gold Plan'
                              ? 'linear-gradient(to bottom,#AE8625,#F7EF8A, #D2AC47, #EDC967)'
                              : pricing.title === 'Enterprise Plan'
                                ? 'linear-gradient(to bottom, #81CDDE,#D28785)'
                                : 'linear-gradient(to bottom, #000000, #5D3E06)',
                        color: 'black',
                        borderRadius: '30px',// Set the text color
                      }}
                      className="text-white px-2 py-2 rounded-lg font-bold text-[15px] px-10"
                      onClick={() => handleActivate(index)}>
                      {pricing.buttonText === 'Contact Sales' && (
                        <div className="flex items-center">
                          <img src={PhoneIcon} alt="Phone Icon" className="mr-2" />
                          {pricing.buttonText}
                        </div>
                      )}

                      {pricing.buttonText !== 'Contact Sales' && (
                        <span>{pricing.buttonText}</span>
                      )}
                    </button>
                  </div>




                  <div className="absolute top-0 right-0 mr-10 z-20">
                    {pricing.imageSrc ? (
                      <img
                        src={pricing.imageSrc}
                        className="w-12 h-16"
                        alt="Image Description"
                      />
                    ) : null}
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPlan;