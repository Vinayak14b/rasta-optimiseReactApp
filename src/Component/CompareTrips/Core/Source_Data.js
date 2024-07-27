export const buttonToShow = {
	Region: {
		buttons: ['region', 'circle', 'division', 'subDivision'],
		maproute: '/displaymap',
		dropdownroute: '/selectarea',
		message: [
			'Region Wise',
			'Circle Wise',
			'Division Wise',
			'Sub-Division Wise',
		],
		access: {
			region: 1,
			circle: 0,
			division: 0,
			subDivision: 0,
		},
	},
	Circle: {
		buttons: ['circle', 'division', 'subDivision'],
		message: ['Circle Wise', 'Division Wise', 'Sub-Division Wise'],
		maproute: '/displaymap',
		dropdownroute: '/selectarea',
		access: {
			region: 0,
			circle: 1,
			division: 0,
			subDivision: 0,
		},
	},
	Division: {
		buttons: ['division', 'subDivision'],
		message: ['Division Wise', 'Sub-Division Wise'],
		maproute: '/displaymap',
		dropdownroute: '/selectarea',
		access: {
			region: 0,
			circle: 0,
			division: 1,
			subDivision: 0,
		},
	},
	'Sub-division': {
		buttons: ['subDivision'],
		message: ['Sub-Division Wise'],
		maproute: '/displaymap',
		dropdownroute: '/selectarea',
		access: {
			region: 0,
			circle: 0,
			division: 0,
			subDivision: 1,
		},
	},
};


export const levelData = {
	Region: 'region',
	Circle: 'circle',
	Division: 'division',
	'Sub-division': 'subDivision',
};

