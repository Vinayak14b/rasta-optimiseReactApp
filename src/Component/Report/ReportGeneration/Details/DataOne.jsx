import mountingPhone from '../../../../assets/ImgForReport/phoneMounting.png';
import evaluation from '../../../../assets/ImgForReport/Evaluation.png';
import datacollection from '../../../../assets/ImgForReport/collectData.png';
import laptopImg from '../../../../assets/ImgForReport/Rastalaptop.png';
import rastaWorking from '../../../../assets/ImgForReport/WorkingOfRasta.png';
import laptopImgMap from '../../../../assets/ImgForReport/laptopImgWithMap.png';
import car1 from '../../../../assets/ImgForReport/car1.png';
import car2 from '../../../../assets/ImgForReport/car2.png';
import car3 from '../../../../assets/ImgForReport/car3.png';
import car4 from '../../../../assets/ImgForReport/car4.png';
import manSurvey from '../../../../assets/ImgForReport/manSurvey.png';
import satalite1 from '../../../../assets/ImgForReport/satalite1.png';
import satalite2 from '../../../../assets/ImgForReport/satalite2.png';

import '../DetailedRoadReport/DetailedRoadReport.css';

export default function DataOne() {
	return (
		<div className="w-full text-justify">
			<div className="text-md">
				<h3 className="text-blue-800 text-center text-2xl font-bold">
					Report Summery{' '}
				</h3>
				<br />
				<p className="text-blue-800 text-xl font-bold">
					Benefits of AI/ML Technology for Project Monitoring:
				</p>
				<br />
				Using smart technologies like AI and ML for project inspection,
				such as road checks, brings several advantages. It provides
				precise information, aiding in accurate assessment and easy
				comparison of conditions before and after adjustments, which
				helps in better planning. Early detection of road issues leads
				to efficient solutions. Detailed views of work quality are
				easily accessible, enabling quick identification of problems and
				their resolution. In essence, employing AI technologies for
				projects enables virtual inspections at remote locations.
				<br />
				<br />
				<p className="text-blue-800 text-xl font-bold">
					How are we revolutionizing inspections for road networks?
				</p>
				<br />
				We've enhanced our road inspection methods with comprehensive
				virtual and visual assessments. With a simple click, you can
				instantly access a detailed view of the project, allowing for
				convenient data checking from any location. This enables quick
				analysis and comparisons before and after any changes occur.
				This technology aids in early defect detection, leading to
				significant cost savings. The ability to detect issues promptly
				helps prevent larger problems from arising later on. These
				advancements streamline our inspection process and ensure better
				road maintenance.
				<br />
				<br />
				<p className="text-blue-800 text-xl font-bold">
					What benefits will the authorities & citizens get after the
					deployment of AI and ML technology?
				</p>
				<br />
				The deployment of AI and ML technology brings numerous benefits
				for both authorities and citizens. Authorities can detect road
				defects early, leading to cost savings. Real-time visual
				inspection of data is possible anytime and anywhere since it's
				stored in the system. This ensures exact and accurate
				information. Early detection also means quicker construction,
				resulting in pothole-free roads for safer driving. This
				technology streamlines road maintenance and improves driving
				conditions for everyone.
				<br />
				<br />
				<p className="text-blue-800 text-xl font-bold">
					How will the deployment of AI/ML Technology impact road
					users?
				</p>
				<br />
				The deployment of AI and ML technology in road infrastructure
				promises to significantly benefit road users. Through real-time
				data analysis, AI can enhance safety by predicting hazards like
				potholes and optimizing traffic flow. This leads to smoother
				journeys, reduced congestion, and ultimately safer and more
				efficient transportation systems.
				<br />
				<br />
				<p className="text-blue-800 text-xl font-bold">
					How will it help to save money?
				</p>
				<br />
				Cost isn't just about saving money; it's also about the lives we
				might lose and the accidents that can happen. Our main goal is
				to reduce these costs and make sure our roads are safer for
				everyone. Early detection helps us do this by making accidents
				less likely and keeping the roads in good shape. When the roads
				are smooth and safe, people can drive without any problems or
				worries about bumps or potholes.
			</div>

			<div className="page-breaks">
				<br/>
				<br/>
				<br/>
				<div>
					<p className="text-blue-800 text-xl font-bold">Our Solutions</p>
					<br />
					<p className="text-blue-800 text-xl font-bold">Rasta.AI:</p>
					<span>
						Introducing Rasta.AI, an easy-to-use AI-based mobile
						application designed for road surveys by site engineers
						or junior engineers. With just three simple steps, users
						can now obtain precise data on road conditions, making
						road surveying accessible to everyone. Rasta.ai utilizes
						advanced AI technology to analyse road conditions,
						identify defects, and store the data for easy access.
						This innovative system simplifies the process of
						detecting and recording road issues, ensuring accurate
						data collection and efficient sharing with relevant
						stakeholders. Rasta.ai transforms road maintenance by
						proactively detecting defects and managing data with AI
						technology. Accessible through both a mobile application
						and a web dashboard, Rasta.ai makes monitoring road
						conditions hassle-free.
					</span>
				</div>
				<br />
				<div className="w-full flex flex-row">
					<div className="mx-3">
						<img src={mountingPhone} alt="Mount your Smartphone" />
						<p>Mount your Smartphone</p>
					</div>
					<div className="mx-3">
						<img
							src={datacollection}
							alt="Collect and upload data"
						/>
						<p>Collect and upload data</p>
					</div>
					<div className="mx-3">
						<img src={evaluation} alt="For automatic evaluation" />
						<p>For automatic evaluation</p>
					</div>
				</div>
				<br />
				<div>
					<p className="text-blue-800 text-xl font-bold">Web Dashboard:</p>
					<span>
						Rasta. AI's web dashboard revolutionizes road
						maintenance with cutting-edge AI technology. It provides
						a 360-degree view of road conditions for quick defect
						identification and efficient budget planning. With
						secure logins and real-time visualizations, it optimizes
						maintenance efforts for safer transportation networks.
						Map Plotting: Offers a visual representation of road
						conditions, distinguishing between good, bad, and
						average roads.
					</span>
				</div>
				<br />
				<br />
				<div className="w-full flex justify-evenly">
					<div>
						<img
							src={laptopImg}
							alt="Laptop Image"
							style={{ width: '300px', height: '200px' }}
						/>
					</div>
					<div>
						<br />
						<h3 className="w-full flex justify-center items-center">
							Benefits of Dashboard
						</h3>
						<ul
							className="list-disc ml-6 text-sm"
							style={{ listStyleType: 'disc' }}>
							<li>
								Easy Visualization: Interactive maps for data
								viewing.
							</li>
							<li>
								Access Control: role-based security for privacy.
							</li>
							<li>
								Before & After Analysis: Compare data for
								decisions.
							</li>
							<li>
								Virtual Inspection: Remote assessment for
								efficiency.
							</li>
							<li>
								Visual Defects: Identify road issues visually.
							</li>
							<li>
								Pavement Condition Index (PCI) for maintenance.
							</li>
						</ul>
					</div>
				</div>
				<br />
				<div>
					<p className="text-blue-800 text-xl font-bold">Rasta 360 MINI:</p>
					Rasta 360 is a business tool that collects comprehensive
					data from all angles, giving a complete view or map of the
					city. It captures every little and big detail, providing
					detailed reports on road surface issues and inventory
					conditions. It offers customized datasets and gives users a
					complete experience based on the collected data.
				</div>
			</div>
			<div className="page-breaks">
				<br/>
				<br/>
				<br/>
				<br/>
				<div className="w-full flex flex-col justify-center items-center">
					<h3 className="text-blue-800 font-bold text-xl">
						How it Works
					</h3>
					<br />
					<div>
						<img src={rastaWorking} alt="Working of Rasta AI" />
					</div>
				</div>
				<br />
				<div className="w-full flex justify-evenly">
					<div>
						<img
							src={laptopImgMap}
							alt="Laptop Image with Map"
							style={{ width: '300px', height: '200px' }}
						/>
					</div>
					<div>
						<br />
						<ul
							className="list-disc ml-6 text-sm"
							style={{ listStyleType: 'disc' }}>
							<li>
								1. 360° Virtual Inspection: View detail road
								conditions
							</li>
							<li>
								2. Easy Defect Detection: Quickly spot road
								issues.
							</li>
							<li>
								3. Highlighted Defects: Color-coded for easy
								view
							</li>
							<li>
								4. Auto Update: data is automatically refreshed.
							</li>
							<li>
								5. Precise Accuracy: Ensures reliable and
								accurate data.
							</li>
						</ul>
					</div>
				</div>
				<br />
				<div>
					<p className="text-blue-800 font-bold text-xl">
						Detailed Summary
					</p>
					AI Unika Technologies proposes using advanced AI technology
					to improve how roads are monitored and constructed in
					Chhatrapati Sambhaji Nagar. This means making roads safer
					and better maintained. By using AI, we can find and fix
					problems with roads more quickly and efficiently, saving
					money in the long run. With continuous monitoring, we can
					also make sure roads are of higher quality, needing fewer
					major repairs. The AI technology helps us pinpoint road
					issues accurately, so we know where to focus repairs. We can
					also keep an eye on construction work in real-time to ensure
					it meets quality standards. This not only helps save costs
					for the authorities but also ensures safer roads for
					everyone, with fewer potholes and smoother journeys. Our
					solutions, like Rasta.AI for road surveys and Construction
					360 for monitoring construction sites, aim to make
					operations smoother and help decision-making. Working
					together, we'll tailor our approach to meet the specific
					needs of Chhatrapati Sambhaji Nagar, making its roads safer
					and more sustainable for the future.
				</div>
			</div>

			<div className="page-breaks">
				<br />
				<div>
					<p className="text-blue-800 text-xl font-bold">
						How will our AI create base maps with road condition
						segments?{' '}
					</p>
					There are a couple of ways to build base maps with road
					conditions, such as mobile application-based surveys and
					enterprise surveys. The enterprise methodology captures
					360-degree panoramic street imagery by using high-definition
					cameras. This enables a comprehensive representation of the
					surrounding assets, encroachments, and road conditions. The
					data is useful for inventory management and complete virtual
					inspections, but it must be gathered by professionals with
					the appropriate training. Site engineers use mobile
					photographs in mobile application-based surveys to evaluate
					road conditions in real-time; this method provides fewer
					data points but better accessibility for rapid evaluations
					and decision-making.
				</div>
				<br />
				<div>
					<p className="text-blue-800 text-xl font-bold">
						Geo-Tagged Map of Road Conditions for Better Maintenance
						Planning
					</p>{' '}
					The exact condition of the roads will be captured, and
					processed data will be segregated and geo-tagged into
					different condition layers. This allows for a clear
					assessment of road quality, enabling the identification of
					priority areas for maintenance and repair. By organizing
					data based on condition, decision-makers can efficiently
					allocate resources and focus on the most critical areas that
					require attention. This structured approach improves the
					management and upkeep of road networks.
				</div>
				<br />
				<br />
				<div>
					<p className="text-blue-800 text-xl font-bold">
						1.Compatibility
					</p>
					<br />
					<p className="text-blue-800 text-xl font-bold">
						1.1 Mobile Application (use cases)
					</p>
					<div style={{marginLeft:"5vw"}}>
					<ol
						className="list-decimal ml-6 text-md"
						style={{
							listStyleType: 'decimal',
							marginLeft: '1.5rem',
						}}>
						<li>
							Users can easily install the app to collect and
							upload road condition data.
						</li>
						<li>
							Engineers can do surveys repeatedly, regardless of
							speed limits.
						</li>
						<li>
							The data is securely stored in the cloud and
							displayed on the dashboard.
						</li>
						<li>
							You can access the data from anywhere, even
							remotely.
						</li>
						<li>You'll receive precise and accurate data.</li>
						<li>
							Data is available in 180-degree visualization
							formats.
						</li>
						<li>
							Data will be provided to confirm road conditions
							with evidence.
						</li>
					</ol>
					</div>
					<br />
					<p className="text-blue-800 text-xl font-bold">
						1. 2 Enterprise Applications (use cases)
					</p>
					<div style={{marginLeft:"5vw"}}>
					<ol
						className="list-decimal ml-6 text-md"
						style={{
							listStyleType: 'decimal',
							marginLeft: '1.5rem',
						}}>
						<li>
							High-Definition Imagery: Clear images provide
							accurate data on roads and surroundings.
						</li>
						<li>
							360-Degree Panoramic Views: Comprehensive
							visualization of road conditions and nearby areas.
						</li>
						<li>
							Geo-Tagging: Links specific road conditions to exact
							geographic locations for precise mapping.
						</li>
						<li>
							Virtual Inspections: Remote inspections enable
							efficient and safe analysis.
						</li>
						<li>
							Asset Inventory: Identifies and catalogues nearby
							assets for effective management.
						</li>
						<li>
							Condition Assessment: Evaluates road conditions like
							potholes and cracks for maintenance.
						</li>
						<li>
							Encroachment Identification: Detects unauthorized
							obstructions affecting road safety.
						</li>
						<li>
							Data Integration: Integrates data into existing
							systems for seamless analysis and planning.
						</li>
					</ol>
					</div>
				</div>
				<br />
				<div>
					<p className="text-blue-800 text-xl font-bold">
						1.3 Web Dashboard
					</p>
					<br />
					An important feature of the web dashboard is its ability to
					support all types of imagery with a single click, allowing
					users to easily visualize road conditions and detailed
					information on maps. 
				</div>
			</div>

			<div className="page-breaks">
				<p>The dashboard highlights defect points
					using colour coding based on severity, helping to quickly
					identify problem areas and prioritize repairs. This visual
					representation facilitates faster fixes and more efficient
					maintenance planning.</p>
					<br />
				<div>
					<h4 className="text-md font-bold">
						Web Dashboard Key Features
					</h4>
					<div>
						<ol
							className="text-md"
							style={{
								listStyleType: 'decimal',
								marginLeft: '2rem',
							}}>
							<li>
								Imagery Support: View various types of imagery
								for road conditions.
							</li>
							<li>
								Color-Coded Defect Points: Prioritize defects
								based on severity.
							</li>
							<li>
								Interactive Maps: Zoom and explore data
								effectively.
							</li>
							<li>
								Real-Time Updates: Access the latest
								information.
							</li>
							<li>
								Customizable Reports: Create tailored reports.
							</li>
							<li>
								Budget Calculator: Plan and allocate resources
								efficiently.
							</li>
						</ol>
					</div>
				</div>
				<br />
				<div>
					<p className="text-blue-800 text-xl font-bold">
						2. Data with evidence and security:{' '}
					</p>
					data is provided with evidence-based insights, ensuring
					accuracy and credibility. This includes 360-degree
					high-definition imagery and detailed reports from smartphone
					cameras to confirm road conditions and other observations.
					Regarding data security, measures are in place to protect
					integrity and confidentiality, safeguarding data from
					unauthorized access or tampering. We offer options for data
					storage, including NIC Cloud, the Government of India's
					official cloud for government projects, local servers at the
					organization's headquarters, and cost-effective and secure
					AWS servers. This combination of evidence-based data and
					robust security ensures reliable data for informed
					decision-making and effective road maintenance planning.
					<br />
					<br />
					<p className="text-blue-800 font-bold text-xl">SOFTWARE</p>
					The software-integrated system revolutionizes road condition
					surveys by offering advanced features that break away from
					traditional methods. This system allows for a comprehensive
					and efficient approach to monitoring and maintaining road
					conditions.
				</div>
				<br />
				<div>
					<h4>Key Features Include:</h4>
					<br />
					<ul
						className="text-md"
						style={{
							listStyleType: 'disc',
							marginLeft: '2rem',
						}}>
						<li>
							360-Degree View: Advanced virtual inspections offer
							a holistic view of road conditions, similar to
							Google Street View but more sophisticated and
							informative.
						</li>
						<li>
							Map-Based Web Dashboard: Users can access detailed,
							up-to-date information on all identified road
							features, including defects and assets.
						</li>
						<li>
							Rasta AI Mobile App: Engineers can capture data
							using any phone or vehicle without speed limits,
							enabling efficient and expansive surveys.
						</li>
						<li>
							Real-Time Analytics: Quickly identifies defects,
							allowing for rapid repairs and cost savings through
							early detection.
						</li>
						<li>
							Data Refresh in 3 Steps: Users can update maps and
							data within a few hours through a simple, three-step
							process.
						</li>
						<li>
							Detailed Reports: The system tracks asset lifespan,
							causes of breakdowns, and pre- and post-repair
							conditions for comprehensive management.
						</li>
						<li>
							Secure Access: Role-based access and end-to-end
							encryption provide secure data handling and ensure
							users only see data relevant to their role.
						</li>
						<li>
							Comprehensive Tracking: Monitors seven types of
							defects, 41+ inventory categories, and multiple
							assets with ease, all accessible with a single
							click.
						</li>
					</ul>
				</div>
			</div>

			<div className="page-breaks">
				<p className="text-blue-800 text-xl font-bold">Hardware</p>
				The software-integrated system offers advanced road condition
				surveys without the need for costly hardware. It only requires a
				360-degree camera and external GPS for capturing high-resolution
				imagery, as well as some supporting accessories like a
				360-camera car mounting kit, a construction helmet mount kit,
				and a mobile mounting stand. This streamlined hardware setup
				makes it accessible and easy to implement.
				<br />
				<br />
				<p className="text-blue-800 text-xl font-bold">Future Scope</p>
				<p>
					In the future, we aim to enhance Chhatrapati Sambhaji
					Nagar's roads by leveraging smart technology such as AI and
					machine learning. By advancing our tools, including
					Rasta.AI, Rasta 360, and Construction 360, we can predict
					road deterioration and quickly identify construction issues.
					We will consolidate road data, construction progress, and
					traffic information into a single system for a comprehensive
					understanding.{' '}
				</p>
				<br />
				<p>
					Using this data, we can make informed decisions on road
					maintenance and future planning. Our integrated mobile
					application will enable real-time data refresh and
					continuous road monitoring, allowing us to detect and repair
					issues quickly, reducing costs, and ensuring road safety.{' '}
				</p>
				<br />
				<p>
					This approach will help city leaders make strategic
					investments and manage resources more effectively. We will
					also provide workshops and training sessions to teach city
					workers how to utilize the technology efficiently. By
					collaborating with university and industry experts, we can
					continually improve these tools to make global roads safer
					and better for everyone.
				</p>
				<br />
				<div>
					<p className="text-blue-800 font-bold text-xl">
						Current Practices for Road Condition Monitoring{' '}
					</p>
					<p>
						Maintaining a healthy road network is crucial for safety
						and economic efficiency. Here's a breakdown of current
						practices used to monitor road conditions, along with
						images for better understanding:
					</p>
					<br />
					<div className="flex justify-evenly">
						<div>
							<p className="font-bold">Traditional Methods:</p>
							<ul
								className="list-disc ml-6 text-sm"
								style={{ listStyleType: 'disc' }}>
								<li>
									<p className="font-bold">
										Network service vehicles:
									</p>
								</li>
							</ul>
							<p
								className=""
								style={{ width: '50vw', marginLeft: '5vw' }}>
								These specially equipped trucks with laser
								profilers and other sensors capture detailed
								road surface data like rutting, cracking, and
								texture. This method is highly accurate but
								expensive and time-consuming to cover large
								areas.
							</p>
						</div>
						<div style={{ width: '10vw' }}></div>
						<div>
							<img
								src={car1}
								alt="car image"
								style={{ width: '700px', height: '200px' }}
							/>
						</div>
					</div>
					<br />
					<br />
					<div className="flex justify-evenly">
						<div>
							<img
								src={car2}
								alt="car image"
								style={{ width: '700px', height: '200px' }}
							/>
						</div>
						<div style={{ width: '10vw' }}></div>
						<div>
							<ul
								className="list-disc ml-6 text-sm"
								style={{ listStyleType: 'disc' }}>
								<li>
									<p className="font-bold">
										Road Roughness Index (IRI/RI):
									</p>
								</li>
							</ul>

							<p
								className=""
								style={{ width: '50vw', marginLeft: '5vw' }}>
								This method uses specialized equipment to
								measure the vertical deviations of a vehicle's
								suspension as it travels over a road segment.
								The RRI provides a single numerical value
								representing the overall road roughness. It's a
								simple and relatively inexpensive way to assess
								road condition for large networks, but it
								doesn't pinpoint specific defects.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="page-breaks">
				<br />
				<div className="flex justify-evenly">
					<div>
						<ul
							className="list-disc ml-6 text-sm"
							style={{ listStyleType: 'disc' }}>
							<li>
								<p className="font-bold">
									Physical Examination:
								</p>
							</li>
						</ul>
						<p
							className=""
							style={{ width: '50vw', marginLeft: '5vw' }}>
							Physical road inspection involves trained personnel
							visually assessing road conditions on-site,
							identifying surface and structural issues such as
							cracks and potholes. Using tools like measuring
							tapes and cameras, inspectors record detailed data.
							Despite being labour-intensive and time-consuming,
							this method is crucial for ensuring road safety and
							complements technological monitoring by providing
							direct, road observations.
						</p>
					</div>
					<div style={{ width: '10vw' }}></div>
					<div>
						<img
							src={manSurvey}
							alt="Man Survey image"
							style={{ width: '700px', height: '200px' }}
						/>
					</div>
				</div>

				<br />
				<div>
					<p className="font-bold text-center text-xl">
						Innovative Emerging Technologies
					</p>
					<br />
					<div className="flex justify-evenly">
						<div>
							<br />
							<ul
								className="list-disc ml-6 text-sm"
								style={{ listStyleType: 'disc' }}>
								<li>
									<p className="font-bold">
										AI/ML-Based Technology:
									</p>
								</li>
							</ul>
							<p
								className=""
								style={{ width: '50vw', marginLeft: '5vw' }}>
								AI-powered 360° cameras capture complete road
								scenes. Integrated with a mobile app, AI
								analyses the footage, pinpointing defects like
								cracks and potholes. This innovative product
								streamlines road inspections, saving time and
								money.
							</p>
						</div>
						<div style={{ width: '10vw' }}></div>
						<div>
							<img
								src={car3}
								alt="car image"
								style={{ width: '700px', height: '200px' }}
							/>
						</div>
					</div>

					<br />
					<div className="flex justify-evenly">
						<div>
							<img
								src={car4}
								alt="car image"
								style={{ width: '700px', height: '200px' }}
							/>
						</div>
						<div style={{ width: '10vw' }}></div>

						<div>
							<br />
							<ul
								className="list-disc ml-6 text-sm"
								style={{ listStyleType: 'disc' }}>
								<li>
									<p className="font-bold">
										Image recognition:
									</p>
								</li>
							</ul>
							<p
								className=""
								style={{ width: '50vw', marginLeft: '5vw' }}>
								Cameras mounted on vehicles or infrastructure
								can capture road images. Advanced algorithms
								then analyse these images to identify cracks,
								potholes, and other defects. This method is
								becoming more cost-effective and offers
								real-time monitoring potential.
							</p>
						</div>
					</div>

					<br />
					<div className="flex justify-evenly">
						<div>
							<br />
							<ul
								className="list-disc ml-6 text-sm"
								style={{ listStyleType: 'disc' }}>
								<li>
									<p className="font-bold">
										Satellite surveys:
									</p>
								</li>
							</ul>
							<p
								className=""
								style={{ width: '50vw', marginLeft: '5vw' }}>
								High-resolution satellite imagery can be used to
								identify large-scale road issues like landslides
								or flooding. However, detecting smaller defects
								like cracks is often limited.
							</p>
						</div>
						<div style={{ width: '10vw' }}></div>
						<div>
							<img
								src={satalite1}
								alt="satalite image"
								style={{ width: '700px', height: '200px' }}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="page-breaks">
			<br/>
			<br/>
			<br/>
			<br/>
			<br/>
				<div>
					<ul
						className="list-disc ml-6 text-sm"
						style={{ listStyleType: 'disc' }}>
						<li>
							<p className="font-bold">Drone survey:</p>
						</li>
					</ul>
					<div>
						<img src={satalite2} alt="Satalite Image" />
					</div>
					<p>
						Drones equipped with high-resolution cameras and LiDAR
						(light detection and ranging) sensors can provide
						detailed 3D data on road surfaces. This offers
						flexibility for targeted inspections and can be faster
						than traditional methods, but drone range and weather
						dependence can be limitations.
					</p>
				</div>
				<br />
				<div>
					<p className="font-bold text-xl">
						Choosing the Right Method:
					</p>
					The best approach often involves a combination of these
					practices. Network service vehicles remain the benchmark
					standard for data collection, while image recognition and
					drone surveys offer promising options for wider-scale
					monitoring. Satellite imagery and IRI measurements can be
					valuable for initial assessments and network-level tracking
					of road health.
					<br />
					<br />
					<p className="font-bold text-xl">Adopt new Technologies:</p>
					Adopting new technologies for road condition monitoring
					offers core benefits such as improved accuracy in detecting
					road issues, faster response times for maintenance, cost
					efficiency through predictive maintenance, enhanced safety
					for drivers, and better resource allocation. These
					technologies lead to smarter infrastructure management and
					more reliable, well-maintained roads.
					<br />
					<br />
					<p className="font-bold text-xl">
						IRC SP 16 2019 Guidelines based
					</p>
					<p>
						The roughness index is the measure of the functional
						requirement of an expressway, national highway, or state
						highway for the very purpose of the road being made &
						used by the larger public.
					</p>
				</div>
				<br />
				<div>
					<p className="text-blue-800 text-xl">
						Table: Maximum Permissible Value of Roughness for
						Expressways, National Highways & State Highways
					</p>
					<br />
					<br/>
					<div>
						<table
							style={{
								border: '1px solid black',
								borderCollapse: 'collapse',
								width: '100%',
							}}>
							<thead>
								<tr>
									<th
										style={{ border: '1px solid black' }}
										rowSpan="2">
										Sr. No.
									</th>
									<th
										style={{ border: '1px solid black' }}
										rowSpan="2">
										Type of Surface
									</th>
									<th
										style={{ border: '1px solid black' }}
										colSpan="6">
										Condition Of Road Surface
									</th>
								</tr>
								<tr>
									<th
										style={{ border: '1px solid black' }}
										colSpan="2">
										Good
									</th>
									<th
										style={{ border: '1px solid black' }}
										colSpan="2">
										Fair
									</th>
									<th
										style={{ border: '1px solid black' }}
										colSpan="2">
										Poor
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td
										style={{
											border: '1px solid black',
										}}></td>
									<td
										style={{
											border: '1px solid black',
										}}></td>
									<td style={{ border: '1px solid black' }}>
										RI
									</td>
									<td style={{ border: '1px solid black' }}>
										IRI
									</td>
									<td style={{ border: '1px solid black' }}>
										RI
									</td>
									<td style={{ border: '1px solid black' }}>
										IRI
									</td>
									<td style={{ border: '1px solid black' }}>
										RI
									</td>
									<td style={{ border: '1px solid black' }}>
										IRI
									</td>
								</tr>
								<tr>
									<td style={{ border: '1px solid black' }}>
										1
									</td>
									<td style={{ border: '1px solid black' }}>
										Bituminous (BC, SMA, SDBC)
									</td>
									<td style={{ border: '1px solid black' }}>
										&lt;1800
									</td>
									<td style={{ border: '1px solid black' }}>
										&lt;2.55
									</td>
									<td style={{ border: '1px solid black' }}>
										1800-2400
									</td>
									<td style={{ border: '1px solid black' }}>
										2.55-3.30
									</td>
									<td style={{ border: '1px solid black' }}>
										&gt;2400
									</td>
									<td style={{ border: '1px solid black' }}>
										&gt;3.30
									</td>
								</tr>
								<tr>
									<td style={{ border: '1px solid black' }}>
										2
									</td>
									<td style={{ border: '1px solid black' }}>
										Cemented
									</td>
									<td style={{ border: '1px solid black' }}>
										&lt;2000
									</td>
									<td style={{ border: '1px solid black' }}>
										&lt;2.81
									</td>
									<td style={{ border: '1px solid black' }}>
										2000-2400
									</td>
									<td style={{ border: '1px solid black' }}>
										2.81-3.30
									</td>
									<td style={{ border: '1px solid black' }}>
										&gt;2400
									</td>
									<td style={{ border: '1px solid black' }}>
										&gt;3.30
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<div className="page-breaks">
			<br/>
				<div>
					<p className="font-semibold text-xl text-blue-800">
						CLASS I
					</p>
					<p>
						Gives a higher standard of accuracy, which enables
						precise & accurate measurement of pavement or road
						surface profile.
					</p>
					<br />
					<p>
						Rod & Level, TRRL Beam, Dipstick, Merlin & Walking
						Profiler
					</p>
					<br />
					<p className="font-semibold text-xl text-blue-800">
						CLASS II
					</p>
					<p>
						profile is measured on the basis of the direct
						computation of the International Roughness Index (IRI).
						Higher Accuracy.
					</p>
					<br />
					<p>
						APJ trailers, Lidar, laser, and ultrasonic-based
						systems.
					</p>
					<br />
					<p className="font-semibold text-xl text-blue-800">
						CLASS III (proposed)
					</p>
					<p>
						Response Type: Road Roughness Measuring System (RTRRMS)
					</p>
					<br />
					<p>
						Automatic Road Unevenness Recorder, Bump Integrator,
						Rough meter, Car Axle Mounted Bump Integrator, and Mays
						Meter with manual data recordings and assessments.
					</p>
					<br />
					<p>
						Automated scalable RTRRMS systems with GPS information
						and tamper-proof data transmission methods such as
						digital accelerometer-based smart mobile hardware &
						software applications.
					</p>
					<br />
					<p className="font-semibold text-xl text-blue-800">
						CLASS IV
					</p>
					<p>
						Methods are used in situations where higher accuracy is
						not required or essential.
					</p>
					<br />
					<p className="font-semibold text-xl text-blue-800">
						Principal Used
					</p>
					<p>
						The roughness index is a key part of road condition
						monitoring. The IRI is calculated from the road profile.
						This profile can be measured in several different ways.
						The most common measurements are with Class 1
						instruments, capable of directly measuring the road
						profile, and Class 3 instruments, which use correlation
						equations.
					</p>
					<br />
					<p>
						Using World Bank terminology, these correspond to
						Information Quality Level (IQL) 1 and IQL-3 devices,
						representing the relative accuracy of the measurements.
						A common misconception is that the 80 km/h used in the
						simulation must also be used when physically measuring
						roughness with an instrumented vehicle. IQL-1 systems
						measure the profile direction, independent of speed, and
						IQL-3 systems typically have correlation equations for
						different speeds to relate the actual measurements to
						IRI.
					</p>
					<br />
					<p>
						IQL-1 systems typically report the roughness at 10–20 m
						intervals; IQL-3 at 100 m+ intervals.
					</p>
					<br />
					<p>
						Early measurements were done with a rod-and-level survey
						technique. The Transportation Research Laboratory
						developed a beam which had a vertical displacement
						transducer. From the late 1990s on, the use of the
						dipstick profiler with a reported accuracy of 0.01 mm
						(0.0004 inches) became quite common.
					</p>
					<br />
					<p>
						Dynamic measurements of the road profile are done with
						vehicle-mounted instruments. The approach consisted of a
						sensor (initially ultrasonic but later laser), which
						measures the height of the vehicle relative to the road.
						An accelerometer is double-integrated to give the height
						of the sensor relative to the datum. The difference
						between the two is the elevation profile of the road.
						This elevation profile is then processed to obtain the
						IRI.
					</p>
				</div>
			</div>

			<div className="page-breaks">
				<div>
					<p>
						The most common approaches see the IRI measured in each
						wheel path. The wheel path IRIs needs to be combined to
						obtain the overall IRI "roughness profile". There are
						two ways this can be done. A 'half-car' model simulates
						the vehicle travelling along both wheel paths, while a
						'quarter-car' model simulates one wheel on each wheel
						path, and the average is the lane IRI. The quarter-car
						approach is considered more accurate in representing the
						motion felt by users and so is most common.
					</p>
					<br />
					<p>
						Less expensive alternatives to profile meters are
						RTRRMS, which do not record the profile but rather are
						installed in vehicles and measure how the vehicle
						responds to the pavement profile. These need to be
						calibrated against IRI to obtain an estimate of the IRI.
						Since RTRRMS are generally affected by pavement texture
						and speed, it is common to have different calibration
						equations to correct the readings for these effects. RTRRMS can be grouped into three broad categories and
						are generally IQL-3, except arguably most cell
						phone-based systems, which are IQL-4.
					</p>
					<br />
					<p>
						Bump Integrators, single wheel: These have a physical
						connection between the sprung and unsprung mass and
						record the relative motion. Originally trailer-mounted,
						such as the one developed in India by CRRI, CRRI Trailer
						Bump Integrator, they are now most commonly installed on
						the floor of a vehicle with a cable connecting to the
						suspension. These type of instruments typically suffer from manual
						errors due to manual data collection of the bumps while
						riding in the car (field engineer takes count of number
						of bumps using pen and paper in a running vehicle every
						one kilometre) and requirement to calibrate the hardware
						system at centralized calibration facility due to
						mechanics permanently attached to the vehicle needing
						physical adjustments (not software- driven) for every
						change in vehicle behaviour
					</p>
					<br />
					<p>
						Accelerometer-Based Systems: These use an accelerometer
						to measure the relative motion of the sprung mass, which
						is sometimes corrected for the unsprang mass.
					</p>
				</div>
				<br />
				<div>
					<p className="text-blue-800 font-bold text-xl">
						{' '}
						Calibration
					</p>
					<p>
						Calibration is the most important part of equipment
						tuning and is required to get the right IRI
						(International Roughness Index) estimations from running
						vehicles every time, so to compare multiple results
						using the same baseline,
					</p>
					<br />
					<p>
						Calibration of Class-III instruments (Response Type Road
						Roughness Measurement Systems) require considering
						following major issues:
					</p>
					<div style={{ marginLeft: '5vw', fontSize: '1rem' }}>
						<ul
							className="list-disc ml-6 text-sm"
							style={{ listStyleType: 'disc' }}>
							<li>Vehicle vibrations at the current time</li>
							<li>Tire pressure of the vehicle</li>
							<li>Placement of the recording device</li>
							<li>
								Frame of reference while measuring vehicle
								vibrations
							</li>
							<li>Speed of the vehicle</li>
							<li>Frequency of sample data collection events</li>
						</ul>
					</div>
					<br />
					<div>
						<p className="text-blue-800 font-bold text-xl">
							Mechanical
						</p>
						<p>
							Since the data collection device is mechanical and
							is permanently attached to the vehicle, the
							calibration settings of this system are achieved
							through the right tuning of mechanical parts, like
							the length of the cable from the axel to the bump
							recording machine. E.g., for measurement of bumps
							amounting to 6mm of vehicle movement, the
							axel-mounted cable system needs to be adjusted to 6
							mm of movement of the metal wire to trigger a bump
							in the recording system. Also, the bump recording
							equipment needs to be fine-tuned for the current
							health of the vehicle suspension system based on its
							fitness and NVH (noise, vibration, and harshness)
							ratios.
						</p>
					</div>
				</div>
			</div>

			<div className="page-breaks">
			<br/>
				<div>
					<p className="text-blue-800 font-bold text-xl">
						PCI (Pavement condition index)
					</p>
					<p>
						The PCI is used to require engineers or surveyors to
						personally inspect roads and rate their condition,
						whether they're in good, bad, or average shape. But now,
						we can use AI to help with this. With this kind of
						survey, you get new and precise data about road
						conditions. Instead of people physically going out and
						checking every road, AI technology can analyse data from
						various sources, like images or sensors, to assess road
						conditions. This makes the process faster and more
						accurate. So, engineers can make better decisions about
						which roads need fixing or maintenance
					</p>
					<br />
					<p className="text-blue-800 font-bold text-md">
						AI can perform subjective rating tasks, transforming
						modern techniques.
					</p>
					<br />
					<p>
						Traditionally, road condition monitoring relied heavily
						on human inspectors for tasks that involved subjective
						judgment, like identifying crack severity or the overall
						quality of road markings. However, Artificial
						Intelligence (AI) is transforming this field by
						demonstrating the ability to perform these subjective
						tasks with remarkable accuracy.
					</p>
				</div>
				<br />
				<div>
					<p>
						Here's how AI is revolutionizing road condition
						monitoring:
					</p>
					<div style={{ marginLeft: '5vw' }}>
						<ul
							className="list-disc ml-6 text-sm"
							style={{ listStyleType: 'disc' }}>
							<li>
								<span className="font-bold">
									Automated Subjective Assessments:
								</span>{' '}
								AI algorithms, trained on vast datasets of
								labelled road images, can now identify and
								classify road defects like cracks, potholes, and
								uneven surfaces. They can even assess the
								severity of these defects, a task previously
								requiring human judgment.
							</li>
							<br />
							<li>
								<span className="font-bold">
									Improved Consistency and Objectivity:
								</span>{' '}
								Unlike human inspectors, who might have varying
								interpretations, AI brings consistent and
								objective evaluation to road assessments. This
								eliminates bias and ensures a more uniform
								approach to monitoring road health.
							</li>
							<br />
							<li>
								<span className="font-bold">
									Real-Time Damage Detection:
								</span>{' '}
								AI-powered 360° cameras mounted on vehicles can
								capture road data in real-time. Advanced
								algorithms then analyse this data, enabling
								immediate identification of road damage and
								quicker response and repair.
							</li>
							<br />
							<li>
								<span className="font-bold">
									Predictive Maintenance:
								</span>{' '}
								AI can analyse historical road condition data
								and use it to predict future deterioration. This
								allows for proactive maintenance, preventing
								minor issues from becoming major problems and
								saving resources in the long run.
							</li>
						</ul>
					</div>
				</div>
				<br />
				<div>
					<p className="font-bold">
						The Future of AI in Road Monitoring:
					</p>
					<br />
					<p style={{ marginLeft: '5vw' }}>
						The integration of AI into road condition monitoring
						offers a glimpse into the future with:
					</p>
					<div style={{ marginLeft: '5vw' }}>
						<ul
							className="list-disc ml-6 text-sm"
							style={{ listStyleType: 'disc' }}>
							<li>
								<span className="font-bold">Safer Roads:</span>{' '}
								Early detection of road defects minimizes
								accidents and ensures a safer driving experience
								for everyone.
							</li>
							<br />
							<li>
								<span className="font-bold">
									Optimized Maintenance Strategies:
								</span>{' '}
								AI-powered insights can optimize road
								maintenance by prioritizing repairs and resource
								allocation based on actual needs.
							</li>
							<br />
							<li>
								<span className="font-bold">
									Reduced Costs:
								</span>{' '}
								Early intervention and improved planning can
								significantly reduce long-term maintenance
								costs.
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="page-breaks">
			<br/>
			<div>
					<p className="text-xl text-blue-800 font-bold">
						Conclusion
					</p>
					<br />
					<p>
						While current practices in road condition monitoring
						offer a valuable toolbox, AI emerges as the most
						transformative technology.
					</p>
					<br />
				</div>
			<p>
						<span className="font-bold">Here's why:</span> AI's
						360-degree vision provides comprehensive monitoring of
						vast road networks, offering a holistic view for
						analysis that was previously impractical. Real-time
						insights and mobile app integration allow constant
						refreshment of road condition data. AI analyses data
						from 360-degree cameras in real time, and mobile apps
						ensure continuous updates on road health, empowering
						maintenance crews with immediate awareness of issues.
					</p>
					<br />
				<div>
					<p className="font-bold">
						AI's impact on road monitoring is clear.
					</p>
					<br />
					<div style={{ marginLeft: '5vw' }}>
						<ul
							className="list-disc ml-6 text-sm"
							style={{ listStyleType: 'disc' }}>
							<li>
								Enhanced safety: Early detection of road defects
								minimizes accidents and fosters a safer driving
								experience for all.
							</li>
							<li>
								Optimized maintenance: AI uses historical and
								real-time data to predict future deterioration,
								enabling proactive maintenance and preventing
								minor issues from becoming major problems.
							</li>
							<li>
								Reduced costs: Early intervention and efficient
								resource allocation based on AI insights
								significantly reduce long-term maintenance
								costs.
							</li>
							<li>
								The future of road condition monitoring lies in
								the synergy between established practices and
								cutting-edge AI technology. As cities and
								transportation authorities continuously
								integrate emerging solutions, AI will play a
								pivotal role in ensuring safe, efficient, and
								reliable travel for everyone.
							</li>
						</ul>
					</div>
					<br />
					<p>
						This report is based on data obtained through advanced
						image recognition techniques and information about road
						conditions. Utilizing state-of-the-art AI models, we aim
						to deliver precise and actionable insights. However, it
						is important to acknowledge that while we strive for
						accuracy, there may still be a margin of error. We are
						committed to minimizing these errors through continuous
						improvements in our algorithms and machine learning (ML)
						models.
					</p>
					<br />
					<p className="text-blue-800 text-xl font-bold">
						Data Collection Methodology
					</p>
					<br />
					<p>
						The data collection process relies on geospatial
						information, specifically latitude and longitude
						coordinates (Lalong), provided by user devices. The
						reliability of this geospatial data is contingent upon
						the accuracy of the devices and the processes involved.
						Any discrepancies in latitude and longitude information
						are likely attributable to defects in the respective
						machinery or processes.
					</p>
					<br />
					<p className="text-blue-800 text-xl font-bold">
						Data Processing and Analysis
					</p>
					<br />
					<p>
						Our AI models process the collected data to identify and
						assess road conditions. This involves:
					</p>
					<div style={{ marginLeft: '5vw' }}>
						<ul
							className="list-disc ml-6 text-sm"
							style={{ listStyleType: 'disc' }}>
							<li>
								<span className="font-bold">
									Image Recognition:
								</span>{' '}
								Capturing images of the road and identifying key
								features and anomalies such as potholes, cracks,
								and wear patterns.
							</li>
							<li>
								<span className="font-bold">
									AI and ML Integration:
								</span>{' '}
								Employing AI algorithms to analyse the images
								and extract meaningful insights. These models
								are trained on vast datasets to improve their
								accuracy and reliability continuously.
							</li>
						</ul>
					</div>
					<br />
					<p>
						Despite our rigorous methodology, there is an inherent
						possibility of some errors. These errors can stem from
						various sources, including environmental factors
						affecting image quality, device calibration issues, or
						limitations within the AI models themselves. We are
						dedicated to refining our algorithms to enhance accuracy
						and reduce the likelihood of such errors over time.
					</p>
					<br />
					
				</div>
			</div>

			<div className="page-breaks">
				<div>
				<p className="font-bold text-xl text-blue-800">Data and Privacy</p>
					<br />
					<p>
						All collected data is securely stored and utilized for
						future analysis and trend identification. This data is
						proprietary to our company, ensuring its exclusive use
						for improving our services and providing valuable
						insights to our clients. The reports generated from this
						data are based solely on the conditions observed and
						recorded on the day of collection, as captured in images
						or videos.
					</p>
					<br />
				<p>
						The analysis provided in this report offers a snapshot
						of road conditions as observed through our sophisticated
						data collection and processing methods. While we strive
						for precision, we acknowledge the potential for minor
						inaccuracies and are committed to continuous
						improvement. Our ongoing enhancements in AI and ML
						models aim to provide even more reliable and detailed
						insights in the future.
					</p>
					<br />
					<p>
						By leveraging cutting-edge technology and rigorous
						methodologies, we ensure that the data we provide is
						both valuable and actionable, helping stakeholders make
						informed decisions about road maintenance and safety. As
						we move forward, we remain dedicated to refining our
						processes and expanding our capabilities to deliver the
						highest quality insights to our clients.
					</p>
				</div>
				<br />
				<br />
				<br />
				<div className="text-right">
					<p> Thanks,</p>
					<p className="font-bold"> Authority Signatory</p>
					<p className="font-bold">
						Ai Unika Technologies (P) Limited
					</p>
				</div>
			</div>
		</div>
	);
}
