import { useState, useEffect, useRef } from 'react';
import { useLoadScript } from '@react-google-maps/api';

export const StreetView = () => {
	const [lat, setLat] = useState(null);
	const [lng, setLng] = useState(null);
	useEffect(() => {
		const url = window.location.href.split('/');
		const fLat = url[url.length - 2].split('=');
		setLat(fLat[1]);

		const Flng = url[url.length - 1].split('=');
		setLng(Flng[1]);
	}, []);


	const panoRef = useRef(null);

	const initializeMap = (lat, lng) => {
		const location = {
			lat: parseFloat(lat),
			lng: parseFloat(lng),
		};

		const panorama = new window.google.maps.StreetViewPanorama(
			panoRef.current,
			{
				position: location,
				pov: {
					heading: 34,
					pitch: 10,
				},
			}
		);

		panorama.setVisible(true);
	};

	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: 'AIzaSyBVAfeG3L4IniPwhEp4n5XuD1qmcjkRzR0',
	});

	useEffect(() => {
		if (isLoaded) {
			initializeMap(lat, lng);
		}
	}, [isLoaded, lat, lng]);

	if (loadError) return 'Error loading maps';
	if (!isLoaded) return 'Loading maps...';

	return (
		<div>
			<div className="flex h-screen w-full ">
				<div ref={panoRef} className="flex-1" />
			</div>
		</div>
	);
};
