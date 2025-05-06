import { notFound } from 'next/navigation';
import { initAdmin } from '@/lib/firebaseAdmin';
import YouTubeEmbed from '@/components/YoutubeEmbed';
import CalendlyEmbed from '@/components/CalendlyEmbed';


interface CompanyData {
    logoUrl: string;
    researchUrl: string;
    bulletPoints: string[];
    companyName: string;
    videoUrl: string;
    token: string;
    googleProblemUrl: string;
    serviceAreaPoints: string[];
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
    <div className="min-h-screen bg-cyan-50 p-8 font-sans">
        <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-6">
            THANK YOU FOR VISITING THE CUSTOM RESEARCH PAGE FOR {companyData.companyName.toUpperCase()} BUILT BY BeReal Media
            </h1>
            <img
                src={companyData.logoUrl}
                alt={`${companyData.companyName} logo`}
                className="mx-auto max-w-sm mb-6"
            />
            <h2 className="text-xl font-bold mb-4">Below You Will Find (3 Min):</h2>
                <ol className="list-decimal list-inside text-left mx-auto max-w-lg space-y-3 mb-8">
                    <li className="text-lg font-semibold">Research based on your target audience and service areas</li>
                    <li className="text-lg font-semibold">The Google Problem: Are you overpaying on Google?</li>
                    <li className="text-lg font-semibold">Why Streaming TV is dominating?</li>
                    <li className="text-lg font-semibold">What makes BeReal different?</li>
                    <li className="text-lg font-semibold">Trivia</li>
                </ol>
            <h2 className="text-xl font-bold mb-6">
                But first, a quick hello from our Co-Founder to the {companyData.companyName} Team
            </h2>
            <div className="w-full max-w-md mx-auto mb-12">
                <YouTubeEmbed url={companyData.videoUrl} />
            </div>
        </header>

        {/* Section 1: Company Research */}
        <section className="mb-12">
            <h3 className="text-2xl font-bold mb-4">{companyData.companyName} Research</h3>
            <p className="text-lg mb-8">Let's take a look at your service areas:</p>
            {companyData.serviceAreaPoints.length > 0 && (
                <ul className="list-disc list-inside text-lg space-y-2 mb-4">
                    {companyData.serviceAreaPoints.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                    ))}
                </ul>
            )}
          {/* Placeholder for Research Image */}
            <div className="w-full max-w-md mx-auto">
                <img
                    src={companyData.researchUrl}
                    alt="Research Image"
                    className="w-full object-cover rounded"
                />
            </div>
        </section>

        {/* Section 2: The Google Problem */}
        <section className="mb-12">
            <h3 className="text-2xl font-bold mb-4">The Google Problem</h3>
            <p className="text-lg mb-4">Did you know...</p>
            {companyData.bulletPoints.length > 0 && (
                <ul className="list-disc list-inside text-lg space-y-2 mb-4">
                    {companyData.bulletPoints.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                    ))}
                </ul>
            )}
            <div className="w-full max-w-md mx-auto">
                <img
                src={companyData.googleProblemUrl}
                alt="Google Problem Image"
                className="w-full object-cover rounded"
                />
            </div>
        </section>

        {/* Section 3: Why Streaming TV is Dominating */}
            <section className="mb-12">
                <h3 className="text-2xl font-bold mb-4">Why Streaming TV is Dominating</h3>
                    <ul className="list-disc list-inside text-lg space-y-2">
                        <li>The average American spends 3.5 hours watching Streaming TV per day</li>
                        <li>Stop wasting impressions! Streaming TV can be targeted to those with a 20+ year old home and in-market for your services</li>
                        <li>Streaming TV can have a radius the size of one mile to ensure we are only delivering within your service areas</li>
                        <li>Streaming TV has shown to boost SEM and social efforts</li>
                        <li>Ad-Supported Viewership continues to climb while traditional TV continues to decline</li>
                    </ul>
            </section>
            {/* Section 4: Why BeReal is actually different*/}
            <section className="mb-12">
                <h3 className="text-2xl font-bold mb-4">Why BeReal is <span className='text-red-500'>actually</span> different</h3>
                    <ul className="list-disc list-inside text-lg space-y-2">
                        <li>15+ years of experience in digital marketing</li>
                        <li>Budget buying vs Impression buying</li>
                        <li>BeReal Media University</li>
                        <li>Transparent Pricing by Platform</li>
                        <li>Powered by The Trade Desk</li>
                        <li>Full and custom access to Netflix, Peacock, HBO Max, Hulu, Disney+, ESPN and more</li>
                    </ul>
            </section>
            {/* Section 5: Trivia */}
            <section className="mb-12">
                <h3 className="text-2xl font-bold mb-4">Trivia Question</h3>
                    <h3 className='text-lg mb-8'>What year and team was John Elway drafted by? (You win $500 off your first campaign if answered correctly) </h3>
                <div className='w-full max-w-md mx-auto'>
                    <img
                        src='https://firebasestorage.googleapis.com/v0/b/be-real-api.firebasestorage.app/o/n1o2m3d9rpbp3jmyj1qn.jpg?alt=media&token=ff7aa0c2-f6d5-48d9-92e9-b6e8685e9dcf'
                        alt="Google Problem Image"
                        className="w-full object-cover rounded"
                    />
                </div>
            </section>
            {/* Section 6: Book a Meeting */}
            <section className='mb-12'>
                <h3 className="text-2xl font-bold mb-8">Book a Meeting with BRM</h3>
                <CalendlyEmbed />
            </section>
        </div>
    </div>
    );
}

// https://firebasestorage.googleapis.com/v0/b/be-real-api.firebasestorage.app/o/n1o2m3d9rpbp3jmyj1qn.jpg?alt=media&token=ff7aa0c2-f6d5-48d9-92e9-b6e8685e9dcf