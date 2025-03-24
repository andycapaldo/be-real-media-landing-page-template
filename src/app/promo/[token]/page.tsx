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
    <div className="min-h-screen bg-cyan-50 p-8 font-sans">
        <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-6">
            THANK YOU FOR VISITING THE {companyData.companyName.toUpperCase()} PREMIUM VIDEO PAGE
            </h1>
            <img
                src={companyData.logoUrl}
                alt={`${companyData.companyName} logo`}
                className="mx-auto max-w-xs mb-6"
            />
            <h2 className="text-xl font-bold mb-4">Below You Will Find (3 Mins):</h2>
                <ol className="list-decimal list-inside text-left mx-auto max-w-lg space-y-3 mb-8">
                    <li className="text-lg font-semibold">Research based on your target audience and service areas</li>
                    <li className="text-lg font-semibold">The Google Problem: Are you overpaying on Google?</li>
                    <li className="text-lg font-semibold">Why StreamingTV is dominating?</li>
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
            <p className="text-lg mb-4">Let's take a look at your service areas:</p>
          {/* Placeholder for Research Image */}
            <div className="w-full max-w-md mx-auto">
                <img
                    src={companyData.logoUrl}
                    alt="Research Image"
                    className="w-full object-cover rounded"
                />
            </div>
        </section>

        {/* Section 2: The Google Problem */}
        <section className="mb-12">
            <h3 className="text-2xl font-bold mb-4">The Google Problem</h3>
            <p className="text-lg mb-4">Did you know...</p>
            <ul className="list-disc list-inside text-lg space-y-2 mb-4">
                <li>The average Cost Per Lead in the HVAC sector increased by 24.61% last year</li>
                <li>The average conversion rate plummeted 15.59% last year</li>
                <li>The average cost per click on Google jumped 6.26% last year</li>
                <li>In summary, you are paying nearly 25% more per lead while simultaneously receiving 16% less conversions</li>
            </ul>
          {/* Placeholder for Image */}
            <div className="w-full max-w-md mx-auto">
                <img
                src={companyData.logoUrl}
                alt="Google Problem Image"
                className="w-full object-cover rounded"
                />
            </div>
        </section>

        {/* Section 3: Why Streaming TV is Dominating */}
            <section className="mb-12">
                <h3 className="text-2xl font-bold mb-4">Why Streaming TV is Dominating</h3>
                    <ul className="list-disc list-inside text-lg space-y-2">
                        <li>The average American spends 3.5 hours watching StreamingTV per day</li>
                        <li>Stop wasting impressions! StreamingTV can be targeted to those with a Household income of $150,000+ <span className='font-bold underline'>AND</span> in-market for HVAC services.</li>
                        <li>StreamingTV can have a radius the size of x to ensure we are only delivering within your service areas</li>
                        <li>StreamingTV has shown to boost SEM and social efforts</li>
                    </ul>
            </section>

        {/* Section 4: Why Go Premium? */}
            <section className="mb-12">
                <h3 className="text-2xl font-bold mb-4">Why Go Premium?</h3>
                <blockquote className="bg-gray-100 border-l-4 border-blue-500 italic p-4 mb-6 text-lg">
                    “We've looked at performance. Does TVQI correlate to performance? Are people more likely to buy the product when they run on quality inventory? We found undoubtedly there is strong correlation between the quality of the inventory, more specifically the TVQI, and actual performance and conversion. So quality inventory matters, if you have their attention, it matters. TVQI is a proxy for quality, brand affinity, and attention. Am I associated with something great, and do I have their attention?”
                    <cite className="block mt-2 text-right text-sm not-italic">– Jeff Green</cite>
                </blockquote>
          {/* Placeholder for Image */}
                <div className="w-full max-w-md mx-auto">
                    <img
                        src={companyData.logoUrl}
                        alt="Premium Benefits Image"
                        className="w-full object-cover rounded"
                    />
                </div>
            </section>
            {/* Section 5: Why BeReal is actually different*/}
            <section className="mb-12">
                <h3 className="text-2xl font-bold mb-4">Why BeReal is <span className='text-red-500'>actually</span> different</h3>
                    <ul className="list-disc list-inside text-lg space-y-2">
                        <li>15+ years of experience in digital marketing</li>
                        <li>Budget buying vs Impression buying</li>
                        <li>Powered by The Trade Desk</li>
                        <li>Full and custom access to Netflix, Peacock, HBO Max, Hulu, Disney+, ESPN and more</li>
                    </ul>
            </section>
            {/* Section 6: Trivia */}
            <section className="mb-12">
                <h3 className="text-2xl font-bold mb-4">Trivia Question</h3>
                    <h4>What year and team was John Elway drafted by?</h4>
            </section>
        </div>
    </div>
    );
}