"use client";

import { useState } from "react";

interface EditCampaignModalProps {
    initialData: {
        companyName: string;
        logoUrl: string;
        videoUrl: string;
        researchUrl: string;
        googleProblemUrl: string;
        bulletPoints: string[];
    };
    onClose: () => void;
    onUpdate: () => void;
}

export default function EditCampaignModal({ initialData, onClose, onUpdate }: EditCampaignModalProps) {

    const [formData, setFormData] = useState(initialData);
    const [message, setMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBulletPointChange = (index: number, value: string) => {
        setFormData((prev) => {
        const updated = [...prev.bulletPoints];
        updated[index] = value;
        return { ...prev, bulletPoints: updated };
        });
    };

    const addBulletPoint = () => {
        setFormData((prev) => ({ ...prev, bulletPoints: [...prev.bulletPoints, ""] }));
    };

    const removeBulletPoint = (index: number) => {
        setFormData((prev) => {
            const updated = prev.bulletPoints.filter((_, i) => i !== index);
            return { ...prev, bulletPoints: updated };
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    const docId = initialData.companyName
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
    try {
        const res = await fetch(`/api/campaign/${encodeURIComponent(docId)}`, {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (res.ok) {
            setMessage("Campaign updated successfully.");
            onUpdate();
            onClose();
        } else {
            setMessage("Failed to update campaign.");
        }
    } catch (error) {
        console.error("Error updating campaign:", error);
        setMessage("An error occurred while updating the campaign.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit Campaign</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Company Name
                    </label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Logo URL
                    </label>
                    <input
                        type="url"
                        name="logoUrl"
                        value={formData.logoUrl}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Video URL
                    </label>
                    <input
                        type="url"
                        name="videoUrl"
                        value={formData.videoUrl}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Research Image URL
                    </label>
                    <input
                        type="url"
                        name="researchUrl"
                        value={formData.researchUrl}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Google Problem Image URL
                    </label>
                    <input
                        type="url"
                        name="googleProblemUrl"
                        value={formData.googleProblemUrl}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Google Problem Bullet Points
                    </label>
                    {formData.bulletPoints.map((bp, i) => (
                    <div key={i} className="flex items-center mb-2">
                        <input
                            type="text"
                            value={bp}
                            onChange={(e) => handleBulletPointChange(i, e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {formData.bulletPoints.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeBulletPoint(i)}
                            className="ml-2 text-red-500"
                        >
                            Remove
                        </button>
                        )}
                    </div>
                    ))}
                    <button
                        type="button"
                        onClick={addBulletPoint}
                        className="mt-2 text-blue-500 underline"
                    >
                    Add Bullet Point
                    </button>
                </div>
                {message && (
                    <p className="mb-4 text-center text-green-600">{message}</p>
                )}
                <div className="flex justify-end">
                    <div className="bg-blue-500 hover:bg-blue-700 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-5">
                        <button className="text-white w-full" type="submit">
                            Submit
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="mr-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 mx-5"
                    >
                    Cancel
                    </button>
                </div>
            </form>
        </div>
    </div>
    );
}
