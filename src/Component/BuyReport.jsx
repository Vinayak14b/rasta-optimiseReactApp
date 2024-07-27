import { Dialog } from '@mui/material';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import wrongicon from "../assets/img/WrongIcon.png"
import TempHeader from './TempHeader';
import Box from "@mui/material/Box";

import { BarChart } from '@mui/x-charts/BarChart';

const BuyReport = ({navigation}) => {
  

  useEffect(() => {
    // This effect will run when the component is unmounted
    return () => {
      setSelectedOption(null);
    };
  }, []);

    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleButtonClick = (selectedOption) => {
        // Navigate to Pricinglan component with selectedOption as props
        navigate('/pricingplan', { state: { selectedOption } });
        setOpen(false);
      };
    
    const handleClose = () => { 
        setOpen(false);
        setShowDialog(false);
        setSelectedOption(null); // Reset selectedOption when closing the dialog
      };

      const [activePage,setActivePage] =useState('report')

    const [selectedOption, setSelectedOption] = useState(null);
    const [showDiolog,setShowDialog] = useState(false);
 
    const handleOptionChange = (option) => {
      setSelectedOption(option);
      // Additional functionality based on the selected option
    };
 
    const handleSubmit = () => {
      // Perform your submit logic here
 
      // Show the dialog box
      setShowDialog(true);
      
    };
 
    const handleCloseDialog = () => {
      // Close the dialog box
      setShowDialog(false);
    };
    const handlePageChange = (page) => {
      setActivePage(page);
    };
    return (
        <>   
           <Sidebar setActivePage={handlePageChange} activePage={activePage} />
           <Box sx = {{marginLeft : '120px'}}>
     <TempHeader />
     </Box> 
     <Box sx = {{ borderBottom:'2px solid #E5E5E5', width:'100%', marginTop:'-4px'}}></Box>
      <div className="flex justify-center ml-[3%]   lg:ml-[5%] md:ml-[9%] sm:ml-[10%] ">
    <div className="w-1/3 p-6">
      <h1 className="font-poppins mt-1 text-[30px] font-bold leading-9 text-center">Detailed Report</h1>
      <h6 className="font-poppins mt-0 text-1 font-normal leading-9 text-center">Get an overview of Data Collection</h6>

    
 
      {/* Table */}
{/* Box with Table */}
<div className="w-[235px] mx-auto mt-[120px]">
  <div className="bg-loworange rounded-tl-[19px] rounded-tr-[19px] flex items-center text-center" style={{ height: '50px', fontFamily: 'Poppins', fontSize: '15px', fontWeight: 600, lineHeight: '23px', letterSpacing: '0em', border: '1px solid #E5E5E5', borderTopLeftRadius: '19px', borderTopRightRadius: '19px' }}>
    <div className="flex-1">Mumbai Report</div>
    <div className="flex-1">14/12/2023</div>
  </div>
  <div className="bg-loworange rounded-bl-[19px] rounded-br-[19px] flex items-center text-center" style={{ height: '50px', fontFamily: 'Poppins', fontSize: '15px', fontWeight: 600, lineHeight: '23px', letterSpacing: '0em', border: '1px solid #E5E5E5', borderBottomLeftRadius: '19px', borderBottomRightRadius: '19px' }}>
    <div className="flex-1">Total Distance</div>
    
    <div className="flex-1">23.00 Kms</div>
  </div>
</div>


      <h1 className="font-poppins  text-2xl font-bold leading-9 text-center mt-[200px]">
        Road Analysis
      </h1>
 
      {/* <div className='mt-8 text-white mx-auto' style={{ width: '186px', height: '55px', borderRadius: '10px', backgroundColor: '#72CB70', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Poppins', fontSize: '24px', fontWeight: 700, fontStyle:'bold', lineHeight: '36px', textAlign: 'center', color: '#FFFFFF'  }}>
        Good
      </div> */}
 
 <div className="flex items-center justify-center mt-[20px] relative">
  <div className="relative">
    <input
      type="text"
      placeholder="Search here"
      className="border rounded pl-8 pr-4 py-2" // Adjust padding for icon
      style={{
        fontFamily: 'Poppins',
        fontSize: '12px', // Decreased placeholder size
        fontWeight: 'normal',
        letterSpacing: '0em',
        textAlign: 'center',
        outline: 'none', // Optional: Remove default outline styles
        border: '1px solid #FE6100', // Updated border styling
        width: '250px', // Optional: Adjust width as needed
      }}
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      className="w-6 h-6 text-primary absolute left-2 top-2" // Adjust position
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  </div>
</div>



    </div>
 
    <div className="w-2/3 p-6 relative">
      {/* Content for the second column goes here */}
      <div className="flex mt-4">
  
      <div className="w-[300px] h-[300px] border border-black rounded-md mr-01 flex flex-col">
  {/* Content for the first box goes here */}
  <img
    style={{
      width: '150px',
      height: '150px',
      flexShrink: 0,
      marginLeft: '20px',
      borderRadius: '8px', // Optional: Add rounded corners
    }}
    src="icons/pie.png"
    alt=""
  />
  {/* Place the provided div structures below the image */}
  <div className="px-4 py-2 bg-white bg-opacity-75 rounded-md mt-3">
    <div className="flex justify-center items-center">
      <div className="w-[16px] h-[16px] bg-[#83CE01] rounded-full"></div>
      <div className="ml-4 w-20">Good</div>
      <div className="ml-12 w-[100px] h-[11px] bg-[#83CE01] rounded flex items-center justify-center"></div>
    </div>
  </div>
 
    <div className="flex justify-center items-center mt-[-1%]">
      <div className="w-[16px] h-[16px] bg-[#a2e685] rounded-full"></div>
      <div className="ml-4 w-20">Average</div>
      <div className="ml-12 w-[100px] h-[11px] bg-[#a2e685] rounded flex items-center justify-center"></div>
    </div>


    <div className="flex justify-center items-center">
      <div className="w-[16px] h-[16px] bg-[#FF8A00] rounded-full"></div>
      <div className="ml-4 w-20">Bad</div>
      <div className="ml-12 w-[100px] h-[11px] bg-[#FF8A00] rounded flex items-center justify-center"></div>
   
  </div>

    <div className="flex justify-center items-center">
      <div className="w-[16px] h-[16px] bg-[#FF2222] rounded-full"></div>
      <div className="ml-4 w-20">Poor</div>
      <div className="ml-12 w-[100px] h-[11px] bg-[#FF2222] rounded flex items-center justify-center"></div>
    </div>

</div>

<div className="w-[400px] h-[300px] border border-black rounded-md ml-1">
  {/* Content for the second box goes here */}
  {/* Replace the existing content with the BarChart component */}
  <BarChart
    xAxis={[{ scaleType: 'band', data: ['Potholes', 'Speed Breakers', 'Manholes'] }]}
    series={[
   
  
      { data: [2, 5, 6] ,
      // color: ['#FF0000', '#5E5CC3', '#FFBB56'],
      color: ['#FF0000', '#5E5CC3', '#FFBB56'],
    },
    ]}
    width={400} // Set the width according to your design
    height={300} // Set the height according to your design
  />
</div>

  </div>
   
    {/* <img className='w-[766px] mt-12' src='icons/indicator.png'/> */}
    {/* <div className='flex w-[766px] justify-center mt-3'>
    <h1 className="font-poppins text-2l font-semibold leading-6 tracking-tight text-left ">
      Road Network Health Indicator
    </h1>
    </div> */}
    </div>
    <Dialog open={open} onClose={handleClose}>
    <div className="fixed top-0 left-0 w-full  h-full flex justify-center items-center">
      <div className="bg-white rounded-[26px]  p-8 relative flex flex-col  justify-evenly ">
        {/* Close button inside the dialog */}
        <button
          className="absolute top-0  right-0"
          onClick={handleClose}
        >
          <img
            src={wrongicon}
            alt="Close Icon"
            className="w-12 h-12"
          />
        </button>
 
        {/* Dialog content */}
       
        {/* Add more content or icons as needed */}
        <div className="w-[766px] h-[459px] mt-12 flex flex-col justify-evenly left-585 rounded-lg bg-white p-4 font-poppins text-white">
        <h1 style={{ fontFamily: 'Poppins', fontSize: '32px', fontWeight: 600, lineHeight: '48px', letterSpacing: '0em', textAlign: 'center' }} className="text-black text-2xl text-center font-bold mb-4">
    Select The Report
</h1>


    <div className="flex justify-evenly items-center"  style={{
      fontFamily: 'Poppins',
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: '24px',
      letterSpacing: '0em',
      textAlign: 'center',
    }}>
      {/* First Row */}
      <button onClick={() => handleButtonClick('Budget Report')}  className="w-[194px] h-[75px] rounded-md bg-primary focus:outline-none">Budget Report</button>
      <button onClick={() => handleButtonClick('Estimate Report')}  className="w-[194px] h-[75px] rounded-md bg-primary focus:outline-none ">Estimate Report</button>
    </div>
    <div className="flex justify-evenly items-center"  style={{
      fontFamily: 'Poppins',
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: '24px',
      letterSpacing: '0em',
      textAlign: 'center',
    }}>
      {/* Second Row */}
      <button onClick={() => handleButtonClick('Road Roughness Report')}  className="w-[194px] h-[75px] rounded-md bg-primary focus:outline-none ">Road Roughness Report</button>
      <button onClick={() => handleButtonClick('Comparison Report')}  className="w-[194px] h-[75px] rounded-md bg-primary focus:outline-none ">Comparison
Report</button>
    </div> <div className="flex justify-evenly items-center"  style={{
      fontFamily: 'Poppins',
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: '24px',
      letterSpacing: '0em',
      textAlign: 'center',
    }}>
      {/* Second Row */}
      <button onClick={ ()=>handleButtonClick('Detailed Road Report')} className="w-[194px] h-[75px] rounded-md bg-primary focus:outline-none ">Detailed Road
Report</button>
      <button onClick={()=>handleButtonClick('Arboriculture Report')} className="w-[194px] h-[75px] rounded-md bg-primary focus:outline-none ">Arboriculture
Report</button>
    </div>
 
   
    {/* New content below */}
  </div>
 
 
 
      </div>
    </div>
      </Dialog>

 
          {/* New content below */}
       
 
  </div>
  </>
    );
  };
 

export default BuyReport