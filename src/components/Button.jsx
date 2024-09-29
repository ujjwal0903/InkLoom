function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    return (
        <button
            type={type}
            className={`px-5 py-3 rounded-lg ${bgColor} ${textColor} ${className} transition duration-200 ease-in-out 
                shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50`}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
