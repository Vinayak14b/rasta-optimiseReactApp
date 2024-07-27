import React from 'react'

const StatisticValue = ({StatObj}) => {
  return (
    <div className='w-full mt-3 relative'>
      <div className='image-container'>
        <img src={StatObj.img} alt={StatObj.name} className='stat-image'/>
        <div className='count-overlay text-xs'>{StatObj.count}</div> {/* Add class for styling */}
      </div>
       
        <div className='mt-1'>{StatObj.name}</div>
        
    </div>
  )
}

export default StatisticValue
