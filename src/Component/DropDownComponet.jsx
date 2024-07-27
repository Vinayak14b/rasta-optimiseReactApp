
// const DropDownComponent = ({ bgColor, items,selectedValue,onChange}) => {
//   const [isDropdownOpen, setDropdownOpen] = useState(false);
//   const [selectedItem, setSelectedItem] = useState(items[0]);
//   const toggleDropdown = () => {
//     setDropdownOpen(!isDropdownOpen);
//   };

//   const handleItemClick = (item) => {
//    // setSelectedItem(item);
//     setDropdownOpen(false);
//   };

//   return (
//     <div className="relative inline-block text-left ">
//    <select
//       id="dropdownDividerButton"
//       onClick={toggleDropdown}
//       value={selectedItem}
//       className={`text-white ${bgColor} focus:ring-4 focus:outline-none focus:ring-${bgColor}-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center ${selectedItem !== 'Dropdown divider' ? 'bg-gray-200' : ''}`}
//       style={{ minWidth: '190px' }}
//       onChange={(e) => onChange(e.target.value)}
//     >
//       {items.map((item, index) => (
//         <option key={index} value={item}>
//           {item}
//         </option>
//       ))}
//     </select>
//     <svg
//       className="w-2.5 h-2.5 absolute top-1/2 right-4 transform -translate-y-1/2"
//       aria-hidden="true"
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 10 6"
//     >
//       <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
//     </svg>


//       {/* Dropdown menu */}
//       {isDropdownOpen && (
//         <div className={`z-10 absolute left-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`} style={{ minWidth: '120px' }}> {/* Fixed width for the dropdown */}
//           <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
//             {items.map((item, index) => (
//               <li key={index}>
//                 <a href="#" onClick={() => handleItemClick(item)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
//                   {item}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DropDownComponent;

// const DropDownComponent = ({ bgColor, items, selectedValue, onChange }) => {
//   const [isDropdownOpen, setDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setDropdownOpen((prevIsDropdownOpen) => !prevIsDropdownOpen);
//   };

//   return (
//     <div className="relative inline-block text-left">
//       <select
//         id="dropdownDividerButton"
//         onClick={toggleDropdown}
//         value={selectedValue || ''}
//         className={`text-white ${bgColor} focus:ring-4 focus:outline-none focus:ring-${bgColor}-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center ${selectedValue !== 'Dropdown divider' ? 'bg-gray-200' : ''}`}
//         style={{ minWidth: '190px' }}
//         onChange={(e) => onChange(e.target.value)}
//       >
//         {items.map((item, index) => (
//           <option key={index} value={item}>
//             {item}
//           </option>
//         ))}
//       </select>
//       <svg
//         className="w-2.5 h-2.5 absolute top-1/2 right-4 transform -translate-y-1/2"
//         aria-hidden="true"
//         xmlns="http://www.w3.org/2000/svg"
//         fill="none"
//         viewBox="0 0 10 6"
//       >
//         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
//       </svg>

//       {/* Dropdown menu */}
//       {isDropdownOpen && (
//         <div className={`z-10 absolute left-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`} style={{ minWidth: '120px' }}>
//           <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
//             {items.map((item, index) => (
//               <li key={index}>
//                 <a href="#" onClick={() => onChange(item)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
//                   {item}
//                 </a>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };
  
// export default DropDownComponent;

import { useState, useEffect } from 'react';

const DropDownComponent = ({ bgColor, items, selectedValue, onChange }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const closeDropdown = () => {
      setDropdownOpen(false);
    };

    // Attach a global click event listener to close the dropdown when clicking outside
    document.addEventListener('click', closeDropdown);

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  const toggleDropdown = (e) => {
    e.stopPropagation(); 
    setDropdownOpen(!isDropdownOpen);
  };

  const handleSelectChange = (e) => {
    onChange(e.target.value);
    setDropdownOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <select
      id="dropdownDividerButton"
      value={selectedValue || ''}
      className={`text-white ${bgColor} focus:ring-4 focus:outline-none focus:ring-${bgColor}-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center ${selectedValue !== 'Dropdown divider' ? 'bg-gray-200' : ''}`}
      style={{
        minWidth: '300px',
        border: '1px solid #FF6100', 
        background: 'linear-gradient(0deg, #FFFFFF, #FFFFFF)'
      }}
      onClick={toggleDropdown}
      onChange={handleSelectChange}
    >
      {items.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
      <svg
        className="w-2.5 h-2.5 absolute top-1/2 right-4 transform -translate-y-1/2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
      </svg>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className={`z-10 absolute left-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`} style={{ minWidth: '120px' }}>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDividerButton">
            {items.map((item, index) => (
              <li key={index}>
                <a href="#" onClick={() => onChange(item)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropDownComponent;
