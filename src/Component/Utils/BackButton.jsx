import { useNavigate } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export const BackButton = ({ direct }) => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(direct);
	};

	const buttonStyles = {
		cursor: 'pointer',
		backgroundColor: '#FE6100',
		padding: '6px',
		borderRadius: '50%', // Use '50%' for a circular shape
		marginBottom: '5px',
		
	};

	return <ArrowBackIosNewIcon sx={buttonStyles} onClick={handleBack} />;
};
