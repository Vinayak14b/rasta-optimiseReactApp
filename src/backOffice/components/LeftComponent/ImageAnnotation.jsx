import React, { useRef, useState, useEffect } from 'react';
import { ReactPictureAnnotation } from 'react-picture-annotation'; 
import { Spinner } from '../../../utils/Spinner';

const ImageAnnotation = ({
	imgSrc,
	canvasRef,
	annotations,
	setAnnotations,
	containerRef,
	customDivRef,
	loading,
}) => {
	//  const AnnotationComp = ({imgSrc,canvasRef,annotations,setAnnotations}) => {

	// const canvasRef = useRef(null);
	const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
	//  const [annotations, setAnnotations] = useState([]);
	// const [imgSrc, setImgSrc] = useState('');
	// var imgSrc;
	// const [load, setLoad] = useState(true);

	useEffect(() => {
		const updateContainerSize = () => {
			if (containerRef.current) {
				const { clientWidth, clientHeight } = containerRef.current;
				setContainerSize({ width: clientWidth, height: clientHeight });
			}
		};
		// setLoad(false);
		updateContainerSize();
		// console.log("h and w ",containerSize.height,containerSize.width)
		window.addEventListener('resize', updateContainerSize);
		return () => window.removeEventListener('resize', updateContainerSize);
		//  }, [containerSize]);
	}, []);
	// }, [load]);
	//  console.log("containerSize :",containerSize)

	const onSelect = (selectedId) =>
		// console.log(selectedId)
		console.log();

	const onChange = (data) => {
		setAnnotations(data);
	};

	return (
		<div className="flex flex-col box-border">
			<div
				ref={containerRef}
				style={{
					width: '820px',
					height: '500px',
					outline: '#75757B solid 2px',
				}}>
				{/* {false ? ( */}

				{imgSrc ? (
					<div>
						<div ref={customDivRef}>
							{loading ? (
								<div className="h-full -mt-8">
									<Spinner />
								</div>
							) : (
								<ReactPictureAnnotation
									image={`data:image/jpeg;base64,${imgSrc}`}
									onSelect={onSelect}
									onChange={onChange}
									width={820}
									height={500}
									annotations={annotations}
									scrollSpeed="0"
								/>
							)}
							<canvas
								ref={canvasRef}
								style={{ display: 'none' }}
							/>
						</div>
					</div>
				) : (
					<div className="w-full h-full flex justify-center items-center ">
						<Spinner />
					</div>
				)}
			</div>
		</div>
	);
};

export default ImageAnnotation;
