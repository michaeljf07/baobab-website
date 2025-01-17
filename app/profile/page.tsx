"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserData {
    charityName: string;
    registrationNumber: string;
    email: string;
    description: string;
    image: string;
}

export default function Profile() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [newCharityName, setNewCharityName] = useState("");
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

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

    const handleSearch = () => {
        // Functionality to be added later
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
            <div className="bg-white rounded-lg shadow-lg p-8">
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

            <div className="my-6 flex justify-center">
                <div className="relative w-1/3">
                    <input
                        type="text"
                        placeholder="Search Amazon..."
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
        </div>
    );
}
