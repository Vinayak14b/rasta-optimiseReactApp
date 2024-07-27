import Sidebar from "./Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Dialog, FormControlLabel, IconButton } from "@mui/material";
import increaseIcon from "../assets/markers/increaseIcon.png";
import decreaseIcon from "../assets/markers/decreaseIcon.png";
import pdfDownload from "../assets/img/pdf-premium.png";
import CloseButton from "./Utils/CloseButton";
import downloadWhite from "../assets/img/download_white.png";
import downloadBlack from "../assets/img/download_black.png";
import pdfStdDownload from "../assets/img/pdfstd_download.png";

const TypeCol = ({ params }) => {

  if (params.row.id % 2 == 0) {
    return (
      <>
        <div
          className="flex justify-between items-center w-full"
          style={{ cursor: "pointer" }}
        >
          <div>{params.row.type}</div>
          <FormControlLabel
            control={
              <IconButton
                color="secondary"
                aria-label="add an alarm"
                // onClick={handleEditClick}
              >
                <img src={decreaseIcon} alt="increaseIcon" />
              </IconButton>
            }
          />
        </div>
      </>
    );
  }

  return (
    <div
      className="flex justify-between items-center w-full"
      style={{ cursor: "pointer" }}
    >
      <div>{params.row.type}</div>
      <FormControlLabel
        control={
          <IconButton
            color="secondary"
            aria-label="add an alarm"
            // onClick={handleEditClick}
          >
            <img src={increaseIcon} alt="increaseIcon" />
          </IconButton>
        }
      />
    </div>
  );
};

const PdfCol = ({ params }) => {

  const [open, setOpen] = React.useState(false);

  const showDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="cursor-pointer" onClick={showDialog}>
        <img src={params.row.view_report} alt="pdfDownload" />
      </div>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div
          style={{
            height: "300px",
            width: "600px",
          }}
        >
          <div
            onClick={handleClose}
            className="absolute mt-[5px] right-[5px] w-8 h-8 flex items-center justify-center"
          >
            <CloseButton />
          </div>
          <div className="flex flex-col justify-center items-center w-100 mt-6 mb-6">
            <div style={{ fontSize: "24px", fontWeight:"bold" }}>Download Report</div>
            <div>Choose a format to Download Report</div>
          </div>
          <div className="flex justify-center space-x-10">
            <div className="flex items-center flex-col">
              <img style={{height:"84px", width:"84px"}} src={pdfStdDownload} alt="pdfDownload" />
              <button style={{ background:"#E5252A", borderRadius:"14px"}} className="flex mt-4 px-4 py-2 items-center justify-center">
                <img style={{ width:"24px", height:"25px" }} src={downloadWhite} alt="downloadWhite" />
                <span style={{color:"white", marginLeft:"4px"}}>Pay & Download</span>
              </button>
            </div>
            <div className="flex items-center flex-col"> 
              {/* 24px */}
              <img style={{ height:"84px", width:"84px"}} src={pdfDownload} alt="pdfDownload" />
              <button style={{ background:"#E5252A", backgroundImage:"linear-gradient(to bottom,#AE8625,#F7EF8A, #D2AC47, #EDC967)",borderRadius:"14px"}} className="flex mt-4 px-4 py-2 items-center justify-center">
                <img src={downloadBlack} alt="downloadWhite" />
                <span style={{marginLeft:"4px"}}>Upgrade Your Plan for Free View</span>
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

const rows = [
  {
    id: 1,
    date: "12/12/2021",
    road_no: "1",
    road_name: "Road 1",
    chainage: "100/200",
    no_of_potholes: "20",
    type: "Potholes",
    view_report: pdfDownload,
  },
  {
    id: 2,
    date: "12/12/2021",
    road_no: "1",
    road_name: "Road 1",
    chainage: "100/200",
    no_of_potholes: "20",
    type: "Potholes",
    view_report: pdfDownload,
  },
  {
    id: 3,
    date: "12/12/2021",
    road_no: "1",
    road_name: "Road 1",
    chainage: "100/200",
    no_of_potholes: "20",
    type: "Potholes",
    view_report: pdfDownload,
  },
  {
    id: 4,
    date: "12/12/2021",
    road_no: "1",
    road_name: "Road 1",
    chainage: "100/200",
    no_of_potholes: "20",
    type: "Potholes",
    view_report: pdfDownload,
  },
  {
    id: 5,
    date: "12/12/2021",
    road_no: "1",
    road_name: "Road 1",
    chainage: "100/200",
    no_of_potholes: "20",
    type: "Potholes",
    view_report: pdfDownload,
  },
  {
    id: 6,
    date: "12/12/2021",
    road_no: "1",
    road_name: "Road 1",
    chainage: "100/200",
    no_of_potholes: "20",
    type: "Potholes",
    view_report: pdfDownload,
  },
  {
    id: 7,
    date: "12/12/2021",
    road_no: "1",
    road_name: "Road 1",
    chainage: "100/200",
    no_of_potholes: "20",
    type: "Potholes",
    view_report: pdfDownload,
  },
];

const columns = [
  { field: "date", headerName: "Date", width: 150 },
  { field: "road_no", headerName: "Road Number", width: 150 },
  { field: "road_name", headerName: "Road Name", width: 200 },
  { field: "chainage", headerName: "Chainage", width: 200 },
  { field: "no_of_potholes", headerName: "No of Potholes", width: 200 },
  {
    field: "type",
    headerName: "Type",
    width: 200,
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: (params) => <TypeCol params={params} />,
  },
  {
    field: "view_report",
    headerName: "View Report",
    width: 150,
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: (params) => <PdfCol params={params} />,
  },
];

const getRowId = (row) => row.id;

const getRowHeight = () => 80;

const ViewDetails = () => {
  return (
    <div>
      <Sidebar />
      <div className="ml-20">
        <div className="w-100 p-16">
          <div className=" flex justify-between items-center">
            <div
              className="flex justify-center items-center"
              style={{
                height: "72px",
                width: "245px",
                borderRadius: "15px",
                border: "1px solid #FE6100",
              }}
            >
              <p
                className="font-poppins font-normal leading-6 text-left"
                style={{ fontSize: "22px" }}
              >
                <b style={{ fontSize: "18px" }}>Bridges:</b>
                &nbsp;20
              </p>
            </div>
            <div
              className="flex justify-center items-center"
              style={{
                height: "104px",
                width: "400px",
                borderRadius: "14px",
                border: "1px solid #FE6100",
                fontSize: "31px",
              }}
            >
              <p className="font-poppins font-normal leading-6 text-left">
                <b>Your Plan:</b>
                &nbsp;Platinum
              </p>
            </div>
          </div>

          <div className="mt-16">
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
              onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRowData = rows.filter((row) =>
                  selectedIDs.has(row.id.toString())
                );
              }}
              checkboxSelection
              getRowId={getRowId}
              getRowHeight={getRowHeight}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
