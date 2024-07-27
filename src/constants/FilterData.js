import { filterIcons } from '../assets/IconArray';
import { ImagesOnMap } from '../assets/IconArray';

const pointCheckboxesData = [
	{
		id: 1,
		label: 'All',
		checked: true,
		imagePath: filterIcons.all,
		color: 'all',
	},
	{
		id: 2,
		label: 'Good',
		checked: true,
		imagePath: filterIcons.good,
		color: '#63AD43',
	},
	{
		id: 3,
		label: 'Average',
		checked: true,
		imagePath: filterIcons.average,
		color: '#ff8437',
	},
	{
		id: 4,
		label: 'Bad',
		checked: true,
		imagePath: filterIcons.bad,
		color: '#FF0000',
	},
	{
		id: 5,
		label: 'Speed Breaker',
		checked: true,
		imagePath: filterIcons.speedbreaker,
		color: '#868686',
	},
	// { id: 5, label: 'Unassessed', checked: false, imagePath: filterIcons.unassessed },
	// { id: 6, label: 'Major Potholes', checked: false, imagePath: filterIcons.majorpothole },
	// { id: 7, label: 'Minor Pothholes', checked: false, imagePath: filterIcons.minorpothole },
	// { id: 8, label: 'Servere Potholes', checked: false, imagePath: filterIcons.severepothole },
	// { id: 8, label: 'Patches', checked: false, imagePath: patch },
	// { id: 9, label: 'Slab Alignment', checked: false, imagePath: slab },
	// { id: 10, label: 'Cracks', checked: false, imagePath: crack },
	// { id: 11, label: 'Ravelling', checked: false, imagePath: ravel },
	// { id: 12, label: 'Major Junctions', checked: false, imagePath: junction },
];

const segmentCheckboxesData = [
	{
		id: 1,
		label: 'All',
		checked: false,
		imagePath: filterIcons.all,
		layer: 'all',
	},
	{
		id: 2,
		label: 'Good',
		checked: false,
		imagePath: filterIcons.good,
		layer: 'good',
	},
	{
		id: 3,
		label: 'Average',
		checked: false,
		imagePath: filterIcons.average,
		layer: 'average',
	},
	{
		id: 4,
		label: 'Bad',
		checked: false,
		imagePath: filterIcons.bad,
		layer: 'failed',
	},

	// { id: 5, label: 'Unassessed', checked: false, imagePath: filterIcons.unassessed },
	// { id: 6, label: 'Major Potholes', checked: false, imagePath: filterIcons.majorpothole },
	// { id: 7, label: 'Minor Potholes', checked: false, imagePath: filterIcons.minorpothole },
	// { id: 8, label: 'Severe Potholes', checked: false, imagePath: filterIcons.severepothole },
	// { id: 2, label: 'Excellent', checked: false, imagePath: excellent },
	// { id: 9, label: 'Patches', checked: false, imagePath: patch },
	// { id: 10, label: 'Slab Alignment', checked: false, imagePath: slab },
	// { id: 11, label: 'Cracks', checked: false, imagePath: crack },
	// { id: 12, label: 'Ravelling', checked: false, imagePath: ravel },
	// { id: 13, label: 'Major Junctions', checked: false, imagePath: junction },
];

const otherConditionsData = [
	{
		id: 1,
		label: 'Speed Breaker',
		checked: false,
		imagePath: filterIcons.speedbreaker,
	},
	{
		id: 2,
		label: 'Manhole',
		checked: false,
		imagePath: filterIcons.manhole,
	},
];

const roadAssetsData = [
	{
		id: 0,
		label: 'All',
		checked: true,
		imagePath: filterIcons.all,
		layer: 'all',
	},
	{
		id: 1,
		label: 'Street Lights',
		checked: true,
		imagePath: filterIcons.streetlight,
		layer: 'streetlightonmap',
	},
	{
		id: 2,
		label: 'Traffic Signal',
		checked: true,
		imagePath: filterIcons.trafficsignal,
		layer: 'trafficlightonmap',
	},
	{
		id: 3,
		label: 'Left Chevron',
		checked: true,
		imagePath: ImagesOnMap.leftchevrononfeature,
		layer: 'leftchevrononmap',
	},
	{
		id: 4,
		label: 'Right Chevron',
		checked: true,
		imagePath: ImagesOnMap.rightchevrononfeature,
		layer: 'rightchevrononmap',
	},
	{
		id: 5,
		label: 'Cautionary Sign',
		checked: true,
		imagePath: ImagesOnMap.cautionarysignonmap,
		layer: 'cautionarysignonmap',
	},
	{
		id: 6,
		label: 'Mandatory Sign',
		checked: true,
		imagePath: ImagesOnMap.mandatorysignonmap,
		layer: 'mandatorysignonmap',
	},
	{
		id: 7,
		label: 'Informatory Board',
		checked: true,
		imagePath: ImagesOnMap.informatoryboardonmap,
		layer: 'informatorysignonmap',
	},
	// {
	// 	id: 2,
	// 	label: 'Bus Stops',
	// 	checked: false,
	// 	imagePath: filterIcons.busstop,
	// },
	// {
	// 	id: 3,
	// 	label: 'Petrol Pumps',
	// 	checked: false,
	// 	imagePath: filterIcons.petrolpump,
	// },

	// { id: 1, label: 'Major Bridge', checked: false, imagePath: major_bridge },
	// { id: 2, label: 'Minor Bridge', checked: false, imagePath: minor_bridge },
	// { id: 3, label: 'Cuiverts', checked: false, imagePath: culverts },
	// { id: 4, label: 'ROB', checked: false, imagePath: rob },
	// { id: 5, label: 'RUB', checked: false, imagePath: rub },
	// { id: 6, label: 'Flyovers', checked: false, imagePath: Flyovers },
	// { id: 8, label: 'Footways Damage', checked: false, imagePath: footways_damage },
	// { id: 9, label: 'Smart Toilets', checked: false, imagePath: smart_toilet },
	// { id: 10, label: 'Trees', checked: false, imagePath: trees },
	// { id: 13, label: 'Damaged Sign Boards', checked: false, imagePath: damaged_sign_boards },
	// { id: 14, label: 'River Crossing', checked: false, imagePath: river_crossing },
];

const RoadFeaturesData = [
	// { id: 1, label: 'All', checked: false, imagePath: all },
	// {
	//   id: 1,
	//   label: "Informatory Signs",
	//   checked: false,
	//   imagePath: filterIcons.informatorysign,
	// },
	// {
	// 	id: 2,
	// 	label: 'Mandatory Signs',
	// 	checked: false,
	// 	imagePath: mandatorysigns,
	// },
	// {
	// 	id: 4,
	// 	label: 'Cautionary Signs',
	// 	checked: false,
	// 	imagePath: caution,
	// },
];

const InformatorySigns = [
	{ id: 1, label: 'No Parking', imagePath: filterIcons.streetlight },
	{
		id: 2,
		label: 'Pedestrian Crossing',
		imagePath: filterIcons.streetlight,
	},
	{ id: 3, label: 'Left Chevron', imagePath: filterIcons.streetlight },
	{
		id: 4,
		label: 'Right Chevron',
		imagePath: filterIcons.streetlight,
	},
	{
		id: 5,
		label: 'SchoolZone',
		imagePath: filterIcons.streetlight,
	},
	{
		id: 6,
		label: 'Side road left ',
		imagePath: filterIcons.streetlight,
	},
	{
		id: 7,
		label: 'Speed breaker Ahead',
		imagePath: filterIcons.streetlight,
	},
	{
		id: 8,
		label: 'SpeedLimit-20',
		imagePath: filterIcons.streetlight,
	},
	{
		id: 9,
		label: 'SpeedLimit-40',
		imagePath: filterIcons.streetlight,
	},
	{
		id: 10,
		label: 'SpeedLimit-80',
		imagePath: filterIcons.streetlight,
	},
	{
		id: 11,
		label: 'U-turn',
		imagePath: filterIcons.streetlight,
	},
];

const MandatorySigns = [];

const CautionarySigns = [];

export {
	pointCheckboxesData,
	segmentCheckboxesData,
	otherConditionsData,
	roadAssetsData,
	MandatorySigns,
	CautionarySigns,
	RoadFeaturesData,
	InformatorySigns,
};
