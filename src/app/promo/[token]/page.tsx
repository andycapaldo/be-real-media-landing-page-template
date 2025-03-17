import { notFound } from 'next/navigation';
import { initAdmin } from '@/lib/firebaseAdmin';
import YouTubeEmbed from '@/components/YoutubeEmbed';


interface CompanyData {
    logoUrl: string;
    companyName: string;
    videoUrl: string;
}

export default async function PromoPage(props: any) {
    const { token } = props.params;

    const adminApp = await initAdmin();
    const db = adminApp.firestore();

    let companyData: CompanyData | null = null;

    try {
        const docRef = db.collection('promoPages').doc(token);
        const doc = await docRef.get();
        if (doc.exists) {
            companyData = doc.data() as CompanyData;
        }
        } catch (error) {
            console.error('Error fetching promo page data:', error);
        }

    if (!companyData) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 font-sans bg-cyan-50">
            <img
            src={companyData.logoUrl}
            alt={`${companyData.companyName} logo`}
            className="max-w-xs mb-8"
            />
            <h1 className="text-3xl font-bold mb-4 text-center">Welcome, {companyData.companyName}</h1>
            <div className="w-full max-w-md my-8">
                <YouTubeEmbed url={companyData.videoUrl} />
            </div>
        </div>
    );
}