"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ContactInfoPage from "./contact-info/page";

interface UserData {
    _id: string;
    charityName: string;
    registrationNumber: string;
    address: string;
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
    _id: string;
    dateAdded: Date;
}

export default function Profile() {
    const { status, data: session } = useSession();
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newCharityName, setNewCharityName] = useState("");
    const [error, setError] = useState("");
    const [amazonUrl, setAmazonUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorAmazon, setErrorAmazon] = useState("");
    const [searchedProduct, setSearchedProduct] =
        useState<AmazonProduct | null>(null);
    const [newImageUrl, setNewImageUrl] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

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
                setUserData(data.user);
                setNewCharityName(data.user.charityName);
                setNewAddress(data.user.address);
                setNewDescription(data.user.description);
                setNewImageUrl(data.user.image);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Failed to load profile data");
            }
        };

        if (status === "authenticated") {
            fetchUserData();
        }
    }, [status]);

    const handleEdit = () => {
        if (!userData) return;
        setIsEditing(true);
        setNewCharityName(userData.charityName);
        setNewAddress(userData.address);
        setNewDescription(userData.description);
        setNewImageUrl(userData.image);
    };

    const extractAsinAndDomain = (
        url: string
    ): { asin: string | null; domain: string } => {
        const asinMatch = url.match(/\/([A-Z0-9]{10})(?:[/?]|$)/);
        const domainMatch = url.match(
            /amazon\.(com|ca|co\.uk|de|fr|co\.jp|in)/i
        );
        return {
            asin: asinMatch ? asinMatch[1] : null,
            domain: domainMatch ? domainMatch[0] : "amazon.com",
        };
    };

    const handleAddProduct = async () => {
        if (!amazonUrl.trim()) {
            setError("Please enter an Amazon URL");
            return;
        }

        setError("");
        setErrorAmazon("");
        setIsLoading(true);
        setSearchedProduct(null);

        const { asin, domain } = extractAsinAndDomain(amazonUrl);

        if (!asin) {
            setErrorAmazon("Invalid Amazon URL");
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

            if (!response.ok) {
                throw new Error("Failed to fetch product details");
            }

            const data = await response.json();
            if (!data.data?.amazonProduct) {
                throw new Error("Product not found");
            }

            const product = data.data.amazonProduct;
            product.url = product.url.replace(/amazon\.com/, domain);
            setSearchedProduct(product);
        } catch (error) {
            console.error("Error in handleAddProduct:", error);
            console.log(errorAmazon);
            setErrorAmazon(
                error instanceof Error ? error.message : "Failed to add product"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = async () => {
        if (!userData) return;

        try {
            const response = await fetch("/api/profile/update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    charityName: newCharityName,
                    address: newAddress,
                    description: newDescription,
                    image: newImageUrl || userData.image,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            const updatedData = await response.json();
            setUserData(updatedData.user);
            setIsEditing(false);
            setError("");
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile");
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

            // Refresh user data to get updated wishlist
            const refreshResponse = await fetch("/api/profile");
            if (!refreshResponse.ok) {
                throw new Error("Failed to refresh profile data");
            }
            const updatedData = await refreshResponse.json();
            setUserData(updatedData);

            // Clear the form
            setAmazonUrl("");
            setSearchedProduct(null);
            setError("");
            setErrorAmazon("");
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            setError("Failed to add item to wishlist");
        }
    };

    const handleDeleteItem = async (itemId: string) => {
        if (!userData?._id) return;

        try {
            const response = await fetch(
                `/api/wishlists/${userData._id}/items/${itemId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete item from wishlist");
            }

            // Refresh the user data to ensure we have the latest wishlist
            const refreshResponse = await fetch("/api/profile");
            if (!refreshResponse.ok) {
                throw new Error("Failed to refresh profile data");
            }
            const updatedData = await refreshResponse.json();
            setUserData(updatedData);
            setError("");
        } catch (error) {
            console.error("Error deleting item:", error);
            setError("Failed to delete item from wishlist");
        }
    };

    const handlePasswordChange = async () => {
        if (!oldPassword || !newPassword) {
            setPasswordError("Both fields are required");
            return;
        }

        try {
            const response = await fetch("/api/profile/password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    oldPassword,
                    newPassword,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to update password");
            }

            // Reset form
            setOldPassword("");
            setNewPassword("");
            setShowPasswordChange(false);
            setPasswordError("");
            alert("Password updated successfully");
        } catch (error) {
            setPasswordError(
                error instanceof Error
                    ? error.message
                    : "Failed to update password"
            );
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
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl text-red-500">Failed to load profile data</div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            {/* Profile Info Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <div className="flex items-center space-x-6 mb-8">
                    <div className="relative group w-48 h-32">
                        <img
                            src={userData.image || "https://archive.org/download/instagram-plain-round/instagram%20dip%20in%20hair.jpg"}
                            alt={userData.charityName}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>

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
                                <h1 className="text-3xl font-bold">
                                    {userData.charityName}
                                </h1>
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

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Registration Number
                        </h2>
                        <div className="group relative">
                            <p className="text-gray-700">
                                {userData.registrationNumber}
                            </p>
                            <div className="absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded px-2 py-1 mt-1">
                                Please email us to change your registration number
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">Address</h2>
                        {isEditing ? (
                            <input
                                type="text"
                                value={newAddress}
                                onChange={(e) => setNewAddress(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        ) : (
                            <p className="text-gray-700">{userData.address}</p>
                        )}
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Description
                        </h2>
                        {isEditing ? (
                            <textarea
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                rows={4}
                            />
                        ) : (
                            <p className="text-gray-700">
                                {userData.description}
                            </p>
                        )}
                    </div>
                </div>

                <div className="my-6">
                    <h2 className="text-xl font-semibold mb-2">
                        Profile Image
                    </h2>
                    <input
                        type="text"
                        placeholder="Paste image URL..."
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSave}
                        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Save Image
                    </button>
                </div>
            </div>

            <ContactInfoPage />

            {/* Password Management Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold mb-6">Password Management</h2>

                {!showPasswordChange ? (
                    <div className="space-y-4">
                        <button
                            onClick={() => setShowPasswordChange(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            Change Password
                        </button>

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold mb-2">
                                Forgot Your Password?
                            </h3>
                            <p className="text-gray-600">
                                Please visit our{" "}
                                <a
                                    href="/contact"
                                    className="text-blue-500 hover:underline">
                                    contact page
                                </a>{" "}
                                and reach out to us with your registered email
                                address. We&apos;ll help you recover your
                                account.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        {passwordError && (
                            <p className="text-red-500">{passwordError}</p>
                        )}
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowPasswordChange(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                                Cancel
                            </button>
                            <button
                                onClick={handlePasswordChange}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Update Password
                            </button>
                        </div>
                    </div>
                )}
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
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleAddProduct}
                            disabled={isLoading}
                            className="absolute right-0 top-0 bottom-0 px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400">
                            {isLoading ? "Loading..." : "Search"}
                        </button>
                    </div>

                    {isLoading && (
                        <div className="w-full text-center py-8">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                            <p className="mt-2 text-gray-600">
                                Loading product details...
                            </p>
                        </div>
                    )}

                    {searchedProduct && !isLoading && (
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
                                            <h3 className="text-xl font-semibold mb-2">
                                                {searchedProduct.title}
                                            </h3>
                                            <p className="text-gray-600 mb-2">
                                                Brand: {searchedProduct.brand}
                                            </p>
                                            <p className="text-lg font-bold text-green-600 mb-2">
                                                {searchedProduct.price.display}
                                            </p>
                                            <div className="flex items-center mb-4">
                                                <span className="text-yellow-400">
                                                    ★
                                                </span>
                                                <span className="ml-1">
                                                    {searchedProduct.rating}
                                                </span>
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
                        {userData.wishlist.map((item) => (
                            <div
                                key={item._id}
                                className="relative bg-gray-50 rounded-lg p-4">
                                <button
                                    onClick={() => handleDeleteItem(item._id)}
                                    className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                    aria-label="Delete item">
                                    ×
                                </button>
                                <div className="flex-1">
                                    <img
                                        src={item.mainImageUrl}
                                        alt={item.title}
                                        className="w-full h-48 object-contain mb-4"
                                    />
                                    <h3 className="text-lg font-semibold mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 mb-2">
                                        Brand: {item.brand}
                                    </p>
                                    <p className="text-lg font-bold text-green-600 mb-2">
                                        {item.price.display}
                                    </p>
                                    <div className="flex items-center mb-4">
                                        <span className="text-yellow-400">
                                            ★
                                        </span>
                                        <span className="ml-1">
                                            {item.rating}
                                        </span>
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
                    <p className="text-center text-gray-500">
                        No items in wishlist yet.
                    </p>
                )}
            </div>

            <div className="mt-8 text-center">
                <Link
                    href="/profile/contact-info"
                    className="text-blue-600 hover:underline text-lg">
                    View or Edit Contact Info
                </Link>
            </div>
        </div>
    );
}
