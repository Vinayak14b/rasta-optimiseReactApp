import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { plotPoints } from '../mapbox/points/Core/plotPoints';
import { useLocation, useNavigate } from 'react-router-dom';

const FloatingMap = ({ lat, long, points }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const mapContainerRef = useRef(null);
	const mapRef = useRef(null);
	const [mapLoaded, setMapLoaded] = useState(false);
	const markerRef = useRef(null);
	const [floatCoordinates, setFloatCoordinates] = useState(null);
	let map;

	function searchIndex() {
		let foundIndex = -1;
		for (let i = 0; i < points.length; i++) {
			const point = points[i];

			if (
				floatCoordinates &&
				point.lat == floatCoordinates[1] &&
				point.long == floatCoordinates[0]
			) {
				foundIndex = i;
				break;
			}
		}
		return foundIndex;
	}

	useEffect(() => {
		mapboxgl.accessToken =
			'pk.eyJ1IjoicmFzdGEtYWkiLCJhIjoiY2xwNnc4NzhvMGR3NDJrb2lmeG9jcjE2ZyJ9.KeN3jW2_wBNQaSPvJwmYxQ';

		const initializeMap = () => {
			map = new mapboxgl.Map({
				container: mapContainerRef.current,
				style: 'mapbox://styles/rasta-ai/clp9kjai4002g01pk3rc3fh1z',
				center: [long, lat],
				zoom: 17,
				attributionControl: false,
			});

			const marker = new mapboxgl.Marker({
				color: '#FFA500', // Orange color
			})
				.setLngLat([long, lat])
				.addTo(map);

			mapRef.current = map;
			markerRef.current = marker;

			map.on('style.load', () => {
				setMapLoaded(true);
			});
		};

		initializeMap();

		return () => {
			map.remove();
		};
	}, []);

	useEffect(() => {
		if (mapRef.current && lat && long) {
			mapRef.current.setCenter([long, lat]);
		}
	}, [lat, long]);

	useEffect(() => {
		if (markerRef.current && lat && long) {
			markerRef.current.setLngLat([long, lat]);
		}
	}, [lat, long]);

	useEffect(() => {
		const label = 'float';
		if (mapLoaded && mapRef.current && points && points.length > 0) {
			plotPoints(mapRef.current, points, label, setFloatCoordinates);
			// plotMultipleAssets(mapRef.current, points, label);
		}
	}, [mapLoaded, points]);

	useEffect(() => {
		const fetchData = async () => {
			const foundIndex = await searchIndex(); // Assuming searchIndex() returns a promise

			if (foundIndex != -1) {
				// // Constructing query parameters
				const searchParams = new URLSearchParams();
				searchParams.set('lat', floatCoordinates[1]);
				searchParams.set('long', floatCoordinates[0]);
				// // Assuming nextPoint is defined somewhere in your code
				searchParams.set('predImage', points[foundIndex].pred_image);

				// // Navigating to the new URL with query parameters
				navigate(`${location.pathname}?${searchParams.toString()}`);
			}
		};

		fetchData(); // Call the async function immediately
	}, [floatCoordinates]);

	return (
		<div style={{ width: '100%', height: '100%' }} ref={mapContainerRef} />
	);
};

export default FloatingMap;
