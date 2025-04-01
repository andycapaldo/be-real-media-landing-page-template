'use client'

import { InlineWidget } from 'react-calendly';

export default function CalendlyEmbed() {
    return (
        <div className="w-full h-screen">
            <InlineWidget
                url="https://calendly.com/ryan-berealmediagroup" // Replace with your Calendly link
                styles={{ height: '100%', width: '100%' }}
            />
        </div>
    );
}