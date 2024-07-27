import { useSelector } from 'react-redux';
import { selectFilter } from '../../slices/filterSlice';

export default function PointLayer() {
    const { pointCollection } = useSelector(selectFilter);

    pointCollection.forEach((checkbox) => {
        const unique = checkbox.label.toLowerCase();
        const sourceId = `${unique}-point-source`;
        const layerId = `${unique}-layer-source`;

        // Check if the source exists
        if (!mapData.getSource(sourceId) && checkbox.checked) {
            mapData.addSource(sourceId, {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [],  // You can add features if needed
                },
            });
        }

        // Check if the layer exists
        if (!mapData.getLayer(layerId) && checkbox.checked) {
            mapData.addLayer({
                id: layerId,
                type: 'circle',
                source: sourceId,
                paint: {
                    'circle-radius': {
                        base: 1,
                        stops: [
                            [13, 2],
                            [14, 2.6],
                            [15, 3.2],
                            [16.5, 3.2],
                            [17, 5.5],
                            [18, 6],
                            [20, 12],
                            [21, 14],
                            [22, 20],
                        ],
                    },
                    'circle-color': unique,  // Use the checkbox label as the color
                },
                transition: {
                    duration: 0.8,
                    delay: 0.5,
                },
            });
        }

        // Update the visibility of the layer based on the checkbox state
        if (mapData.getLayer(layerId)) {
            mapData.setLayoutProperty(
                layerId,
                'visibility',
                checkbox.checked ? 'visible' : 'none'
            );
        }

        // Remove the layer and source if unchecked
        if (!checkbox.checked && mapData.getLayer(layerId)) {
            mapData.removeLayer(layerId);
            mapData.removeSource(sourceId);
        }
    });
}
