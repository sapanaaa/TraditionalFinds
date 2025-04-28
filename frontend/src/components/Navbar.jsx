import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="text-xl font-bold">E-Commerce</div>
            <ul className="flex space-x-6">
                <li>
                    <Link to="/home" className="cursor-pointer">Home</Link>
                </li>
                <li>
                    <Link to="/shop" className="cursor-pointer">Shop</Link>
                </li>
                <li>
                    <Link to="/about" className="cursor-pointer">About</Link>
                </li>
                <li>
                    <Link to="/contact" className="cursor-pointer">Contact</Link>
                </li>
            </ul>
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="p-2 rounded-md border border-gray-300 mr-2"
                />
                <button className="p-2 rounded-md bg-gray-600 text-white hover:bg-gray-700">
                    Search
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
