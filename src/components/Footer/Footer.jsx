import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
    return (
        <footer className="relative overflow-hidden py-10 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-100 border-t border-gray-700">
            <div className="relative z-10 mx-auto max-w-7xl px-4">
                <div className="-m-6 flex flex-wrap">
                    {/* Logo and Copyright */}
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo className="h-10 w-auto md:h-12" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">
                                    &copy; {new Date().getFullYear()}. All Rights Reserved by Ujjwal Singhal.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-wider mb-6 text-sm font-semibold uppercase text-gray-400">
                                Company
                            </h3>
                            <ul>
                                <li className="mb-4">
                                    <Link className="text-base font-medium hover:text-blue-400 transition-colors" to="/">Features</Link>
                                </li>
                                <li className="mb-4">
                                    <Link className="text-base font-medium hover:text-blue-400 transition-colors" to="/">Pricing</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Support Links */}
                    <div className="w-full p-6 md:w-1/2 lg:w-2/12">
                        <div className="h-full">
                            <h3 className="tracking-wider mb-6 text-sm font-semibold uppercase text-gray-400">Support</h3>
                            <ul>
                                <li className="mb-4">
                                    <Link className="text-base font-medium hover:text-blue-400 transition-colors" to="/">Account</Link>
                                </li>
                                <li className="mb-4">
                                    <Link className="text-base font-medium hover:text-blue-400 transition-colors" to="/">Help</Link>
                                </li>
                                <li className="mb-4">
                                    <Link className="text-base font-medium hover:text-blue-400 transition-colors" to="/">Contact Us</Link>
                                </li>
                                <li>
                                    <Link className="text-base font-medium hover:text-blue-400 transition-colors" to="/">Customer Support</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Legal Links */}
                    <div className="w-full p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-wider mb-6 text-sm font-semibold uppercase text-gray-400">Legal</h3>
                            <ul>
                                <li className="mb-4">
                                    <Link className="text-base font-medium hover:text-blue-400 transition-colors" to="/">Terms &amp; Conditions</Link>
                                </li>
                                <li className="mb-4">
                                    <Link className="text-base font-medium hover:text-blue-400 transition-colors" to="/">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link className="text-base font-medium hover:text-blue-400 transition-colors" to="/">Licensing</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
