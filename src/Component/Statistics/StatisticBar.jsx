import React, { useEffect, useState } from 'react'
import './StatisticBar.css';
import StatisticValue from './StatisticValue';
import { getStatisticsData } from '../../mapbox/services/Operations/StatisticAPI';
import { useDispatch } from 'react-redux';
// import {filterIcons,ImagesOnMap} from '../../assets/IconArray';
import {statisticsBarIcons} from '../../assets/IconArray';
import { Spinner } from '../../utils/Spinner';


const StatisticBar = () => {
    const dispatch = useDispatch();
    const [statistics, setStatistics] = useState([]);
    const [loading, setLoading] = useState(true); 
    useEffect(()=>{

        async function fetchStatisticsData(){
            try {
                const statisticsData = await dispatch(getStatisticsData());
            console.log(statisticsData)

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
    },[dispatch])
  return (
    <div className="statistic-bar text-center hide-scrollbar ">
        <div className='text-xl font-bold py-1 bg-primary text-white sticky top-0 z-10 rounded-lg'>Statistics</div>
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

export default StatisticBar
