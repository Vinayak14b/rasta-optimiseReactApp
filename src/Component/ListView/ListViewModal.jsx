import Modal from '@mui/material/Modal';
import {useNavigate } from 'react-router-dom'
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

export const ListViewModal = ({ isOpen, setIsOpen, text, flag }) => {
	const navigate = useNavigate();
	const directtolistView = () => {
		navigate(-1);
	};

	// const openModal = (config) => {
	// 	setIsOpen(true);
	// };

	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<div>
			<Modal
				open={isOpen}
				onClose={closeModal}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description">
				<div style={modalOverlayStyle}>
					<div
						style={modalContentStyle}
						className="gap-y-5 font-poppins flex-col justify-center items-center">
						<h2
							className="font-poppins text-xl font-semibold
									">
							{text}
						</h2>
						<div className="flex gap-x-5 mx-auto mt-4 justify-center items-center">
							{flag === 'survey' && (
								<button
									onClick={() => directtolistView()}
									style={{
										...buttonStyle,
										backgroundColor: '#FE6100',
										color: 'white',
									}}
									className="font-poppins">
									Go Back
								</button>
							)}

							{flag === 'compare' && (
								<button
									onClick={() => closeModal()}
									style={{
										...buttonStyle,
										backgroundColor: '#FE6100',
										color: 'white',
									}}
									className="font-poppins">
									Close
								</button>
							)}
						</div>
					</div>
				</div>
				{/* </Box> */}
			</Modal>
		</div>
	);
};
















