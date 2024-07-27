import mapboxgl from 'mapbox-gl';
import { defectColorTheme, defectColors, priorityOrder } from './PointRules';

export let marker = null;
let mapRef = null;
export let currentLayerIds = [];

export const plotPoints = (map, points,label,setFloatCoordinates) => {
	mapRef = map;

	function addLayerWithVisibilityToggle(layerId, sourceId, color) {
		map.addLayer({
			id: layerId,
			type: 'circle',
			source: sourceId,
			paint: {
				'circle-radius': {
					base: 1,
					stops: [
						[13, 2],
						[14, 2.5],
						[15, 2.1],
						[16.5, 2.2],
						[17, 3.5],
						[18, 5],
						[20, 12],
						[21, 18],
						[22, 30],
					],
				},
				'circle-color': color,
			},
			transition: {
				duration: 0.8,
				delay: 0.5,
			},
		});

		// Call toggleLayerVisibility after the layer is added
		currentLayerIds.push(layerId);
		//toggleLayerVisibility(layerId, 0);
		map.on('mouseenter', layerId, () => {
			map.getCanvas().style.cursor = 'pointer';
		});

		map.on('mouseleave', layerId, () => {
			map.getCanvas().style.cursor = '';
		});
	}

	// Function to update data on the map
	const updateData = (points) => {
		let validPoints = points.filter(
			(point) =>
				point?.lat !== null &&
				point?.long !== null &&
				point?.pred_image !== null
		);
		const pointGroups = groupPointsByColor(validPoints);

		Object.keys(pointGroups).forEach((color) => {
			const layerId = `${color}-point-layer`;
			const featureCollection = {
				type: 'FeatureCollection',
				features: pointGroups[color].map((point, index) => ({
					type: 'Feature',
					geometry: {
						type: 'Point',
						coordinates: [point.long, point.lat],
					},
					properties: {
						index: index,
						circleColor: color,
						coordinates: [point.long, point.lat],
						mapType: 'Point',
					},
				})),
			};

			const sourceId = `${color}-point-source`;

			// Check if source already exists
			if (!map.getSource(sourceId)) {
				// If it doesn't exist, add it
				map.addSource(sourceId, {
					type: 'geojson',
					data: featureCollection,
				});
			} else {
				// Update existing source data
				map.getSource(sourceId).setData(featureCollection);
			}

			// Check if layer already exists
			if (!map.getLayer(layerId)) {
				// If it doesn't exist, add it with visibility toggle
				addLayerWithVisibilityToggle(layerId, sourceId, color);
			}

			map.on('click', layerId, (e) => {
				// console.log('clicked on point',layerId)
				// console.log("label ",label);

				const features = map.queryRenderedFeatures(e.point, {
					layers: [layerId],
				});
				// console.log('onclick inside plotpoints');

				if (features.length > 0) {
					const clickedFeature = features[0];
					// console.log(
					// 	'Clicked feature:',
					// 	clickedFeature.properties.circleColor
					// );
					const coordinates = clickedFeature.properties.coordinates;
					const [lng, lat] = JSON.parse(coordinates);
					const clickedPoint = [lng, lat];
					// console.log('Clicked point:', clickedPoint);
					// openModalCallback(clickedPoint);
					if (label == 'float') {
						setFloatCoordinates(clickedPoint);
					}
					// if (clickedPoint) {
					// 	// Remove previous marker if available
					// 	if (marker) {
					// 		RemoveMarker();
					// 	}
					// 	AddMarker(clickedPoint);
					// }
				}
			});
		});
	};

	updateData(points);
};

function assignColor(defectCounts) {
	let selectedColor = defectColorTheme.green;
	const defects = Object.keys(defectCounts);
	for (let i = 0; i < priorityOrder.length; i++) {
		const defect = priorityOrder[i];
		if (defects.includes(defect)) {
			selectedColor = defectColors[defect];
			break;
		}
	}
	return selectedColor;
}

function groupPointsByColor(points) {
	const defaultColor = defectColorTheme.green;

	const colorAssignments = points.map((point) => ({
		point,
		color:
			point.pred_image === true &&
			point.defect &&
			Object.keys(point.defect).length > 0
				? assignColor(point.defect)
				: defaultColor,
	}));

	const groups = colorAssignments.reduce((groups, { point, color }) => {
		groups[color] = groups[color] || [];
		groups[color].push(point);
		return groups;
	}, {});

	return groups;
}

export function RemoveMarker() {
	if (marker !== null) {
		// Check if marker exists
		marker.remove();
		marker = null; // Reset marker after removing
	}
}

export function AddMarker(clickedPoint) {
	marker = new mapboxgl.Marker().setLngLat(clickedPoint).addTo(mapRef);
	console.log("Window size", window.innerWidth);
	
	const panelWidth = window.innerWidth / 3;
    const mapWidth = window.innerWidth - panelWidth;
    const offsetX = -(mapWidth / 2) + (mapWidth / 4);
    const offsetY = 0; // No vertical shift
	mapRef.flyTo({
		center: clickedPoint,
		essential: true,
		offset: [offsetX, offsetY],
	});
}

export function getCurrentLayerIdsOfPoints() {
	return currentLayerIds;
}
