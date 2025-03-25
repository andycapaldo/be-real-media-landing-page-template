// app/api/campaign/[id]/route.ts

import { NextResponse } from 'next/server';
import { initAdmin } from '@/lib/firebaseAdmin';

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const adminApp = await initAdmin();
        const db = adminApp.firestore();

        await db.collection('promoPages').doc(params.id).delete();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting campaign:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
