"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Charity {
    _id: string;
    charityName: string;
    description: string;
    image: string;
    wishlist?: {
        title: string;
        brand: string;
        mainImageUrl: string;
        rating: number;
        url: string;
        price: {
            display: string;
        };
        dateAdded: string;
    }[];
}

interface AmazonProduct {
    title: string;
    brand: string;
    mainImageUrl: string;
    rating: number;
    url: string;
    price: {
        display: string;
    };
}

interface WishlistItem extends AmazonProduct {
    id: string;
    dateAdded: Date;
}

function Wishlists() {
    const { data: session } = useSession();
    const [charities, setCharities] = useState<Charity[]>([]);
    const [filteredCharities, setFilteredCharities] = useState<Charity[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [amazonUrl, setAmazonUrl] = useState("");
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [searchedProduct, setSearchedProduct] =
        useState<AmazonProduct | null>(null);

    async function fetchUsers() {
        try {
            const response = await fetch("/api/users", { method: "GET" });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data.users);
            setCharities(data.users);
            setFilteredCharities(data.users);
        } catch (error) {
            console.error("Failed to fetch charities:", error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    function handleSearch() {
        const results = charities.filter((charity) =>
            charity.charityName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCharities(results);
    }

    const extractAsin = (url: string): string | null => {
        const asinMatch = url.match(/\/([A-Z0-9]{10})(?:[/?]|$)/);
        return asinMatch ? asinMatch[1] : null;
    };

    const handleAddProduct = async () => {
        setError("");
        setIsLoading(true);
        setSearchedProduct(null);

        const asin = extractAsin(amazonUrl);
        if (!asin) {
            setError("Invalid Amazon URL");
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ asin }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch product details");
            }

            const data = await response.json();
            const product = data.data.amazonProduct;
            setSearchedProduct(product);
        } catch (error) {
            setError("Failed to add product");
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Content for signed-in users
    if (session) {
        // TODO: change to session when done testing
        return (
            <div className="bg-white min-h-screen">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>

                    {/* Search Bar */}
                    <div className="mb-8">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={amazonUrl}
                                onChange={(e) => setAmazonUrl(e.target.value)}
                                placeholder="Paste Amazon product URL here"
                                className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
                            />
                            <button
                                onClick={handleAddProduct}
                                disabled={isLoading}
                                className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-amber-500 transition-colors disabled:bg-gray-400">
                                {isLoading ? "Adding..." : "Add to Wishlist"}
                            </button>
                        </div>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </div>

                    {searchedProduct && (
                        <div className="mb-8 p-4 border rounded-lg shadow-sm">
                            <div className="flex gap-6">
                                <img
                                    src={searchedProduct.mainImageUrl}
                                    alt={searchedProduct.title}
                                    className="w-48 h-48 object-contain"
                                />
                                <div className="flex-1">
                                    <h3 className="font-semibold mb-2">
                                        {searchedProduct.title}
                                    </h3>
                                    <p className="text-cyan-600 font-bold mb-4">
                                        {searchedProduct.price.display}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Wishlist Items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {wishlistItems.map((item) => (
                            <div
                                key={item.id}
                                className="border rounded-lg p-4 shadow-sm">
                                <img
                                    src={item.mainImageUrl}
                                    alt={item.title}
                                    className="w-full h-48 object-contain mb-4"
                                />
                                <h3 className="font-semibold mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-cyan-600 font-bold mb-2">
                                    {item.price.display}
                                </p>
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-center bg-cyan-600 text-white py-2 rounded hover:bg-amber-500 transition-colors">
                                    View on Amazon
                                </a>
                            </div>
                        ))}
                    </div>

                    {wishlistItems.length === 0 && (
                        <p className="text-gray-600 text-center">
                            Your wishlist is empty. Add items by pasting Amazon
                            product URLs above.
                        </p>
                    )}
                </div>
            </div>
        );
    }

    // Content for non-signed-in users (existing view)
    return (
        <>
            <h1 className="text-3xl font-bold text-center">Wishlists</h1>
            <div className="px-6 py-4">
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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-7xl">
                    {filteredCharities.map((charity) => (
                        <Link
                            href={`/wishlists/${charity._id}`}
                            key={charity._id}>
                            <div className="bg-white border rounded-lg shadow-md p-4 text-center transition-transform transform hover:scale-105 cursor-pointer">
                                <img
                                    src={charity.image}
                                    alt={charity.charityName}
                                    className="w-full h-32 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-lg font-semibold mb-2">
                                    {charity.charityName}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {charity.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

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
