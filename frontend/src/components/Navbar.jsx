import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white">
            {/* Left side (Logo) */}
            <div className="text-2xl font-bold text-pink-400">
                <Link to="/">Traditional Finds</Link>
            </div>

            {/* Middle (Navigation links + Search) */}
            <div className="flex-1 flex items-center justify-center space-x-8">
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/" className="hover:text-pink-400">Home</Link>
                    </li>
                    <li>
                        <Link to="/shop" className="hover:text-pink-400">Shop</Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:text-pink-400">About</Link>
                    </li>
                    <li>
                        <Link to="/contact" className="hover:text-pink-400">Contact</Link>
                    </li>
                </ul>

                {/* Search bar */}
                <div className="flex items-center ml-8">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="p-2 rounded-md border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                </div>
            </div>

            {/* Right side (Profile, Login, Logout) */}
            <div className="flex items-center space-x-4 ml-4">
                <Link to="/profile" className="hover:text-pink-400 font-semibold">Profile</Link>
                <Link to="/login" className="hover:text-pink-400 font-semibold">Login</Link>
                <Link to="/logout" className="hover:text-pink-400 font-semibold">Logout</Link>
            </div>
        </nav>
    );
};

export default Navbar;
