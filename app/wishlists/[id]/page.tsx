"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Head from "next/head";

interface WishlistItem {
    title: string;
    brand: string;
    mainImageUrl: string;
    rating: number;
    url: string;
    price: {
        display: string;
    };
    dateAdded: string;
    _id?: string;
}

interface CharityData {
    charityName: string;
    description: string;
    address: string;
    image: string;
    email: string;
    wishlist: WishlistItem[];
}

export default function CharityWishlist() {
    const params = useParams();
    const { data: session } = useSession();
    const [charity, setCharity] = useState<CharityData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (charity) {
            document.title = `${charity.charityName} Wishlist | Baobab`;
        } else {
            document.title = "Baobab - Charity Wishlists";
        }
    }, [charity]);

    const handleDeleteItem = async (itemId: string) => {
        try {
            const response = await fetch(
                `/api/wishlists/${params.id}/items/${itemId}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete item");
            }

            setCharity((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    wishlist: prev.wishlist.filter(
                        (item) => item._id !== itemId
                    ),
                };
            });
        } catch (error) {
            console.error("Error deleting item:", error);
            setError("Failed to delete item");
        }
    };

    useEffect(() => {
        async function fetchCharityWishlist() {
            try {
                const response = await fetch(`/api/wishlists/${params.id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch charity wishlist");
                }
                const data = await response.json();
                console.log("Fetched charity data:", data);
                setCharity(data);
            } catch (error) {
                console.error("Error fetching charity wishlist:", error);
                setError("Failed to load wishlist");
            } finally {
                setLoading(false);
            }
        }

        fetchCharityWishlist();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl">Loading...</div>
            </div>
        );
    }

    if (error || !charity) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-red-500">
                    {error || "Charity not found"}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto py-12 px-4">
            <Head>
                <title>{charity.charityName} Wishlist | Baobab</title>
                <meta
                    name="description"
                    content={`Support ${charity.charityName} by fulfilling their wishlist.`}
                />
            </Head>
            <div className="text-center mb-12">
                <img
                    src={charity.image}
                    alt={charity.charityName}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h1 className="text-3xl font-bold mb-4">
                    {charity.charityName}
                </h1>
                <h2 className="text-2xl font-semibold mb-2">
                    {charity.address}
                </h2>
                <p className="text-gray-600 mb-8">{charity.description}</p>
            </div>

            {charity.wishlist && charity.wishlist.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {charity.wishlist.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md p-6 relative flex flex-col h-full">
                            {session?.user?.email === charity.email &&
                                item._id && (
                                    <button
                                        onClick={() =>
                                            handleDeleteItem(item._id!)
                                        }
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
                <p className="text-center text-gray-500">
                    No items in wishlist yet.
                </p>
            )}
        </div>
    );
}
