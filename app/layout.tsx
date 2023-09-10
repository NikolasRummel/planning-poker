import './globals.css'
import type {Metadata} from 'next'
import React from "react";
import Providers from "@/app/providers";
import Footer from "@/components/footer";


export const metadata: Metadata = {
    title: 'Planning-Poker',
    description: 'planning poker web app',
}

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <Providers>
            <main className="relative mt-8 max-w-7xl mx-auto">
                {children}
            </main>
            <footer>
                <Footer/>
            </footer>
        </Providers>
        </body>
        </html>
    );
}
