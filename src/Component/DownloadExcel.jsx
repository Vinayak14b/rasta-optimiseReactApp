import { useState, useEffect } from 'react';

import Modal from 'react-modal';
import ChangePassword from './ChangePassword';
import ChangeDefaultValues from './ChangeDefaultValues';
import '../CSS/settings.css';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

const DownloadExcel = (props) => {
	const { onClickSubmitDefault } = props;
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [tabItem, setTabItem] = useState(1);

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
									src="icons/excel.png"
									alt=""
									className="w-[84px] mt-8 ml-[150px] h-[84px] flex space-x-8"
								/>

								<img
									src="icons/redbg.png"
									alt=""
									className="w-[2210px] h-[40px] flex space-x-4"
									style={{
										position: 'relative',
										top: '120px',
										right: '365px',
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
								<div
									style={{
										position: 'absolute',
										top: '260px',
										right: '150px',
										transform: 'translate(-50%, -50%)',
										color: 'white',
										textAlign: 'center',
										fontSize: '14px',
										fontWeight: 'normal',
										whiteSpace: 'nowrap',
									}}>
									Download as pdf
								</div>
							</div>
							<div
								className="w-[221px] h-[40px] flex space-x-4"
								style={{
									position: 'relative',
									top: '8px',
									left: '18px',
								}}>
								<img
									src="icons/greenbg.png"
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
										color: 'white',
									}}
								/>
								{/* Add the text container */}
								<div
									style={{
										position: 'absolute',
										top: '20px',
										left: '280px',
										transform: 'translate(-50%, -50%)',
										color: 'white',
										textAlign: 'center',
										fontSize: '14px',
										fontWeight: 'normal',
										whiteSpace: 'nowrap',
									}}>
									Download as Excel
								</div>
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

export default DownloadExcel;

