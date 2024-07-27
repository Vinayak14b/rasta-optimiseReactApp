import { createContext, useContext, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  defectColorTheme,
  defectColors,
  priorityOrder,
} from "../points/Core/PointRules";

const MapContext = createContext();

let marker = null;
let mapRef = null;

export const MapProvider = ({ children }) => {
  const [map, setMap] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const setMapInstance = (mapInstance) => {
    setMap(mapInstance);
    setMapLoaded(true);
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

  const addPointsToMap = (points, openModalCallback) => {
    // if(map && mapLoaded){
    //   plotMultipleAssets(map, points, openModalCallback);
    // }
    if (!Array.isArray(points) || !map || !mapLoaded) {
      console.error(
        "Invalid points array or Map is not available or not loaded yet"
      );
      return;
    }

    const groupedPoints = groupPointsByColor(points);

    Object.entries(groupedPoints).forEach(([color, colorPoints], index) => {
      const sourceId = `${color}-point-source`;
      const layerId = `${color}-point-layer`;

      map.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: colorPoints.map((point) => ({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [point.long, point.lat],
            },
            properties: {
              index: index,
              circleColor: color,
              coordinates: [point.long, point.lat],
            },
          })),
        },
      });

      map.addLayer({
        id: layerId,
        type: "circle",
        source: sourceId,
        paint: {
          "circle-radius": {
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
          "circle-color": color,
        },
        transition: {
          duration: 0.8,
          delay: 0.5,
        },
      });

      map.on("mouseenter", layerId, () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", layerId, () => {
        map.getCanvas().style.cursor = "";
      });

      

      map.on("click", layerId, (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: [layerId],
        });
        mapRef = map;
        if (features.length > 0) {
          const clickedFeature = features[0];
          const coordinates = clickedFeature.properties.coordinates;
					const [lng, lat] = JSON.parse(coordinates);
					const clickedPoint = [lng, lat];

          openModalCallback(clickedPoint);
					if (clickedPoint) {
						// Remove previous marker if available
						if (marker) {
              RemoveMarkerSingleMap();
						}

						AddMarkerSingleMap(clickedPoint);
					}
        }
      });
    });
  };

  return (
    <MapContext.Provider
      value={{ map, setMapInstance, addPointsToMap, mapLoaded }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};

export function RemoveMarkerSingleMap() {
  if (marker !== null) {
    // Check if marker exists
    marker.remove();
    marker = null; // Reset marker after removing
  }
}

export function AddMarkerSingleMap(clickedPoint) {
  marker = new mapboxgl.Marker().setLngLat(clickedPoint).addTo(mapRef);
  mapRef.flyTo({
		center: clickedPoint,
		essential: true
	});
}
