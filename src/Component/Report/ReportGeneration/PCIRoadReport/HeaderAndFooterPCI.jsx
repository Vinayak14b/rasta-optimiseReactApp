import './HeaderAndFooterPCI.css';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderAndFooterPCI = ({ children, loading }) => {
	const navigate = useNavigate();
	const targetRef = useRef();

	const printAction = () => {
		window.print();
		navigate('/report');
	};

	return (
		<>
			<div className="w-[100vw] h-[100vh] flex justify-center items-center">
				<button
					className="w-[5vw] h-[5vh] print-preview-button bg-orange-500 border-solid-2 px-2 rounded-lg font-semibold py-1"
					onClick={printAction}
					disabled={loading}>
					{loading
						? 'Report is getting Generated...'
						: 'Print Preview of the Report'}
				</button>
			</div>

			<table className="print-component" ref={targetRef}>
				<thead>
					<tr>
						<th>
							<div>
								<br />
								<br />
							</div>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="body_of_report w-full text-justify">
							{children}
						</td>
					</tr>
				</tbody>
				<tfoot className="table-footer">
					<tr>
						<td>{'Rasta AI'}</td>
						{/* <td>{"AI Unika"}</td> */}
					</tr>
				</tfoot>
			</table>
		</>
	);
};

export default HeaderAndFooterPCI;
