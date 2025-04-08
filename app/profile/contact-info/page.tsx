"use client";

import { useState } from "react";

export default function ContactInfoPage() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "Gurshaan Sidhu",
        email: "gurshaan@example.com",
        phone: "(416) 123-4567",
        website: "https://baobab.org",
        tagline: "Co-founder of Baobab | Community-first innovator",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        // TODO: send formData to database if needed
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Optional: reset to previous saved data
        setIsEditing(false);
    };

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
