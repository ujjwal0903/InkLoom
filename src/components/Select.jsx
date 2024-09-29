import React, { useId } from 'react';

function Select(
    {
        options = [],
        label,
        className = '',
        ...props
    }, 
    ref
) {
    const id = useId();

    return (
        <div className='w-full'>
            {label && (
                <label htmlFor={id} className='block mb-1 text-gray-700'>
                    {label}
                </label>
            )}
            <select
                {...props}
                id={id}
                ref={ref}
                className={`px-4 py-2 rounded-lg bg-white text-black outline-none border border-gray-300 shadow-sm transition-all duration-300 ease-in-out focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:bg-gray-50 hover:bg-gray-50 ${className}`}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default React.forwardRef(Select);
