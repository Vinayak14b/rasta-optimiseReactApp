// DatePicker.js

import { useState } from 'react';

const DatePicker = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    onDateChange(date);
  };

  return (
    <div className="relative w-[23vw] cursor-pointer">
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="w-full py-2 px-3 border rounded-md outline-none focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default DatePicker;
