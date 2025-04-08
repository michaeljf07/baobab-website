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
