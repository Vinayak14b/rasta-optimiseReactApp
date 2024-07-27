import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Modal from 'react-modal';
import ChangePassword from './ChangePassword';
import ChangeDefaultValues from './ChangeDefaultValues';
import '../CSS/settings.css';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const Downloadpdf = (props) => {
	const { onClickSubmitDefault } = props;
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [tabItem, setTabItem] = useState(1);

	const navigate = useNavigate();

	const openDialog = () => setIsDialogOpen(true);
	const closeDialog = () => setIsDialogOpen(false);

	const onClickTabItem = (value) => {
		setTabItem(value);
	};

	useEffect(() => {
		openDialog();
	}, []);

	return (
		<div>
			<Modal
				isOpen={isDialogOpen}
				onRequestClose={closeDialog}
				contentLabel="Settings Dialog"
				style={{
					overlay: {
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
					},
					content: {
						width: '797px',
						height: '419px',
						margin: 'auto',
						overflow: 'hidden',
					},
				}}>
				{tabItem === 1 ? (
					<div
						className="mx-auto mt-8 relative"
						style={{ width: '22vw', height: '78vh' }}>
						<div className="flex flex-col items-center">
							<p className="text-center text-gray-600 settings-heading">
								Download Report
							</p>
							<p className=" text-center  text-gray-600 text-sm settings-content">
								Choose a format to download report
							</p>
						</div>
						<div className="grid grid-rows-3 gap-4">
							<div
								className="row-span-1 p-4 flex items-center w-[300px]"
								// onClick={redirectToManageUser}
							>
								<img
									src="icons/pdf2.png"
									alt=""
									className="w-[84px] mt-8 h-[84px] flex space-x-4"
								/>

								<img
									src="icons/pdf2.png"
									alt=""
									className="w-[84px] mt-8 ml-[150px] h-[84px] flex space-x-8"
									style={{
										boxSizing: 'border-box',
										border: '1px solid #FF8A00',
										padding: '10px',
									}}
								/>
								<img
									src="icons/crown.png"
									alt=""
									className="w-[20px] h-auto absolute  right-[10px] top-[106px] transform -translate-x-50"
								/>
								<img
									src="icons/hand.png"
									alt=""
									className="w-[30px] h-auto absolute  right-[38px] top-[175px] transform -translate-x-50"
								/>
								<img
									src="icons/ash.png"
									alt=""
									className="w-[40px] h-auto absolute  right-[1px] top-[180px] transform -translate-x-50"
								/>
								<div
									style={{
										position: 'absolute',
										top: '172px',
										left: '312px',
										transform: 'translate(-50%, 0)',
										padding: '8px', // Optional: Add padding to adjust the distance between the image and the text
									}}>
									<span
										style={{
											fontFamily: 'Arial, sans-serif',
											fontSize: '14px',
											fontWeight: 'bold',
										}}>
										pdf
									</span>
								</div>

								<img
									src="icons/redbg.png"
									alt=""
									className="w-[2210px] h-[40px] flex space-x-4"
									style={{
										position: 'relative',
										top: '120px',
										right: '365px',
									}}
									onClick={() => {
										navigate('/credit'); // Replace "/credit" with the actual path of your credit page
									}}
								/>
								<SaveAltIcon
									style={{
										position: 'relative',
										top: '120px',
										right: '530px',
										color: 'white',
									}}
								/>
								<img
									src="icons/Pay & Download.png"
									alt=""
									className="  flex space-x-4"
									style={{
										position: 'relative',
										top: '120px',
										right: '520px',
										width: '110px',
									}}
								/>
							</div>
							<div
								className="w-[221px] h-[40px] flex space-x-4"
								style={{
									position: 'relative',
									top: '8px',
									left: '18px',
								}}>
								<img
									src="icons/goldbg.png"
									alt=""
									className="w-[221px] h-[40px]"
									style={{
										position: 'absolute',
										top: '1px',
										left: '190px',
									}}
								/>
								<SaveAltIcon
									style={{
										position: 'absolute',
										top: '20px',
										left: '195px',
										transform: 'translate(-50%, -50%)',
										color: 'black',
									}}
								/>
								<img
									src="icons/upgrade.png"
									alt=""
									className="flex space-x-4"
									style={{
										position: 'absolute',
										top: '20px',
										left: '300px',
										transform: 'translate(-50%, -50%)',
										width: '180px',
									}}
								/>
							</div>
						</div>
					</div>
				) : (
					''
				)}
				{tabItem === 2 ? (
					<ChangePassword onClickTabItem={onClickTabItem} />
				) : (
					''
				)}
				{tabItem === 3 ? (
					<ChangeDefaultValues
						onClickTabItem={onClickTabItem}
						onClickSubmitDefault={onClickSubmitDefault}
					/>
				) : (
					''
				)}
			</Modal>
		</div>
	);
};

export default Downloadpdf;


