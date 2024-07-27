export const extractAllRoads = (data) => {
  let roads = [];

  if (Array.isArray(data)) {
    // If it's an array, iterate over each element and recursively extract roads
    for (let i = 0; i < data.length; i++) {
      roads = roads.concat(extractAllRoads(data[i]));
    }
  } else if (typeof data === "object" && data !== null) {
    // If it's an object, check if it has a 'roads' property
    if (Array.isArray(data.roads)) {
      // If 'roads' property exists, add roads to the result
      roads = roads.concat(data.roads);
    }

    // Recursively extract roads from object properties
    Object.keys(data).forEach((key) => {
      roads = roads.concat(extractAllRoads(data[key]));
    });
  }

  return roads;
};
