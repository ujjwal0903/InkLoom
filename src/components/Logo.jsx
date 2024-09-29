import LOGO from "../assets/InkLoom.png";

function Logo() {
    return (
        <div className="flex justify-center items-center">
            <img 
                src={LOGO} 
                alt="Logo" 
                className="h-12 w-auto md:h-20 transition-transform duration-200 transform hover:scale-105" 
            />
        </div>
    );
}

export default Logo;
