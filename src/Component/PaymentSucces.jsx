import { Dialog } from "@mui/material";
import Sidebar from "./Sidebar";
import PdfDownloadModal from "./PdfDownloadModal";
import { useSelectedData } from "./SelectedDataContext";

const PaymentSuccess = () => {
  const [open, setOpen] = React.useState(true);
  const { setShowPdfDownloadModal } = useSelectedData();

  const handleButtonClick = (selectedOption) => {
    // Navigate to Pricinglan component with selectedOption as props

    setOpen(false);
    setShowPdfDownloadModal(true);
  };
 
  return (
    <>
      <PdfDownloadModal premium={true} />
      <Sidebar />
      <Dialog open={open}>
        <div className="fixed top-0 left-0 w-full  h-full flex justify-center items-center">
          <div className="bg-white rounded-[36px] p-8 relative flex flex-col gap-y-8 p-14 px-60 ">
            {/* This div contains payment success message */}
            <img
              src="suxcess.png"
              alt=""
              className="w-36 h-36 mt-6 mx-auto" // Center the image
            />
            <h1 className="font-bold text-4xl">Payment Successful!</h1>
            <center>
              {" "}
              <h3>Transaction ID: [FKAJSIDFMAISDJF93498]</h3>
            </center>
            <button
              className="px-8 py-2 rounded-xl bg-orange-500 text-white font-semibold"
              onClick={handleButtonClick}
            >
              Download Report
            </button>
          </div>
        </div>
      </Dialog>
      {/* New content below */}
    </>
  );
};

export default PaymentSuccess;
