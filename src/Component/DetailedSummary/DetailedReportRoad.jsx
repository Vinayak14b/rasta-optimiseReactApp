import React from "react";

function DetailedReportRoad({road}) {
    return (
        <div className="flex flex-col justify-center items-center w-[80%] h-[auto] border-2 border-orange-400 bg-[#FFDDC7] rounded-md p-4">
            <div className="font-poppins w-[80%] text-base font-bold leading-24 text-left">
                {`${road?.roadName || "Select Road for"} Report`}
            </div>
            <div className="font-poppins w-[80%] text-sm font-medium leading-21 text-left mt-1">
                Date: {`${road?.Date ? road?.Date: ""}`}
            </div>
            <div className="font-poppins w-[80%] text-sm font-medium leading-21 text-left mt-4">
                Total Distance
            </div>
            <div className="font-poppins w-[80%] text-lg font-bold leading-30 text-left">
                {`${road?.distance ? parseInt(road?.distance) : 0}`} Km
            </div>
        </div>
    );
}

export default DetailedReportRoad;