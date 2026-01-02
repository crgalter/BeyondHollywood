import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
    title: 'Beyond Hollywood - Descobreix el cinema més enllà de les fronteres convencionals',
    description: 'Plataforma de recomanacions de pel·lícules internacionals i alternatives',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ca">
            <body>
                <Navigation />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
