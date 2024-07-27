import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Modal from 'react-modal';
import ChangePassword from './ChangePassword';
import ChangeDefaultValues from './ChangeDefaultValues';
import '../CSS/settings.css';
import Box from '@mui/material/Box';

const Credit = (props) => {
	const { onClickSubmitDefault } = props;
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [tabItem, setTabItem] = useState(1);
	const [selectedMonth, setSelectedMonth] = useState('');
	const [selectedYear, setSelectedYear] = useState('');
	const [cvv, setCvv] = useState('');
	const [isChecked, setIsChecked] = useState(false);
	const navigate = useNavigate();

	const openDialog = () => setIsDialogOpen(true);
	const closeDialog = () => setIsDialogOpen(false);

	const { state, dispatch } = useContext(UserContext);

	const onClickTabItem = (value) => {
		setTabItem(value);
	};

	useEffect(() => {
		openDialog();
	}, []);

	const [selectedValue, setSelectedValue] = useState('');

	const handleRadioChange = (event) => {
		setSelectedValue(event.target.value);
	};

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
						width: '960px',
						height: ' 802px',
						margin: 'auto',
						overflow: 'hidden',
					},
				}}>
				{tabItem === 1 ? (
					<div className="mx-auto mt-8 relative">
						<div className="flex flex-col   ">
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
								}}>
								<img
									src="icons/color.png"
									alt="Transaction Fee"
									style={{
										width: '50px',
										height: '30px',
										marginLeft: '700px',

										backgroundColor: ' #000066',
									}}
								/>
								<img
									src="icons/visa.png"
									alt=""
									style={{
										width: '50px',
										height: '30px',
										marginLeft: '800px',
										backgroundColor: 'pink',
									}}
								/>
							</div>
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<input
									type="radio"
									id="points"
									className="radio-points"
									name="default"
									checked={selectedValue === 'points'}
									onChange={handleRadioChange}
									value="points"
								/>
								<label
									for="points"
									className="points-label ml-[20px] "
									style={{
										color: '#000',
										fontFamily: 'Montserrat',
										fontSize: '20px',
										fontStyle: 'normal',
										fontWeight: '700',
										lineHeight: '36px',
										letterSpacing: '1.1px',
									}}>
									Credit & Debit cards
								</label>
							</Box>

							<p
								className="ml-[20px] "
								style={{
									color: '#000',
									fontFamily: 'Montserrat',
									fontSize: '16px',
									fontStyle: 'normal',
									fontWeight: '400',
									lineHeight: '36px',
									letterSpacing: '1.52px',
								}}>
								Transciction fee may apply
							</p>

							<div className="ml-[20px] mt-4">
								<label
									htmlFor="transactionName"
									style={{
										color: '#000',
										fontFamily: 'Montserrat',
										fontSize: '15px',
										fontStyle: 'normal',
										fontWeight: '500',
										lineHeight: '36px',
										letterSpacing: '1.805px',
									}}>
									Cardholder Name
								</label>
								<br />
								<input
									type="text"
									id="transactionName"
									className="border border-gray-300 px-2 py-1 mt-2 w-[890px]"
								/>
							</div>
							<div className="ml-[20px] mt-4">
								<label
									htmlFor="transactionName"
									style={{
										color: '#000',
										fontFamily: 'Montserrat',
										fontSize: '15px',
										fontStyle: 'normal',
										fontWeight: '500',
										lineHeight: '36px',
										letterSpacing: '1.805px',
									}}>
									Card Number
								</label>
								<br />
								<input
									type="text"
									id="transactionName"
									className="border border-gray-300 px-2 py-1 mt-2 w-[890px]"
								/>
							</div>

							<div className="ml-[20px] mt-4 flex">
								{/* Month input */}
								<div style={{ marginRight: '20px' }}>
									<label
										htmlFor="transactionMonth"
										style={{
											color: '#000',
											fontFamily: 'Montserrat',
											fontSize: '16px',
											fontStyle: 'normal',
											fontWeight: '400',
											lineHeight: '36px',
											letterSpacing: '1.52px',
										}}>
										Enter Month:
									</label>
									<br />
									<input
										type="month"
										id="transactionMonth"
										className="border border-gray-300 px-2 py-1 mt-2"
										value={selectedMonth}
										onChange={(e) =>
											setSelectedMonth(e.target.value)
										}
									/>
								</div>

								{/* Year input */}
								<div style={{ marginRight: '20px' }}>
									<label
										htmlFor="transactionYear"
										style={{
											color: '#000',
											fontFamily: 'Montserrat',
											fontSize: '16px',
											fontStyle: 'normal',
											fontWeight: '400',
											lineHeight: '36px',
											letterSpacing: '1.52px',
										}}>
										Enter Year:
									</label>
									<br />
									<input
										type="number"
										id="transactionYear"
										className="border border-gray-300 px-2 py-1 mt-2"
										value={selectedYear}
										onChange={(e) =>
											setSelectedYear(e.target.value)
										}
									/>
								</div>

								{/* CVV input */}
								<div>
									<label
										htmlFor="transactionCVV"
										style={{
											color: '#000',
											fontFamily: 'Montserrat',
											fontSize: '16px',
											fontStyle: 'normal',
											fontWeight: '400',
											lineHeight: '36px',
											letterSpacing: '1.52px',
										}}>
										Enter CVV:
									</label>
									<br />
									<input
										type="text"
										id="transactionCVV"
										className={`border border-gray-300 px-2 py-1 mt-2 ${
											cvv.length !== 3 &&
											cvv.length > 0 &&
											'border-red-500'
										}`}
										value={cvv}
										onChange={(e) => setCvv(e.target.value)}
									/>
									{cvv.length !== 3 && cvv.length > 0 && (
										<span className="text-red-500 text-sm ml-2">
											! 3 digits
										</span>
									)}
								</div>
							</div>
							<div className="ml-[20px] mt-4">
								<input
									type="checkbox"
									id="termsCheckbox"
									checked={isChecked}
									onChange={() => setIsChecked(!isChecked)}
								/>
								<label
									htmlFor="termsCheckbox"
									className="ml-2"
									style={{
										color: '#000',
										fontFamily: 'Montserrat',
										fontSize: '16px',
										fontStyle: 'normal',
										fontWeight: '400',
										lineHeight: '36px',
										letterSpacing: '1.52px',
									}}>
									I have read and accept the terms of use,
									rules of flight and privacy policy
								</label>
							</div>
							<div className="ml-[2px] mt-2 flex justify-center">
								<img
									onClick={() => {
										// Perform any necessary actions before navigating (if needed)
										// For example, you can call onClickSubmit function here

										// Navigate to the payment success page
										navigate('/payment-success');
									}}
									src="icons/Button.png"
									alt="Terms and Conditions Image"
									style={{
										width: '839px',
										height: '58px',
										alignItems: 'center',
									}}
								/>
							</div>
						</div>
						<div
							style={{
								border: '1px solid #ccc',
								padding: '2px',
								borderRadius: '10px',
								display: 'flex',
								alignItems: 'center',
								marginTop: '10px',
							}}>
							<div>
								<input
									type="radio"
									id="points"
									className="radio-points"
									name="default"
									checked={selectedValue === 'points'}
									onChange={handleRadioChange}
									value="points"
								/>
								<label
									htmlFor="points"
									className="points-label ml-[20px]"
									style={{
										color: '#000',
										fontFamily: 'Montserrat',
										fontSize: '16px',
										fontStyle: 'normal',
										fontWeight: '600',
										lineHeight: '36px',
										letterSpacing: '2.25px',
									}}>
									Online banking & Direct debit
								</label>
								<p
									className="ml-[20px]"
									style={{
										color: '#000',
										fontFamily: 'Montserrat',
										fontSize: '16px',
										fontStyle: 'normal',
										fontWeight: '400',
										lineHeight: '36px',
										letterSpacing: '1.52px',
									}}>
									Free of Charge
								</p>
							</div>
						</div>
						<div
							style={{
								border: '1px solid #ccc',
								padding: '2px',
								borderRadius: '10px',
								display: 'flex',
								alignItems: 'center',
								marginTop: '10px',
							}}>
							<div>
								<input
									type="radio"
									id="points"
									className="radio-points"
									name="default"
									checked={selectedValue === 'points'}
									onChange={handleRadioChange}
									value="points"
								/>
								<label
									htmlFor="points"
									className="points-label ml-[20px]"
									style={{
										color: '#000',
										fontFamily: 'Montserrat',
										fontSize: '16px',
										fontStyle: 'normal',
										fontWeight: '600',
										lineHeight: '36px',
										letterSpacing: '2.25px',
									}}>
									Pay with Paypal
								</label>
								<p
									className="ml-[20px]"
									style={{
										color: '#000',
										fontFamily: 'Montserrat',
										fontSize: '16px',
										fontStyle: 'normal',
										fontWeight: '400',
										lineHeight: '36px',
										letterSpacing: '1.52px',
									}}>
									Transition fee may apply
								</p>
							</div>
							<img
								src="icons/paypal.png"
								alt="Image"
								style={{
									marginLeft: '450px',
									Width: '180px',
									height: '60px',
								}}
							/>
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

export default Credit;
