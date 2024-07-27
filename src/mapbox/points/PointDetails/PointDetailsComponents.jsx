import pointDetailsStyles from "../PointDetails/PointDetails.module.css";
import {
    defectColorTheme,
    priorityOrder,
    defectColors,
} from "../Core/PointRules";

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

const conditionOfPoint = (data) => {
    const defects = data?.res?.defect;
    if (!defects || Object.keys(defects).length === 0) {
        return "Good";
    }

    let averageCount = 0, badCount = 0;

    for (const [key, value] of Object.entries(defects)) {
        if (key === "Roadpatch" || key === "Manhole" || key === "Minor-Pothole") {
            averageCount += value;
        }

        if (key === "Hotspot" || key === "Major-Pothole") {
            badCount += value;
        }

    }

    if (badCount || averageCount) {
        return badCount ? "Bad" : "Average";
    }
    return "Good";
};

const handleVideoLinkClick = (singlePointData) => {
    const latitude = singlePointData && singlePointData.coordinates[0];
    const longitude = singlePointData && singlePointData.coordinates[1];
    const url = `/streetView/latitude=${encodeURIComponent(
        latitude
    )}/longitude=${encodeURIComponent(longitude)}`;
    window.open(url, "_blank");
};

const headerColor = (condition) => {
    if (condition === "Good") {
        return "#63ad43";
    } else if (condition === "Average") {
        return "#ff8437";
    } else if (condition === "Bad") {
        return "#ff0000";
    }
};

const ParentContainer = ({ children }) => {
    return (
        <div className={`${pointDetailsStyles.parentContainer}`}>
            {children}
        </div>
    );
};

const GridContainer = ({ row, children }) => {
    const isRowOne = row == 1;
    return (
        <div
            className={`${pointDetailsStyles.gridContainer}`}
            style={{
                borderTop: isRowOne ? "1px solid #d1d5db" : "none",
                borderRight: isRowOne && "none",
            }}
        >
            {children}
        </div>
    );
};

const GridItem = ({ column, row, isCol3, singlePointData, children }) => {
    return (
        <div
            className={`${pointDetailsStyles.gridItem} ${isCol3 && "h-full"}`}
            style={{
                color: isCol3 ? "#FE6100" : "#000",
            }}
            onClick={
                row === 5
                    ? () => {
                          handleVideoLinkClick(singlePointData);
                      }
                    : null
            }
        >
            {children}
        </div>
    );
};

const ImageContainer = ({ children }) => {
    return (
        <div className={`${pointDetailsStyles.imageContainer}`}>{children}</div>
    );
};

const TopContainer = ({ children }) => {
    return (
        <div className={`${pointDetailsStyles.topContainer}`}>{children}</div>
    );
};

const ChildContainer = ({ condition, children }) => {
    return (
        <div
            className={`${pointDetailsStyles.childContainer}`}
            style={{ background: headerColor(condition) }}
        >
            {children}
        </div>
    );
};

export {
    ParentContainer,
    GridContainer,
    GridItem,
    ImageContainer,
    TopContainer,
    ChildContainer,
    conditionOfPoint,
};
