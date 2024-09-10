import React from "react";
import {
    FiSun,
    FiMoon,
    FiBell,
    FiSettings,
    FiUser,
    FiSearch
} from "react-icons/fi"; // Importing icons from react-icons

const TopBar = () => {


    return (
        <div className="flex justify-end w-full p-2">
            <button className="p-2 text-gray-600 hover:text-blue-500">
                <FiSettings className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-500">
                <FiUser className="w-5 h-5" />
            </button>
        </div>
    );
};

export default TopBar;
