export const buttonToShow = {
	Region: {
		buttons: ['region', 'circle', 'division', 'subDivision','road'],
		reportroute: '/downloadreport',
		dropdownroute: '/selectareareport',
		message: [
			'Region Wise',
			'Circle Wise',
			'Division Wise',
			'Sub-Division Wise',
			'Road Wise'
		],
		access: {
			region: 1,
			circle: 0,
			division: 0,
			subDivision: 0,
			road:0,
		},
	},
	Circle: {
		buttons: ['circle', 'division', 'subDivision','road'],
		message: ['Circle Wise', 'Division Wise', 'Sub-Division Wise','Road Wise'],
		reportroute: '/downloadreport',
		dropdownroute: '/selectareareport',
		access: {
			region: 0,
			circle: 1,
			division: 0,
			subDivision: 0,
			road:0,
		},
	},
	Division: {
		buttons: ['division', 'subDivision','road'],
		message: ['Division Wise', 'Sub-Division Wise','Road Wise'],
		reportroute: '/downloadreport',
		dropdownroute: '/selectareareport',
		access: {
			region: 0,
			circle: 0,
			division: 1,
			subDivision: 0,
			road:0,
		},
	},
	'Sub-division': {
		buttons: ['subDivision','road'],
		message: ['Sub-Division Wise','Road Wise'],
		reportroute: '/downloadreport',
		dropdownroute: '/selectareareport',
		access: {
			region: 0,
			circle: 0,
			division: 0,
			subDivision: 1,
			road:0,
		},
	},
	Road: {
		buttons: ['road'],
		message: ['Road Wise'],
		reportroute: '/downloadreport',
		dropdownroute: '/selectareareport',
		access: {
			region: 0,
			circle: 0,
			division: 0,
			subDivision: 0,
			road:1,
		},
	},
};


export const levelData = {
	Region: 'region',
	Circle: 'circle',
	Division: 'division',
	'Sub-division': 'subDivision',
};

