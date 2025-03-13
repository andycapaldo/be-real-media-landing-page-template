// This file handles the POST request to create a new campaign in the Firestore database.

import { NextResponse } from 'next/server';
import { initAdmin } from '@/lib/firebaseAdmin';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { companyName, logoUrl, videoUrl } = body;

        if (!companyName || !logoUrl || !videoUrl) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }
        const adminApp = await initAdmin();
        const db = adminApp.firestore();

        const docRef = await db.collection('promoPages').add({
            companyName,
            logoUrl,
            videoUrl,
            createdAt: new Date().toISOString(),
        });

        return NextResponse.json(
                { success: true, id: docRef.id },
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
