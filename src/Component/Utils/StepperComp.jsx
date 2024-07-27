import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


function getTodaysDate() {
	const options = { year: 'numeric', month: 'short', day: 'numeric' };
	const today = new Date();
	return today.toLocaleDateString('en-US', options);
}

export default function StepperComp() {
	const [activeStep, setActiveStep] = React.useState(0);
	const todaysDate = getTodaysDate();

	const [steps, setSteps] = React.useState([
		{
			label: 'Pending for Acceptance',
		},
		{
			label: 'Request Pending',
		},
	]);

	const handleNext = () => {
		if (activeStep === steps.length - 1) {
			// If on the last step, update the description of the second step
			const updatedSteps = [...steps];
			updatedSteps[1].label = 'Request Accepted by Admin';
			setSteps(updatedSteps);
		}
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setSteps([
			{
				label: 'Pending for Acceptance',
			},
			{
				label: 'Request Pending',
			},
		]);
		setActiveStep(0);
	};

	

	return (
		<Box sx={{ maxWidth: 400 }}>
			<Stepper activeStep={activeStep} orientation="vertical">
				{steps.map((step, index) => (
					<Step key={step.label}>
						<StepLabel
							optional={
								index === 1 ? (
									<Typography variant="caption">
										<p className="font-inter text-[#989898] font-semibold">
											{todaysDate}
										</p>
									</Typography>
								) : null
							}>
							<p className="font-inter">{step.label}</p>
						</StepLabel>
						<StepContent>
							{/* <Typography>{step.description}</Typography> */}
							<Box sx={{ mb: 2 }}>
								<div>
									<Button
										variant="outlined"
										onClick={handleNext}
										sx={{
											mt: 1,
											mr: 1,
											'&.MuiButton-text': {
												color: '#ffffff',
											},
											color: 'white',
											background: '#FE6100',
											'&:hover': {
												background: 'white',
												color: 'black',
											},
										}}>
										{index === steps.length - 1
											? 'Accept'
											: 'Next'}
									</Button>
									{index !== 0 && (
										<Button
											onClick={handleBack}
											variant="outlined"
											sx={{ mt: 1, mr: 1 }}>
											<p className="text-black">Back</p>
										</Button>
									)}
								</div>
							</Box>
						</StepContent>
					</Step>
				))}
			</Stepper>
			{activeStep === steps.length && (
				<Button
					onClick={handleReset}
					sx={{ color: 'black', ml: '28px' }}
					className="shadow-lg ml-6">
					<p className="font-inter">Reset</p>
				</Button>
			)}
		</Box>
	);
}
