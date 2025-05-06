"use client";

import { useAuth } from "@/lib/use-auth";
import { useState, useEffect, useCallback} from "react";
import EditCampaignModal from "@/components/EditCampaignModal";
import Link from "next/dist/client/link";


interface Campaign {
    id: string;
    companyName: string;
    logoUrl: string;
    videoUrl: string;
    researchUrl: string;
    googleProblemUrl: string;
    bulletPoints: string[];
    serviceAreaPoints: string[];
    token: string;
}


export default function CampaignForm() {
    const { isLoading } = useAuth();
    const [formData, setFormData] = useState({
        companyName: '',
        logoUrl: '',
        videoUrl: '',
        researchUrl: '',
        googleProblemUrl: '',
    });
    const [serviceAreaPoints, setServiceAreaPoints] = useState<string[]>(['']);
    const [bulletPoints, setBulletPoints] = useState<string[]>(['']);
    const [message, setMessage] = useState('');
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
    const [showModal, setShowModal] = useState(false);

    const fetchCampaigns = useCallback(async () => {
        try {
            const res = await fetch("/api/campaign", { method: "GET" });
            const data = await res.json();
            setCampaigns(data.campaigns);
        } catch (error) {
            console.error("Error fetching campaigns", error);
        }
    }, []);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleBulletPointChange = (index: number, value: string) => {
        setBulletPoints((prev) => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
    };

    const addBulletPoint = () => {
        setBulletPoints((prev) => [...prev, '']);
    };
    
    const removeBulletPoint = (index: number) => {
        setBulletPoints((prev) => prev.filter((_, i) => i !== index));
    };

    const handleServiceBulletPointChange = (index: number, value: string) => {
        setServiceAreaPoints((prev) => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        });
    };

    const addServiceBulletPoint = () => {
        setServiceAreaPoints((prev) => [...prev, '']);  
    };

    const removeServiceBulletPoint = (index: number) => {
        setServiceAreaPoints((prev) => prev.filter((_, i) => i !== index));
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const payload = { ...formData, bulletPoints, serviceAreaPoints };
            const res = await fetch('/api/campaign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
        if (res.ok) {
            const data = await res.json();
            setMessage(`Campaign created successfully with ID: ${data.id}`);
            setFormData({
                companyName: '',
                videoUrl: '',
                logoUrl: '',
                researchUrl: '',
                googleProblemUrl: '',
            });
            setBulletPoints(['']);
            setServiceAreaPoints(['']);
            handleUpdate();
        } else {
            setMessage('Failed to create campaign. Please try again.');
        }
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred while creating the campaign.');
        }
    };

    useEffect(() => {
        fetchCampaigns();
    }, [fetchCampaigns]);

    
    const handleEdit = (campaign: Campaign) => {
        setSelectedCampaign(campaign);
        setShowModal(true);
    };
    
    const handleModalClose = () => {
        setShowModal(false);
        setSelectedCampaign(null);
    };
    
    const handleUpdate = () => {
        fetchCampaigns();
    }

    const handleDelete = async (id: string) => {
        const res = await fetch(`/api/campaign/${id}`, {
            method: "DELETE",
        });
        if (res.ok) {
            setMessage("Campaign deleted successfully");
            setCampaigns((prev) => prev.filter((campaign) => campaign.id !== id));
        } else {
            setMessage("Failed to delete campaign");
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
                <label htmlFor="logoFile" className="block text-gray-700 text-sm font-bold mb-2">
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
                <label htmlFor="researchImage" className="block text-gray-700 text-sm font-bold mb-2">
                    Research Section Image URL
                </label>
                <input
                    type="url"
                    id="researchUrl"
                    name="researchUrl"
                    placeholder="Enter Research Section Image URL"
                    value={formData.researchUrl}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Service Areas Bullet Points
                </label>
            {serviceAreaPoints.map((bullet, index) => (
            <div key={index} className="flex items-center mb-2">
                <input
                    type="text"
                    placeholder={`Bullet point ${index + 1}`}
                    value={bullet}
                    onChange={(e) => handleServiceBulletPointChange(index, e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            {serviceAreaPoints.length > 1 && (
                <button
                    type="button"
                    onClick={() => removeServiceBulletPoint(index)}
                    className="ml-2 text-red-500"
                    >
                    Remove
                </button>
                )}
            </div>
            ))}
                <button
                    type="button"
                    onClick={addServiceBulletPoint}
                    className="mt-2 text-blue-500 underline"
                    >
                    Add Bullet Point
                </button>
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
            <div className="mb-4">
                <label htmlFor="videoUrl" className="block text-gray-700 text-sm font-bold mb-2">
                    Google Problem Image URL
                </label>
                <input
                    type="url"
                    id="googleProblemUrl"
                    name="googleProblemUrl"
                    placeholder="Enter Google Problem Image URL"
                    value={formData.googleProblemUrl}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Google Problem Bullet Points
                </label>
            {bulletPoints.map((bullet, index) => (
            <div key={index} className="flex items-center mb-2">
                <input
                    type="text"
                    placeholder={`Bullet point ${index + 1}`}
                    value={bullet}
                    onChange={(e) => handleBulletPointChange(index, e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            {bulletPoints.length > 1 && (
                <button
                    type="button"
                    onClick={() => removeBulletPoint(index)}
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
                <div className="bg-blue-500 hover:bg-blue-700 hover:bg-blue-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    <button className="text-white w-full" type="submit">
                        Submit
                    </button>
                </div>
            {message && <p className="mt-4 text-center">{message}</p>}
            </form>
            <div className='bg-white p-8 rounded shadow-md w-full max-w-md m-8'>
                <div>
                    <h2 className="text-2xl font-bold mb-6">Edit/Delete Existing Campaigns</h2>
                </div>
                <div className="">
                    <ul>
                        {campaigns.map((campaign) => (
                            <li key={campaign.id}>
                                <Link className='underline text-blue-500' href={`/promo/${campaign.token}`}>{campaign.companyName}</Link>
                            
                                <div className="my-3 flex justify-around">
                                    <button onClick={() => handleDelete(campaign.id)} className="text-red-100 bg-red-600 mx-3 py-3 px-5 hover:bg-red-300 hover:text-red-600">Delete</button>
                                    <button onClick={() => handleEdit(campaign)} className="text-green-100 bg-green-600 mx-3 py-3 px-5 hover:bg-green-300 hover:text-green-600">Edit</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {showModal && selectedCampaign && (
                        <EditCampaignModal
                            initialData={selectedCampaign}
                            onClose={handleModalClose}
                            onUpdate={handleUpdate}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}