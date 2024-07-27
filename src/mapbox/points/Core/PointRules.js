export const defectColorTheme = {
	red: '#FF0000',
	yellow: '#FFD100',
	orange: '#ff8437',
	green: '#63AD43',
	gray: '#868686',
};

export const defectColors = {
	'Major-Pothole': defectColorTheme.red,
	Hotspot: defectColorTheme.red,
	Roadpatch: defectColorTheme.orange,
	'Minor-Pothole': defectColorTheme.orange,
	Manhole: defectColorTheme.orange,
	Speedbreaker: defectColorTheme.gray,
};

export const priorityOrder = [
	'Major-Pothole',
	'Hotspot',
	'Minor-Pothole',
	'Roadpatch',
	'Manhole',
	'Speedbreaker',
];
