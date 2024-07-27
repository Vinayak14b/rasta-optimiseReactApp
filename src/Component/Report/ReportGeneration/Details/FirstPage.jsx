import RastaLogo from '../../../../assets/ImgForReport/RastaLogo.png'

export default function FirstPage({clientName}) {
	return (
		<>
			<div className="w-full text-center text-2xl flex flex-col justify-start items-center">
				<div className="flex justify-center items-center text-blue-800 text-3xl font-inter">
					DETAILED ROAD REPORT OF ROAD INSPECTION USING <br/> 
                    AI/ML BASED ROAD NETWORK MONITORING <br/>
                    TECHNOLOGY <br/>
                    For <br/>
                    Public Works Department<br/>
                    {clientName?.regionName ? `Region: ${clientName?.regionName}` : ""} <br/>
                    {clientName?.circleName ? `Circle: ${clientName?.circleName}` : ""} <br/>
                    {clientName?.divisionName ? `Division: ${clientName?.divisionName}` : ""} <br/>
                    {clientName?.subDivisionName ? `Sub Division: ${clientName?.subDivisionName}` : ""} <br/>
                    {clientName?.roadName ? `Road Name: ${clientName?.roadName}` : ""} <br/>
				</div>
                <br/>
                <br/>
				<div className='w-[40vw] h-[30vh]'>
                    <img src={RastaLogo} alt="Rasta Logo" />
                </div>
                <br/>
                <br/>
				<div className='text-sm'>
					<p className='text-orange-500 text-2xl'>AI Unika Technologies (P) Ltd</p>
                    <p className='text-sm'>
					903, Gera Business Center, Wipro Circle, <br/>
                    Rajiv Gandhi Infotech Park, Hinjewadi Phase-2, Pune-57
                    </p>
				</div>
			</div>
		</>
	);
}
