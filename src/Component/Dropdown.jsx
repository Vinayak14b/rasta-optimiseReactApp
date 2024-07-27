import { useState } from 'react';
import arrow from "../assets/img/Arrow_icon.png"

const Dropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        type="button"
        className="inline-flex items-center justify-between px-4 py-2 text-sm font-medium text-white bg-orange-400 hover:bg-orange-600 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
      >
        <span>Other Conditions</span>
        <img
          className={`ml-12 w-2 h-2 transition-transform transform ${
            isDropdownOpen ? 'rotate-180' : 'rotate-0'
          }`}
          src={arrow}
          alt="Dropdown Arrow"
        />
      </button>

      {isDropdownOpen && (
        <div className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-orange-500 ring-1 ring-black ring-opacity-5 w-full">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <a
              href="#"
              className="block px-4 py-2 text-sm text-white hover:bg-orange-600"
              role="menuitem"
            >
              Option 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-white hover:bg-orange-600"
              role="menuitem"
            >
              Option 2
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-white hover:bg-orange-600"
              role="menuitem"
            >
              Option 3
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
