"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ContactInfoPage() {
    const { data: session } = useSession();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        website: "",
        tagline: "",
    });

    const userId = session?.user?.id;

    useEffect(() => {
        if (!userId) return;

        const fetchContactInfo = async () => {
            try {
                const res = await fetch("/api/users/contact-info");
            
                if (!res.ok) {
                    const errorText = await res.text();
                    console.error("Error response:", errorText);
                    throw new Error("Failed to fetch contact info");
                }
            
                const text = await res.text();
                const data = text ? JSON.parse(text) : {};
            
                setFormData({
                    name: data.name || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    website: data.website || "",
                    tagline: data.tagline || "",
                });
            } catch (error) {
                console.error("Error fetching contact info:", error);
            
            } finally {
                setLoading(false);
            }
        };

        fetchContactInfo();
    }, [userId, session?.user?.name]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            console.log("THIS IS THE DATA", formData)
            const res = await fetch("/api/users/contact-info", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            const result = await res.json();
            console.log("Server response:", result);
    
            if (!res.ok) throw new Error(result.error || "Failed to save contact info");
    
            alert("Contact info saved!");
            setIsEditing(false);
        } catch (error) {
            console.error("Error saving contact info:", error);
            const message = error instanceof Error ? error.message : "An unknown error occurred";
            alert("Error: " + message);
        }
    };
    

    const handleCancel = () => setIsEditing(false);

    if (loading) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Your Contact Card</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Edit
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Phone</label>
                        <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Phone"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Website</label>
                        <input
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Website"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Tagline</label>
                        <input
                            name="tagline"
                            value={formData.tagline}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Tagline"
                        />
                    </div>

                    <div className="flex justify-end space-x-2 mt-6">
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            Save
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Name</h3>
                        <p className="text-gray-700">{formData.name}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Email</h3>
                        <p className="text-gray-700">{formData.email}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Phone</h3>
                        <p className="text-gray-700">{formData.phone}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Website</h3>
                        <a 
                            href={formData.website} 
                            className="text-blue-600 hover:underline" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            {formData.website}
                        </a>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Tagline</h3>
                        <p className="text-gray-700">{formData.tagline}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
