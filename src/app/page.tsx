import { initAdmin } from "@/lib/firebaseAdmin";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


export default async function Home() {
  const host = (await headers()).get('host') || '';

  if (host.endsWith('berealmediagroup.com')) {
    const parts = host.split('.');
    if (parts.length > 2 && parts[0] !== 'www') {
      const subdomain = parts[0];

      const adminApp = await initAdmin();
      const db = adminApp.firestore();
      const docRef = db.collection('promoPages').doc(subdomain);
      const doc = await docRef.get();

      if (doc.exists) {
        const data = doc.data();
        const token = data?.token;
        
        if (token) {
          redirect(`/promo/${token}`);
        }
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Loading...</h1>
    </div>
  );
}
