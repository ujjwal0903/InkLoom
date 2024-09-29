import { forwardRef, useId } from "react";

const Input = forwardRef(function Input(
    {
        label,
        type = "text",
        className = "",
        error,
        ...props
    }, ref
) {
    const id = useId();
    return (
        <div className="w-full">
            {label && (
                <label className="inline-block mb-1 pl-1 text-gray-700" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                type={type}
                className={`px-4 py-3 rounded-lg bg-white text-gray-800 outline-none duration-200 border shadow-sm w-full ${
                    error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500 focus:bg-gray-50'
                } ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
});

export default Input;
