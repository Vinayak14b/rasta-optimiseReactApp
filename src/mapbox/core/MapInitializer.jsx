// MapInitializer.js
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useMap } from '../mapcontexts/MapContext';
import { constant } from '../utils/constant';

const MapInitializer = ({ onMapLoad, sourceId, layerId,setAssetVisible , assetVisible}) => {
	const { setMapInstance } = useMap();
	const mapContainer = useRef(null);

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainer.current,
			style: constant[0].style,
			center: [73.71285, 18.59587],
			zoom: 16,
			attributionControl: false,
		});

		const fullscreen = new mapboxgl.FullscreenControl();
		map.addControl(fullscreen, 'bottom-right');

		const nav = new mapboxgl.NavigationControl();
		map.addControl(nav, 'bottom-right');

		const geolocate = new mapboxgl.GeolocateControl({
			positionOptions: {
				enableHighAccuracy: true,
			},
			trackUserLocation: true,
			showUserLocation: true,
			fitBoundsOptions: {
				maxZoom: 14,
			},
		});

		map.addControl(geolocate, 'bottom-right');

		map.on('load', () => {
			setMapInstance(map);
			if (onMapLoad) {
				onMapLoad(map);
			}
		});

		return () => {
			map.remove();
		};
	}, []);
	const handleAssetsPlotting = () => {
        setAssetVisible(prev => !prev);
	}
	
	
	return <> <div ref={mapContainer} style={{ height: '83vh', zIndex: '0' }} > 
	<div  className={`absolute top-1 right-1 text-white z-10 cursor-pointer rounded-md bg-primary px-2 py-1  hover:scale-105 transition-transform duration-300 `}   
	// className='absolute top-1 right-1 text-white z-10 cursor-pointer rounded-md bg-primary px-2 py-1 '  
	onClick={handleAssetsPlotting} 
	>  {assetVisible ? 'Hide  Assets' : 'Plot Assets'} 
	</div>
	</div>
	</>
};

export default MapInitializer;
