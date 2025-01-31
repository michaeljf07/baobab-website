"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserData {
    _id: string;
    charityName: string;
    registrationNumber: string;
    email: string;
    description: string;
    image: string;
    wishlist: WishlistItem[];
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

export default function Profile() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newCharityName, setNewCharityName] = useState("");
    const [error, setError] = useState("");
    const [amazonUrl, setAmazonUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [searchedProduct, setSearchedProduct] = useState<AmazonProduct | null>(null);

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/account/signin");
        }
    }, [status, router]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("/api/profile");
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const data = await response.json();
                setUserData(data);
                setNewCharityName(data.charityName);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        if (status === "authenticated") {
            fetchUserData();
        }
    }, [status]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const extractAsinAndDomain = (url: string): { asin: string | null; domain: string } => {
        const asinMatch = url.match(/\/([A-Z0-9]{10})(?:[/?]|$)/);
        const domainMatch = url.match(/amazon\.(com|ca|co\.uk|de|fr|co\.jp|in)/i);
        return {
            asin: asinMatch ? asinMatch[1] : null,
            domain: domainMatch ? domainMatch[0] : 'amazon.com'
        };
    };

    const handleAddProduct = async () => {
        console.log("Search initiated with URL:", amazonUrl);
        setError("");
        setIsLoading(true);
        setSearchedProduct(null);
        
        const { asin, domain } = extractAsinAndDomain(amazonUrl);
        console.log("Extracted ASIN:", asin, "Domain:", domain);
        
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
                body: JSON.stringify({ asin, domain }),
            });
            console.log("API Response status:", response.status);
            
            if (!response.ok) {
                throw new Error("Failed to fetch product details");
            }
            
            const data = await response.json();
            console.log("Product data received:", data);
            const product = data.data.amazonProduct;
            product.url = product.url.replace(/amazon\.com/, domain);
            setSearchedProduct(product);
        } catch (error) {
            console.error("Error in handleAddProduct:", error);
            setError("Failed to add product");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const response = await fetch("/api/profile/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ charityName: newCharityName }),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            const updatedData = await response.json();
            setUserData(updatedData);
            setIsEditing(false);
            setError("");
        } catch (error) {
            setError("Failed to update profile");
            console.error("Error updating profile:", error);
        }
    };

    const handleAddToWishlist = async () => {
        if (!searchedProduct) return;

        try {
            const response = await fetch("/api/wishlist/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(searchedProduct),
            });

            if (!response.ok) {
                throw new Error("Failed to add item to wishlist");
            }

            alert("Item added to wishlist successfully!");
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            setError("Failed to add item to wishlist");
        }
    };

    const handleDeleteItem = async (itemId: string) => {
        try {
            const response = await fetch(`/api/wishlist/${itemId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete item from wishlist');
            }

            setUserData(prev => {
                if (!prev) return null;
                return {
                    ...prev,
                    wishlist: prev.wishlist.filter(item => item.id !== itemId)
                };
            });
        } catch (error) {
            console.error('Error deleting item:', error);
            setError('Failed to delete item from wishlist');
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl">Loading...</div>
            </div>
        );
    }

    if (!userData) {
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            {/* Profile Info Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <div className="flex items-center space-x-6 mb-8">
                    <img
                        src={userData.image}
                        alt={userData.charityName}
                        className="w-32 h-32 rounded-full object-cover"
                    />
                    <div className="flex-1">
                        {isEditing ? (
                            <div className="flex items-center gap-4">
                                <input
                                    type="text"
                                    value={newCharityName}
                                    onChange={(e) => setNewCharityName(e.target.value)}
                                    className="text-3xl font-bold border-2 border-gray-300 rounded px-2 py-1"
                                />
                                <button
                                    onClick={handleSave}
                                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                    Save
                                </button>
                                <button
                                    onClick={() => {
                                        setIsEditing(false);
                                        setNewCharityName(userData.charityName);
                                    }}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <h1 className="text-3xl font-bold">{userData.charityName}</h1>
                                <button
                                    onClick={handleEdit}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                    Edit
                                </button>
                            </div>
                        )}
                        <p className="text-gray-600">{userData.email}</p>
                    </div>
                </div>
                
                {error && (
                    <p className="text-red-500 mb-4">{error}</p>
                )}

                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Registration Number</h2>
                        <p className="text-gray-700">{userData.registrationNumber}</p>
                    </div>
                    
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Description</h2>
                        <p className="text-gray-700">{userData.description}</p>
                    </div>
                </div>
            </div>

            {/* Add to Wishlist Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6">Add to Wishlist</h2>
                <div className="flex flex-col items-center">
                    <div className="relative w-full max-w-xl mb-6">
                        <input
                            type="text"
                            placeholder="Paste Amazon URL..."
                            value={amazonUrl}
                            onChange={(e) => setAmazonUrl(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            onClick={handleAddProduct}
                            disabled={isLoading}
                            className="absolute right-0 top-0 bottom-0 px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400">
                            {isLoading ? "Loading..." : "Search"}
                        </button>
                    </div>

                    {searchedProduct && (
                        <div className="w-full bg-gray-50 rounded-lg p-6 mt-4">
                            <div className="flex flex-col h-full">
                                <div className="flex items-start space-x-6 flex-1">
                                    <img
                                        src={searchedProduct.mainImageUrl}
                                        alt={searchedProduct.title}
                                        className="w-48 h-48 object-contain"
                                    />
                                    <div className="flex-1 flex flex-col h-full">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold mb-2">{searchedProduct.title}</h3>
                                            <p className="text-gray-600 mb-2">Brand: {searchedProduct.brand}</p>
                                            <p className="text-lg font-bold text-green-600 mb-2">
                                                {searchedProduct.price.display}
                                            </p>
                                            <div className="flex items-center mb-4">
                                                <span className="text-yellow-400">★</span>
                                                <span className="ml-1">{searchedProduct.rating}</span>
                                            </div>
                                        </div>
                                        <div className="flex space-x-4 mt-auto">
                                            <a
                                                href={searchedProduct.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 text-center bg-cyan-600 text-white px-4 py-2 rounded hover:bg-amber-500">
                                                View on Amazon
                                            </a>
                                            <button
                                                onClick={handleAddToWishlist}
                                                className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                                Add to Wishlist
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Current Wishlist Section */}
            <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>
                {userData.wishlist && userData.wishlist.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userData.wishlist.map((item, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-6 relative flex flex-col h-full">
                                {item.id && (
                                    <button
                                        onClick={() => handleDeleteItem(item.id)}
                                        className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                        aria-label="Delete item">
                                        ×
                                    </button>
                                )}
                                <div className="flex-1">
                                    <img
                                        src={item.mainImageUrl}
                                        alt={item.title}
                                        className="w-full h-48 object-contain mb-4"
                                    />
                                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                    <p className="text-gray-600 mb-2">Brand: {item.brand}</p>
                                    <p className="text-lg font-bold text-green-600 mb-2">
                                        {item.price.display}
                                    </p>
                                    <div className="flex items-center mb-4">
                                        <span className="text-yellow-400">★</span>
                                        <span className="ml-1">{item.rating}</span>
                                    </div>
                                </div>
                                <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block text-center bg-cyan-600 text-white px-4 py-2 rounded hover:bg-amber-500 mt-auto">
                                    View on Amazon
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No items in wishlist yet.</p>
                )}
            </div>
        </div>
    );
}
