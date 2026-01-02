import ExploreResultsClient from '@/components/ExploreResultsClient'
import { Suspense } from 'react'

export const metadata = {
    title: 'Explora - Beyond Hollywood',
    description: 'Filtra i descobreix cinema de tot el món.'
}

export default function ExplorePage() {
    return (
        <main style={{ minHeight: '100vh', background: '#0a0a0f' }}>
            <Suspense fallback={<div style={{ padding: '5rem', textAlign: 'center', color: '#b0b0b0' }}>Carregant...</div>}>
                <ExploreResultsClient />
            </Suspense>
        </main>
    )
}
