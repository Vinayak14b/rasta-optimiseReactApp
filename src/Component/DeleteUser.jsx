import { useState } from 'react';

const modalOverlayStyle = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  background: 'rgba(255, 255, 255, 0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modalContentStyle = {
  background: 'white',
  padding: '40px',
  borderRadius: '8px',
  textAlign: 'center',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
};

const buttonStyle = {
  width: '100px',
  
  padding: '12px',
  fontSize: '16px',
  borderRadius: '8px',
  fontWeight: 'bold',
  margin: '0 10px',
};

const DeleteUser = () => {
  const [selectedPlan, setSelectedPlan] = useState('Platinum'); // Default plan
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  };

  const handleDeleteUser = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    setIsDialogOpen(false);
  };

  return (
    <div>
      {/* Existing code */}
      {/* <InnerSideBar setActivePage={handlePageChange} activePage={activePage} /> */}

      <div className="text-center mt-8">
        <h1 className="text-4xl font-bold mr-[80%]">Profile</h1>

        <div className="flex absolute w-[300px] h-[50px] right-3 mt-20 items-center shadow-xl rounded-md mr-[30%]">
          <img src="icons/platinum.png" alt="" className="w-5 h-7 ml-2 mt-0" />

          <div className="ml-4 flex justify-center items-center">
            <p className="font-poppins text-base font-normal leading-6 text-left">
              <b>Your Plan:</b>
              {/* Dropdown for plan selection */}
              <select
                value={selectedPlan}
                onChange={handlePlanChange}
                className="ml-2 border-b-2 "
              >
                <option value="Platinum">Platinum</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Enterprise Plan">Enterprise Plan</option>
                {/* Add more options as needed */}
              </select>
            </p>
          </div>
        </div>
        <div className="p-2 w-[300px] flex flex-col items-center mt-10 ml-[20%]">
          <div className="relative flex justify-center">
            <img
              src="icons/verifiedprofile.png"
              alt="Avatar"
              className="w-[60%] h-[60%] rounded-full mb-4"
            />
            <img src="icons/greentick.png" alt="" className="w-7 h-7 absolute top-0 right-0 mr-[50%]" />
          </div>
          <button
            style={{
              width: '150px',
              padding: '12px',
              fontSize: '16px',
              backgroundColor: '#FE6100',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            Verified
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-10  mt-10 ml-[20%]">
          {/* Left side for Authority/Posting Verifications */}
          <div className="col-span-1">
            <div className="grid grid-rows-3 gap-2">
              <div className="row-span-1 bg-[#FFF1E7] p-2 w-[300px] flex items-center rounded ">
                <p>Authority:</p>
              </div>
              <div className="row-span-1 bg-[#FFF1E7] p-2 w-[300px] flex items-center rounded ">
                <p>State:</p>
              </div>
              <div className="row-span-1 bg-[#FFF1E7] p-2 w-[300px] flex items-center rounded">
                <p>Current Level:</p>
              </div>
              <div className="row-span-1 bg-[#FFF1E7] p-2 w-[300px] flex items-center rounded ">
                <p>Sub-Division:</p>
              </div>
            </div>
          </div>

          {/* Right side for Documents Submitted */}
          <div className="col-span-1 ">
            <div className="grid grid-rows-4 gap-2 mt-[-10%] ml-[-30%]">
              <div className="row-span-1 bg-gray-200 p-2 w-[300px] flex items-center rounded ">
                <p>First Name:</p>
              </div>
              <div className="row-span-1 bg-gray-200 p-2 w-[300px] flex items-center rounded">
                <p>Last Name</p>
              </div>
              <div className="row-span-1 bg-gray-200 p-2 w-[300px] flex items-center rounded">
                <p>Mobile No.:</p>
              </div>
              <div className="row-span-1 bg-gray-200 p-2 w-[300px] flex items-center rounded">
                <p>Email ID:  example@gmail.com</p>
              </div>
              <div className="row-span-1 bg-gray-200 p-2 w-[300px] flex items-center rounded ">
                <p>User Type:</p>
              </div>
              <div className="row-span-1 bg-gray-200 p-2 w-[300px] flex items-center rounded ">
                <p>Designation:</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={handleDeleteUser}
              style={{
                width: '150px',
                padding: '12px',
                fontSize: '16px',
                backgroundColor: '#FE6100', // Change to your desired color
                borderRadius: '8px',
                color: 'white',
                fontWeight: 'bold',
              }}
            >
              Delete User
            </button>
          </div>
        </div>
      </div>

      {/* Render the Modal component */}
      {isDialogOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2>Are you sure you want to delete this user?</h2>
            <button onClick={handleConfirmDelete}
             style={{ ...buttonStyle, backgroundColor: '#FE6100', color: 'white' }}
            >Yes</button>
            <button onClick={handleCloseDialog}
             style={{ ...buttonStyle, backgroundColor: '#FE6100', color: 'white' }}>
              No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteUser;
