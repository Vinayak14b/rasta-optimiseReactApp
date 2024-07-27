// MapComponent2.js
import { useEffect } from 'react';

const Map2 = ({ mapRef }) => {
	useEffect(() => {
		if (mapRef.current) {
			// Do something with mapRef
		}
	}, [mapRef]);

	return (
		<div
			ref={mapRef}
			id="map2"
			style={{ width: '100%', height: '100%', borderRadius: '12px' }}
		/>
	);
};

export default Map2;
