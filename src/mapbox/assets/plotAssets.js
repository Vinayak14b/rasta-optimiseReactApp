import mapboxgl from "mapbox-gl";
import { ImagesOnMap } from "../../assets/IconArray";

let marker = null;
let mapRef = null;
export let currentLayerIds = [];

export const plotAssets = (map, points, openModalCallback) => {
  console.log('Points array:', points);
  mapRef = map;
  const batchSize = 500; // Adjust as needed

  const batches = Array.from(
    { length: Math.ceil(points.length / batchSize) },
    (_, index) => points.slice(index * batchSize, (index + 1) * batchSize)
  );

  // Function to add a layer and call the toggleLayerVisibility function afterwards
  function addLayerWithVisibilityToggle(layerId, sourceId, iconImage, imageSize) {
    map.loadImage(iconImage, (error, image) => {
      if (error) throw error;

      // Add the image to the map style.
      map.addImage(layerId, image);

      map.addLayer({
        id: layerId,
        type: "symbol",
        source: sourceId,
        layout: {
          "icon-image": layerId, // Use the layerId as the icon image
          "icon-size": imageSize, // Adjust the size of the icon as needed
          "icon-allow-overlap":true,
        },
        paint: {
          // Optionally, you can configure additional paint properties here
        }
      });

      // Call toggleLayerVisibility after the layer is added
      currentLayerIds.push(layerId);
      map.on("mouseenter", layerId, () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", layerId, () => {
        map.getCanvas().style.cursor = "";
      });
    });
  }

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Function to update data on the map
  const updateData = debounce((updatedPoints) => {
    let validPoints = updatedPoints.filter(
      (point) =>
        point?.lat !== null &&
        point?.long !== null &&
        point?.pred_image !== null
    );

    const pointGroups = groupPointsByAsset(validPoints);

    Object.keys(pointGroups).forEach((asset) => {
      const layerId = `${asset}-point-layer`;
      const featureCollection = {
        type: "FeatureCollection",
        features: pointGroups[asset].map((point, index) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [point.long, point.lat],
          },
          // properties: {
          //   index: index,
          //   circleColor: asset,
          // },
        })),
      };

      const sourceId = `${asset}-point-source`;

      // Check if source already exists
      if (!map.getSource(sourceId)) {
        // If it doesn't exist, add it
        map.addSource(sourceId, {
          type: "geojson",
          data: featureCollection,
        });
      } else {
        // Update existing source data
        map.getSource(sourceId).setData(featureCollection);
      }

      // Check if layer already exists
      if (!map.getLayer(layerId)) {
        // If it doesn't exist, add it with visibility toggle
        if (asset === "green") {
          // addLayerWithVisibilityToggle(layerId, sourceId, ImagesOnMap.greenpointonmap,0.15);
        } else if (asset === "streetlight") {
          addLayerWithVisibilityToggle(layerId, sourceId, ImagesOnMap.streetlightonmap,0.50);
        } else if (asset === "leftchevron") {
          addLayerWithVisibilityToggle(layerId, sourceId, ImagesOnMap.leftchevrononmap,0.10);
        } else if (asset === "rightchevron") {
          addLayerWithVisibilityToggle(layerId, sourceId, ImagesOnMap.rightchevrononmap,0.10);
        } else if (asset === "trafficsignal") {
          addLayerWithVisibilityToggle(layerId, sourceId, ImagesOnMap.trafficlightonmap,0.10);
        }else if (asset === "commenticon") {
          addLayerWithVisibilityToggle(layerId, sourceId, ImagesOnMap.commenticononmap, 0.50);
        }
        // Add more conditions for other assets with their respective icon images
      }

      // map.on("click", layerId, (e) => {
      //   const features = map.queryRenderedFeatures(e.point, {
      //     layers: [layerId],
      //   });

      //   if (features.length > 0) {
      //     const clickedFeature = features[0];
      //     const clickedLatPointIndex =
      //       clickedFeature.geometry.coordinates[1].toFixed(5);
      //     const clickedLongPointIndex =
      //       clickedFeature.geometry.coordinates[0].toFixed(5);
      //     if (
      //       clickedLatPointIndex !== undefined &&
      //       clickedLatPointIndex !== null
      //     ) {
      //       const clickedPoint = [clickedLongPointIndex, clickedLatPointIndex];
      //       if (clickedPoint) {
      //         openModalCallback(clickedPoint);

      //         // Remove previous marker if available
      //         if (marker) {
      //           RemoveMarker();
      //         }
      //         AddMarker(clickedPoint);
      //       }
      //     }
      //   }
      // });
    });
  }, 200);

  // Call updateData when points change
  let updatedPoints = [];
  batches.forEach((batch) => {
    updatedPoints = updatedPoints.concat(batch);
  });
  // Call updateData with all points at once
  updateData(updatedPoints);

};

const groupPointsByAsset = (points) => {
  return points.reduce((groups, point) => {
    let asset = "";
    if (point.pred_image === false && point?.asset === null) {
      asset = "green";
    } else if (point.pred_image === true && point?.asset?.streetlight > 0) {
      asset = "streetlight";
    } else if (point.pred_image === true && point?.asset?.trafficsignal > 0) {
      asset = "trafficsignal";
    } else if (point.pred_image === true && point?.asset?.noparking > 0) {
      asset = "noparking";
    } else if (point.pred_image === true && point?.asset?.schoolzone > 0) {
      asset = "schoolzone";
    } else if (point.pred_image === true && point?.asset?.leftchevron > 0) {
      asset = "leftchevron";
    } else if (point.pred_image === true && point?.asset?.rightchevron > 0) {
      asset = "rightchevron";
    } else if (point.pred_image === true && point?.asset?.manhole > 0) {
      asset = "manhole";
    }else if (point.pred_image === true && point?.comment === true) {
      asset = "commenticon";
    }
    groups[asset] = groups[asset] || [];
    groups[asset].push(point);
    return groups;
  }, {});
};

export function RemoveMarker() {
  if (marker !== null) {
    // Check if marker exists
    marker.remove();
    marker = null; // Reset marker after removing
  }
}

export function AddMarker(clickedPoint) {
  marker = new mapboxgl.Marker().setLngLat(clickedPoint).addTo(mapRef);
}

export function getCurrentLayerIdsOfPoints() {
  return currentLayerIds;
}
