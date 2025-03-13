"use client";

import { useAuth } from "@/lib/use-auth";
import { useState } from "react";

export default function CampaignForm() {
    const { isLoading } = useAuth();
    const [formData, setFormData] = useState({
        companyName: '',
        logoUrl: '',
        videoUrl: '',
    });
    const [message, setMessage] = useState('');
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/campaign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
        if (res.ok) {
            const data = await res.json();
            setMessage(`Campaign created successfully with ID: ${data.id}`);
            setFormData({
                companyName: '',
                logoUrl: '',
                videoUrl: '',
            });
        } else {
            setMessage('Failed to create campaign. Please try again.');
        }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while creating the campaign.');
        }
    };


    if (isLoading) {
        return "Loading...";
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6">Create New Campaign</h2>
            <div className="mb-4">
                <label htmlFor="companyName" className="block text-gray-700 text-sm font-bold mb-2">
                    Company Name
                </label>
                <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="logoUrl" className="block text-gray-700 text-sm font-bold mb-2">
                    Company Logo URL
                </label>
                <input
                    type="url"
                    id="logoUrl"
                    name="logoUrl"
                    placeholder="Enter logo URL"
                    value={formData.logoUrl}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="videoUrl" className="block text-gray-700 text-sm font-bold mb-2">
                    Company Video URL (Unlisted Youtube Video)
                </label>
                <input
                    type="url"
                    id="videoUrl"
                    name="videoUrl"
                    placeholder="Enter video URL"
                    value={formData.videoUrl}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
                <div className="bg-blue-500 hover:bg-blue-700 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    <button className="text-white w-full" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}