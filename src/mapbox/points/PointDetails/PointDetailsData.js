export const setPointDataArray = (singlePointData, pointDetailIcons) => {
    const data = [
        {
            row: 1,
            col1Image: pointDetailIcons.pointlocation,
            col3: singlePointData && singlePointData.roadNo,
            col2: "Road No.",
        },
        {
            row: 2,
            col1Image: pointDetailIcons.pointchainage,
            col2: "Current Chainage",
            col3:
                singlePointData && singlePointData.currentChainage
                    ? singlePointData.currentChainage
                    : "Chainage/ Unavailable",
        },
        {
            row: 3,
            col1Image: pointDetailIcons.pointroadname,
            col2: "Road Name",
            col3: singlePointData && singlePointData.roadName,
        },
        {
            row: 4,
            col1Image: pointDetailIcons.pointlatlong,
            col2: "Latitude & Longitude",
            col3: `${singlePointData && singlePointData.coordinates[0]}, ${
                singlePointData && singlePointData.coordinates[1]
            }`,
        },
        {
            row: 5,
            col1Image: pointDetailIcons.pointplay,
            col2: "Video View:",
            col3: "Video Link",
        },
        {
            row: 6,
            col1Image: pointDetailIcons.pointdatetime,
            col2: "Date & Time",
            col3: `${singlePointData && singlePointData.date} & ${
                singlePointData && singlePointData.time
            }`,
        },
        {
            row: 7,
            col1Image: pointDetailIcons.pointdefect,
            col2: "Defects",
            col3:
                singlePointData &&
                singlePointData?.res &&
                singlePointData?.res !== undefined &&
                singlePointData?.res !== null &&
                singlePointData?.res?.defect !== undefined &&
                singlePointData?.res?.defect !== null &&
                Object.keys(singlePointData?.res?.defect).filter(
                    (defectName) => singlePointData?.res?.defect[defectName] > 0
                ).length > 0
                    ? Object.entries(singlePointData?.res?.defect)
                          .filter(([defectType, count]) => count > 0)
                          .map(([defectType, count]) => {
                              return `${defectType}: ${count}`;
                          })
                          .join(", ")
                    : "No Defects Found!",
        },
    ];
    return data;
};
