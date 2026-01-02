import { NextResponse } from 'next/server'
import { loadMetadata } from '@/lib/data-loader'

export async function GET() {
    try {
        const metadata = loadMetadata()

        return NextResponse.json({
            success: true,
            data: metadata,
        })
    } catch (error) {
        console.error('Metadata error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch metadata' },
            { status: 500 }
        )
    }
}
