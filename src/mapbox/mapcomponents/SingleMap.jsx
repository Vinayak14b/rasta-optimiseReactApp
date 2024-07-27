import { useEffect, useState } from 'react';
import MapInitializer from '../core/MapInitializer';
import { MapProvider, useMap } from '../mapcontexts/MapContext';
import { setModalData, selectModalData } from '../slices/filterSlice';
import { PointDetailSingleMap } from '../points/SingleMap/PointDetailSingleMap';
import { useDispatch, useSelector } from 'react-redux';
import { plotMultipleAssets } from '../assets/plotMultipleAssets';
import mapboxgl from 'mapbox-gl';

export const removeMarker = (markerRef1,markerRef2) => {
	if (markerRef1.current) {
		markerRef1.current.remove();
	}
};

const SingleMap = ({ pointData ,currCoordinates,currCoordinates2,markerRef1,markerRef2}) => {
	
	
	const { setMapInstance, addPointsToMap, mapLoaded, map } = useMap();
	const modalData = useSelector(selectModalData);
	const dispatch = useDispatch();
	const openModal = (coordinates) => {
		dispatch(setModalData(coordinates));
	};
 
	const [assetLayerId,setAssetLayerId]=useState(null);
	const [assetVisible,setAssetVisible]=useState(true)
	 
	useEffect(() => {
		if (setMapInstance && mapLoaded) {
			addPointsToMap(pointData, openModal);
			plotMultipleAssets(map, pointData, openModal,setAssetLayerId);
			if (pointData.length > 0) {
				const geocodeResult = [pointData[0].long, pointData[0].lat];  
				map.flyTo({
					center: geocodeResult,
					zoom: 14,
				});
			}
		}
	}, [addPointsToMap]);

	useEffect(() => {
		//custom Image Marker
		// if (mapLoaded && map && currCoordinates) {
		// 	// Remove previous marker if exists
		// 	removeMarker(markerRef);
	
		// 	// Create a DOM element for the custom marker image
		// 	const customMarkerEl = document.createElement('div');
		// 	customMarkerEl.className = 'custom-marker';
		// 	customMarkerEl.style.backgroundImage = `url(${mImg})`;
		// 	customMarkerEl.style.width = '50px'; // Adjust according to your image size
		// 	customMarkerEl.style.height = '50px'; // Adjust according to your image size
	
		// 	// Add new marker with the custom marker image
		// 	const marker = new mapboxgl.Marker({ element: customMarkerEl })
		// 		.setLngLat(currCoordinates)
		// 		.addTo(map);
	
		// 	// Store the marker reference
		// 	markerRef.current = marker;
	
		// 	// Fly to the new marker location
		// 	map.flyTo({
		// 		center: [currCoordinates[0], currCoordinates[1]],
		// 		zoom: 14,
		// 	});
		// }
		if (mapLoaded && map && currCoordinates) {
			// Remove previous marker if exists
			removeMarker(markerRef1);
			removeMarker(markerRef2);
	
			// Create a new marker with the specified color
			const marker1 = new mapboxgl.Marker({ color: 'orange' })
				.setLngLat(currCoordinates)
				.addTo(map);
			const marker2 = new mapboxgl.Marker({ color: 'orange' })
				.setLngLat(currCoordinates2)
				.addTo(map);
	
			// Store the marker reference
			markerRef1.current = marker1;
			markerRef2.current = marker2;
	
			// Fly to the new marker location
			map.flyTo({
				center: [currCoordinates[0], currCoordinates[1]],
				zoom: 16,
				// speed: 0.5, // Decrease the speed for slower animation
				// curve: 1.5 
			});
		}
		 
    }, [mapLoaded, map, currCoordinates]);
 
	if(assetLayerId){

		var layerIds = Object.keys(assetLayerId);
	 
	}
	useEffect(() => {
	 
	if(layerIds){
		const setLayerVisibility = (visibility) => {
			layerIds.forEach((layerId) => {
				const formattedLayerId = `${layerId}-point-layer`;
				map.setLayoutProperty(
					formattedLayerId,
					'visibility',
					visibility
				);
			});
		};

		if (assetVisible) {
			setLayerVisibility('visible');
		} else {
			setLayerVisibility('none');
		}
	}
	
	}, [assetVisible]);
 
	return (
		<MapProvider>
			<div
				style={{
					width: 'full',
					height: 'screen',
				}}>
			<MapInitializer onMapLoad={setMapInstance} setAssetVisible={setAssetVisible} assetVisible={assetVisible}  />
				 
			</div>
			<div>
				
				{modalData && (
					<PointDetailSingleMap
						coordinates={modalData}
						onClose={() => dispatch(setModalData(null))}
						pointsData={pointData}
					/>
				)}
			 
			</div>
		</MapProvider>
	);
};

export default SingleMap;
