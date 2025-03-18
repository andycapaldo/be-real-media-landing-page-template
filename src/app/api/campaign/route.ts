// This file handles the POST request to create a new campaign in the Firestore database.

import { NextResponse } from 'next/server';
import { initAdmin } from '@/lib/firebaseAdmin';
import generateRandomHash from '@/lib/hash';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { companyName, logoUrl, videoUrl } = body;

        const randomHash = generateRandomHash();

        if (!companyName || !logoUrl || !videoUrl) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }
        const adminApp = await initAdmin();
        const db = adminApp.firestore();

        const sanitizedCompanyName = companyName
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');

        await db.collection('promoPages').doc(sanitizedCompanyName).set({
            companyName,
            logoUrl,
            videoUrl,
            createdAt: new Date().toISOString(),
            token: randomHash,
        });

        return NextResponse.json(
                { success: true, id: sanitizedCompanyName},
                { status: 201 }
            );
        } catch (error) {
            console.error('Error creating campaign:', error);
            return NextResponse.json(
                { error: 'Internal Server Error' },
                { status: 500 }
            );
        }
    }   
