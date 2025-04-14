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
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg space-y-4">
            <h1 className="text-2xl font-bold text-center">Your Contact Card</h1>

            {isEditing ? (
                <>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Name"
                    />
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Email"
                    />
                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Phone"
                    />
                    <input
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Website"
                    />
                    <input
                        name="tagline"
                        value={formData.tagline}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Tagline"
                    />

                    <div className="flex justify-end space-x-2">
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
                </>
            ) : (
                <div className="space-y-2 text-lg">
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Phone:</strong> {formData.phone}</p>
                    <p><strong>Website:</strong> <a href={formData.website} className="text-blue-600 underline" target="_blank">{formData.website}</a></p>
                    <p><strong>Tagline:</strong> {formData.tagline}</p>

                    <div className="text-right">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="mt-4 px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600">
                            Edit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
