import { Container, Logo, LogoutBtn } from "../index";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const location = useLocation(); 

    const navItems = [
        { name: "Home", slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Signup", slug: "/signup", active: !authStatus },
        { name: "My Posts", slug: "/myposts", active: authStatus },
        { name: "All Posts", slug: "/all-posts", active: authStatus },
        { name: "Add Post", slug: "/add-post", active: authStatus },
    ];

    return (
        <header className="py-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-md">
            <Container>
                <nav className="flex items-center justify-between">
                    <div className="mr-6">
                        <Link to="/">
                            <Logo width="80px" />
                        </Link>
                    </div>
                    <ul className="flex space-x-6 text-white">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <Link
                                        to={item.slug}
                                        className={`inline-block px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 ease-in-out ${
                                            item.slug === location.pathname
                                                ? 'bg-blue-600 bg-opacity-80 text-white shadow-lg'
                                                : 'hover:bg-blue-600 hover:bg-opacity-70'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;
