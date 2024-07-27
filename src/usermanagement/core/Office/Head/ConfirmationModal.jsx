import Modal from 'react-modal';

const ConfirmationModal = ({ handleConfirmationYes, handleConfirmationNo }) => {
	return (
		<Modal
			isOpen={true}
			contentLabel="Confirmation Modal"
			className="flex justify-center items-center relative bg-white p-6 shadow-md border-2 border-orange-500 rounded-lg"
			style={{
				overlay: {
					backgroundColor: 'rgba(255, 255, 255, 0.1)',
					backdropFilter: 'blur(4px)',
					zIndex: 1000,
				},
				content: {
					zIndex: 1001,
					width: '40vw',
					Height: '90vh',
					margin: 'auto',
					overflow: 'hidden',
					borderRadius: '25px',
					top: '50%',
					left: '23%',
					transform: 'translate(-50%, -50%)', // Center the modal both horizontally and vertically
				},
			}}>
			<div className="text-center">
				<p className="text-lg mb-4">
					Are you sure you want to ReAssign the Head?
				</p>
				<div className="flex justify-between">
					<button
						onClick={handleConfirmationYes}
						className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
						Yes
					</button>
					<button
						onClick={handleConfirmationNo}
						className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
						No
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default ConfirmationModal;
