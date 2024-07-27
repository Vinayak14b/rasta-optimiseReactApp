import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSinglePointData } from "../../services/Operations/PointsAPI";
import { Spinner } from "../../../utils/Spinner";

export default function MaximizeImage() {
  const dispatch = useDispatch();
  const { lat, long, flag } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const imgData = {
          lat: lat,
          long: long,
          predImg: flag,
        };
        const data = await dispatch(getSinglePointData(imgData));
        setImage(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [lat, long, flag, dispatch]); // Add dependencies to the array


  return (
    <>
      <div className="w-full h-screen flex justify-center items-center overflow-hidden bg-black">
        {loading ? (
          <Spinner />
        ) : (
          <img
            src={`data:image/jpeg;base64,${image?.base64Data}`}
            alt=""
            style={{
              width: flag === "true" ? "145vw" : "220vw",
              height: flag === "true" ? "98.5vh" : "175vh",
              objectFit: "contain",
              transform: flag === "true" ? "none" : "rotate(-90deg)",
            }}
          />
        )}
      </div>
    </>
  );
}
