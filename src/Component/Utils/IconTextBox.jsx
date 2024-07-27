import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

const IconTextBox = ({ icon, label, placeholder }) => {
	return (
		<div>
			<Typography variant="subtitle1" gutterBottom className="">
				<p className="font-roboto font-semibold">{label}</p>
			</Typography>
			<div className="h-2">
				<TextField
					fullWidth
					placeholder={placeholder}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<img src={icon} alt="icon" className="h-3 " />
							</InputAdornment>
						),
					}}
					className="rounded-lg"
				/>
			</div>
		</div>
	);
};

export default IconTextBox;
