import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editRoadInfo } from '../../mapbox/services/Operations/BackOfficeAPI';
import LeftComponent from './LeftComponent';
import ReChainageComponent from './ReChainageComponent';

const EditRoadInfo = () => {
	const dispatch = useDispatch();
	const { roadId } = useParams();
	const [roadData, setRoadData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await dispatch(editRoadInfo({ roadId }));
				// console.log("result is the ",result?.roadData)
				setRoadData(result?.roadData);
			} catch (error) {
				console.error(error);
			}
		};
		if (roadId) {
			fetchData();
		}
	}, []);

	return (
		<div className="w-screen h-screen border-2 flex border-black">
			<div className="w-[50%] h-full border-2 border-green-300">
				<LeftComponent roadData={roadData} roadId={roadId} />
			</div>
			<div className="w-[50%] border-2 border-orange-400">
				<ReChainageComponent roadData={roadData} roadId={roadId} />
			</div>
		</div>
	);
};

export default EditRoadInfo;
