import { MapProvider,useMap } from '../mapcontexts/MapContext'
import MapInitializer from '../core/MapInitializer'
import { useSelector } from 'react-redux';
import { selectPoint } from '../slices/pointSlice';
import { selectSegment } from '../slices/segmentSlice';

export const HomeMap = () => {
	const { setMapInstance } = useMap();

	return (
		<div className="w-full h-screen">
			<MapProvider>
				{/* <Map> */}
				<MapInitializer onMapLoad={setMapInstance} />
			</MapProvider>
		</div>
	);
}
