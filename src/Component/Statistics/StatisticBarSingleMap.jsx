import React, { useEffect, useState } from 'react'
import './StatisticBar.css';
import StatisticValue from './StatisticValue';
import { getStatisticsDataSingleRoad } from '../../mapbox/services/Operations/StatisticAPI';
import { useDispatch } from 'react-redux';
import {statisticsBarIcons} from '../../assets/IconArray';
import { Spinner } from '../../utils/Spinner';
import closeBtn from '../../assets/img/CloseBtn.png';


const StatisticBarSingleMap = ({setShowStatisticBar,roadName,roadNo}) => {
    const dispatch = useDispatch();
    const [statistics, setStatistics] = useState([]);
    const [loading, setLoading] = useState(true); 
    console.log('Road Name:', roadName);
	console.log('Road No:', roadNo);
    useEffect(()=>{

        async function fetchStatisticsData(){
            try {
                console.log(roadName)
                const statisticsData = await dispatch(getStatisticsDataSingleRoad({roadName,roadNo}));
                

            const imageArray = {
                "Cautionary-sign": statisticsBarIcons.cautionarySign,
                "Hotspot":statisticsBarIcons.hotspot,
                "Informatory-Sign":statisticsBarIcons.infosign ,
                "Left-Chevron": statisticsBarIcons.leftchevron,
                "Right-Chevron": statisticsBarIcons.rightchevron,
                "Mandatory-sign": statisticsBarIcons.mandatorysign,
                "Manhole":statisticsBarIcons.manhole,
                "Minor-Pothole":statisticsBarIcons.minorpothole,
                "Major-Pothole":statisticsBarIcons.majorpothole,
                "Roadpatch":statisticsBarIcons.roadpatch,
                "Speedbreaker":statisticsBarIcons.speedbreaker,
                "StreetLamp": statisticsBarIcons.streetlamp,
                "TrafficLight": statisticsBarIcons.trafficsignal
            }

            const transformedData = Object.keys(statisticsData).flatMap(assetKey => 
                Object.keys(statisticsData[assetKey]).map(defectKey => ({
                    img: imageArray[defectKey],
                    name: defectKey, // Only defect name
                    count: statisticsData[assetKey][defectKey]
                }))
            );

            // Group by defect name
            const groupedData = transformedData.reduce((acc, item) => {
                const existing = acc.find(i => i.name === item.name);
                if (existing) {
                    existing.count += item.count;
                } else {
                    acc.push(item);
                }
                return acc;
            }, []);

            setStatistics(groupedData);
        }catch(e){
            console.log(e)
        }finally{
            setLoading(false);
        }
    }

        fetchStatisticsData();
    },[dispatch,roadName])
  return (
    <div className="statistic-bar text-center hide-scrollbar w-[12vw] mt-3">
        <div className='flex justify-around items-center sticky top-0 z-10 '>
        <div className='text-xl font-bold py-1 bg-primary text-white  z-10 flex justify-around items-center px-5 rounded-lg'>
            Statistics
        </div>
        <button className=" bg-primary close-button text-lg w-6 h-6 flex justify-center items-center pt-0.5 relative top-0 left-1" onClick={() => setShowStatisticBar(false)}>
            <img src={closeBtn} alt="X"/>
        </button>
        </div>
        
        {loading ? ( 
                <Spinner/>
            ) : (
                statistics.map((value) => {
                    return <StatisticValue StatObj={value} key={value.name} />
                })
            )}
        
      
    </div>
  )
}

export default StatisticBarSingleMap
