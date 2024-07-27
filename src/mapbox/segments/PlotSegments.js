const goodSegments = []; // Array to store Start and end of good segments
const failedSegments = []; // Array to store Start and end of failed segments
export let currentLayerIds = [];
let mapRef=null;
export const plotSegments = (map, segments, openSegmentModal, showsegments) => {

  const filteredArray = segments.map((segmentData) =>
    segmentData.data.filter((subArray) => {
      if (
        typeof subArray === "object" &&
        subArray.hasOwnProperty("drivingCoords")
      ) {
        const { drivingCoords } = subArray;
        return (
          drivingCoords !== null &&
          Array.isArray(drivingCoords) &&
          drivingCoords.every((coord) => coord !== null)
        );
      }
    })
  );

  const roadNameRoadNo = segments.map((individualSegment) => {
    return [individualSegment.roadName, individualSegment.roadNo];
  });

  let i = 0;
  filteredArray.forEach((segmentArray) => {
    for (let index = 0; index < segmentArray.length - 1; index++) {
      if (
        segmentArray[index].defectValues.condition === "good" ||
        segmentArray[index].defectValues.condition === "satisfactory"
      ) {
        goodSegments.push([
          segmentArray[index].drivingCoords,
          segmentArray[index + 1].drivingCoords,
          segmentArray[index].chainage,
          roadNameRoadNo[i],
        ]);
      } else {
        failedSegments.push([
          segmentArray[index].drivingCoords,
          segmentArray[index + 1].drivingCoords,
          segmentArray[index].chainage,
          roadNameRoadNo[i],
        ]);
      }
    }
    i += 1;
  });

 
  addLayerForSegments(map, goodSegments, "good");
  addLayerForSegments(map, failedSegments, "failed");

  function addLayerForSegments(map, segments, condition) {
    const layerId = `${condition}-segment-layer`;
    const sourceId = `${condition}-segment-source`;

    mapRef=map

    
    map.addSource(sourceId, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: segments.map(([start, end, chainage, roadData]) => ({
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [
              [start[1], start[0]],
              [end[1], end[0]],
            ],
          },
          properties: {
            chainage: chainage,
            roadName: roadData[0],
            roadNo: roadData[1],
            mapType:'Segment',
          },
        })),
      },
    });

    map.addLayer({
      id: layerId,
      type: "line",
      source: sourceId,
      layout: {
        visibility: "visible",
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": condition === "failed" ? "#ff0000" : "#63ad43",
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          13,
          2,
          14,
          2.6,
          15,
          3.2,
          16.5,
          3.2,
          17,
          5.5,
          18,
          6,
          20,
          12,
          21,
          14,
          22,
          20,
        ],
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

      if (features.length > 0) {
        const [startCoord, endCoord] = features[0].geometry.coordinates;

        // Remove the previously highlighted segment
        if (map.getLayer("highlight-line")) {
          map.removeLayer("highlight-line");
        }

        // Highlight the clicked segment
        openSegmentModal(features[0].properties);
        if (map.getLayer("highlighted-segments")) {
        map.setFilter("highlighted-segments", [
          "all",
          ["==", ["get", "startCoord"], startCoord],
          ["==", ["get", "endCoord"], endCoord],
        ]);
      }

        // Check if the source already exists, if not, add it
        const sourceId = "highlight-line-source";
        if (map.getSource(sourceId)) {
          map.removeSource(sourceId);
        } 
          map.addSource(sourceId, {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: [startCoord, endCoord],
              },
            },
          });

        // Add a new layer to draw a line from start to end coordinate
        map.addLayer({
          id: "highlight-line",
          type: "line",
          source: sourceId,
          layout: {},
          paint: {
            "line-color": "rgba(240, 248, 255, 0.5)", // Transparent grey color
            "line-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              // Define zoom levels and corresponding line widths
              0, 1, // Zoom level 0: Line width 1
              5, 2, // Zoom level 5: Line width 2
              10, 3, // Zoom level 10: Line width 3
              15, 4, // Zoom level 15: Line width 4
              20, 5 // Zoom level 20: Line width 5
            ]
          },
        });
      }
    });

    currentLayerIds.push(layerId);
  }


  currentLayerIds.forEach((segmentLayer) => {
    map.setLayoutProperty(segmentLayer, "visibility", "none");
  });
};

export function getCurrentLayerIdsOfSegments() {
  return currentLayerIds;
}

export function getDataOfTheClickedPoint() {
  return [goodSegments, failedSegments];
}

export function removeHighlightedSegment() {
  // Remove the highlighted segment layer
  if (mapRef!==null && mapRef.getLayer("highlight-line")) {
    mapRef.removeLayer("highlight-line");
  }
}
