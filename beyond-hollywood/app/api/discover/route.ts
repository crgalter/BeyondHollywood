import { NextRequest, NextResponse } from 'next/server'
import { getHiddenGems, getInternationalPicks, getLowBudgetTreasures, searchMovies } from '@/lib/recommender'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const mode = searchParams.get('mode') || 'hidden-gems'
    const beyondHollywood = searchParams.get('beyondHollywood') === 'true'
    const genres = searchParams.get('genres')?.split(',').filter(Boolean) || (searchParams.get('genre') ? [searchParams.get('genre')!] : [])
    const countries = searchParams.get('countries')?.split(',').filter(Boolean) || (searchParams.get('country') ? [searchParams.get('country')!] : [])
    const languages = searchParams.get('languages')?.split(',').filter(Boolean) || (searchParams.get('language') ? [searchParams.get('language')!] : [])
    const minRating = searchParams.get('minRating') ? parseFloat(searchParams.get('minRating')!) : undefined
    const yearFrom = searchParams.get('yearFrom') ? parseInt(searchParams.get('yearFrom')!) : undefined
    const yearTo = searchParams.get('yearTo') ? parseInt(searchParams.get('yearTo')!) : undefined

    const filters = {
        genres,
        countries,
        languages,
        beyondHollywood,
        minRating,
        yearFrom,
        yearTo
    }

    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20
    const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1

    try {
        let movies

        switch (mode) {
            case 'hidden-gems':
                movies = getHiddenGems(filters, limit, page)
                break
            case 'international':
                movies = getInternationalPicks(filters, limit, page)
                break
            case 'low-budget':
                movies = getLowBudgetTreasures(filters, limit, page)
                break
            case 'search':
                const result = searchMovies({ ...filters, page, limit })
                movies = result.movies
                break
            default:
                movies = getHiddenGems(filters, limit, page)
        }

        return NextResponse.json({
            success: true,
            data: movies,
            mode,
        })
    } catch (error) {
        console.error('Discover error:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch recommendations' },
            { status: 500 }
        )
    }
}
