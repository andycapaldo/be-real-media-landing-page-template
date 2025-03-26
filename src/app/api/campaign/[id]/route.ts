// app/api/campaign/[id]/route.ts

import { NextResponse } from 'next/server';
import { initAdmin } from '@/lib/firebaseAdmin';

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const adminApp = await initAdmin();
        const db = adminApp.firestore();

        await db.collection('promoPages').doc(id).delete();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting campaign:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }){
    const { id } = await params;
    try{
        const body = await request.json();
        const adminApp = await initAdmin();
        const db = adminApp.firestore();

        await db.collection('promoPages').doc(id).update(body);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating campaign:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}