import { ImagesOnMap } from '../../assets/IconArray';

export let currentLayerIdsOfAsset = [];

export const plotMultipleAssets = (
    map,
    pointsData,
    openModalCallback,
    setAssetLayerId
) => {
    // Log the pointsData to see what all comes in points
    // console.log('pointsData:', pointsData);

    function getIconSize(asset) {
        // You can adjust icon sizes based on asset types as needed
        switch (asset) {
            case 'streetlightonmap':
                return 0.5;
            case 'leftchevrononmap':
                return 0.5;
            case 'rightchevrononmap':
                return 0.5;
            case 'trafficlightonmap':
                return 0.5;
            case 'mandatorysignonmap':
                return 0.5;
            case 'cautionarysignonmap':
                return 0.5;
            case 'informatorysignonmap':
                return 0.5;
            case 'commenticononmap':
                return 0.5;
            default:
                return 0.1; // Default size
        }
    }

    // Function to add a layer and call the toggleLayerVisibility function afterwards
    function addLayerWithVisibilityToggle(layerId, sourceId, iconImage, asset) {
        const iconSize = getIconSize(asset);
        map.loadImage(iconImage, (error, image) => {
            if (error) throw error;

            // Add the image to the map style.
            map.addImage(layerId, image);

            map.addLayer({
                id: layerId,
                type: 'symbol',
                source: sourceId,
                layout: {
                    'icon-image': layerId, // Use the layerId as the icon image
                    'icon-size': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        11,
                        0.1,
                        12,
                        0.2,
                        13,
                        0.3,
                        14,
                        0.4,
                        15,
                        0.5,
                        16,
                        0.6, // Adjusted from 16.5
                        17,
                        0.7,
                        18,
                        0.8,
                        20,
                        0.9,
                        21,
                        1,
                        22,
                        1.1,
                    ],
                    'icon-allow-overlap': true,
                },
                paint: {
                    // You can add paint properties here if needed
                },
            });

            // Call toggleLayerVisibility after the layer is added
            currentLayerIdsOfAsset.push(layerId);
            map.on('mouseenter', layerId, () => {
                map.getCanvas().style.cursor = 'pointer';
            });

            map.on('mouseleave', layerId, () => {
                map.getCanvas().style.cursor = '';
            });
        });
    }

    // Function to update data on the map
    const updateData = (updatedPoints) => {
        let validPoints = updatedPoints.filter(
            (point) =>
                point?.lat !== null &&
                point?.long !== null &&
                point?.pred_image !== null
        );

        const pointGroups = groupPointsByAsset(validPoints);
        setAssetLayerId(pointGroups);

        Object.keys(pointGroups).forEach((asset) => {
            const layerId = `${asset}-point-layer`;
            const featureCollection = {
                type: 'FeatureCollection',
                features: pointGroups[asset].map((point, index) => ({
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [point[0], point[1]],
                    },
                    properties: {
                        index: index,
                        circleColor: asset,
                        coordinates: [point[0], point[1]],
                        mapType: 'Point',
                    },
                })),
            };

            const sourceId = `${asset}-point-source`;

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
            if (map && !map.getLayer(layerId)) {
                addLayerWithVisibilityToggle(
                    layerId,
                    sourceId,
                    ImagesOnMap[asset],
                    asset
                );
            }
        });
    };

    updateData(pointsData);
};

const groupPointsByAsset = (points) => {
    return points.reduce((groups, point) => {
        let asset = '';
        if (point.pred_image === false && point?.asset === null) {
            asset = 'green';
        }
        if (
            point.pred_image === true &&
            point?.asset !== null &&
            point?.asset?.StreetLamp > 0
        ) {
            asset = 'streetlightonmap';
            if (!groups[asset]) {
                groups[asset] = [];
            }
            groups[asset].push([point.long, point.lat]);
        }
        if (
            point.pred_image === true &&
            point?.asset !== null &&
            point?.asset?.TrafficLight > 0
        ) {
            asset = 'trafficlightonmap';
            if (!groups[asset]) {
                groups[asset] = [];
            }
            groups[asset].push([point.long, point.lat]);
        }
        if (
            point.pred_image === true &&
            point?.asset !== null &&
            point?.asset['Left-Chevron'] &&
            point?.asset['Left-Chevron'] > 0
        ) {
            asset = 'leftchevrononmap';
            if (!groups[asset]) {
                groups[asset] = [];
            }
            groups[asset].push([point.long, point.lat]);
        }
        if (
            point.pred_image === true &&
            point?.asset !== null &&
            point?.asset['Right-Chevron'] &&
            point?.asset['Right-Chevron'] > 0
        ) {
            asset = 'rightchevrononmap';
            if (!groups[asset]) {
                groups[asset] = [];
            }
            groups[asset].push([point.long, point.lat]);
        }
        if (
            point.pred_image === true &&
            point?.asset !== null &&
            point?.asset['Cautionary-sign'] &&
            point?.asset['Cautionary-sign'] > 0
        ) {
            asset = 'cautionarysignonmap';
            if (!groups[asset]) {
                groups[asset] = [];
            }
            groups[asset].push([point.long, point.lat]);
        }
        if (
            point.pred_image === true &&
            point?.asset !== null &&
            point?.asset['Mandatory-sign'] &&
            point?.asset['Mandatory-sign'] > 0
        ) {
            asset = 'mandatorysignonmap';
            if (!groups[asset]) {
                groups[asset] = [];
            }
            groups[asset].push([point.long, point.lat]);
        }
        if (
            point.pred_image === true &&
            point?.asset !== null &&
            point?.asset['Informatory-Sign'] &&
            point?.asset['Informatory-Sign'] > 0
        ) {
            asset = 'informatorysignonmap';
            if (!groups[asset]) {
                groups[asset] = [];
            }
            groups[asset].push([point.long, point.lat]);
        }
        if (point.comment === true ) {
            asset = 'commenticononmap';
            if (!groups[asset]) {
                groups[asset] = [];
            }
            groups[asset].push([point.long, point.lat]);
        }

        return groups;
    }, {});
};

export function getCurrentLayerIdsOfAsset() {
    return currentLayerIdsOfAsset;
}
