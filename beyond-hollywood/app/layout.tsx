import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Playfair_Display, Montserrat, Inter } from 'next/font/google'

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['700', '900'],
    variable: '--font-display'
})

const montserrat = Montserrat({
    subsets: ['latin'],
    weight: ['500', '600', '700'],
    variable: '--font-heading'
})

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-body'
})

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
        <html lang="ca" className={`${playfair.variable} ${montserrat.variable} ${inter.variable}`}>
            <body className={inter.className}>
                <Navigation />
                <main className="min-h-screen">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
