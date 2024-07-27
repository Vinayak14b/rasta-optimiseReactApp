// import { useEffect, useState } from 'react';
// import AWS from 'aws-sdk';

// const VideoComponent = () => {
//   const [videoUrl, setVideoUrl] = useState('');

//   useEffect(() => {
//     const s3 = new AWS.S3({
//       accessKeyId: 'YOUR_ACCESS_KEY_ID',
//       secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
//       region: 'YOUR_AWS_REGION',
//     });

//     const params = {
//       Bucket: 'YOUR_S3_BUCKET_NAME',
//       Key: 'path/to/your/video.mp4',
//     };

//     s3.getSignedUrl('getObject', params, (err, url) => {
//       if (err) {
//         console.error('Error fetching video from S3:', err);
//       } else {
//         setVideoUrl(url);
//       }
//     });
//   }, []);

//   return (
//     <div>
//       {videoUrl && (
//         <video controls>
//           <source src={videoUrl} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       )}
//     </div>
//   );
// };

// export default VideoComponent;


const videoUrl =
	'https://sion-panvel.s3.ap-south-1.amazonaws.com/P-1-South.mp4';

const Test = () => {
  return (
		<div>
			<video controls>
				<source src={videoUrl} type="video/mp4" />
				Your browser does not support the video tag.
			</video>
		</div>
  );
}

export default Test
