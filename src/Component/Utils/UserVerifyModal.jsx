import CloseButton from './CloseButton';

const UserVerifyModal = ({ isOpen, onClose, children }) => {
	return (
		<div
			className={`fixed w-full h-full left-0 top-0 bottom-0 flex items-center justify-center z-50 ${
				isOpen ? 'visible' : 'invisible'
			}`}>
			<div className="bg-black bg-opacity-50 backdrop-filter backdrop-blur-[4px] absolute w-full h-full"></div>
			<div className="bg-white p-4 rounded shadow-lg flex flex-col w-[60%] h-[80%] relative">
				<div className="flex items-start justify-end mb-2 top-2">
					<button
						className="text-gray-600 cursor-pointer"
						onClick={onClose}>
						<CloseButton />
					</button>
				</div>
				<div className="border-2 border-orange-400 flex-grow rounded-lg">
					{children}
				</div>
			</div>
		</div>
	);
};

export default UserVerifyModal;
