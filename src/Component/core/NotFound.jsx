import { useNavigate } from 'react-router-dom';
import { core } from '../../assets/IconArray';

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<div
			className="not-found-container"
			style={{ display: 'flex', height: '100vh' }}>
			<div
				className="not-found-content"
				style={{
					flex: '1',
					backgroundColor: '#FFA378',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				{/* Text and image container */}
				<div
					style={{
						display: 'flex',
						flexDirection: 'row-reverse',
						alignItems: 'center',
					}}>
					{/* Image positioned to the left */}
					<div style={{ marginLeft: '60px' }}>
						<img
							src={core.notfound}
							alt="Page Not Found"
							style={{ width: '500px', height: '300px' }}
						/>
					</div>

					{/* Text container */}
					<div style={{ textAlign: 'left' }}>
						<h1
							style={{
								// fontStyle: 'inter',
								fontSize: '5em',
								fontWeight: 'bold',
							}}
							className="font-inter">
							404
						</h1>
						<h2
							style={{
								fontStyle: 'inter',
								fontSize: '3em',
							}}
							className="font-inter text-2xl font-bold mb-2">
							Page Not Found!
						</h2>
						<div className="font-inter text-xl">
							<p style={{ marginBottom: '20px' }} />
							<p>We're sorry,</p>
							<p> the page you requested</p>
							<p>could not be found.</p>
							<p>Please go back to</p>
							<p>Homepage</p>
							<p style={{ marginBottom: '20px' }} />
						</div>

						{/* Button below the text */}
						<button
							onClick={() => navigate('/login')}
							className="homepage-button"
							style={{
								margin: '20px 0',
								width: '160px',
								height: '43px',
								borderRadius: '6px',
								backgroundColor: '#FE6100',
								fontWeight: '200',
								color: 'white',
								fontFamily: 'Poppins',
							}}>
							Homepage
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
