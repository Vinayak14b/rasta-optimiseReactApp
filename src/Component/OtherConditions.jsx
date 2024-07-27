const OtherConditions = (props) => {
    const { handleOtherConditionsFilter,
        OtherConditionsCheckboxes,
        setOtherConditionsCheckboxes } = props

    return (
        <div>
            <h3 className='ml-4 mt-3 font-semibold'>Other Conditions</h3>

            {Array.isArray(OtherConditionsCheckboxes) && OtherConditionsCheckboxes.map((checkbox) => (
                <div key={checkbox.id} className="flex items-center mt-4">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center">
                            <img className='w-5 ml-4' src={checkbox.imagePath} alt={`Option ${checkbox.id} Icon`} />
                            <h4 className="ml-4">{checkbox.label}</h4>
                        </div>
                        <div>
                            <input
                                checked={checkbox.checked}
                                onChange={() => handleOtherConditionsFilter(checkbox.id, checkbox.checked)}
                                id={`checkbox-${checkbox.id}`}
                                type="checkbox"
                                value=""
                                className={`w-4 h-4 text-white bg-${checkbox.checked ? 'orange' : 'primary-600'} border-gray-300 rounded focus:ring-${checkbox.checked ? 'orange' : 'primary'} dark:focus:ring-${checkbox.checked ? 'orange' : 'primary'} dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 mr-4`}
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OtherConditions;
