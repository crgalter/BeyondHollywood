import { NextRequest, NextResponse } from 'next/server'
import { autocompleteMovies } from '@/lib/autocomplete'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const q = searchParams.get('q') || ''
    const limit = parseInt(searchParams.get('limit') || '5')

    try {
        const results = autocompleteMovies(q, limit)

        return NextResponse.json({
            success: true,
            data: results
        })
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed' },
            { status: 500 }
        )
    }
}
