"use client";

import Navbar from "@/components/navbar";
import charities from "@/example_data/charities.json";
import { useState } from "react";

function Wishlists() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredCharities, setFilteredCharities] = useState(charities);

    const handleSearch = () => {
        const results = charities.filter((charity) =>
            charity.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCharities(results);
    };

    return (
        <>
            <Navbar />
            <h1 className="text-3xl font-bold text-center">Wishlists</h1>
            <div className="px-6 py-4">
                {/* Search Bar with Button */}
                <div className="my-6 flex justify-center">
                    <div className="relative w-1/3">
                        <input
                            type="text"
                            placeholder="Search charities..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute right-0 top-0 bottom-0 px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Search
                        </button>
                    </div>
                </div>

                {/* Charity Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-7xl">
                    {filteredCharities.map((charity) => (
                        <div
                            key={charity.id}
                            className="bg-white border rounded-lg shadow-md p-4 text-center transition-transform transform hover:scale-105">
                            <img
                                src={charity.imageUrl}
                                alt={charity.name}
                                className="w-full h-32 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-lg font-semibold mb-2">
                                {charity.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {charity.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* No Results Message */}
                {filteredCharities.length === 0 && (
                    <p className="text-center text-gray-500 mt-4">
                        No charities found.
                    </p>
                )}
            </div>
        </>
    );
}

export default Wishlists;
