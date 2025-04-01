'use client'

import { InlineWidget } from 'react-calendly';

export default function CalendlyEmbed() {
    return (
        <div className="w-full h-screen">
            <InlineWidget
                url="https://calendly.com/ryan-berealmediagroup?hide_gdpr_banner=1" // Replace with your Calendly link
                styles={{ height: '100%', width: '100%' }}
            />
        </div>
    );
}