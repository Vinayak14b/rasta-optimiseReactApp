import { useState, useEffect } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';

const Dropdowns = ({ options, handleDropdownChange, category }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        handleDropdownChange(option);
        setIsOpen(false);
    };

    useEffect(() => {
        if (options && options.length > 0) {
            const checkedOptions = options.find((option) => option.checked);
            if (checkedOptions) {
                setSelectedOption(checkedOptions);
            }
        }
    }, [options]);

    return (
        <div className={`dropdown ${isOpen ? 'on' : ''}`}>
            <div className="dropdown-label" onClick={toggleOpen}>
                <div>
                    <p className="uppercase">{`Select ${category}`}</p>
                    <h3 className="label-main mt-1">{selectedOption ? selectedOption.name : 'None Selected'}</h3>
                </div>
                <AiFillCaretDown className="h-6 w-6" />
            </div>
            {isOpen && (
                <div className="dropdown-list z-50">
                    {options.map((option, index) => (
                        <div key={index} className="dropdown-option" onClick={() => handleOptionClick(option)}>
                            {option.name}-{option.roadNo}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdowns;
