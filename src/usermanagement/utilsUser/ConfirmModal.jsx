import Modal from '@mui/material/Modal';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	// border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

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
    fontWeight: '400',
};

export const ConfirmModal = ({ isOpen, closeModal, modalConfig }) => {

    const { text, onConfirm } = modalConfig;;

	return (
		<div>
			<Modal
				open={isOpen}
				onClose={closeModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				{/* <Box sx={style}> */}
					{/* <Typography
						id="modal-modal-title"
						variant="h6"
						component="h2">
						Text in a modal
					</Typography>
					<Typography id="modal-modal-description" sx={{ mt: 2 }}>
						{text}
					</Typography> */}
					<div  style={modalOverlayStyle}>
						<div
							style={modalContentStyle}
							className="gap-y-5 font-poppins flex-col justify-center items-center">
							<h2
								className="font-poppins texsbase
									">
								{text}
							</h2>
							<div className="flex gap-x-5 mx-auto mt-4 justify-center items-center">
								<button
									onClick={onConfirm}
									style={{
										...buttonStyle,
										backgroundColor: '#FE6100',
										color: 'white',
									}}
									className="font-poppins">
									Yes
								</button>
								<button
									onClick={closeModal}
									style={{
										...buttonStyle,
										backgroundColor: '#FE6100',
										color: 'white',
									}}
									className="font-poppins">
									No
								</button>
							</div>
						</div>
					</div>
				{/* </Box> */}
			</Modal>
		</div>
	);
};




















// export const ConfirmModal = () => {


// 	return (
// 		<div>
// 			<div class="w-[250px] flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl ">
// 				<div class="">
// 					<div class="text-center p-3 flex-auto justify-center">
// 						<svg
// 							xmlns="http://www.w3.org/2000/svg"
// 							class="w-12 h-12 flex items-center text-gray-600 mx-auto"
// 							viewBox="0 0 20 20"
// 							fill="currentColor">
// 							<path
// 								fill-rule="evenodd"
// 								d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
// 								clip-rule="evenodd"></path>
// 						</svg>
// 						<h2 class="text-xl font-bold py-4 text-gray-200">
// 							Are you sure?
// 						</h2>
// 						<p class="text-sm text-gray-500 px-2">
// 							Do you really want to delete your account? This
// 							process cannot be undone
// 						</p>
// 					</div>
// 					<div class="p-2 mt-2 text-center space-x-1 md:block">
// 						<button class="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300">
// 							Cancel
// 						</button>
// 						<button class="bg-green-400 hover:bg-green-500 px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-300 hover:border-green-500 text-white rounded-full transition ease-in duration-300">
// 							Confirm
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };