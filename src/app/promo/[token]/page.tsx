import { notFound } from 'next/navigation';
import { initAdmin } from '@/lib/firebaseAdmin';
import YouTubeEmbed from '@/components/YoutubeEmbed';


interface CompanyData {
    logoUrl: string;
    companyName: string;
    videoUrl: string;
    token: string;
}

export async function generateMetadata(props: any) {
        const { token } = props.params;
        
        const adminApp = await initAdmin();
        const db = adminApp.firestore();

    let companyData: CompanyData | null = null;

    try {
        const querySnapshot = await db
            .collection('promoPages')
            .where('token', '==', token)
            .limit(1)
            .get();
    if (!querySnapshot.empty) {
        companyData = querySnapshot.docs[0].data() as CompanyData;
    }
    } catch (error) {
        console.error('Error fetching metadata:', error);
    }

    if (!companyData) {
        return {
            title: 'Promo Page',
            description: 'Promo page not found.',
        };
    }

    return {
        title: `${companyData.companyName} & BeRealMedia`,
        escription: `Welcome to the promo page for ${companyData.companyName}. Check out the latest deals and info!`,
        };
}

export default async function PromoPage(props: any) {
    const { token } = props.params;

    const adminApp = await initAdmin();
    const db = adminApp.firestore();

    let companyData: CompanyData | null = null;

    try {
        const querySnapshot = await db
            .collection('promoPages')
            .where('token', '==', token)
            .limit(1)
            .get();
        if (!querySnapshot.empty) {
            companyData = querySnapshot.docs[0].data() as CompanyData;
        }
    } catch (error) {
        console.error('Error fetching company data:', error);
    }

    if (!companyData) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 font-sans bg-cyan-50">
            <h1 className='text-3xl font-bold text-center mb-15'>THANK YOU FOR VISITING THE {companyData.companyName.toUpperCase()} PREMIUM VIDEO PAGE</h1>
            <img
            src={companyData.logoUrl}
            alt={`${companyData.companyName} logo`}
            className="max-w-xs mb-13"
            />
            <h1 className='text-xl font-bold text-center mb-5'>Below You Will Find (3 Mins):</h1>
            <ul className='list-decimal list-inside text-center mb-8'>
                <li className='text-lg font-semibold mb-5'>Research Based on your target audience and service areas</li>
                <li className='text-lg font-semibold mb-5'>The Google Problem. Are you overpaying on Google?</li>
                <li className='text-lg font-semibold mb-5'>Why StreamingTV is dominating?</li>
                <li className='text-lg font-semibold mb-5'>What makes BeReal different?</li>
                <li className='text-lg font-semibold mb-5'>Trivia</li>
            </ul>
            <h1 className='text-xl font-bold text-center mb-5'>But first, a quick hello from our Co-Founder to the {companyData.companyName} Team</h1>
            <div className="w-full max-w-md my-8">
                <YouTubeEmbed url={companyData.videoUrl} />
            </div>
        </div>
    );
}