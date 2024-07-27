import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

const ChooseColor = ({ colors, setColors }) => {
	const [selectedField, setSelectedField] = useState('');

	const handleColorChange = (color) => {
		if (selectedField) {
			setColors((prevColors) => ({
				...prevColors,
				[selectedField]: color.hex,
			}));
		}
	};

	const handleCheckboxChange = (field) => {
		setSelectedField(field);
	};

	return (
		<div className="flex bg-gray-100 p-4 rounded-lg">
			<div className="w-64 mr-4">
				<ChromePicker
					color={colors[selectedField]}
					onChange={handleColorChange}
				/>
			</div>
			<div className="flex flex-col">
				<div className="flex items-center justify-between mb-4">
					<input
						type="checkbox"
						id="borderCheckbox"
						checked={selectedField === 'border'}
						onChange={() => handleCheckboxChange('border')}
						className="mr-2"
					/>
					<label htmlFor="borderCheckbox" className="mr-2   ">
						Border
					</label>
					<div
						className="w-6 h-6 rounded-full ml-2 "
						style={{ backgroundColor: colors.border }}></div>
				</div>
				<div className="flex items-center mb-4 justify-between">
					<input
						type="checkbox"
						id="textCheckbox"
						checked={selectedField === 'text'}
						onChange={() => handleCheckboxChange('text')}
						className="mr-2"
					/>
					<label htmlFor="textCheckbox" className="mr-2   ">
						Text
					</label>
					<div
						className="w-6 h-6 rounded-full ml-2"
						style={{ backgroundColor: colors.text }}></div>
				</div>
				<div className="flex items-center justify-between">
					<input
						type="checkbox"
						id="textBgCheckbox"
						checked={selectedField === 'textBg'}
						onChange={() => handleCheckboxChange('textBg')}
						className="mr-2"
					/>
					<label htmlFor="textBgCheckbox" className="mr-2  ">
						Text-BG
					</label>
					<div
						className="w-6 h-6 rounded-full ml-2"
						style={{ backgroundColor: colors.textBg }}></div>
				</div>
			</div>
		</div>
	);
};

export default ChooseColor;
