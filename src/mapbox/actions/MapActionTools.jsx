 
import View360 from './Controller/View360';
import LineStringTool from './Controller/LineStringTool';
import DeleteTool from './Controller/DeleteTool';
import SnapshotTool from './Controller/SnapshotTool';
import PolygonTool from './Controller/PolygonTool';
 
const MapActionTools = () => {
 

  return (
    <div className="bg-red">
      
      <div>
        <LineStringTool />
        <PolygonTool />
        <DeleteTool />
        <View360 />
        <SnapshotTool />
      </div>
    </div>
  );
};

export default MapActionTools;






































// import { Tooltip } from '@mui/material';

// const MapActionTools = (onRotationClick,
//     onPolygonClick,
//     onRoadwidthClick,
//     rotationIcon) => {


// const icons = [
//     // { src: 'poly.png', alt: 'poly', onClick: onPolygonClick, title: 'Area Selection' },
//     // {
//     //   src: 'Group 4057.png',
//     //   alt: 'scale',
//     //   onClick: onRoadwidthClick,
//     //   title: 'Road Width',
    
//     // },
    
//     {
//       src: '360s.png',
//       alt: '360s',
//       onClick: onRotationClick,
//       title: '360 View',
//       id:rotationIcon?.id
//     },
  
//   ];

//   return (
//     <div className='mr-2 mt-6 w-10'>
//       {icons.map((icon, index) => (
//         <Tooltip key={index} title={icon.title} arrow placement='right'>
//           <img
//             src={icon.src}
            
//             className={`w-12 h-auto object-scale-down mb-2 ${icon.title === 'Camera' ? 'cursor-pointer' : ''}`}
//             alt={icon.alt}
//             id={icon.id}
//             onClick={icon.onClick}
//             style={{ cursor: icon.title === 'Camera' ? 'pointer' : 'default' }}
//           />
//         </Tooltip>
//       ))}
//     </div>
//   );
// };

// export default MapActionTools

 