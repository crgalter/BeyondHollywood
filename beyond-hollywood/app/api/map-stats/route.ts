import { NextRequest, NextResponse } from 'next/server'
import { loadMovies } from '@/lib/data-loader'
import { Movie } from '@/lib/types'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const beyondHollywood = searchParams.get('beyondHollywood') === 'true'
    const decade = searchParams.get('decade') // e.g. "1990"

    const movies = loadMovies()

    // Countries to stats mapping
    const stats: Record<string, {
        count: number,
        genres: Record<string, number>,
        languages: Set<string>,
        topMovies: any[]
    }> = {}

    movies.forEach(movie => {
        // Filter by beyondHollywood
        if (beyondHollywood) {
            const isUS = movie.production_countries.some(c =>
                c.includes('United States') || c.includes('USA')
            )
            // If US and budget >= 10M (or 0 but usually large movies have 0 in bad datasets, but we follow the request)
            // We'll keep it consistent with recommender.ts
            if (isUS && (movie.budget === 0 || movie.budget >= 10000000)) return
        }

        // Filter by decade
        if (decade) {
            const year = movie.year
            if (!year) return
            const startYear = parseInt(decade)
            if (year < startYear || year >= startYear + 10) return
        }

        const primaryCountry = movie.production_countries[0]
        if (primaryCountry) {
            const country = primaryCountry
            const isUSCountry = country.includes('United States') || country.includes('USA')

            // For USA, we ONLY consider low budget movies for the "Top 6" list
            if (!(isUSCountry && (movie.budget === 0 || movie.budget >= 10000000))) {
                if (!stats[country]) {
                    stats[country] = {
                        count: 0,
                        genres: {},
                        languages: new Set(),
                        topMovies: []
                    }
                }

                // Stats calculation
                if (stats[country].topMovies.length < 6) {
                    stats[country].topMovies.push({
                        id: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path,
                        vote_count: movie.vote_count
                    })
                    stats[country].topMovies.sort((a, b) => b.vote_count - a.vote_count)
                } else if (movie.vote_count > stats[country].topMovies[5].vote_count) {
                    stats[country].topMovies[5] = {
                        id: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path,
                        vote_count: movie.vote_count
                    }
                    stats[country].topMovies.sort((a, b) => b.vote_count - a.vote_count)
                }
            }

            // Always increment count and genres if it reached here
            if (!stats[country]) {
                stats[country] = {
                    count: 0,
                    genres: {},
                    languages: new Set(),
                    topMovies: []
                }
            }
            stats[country].count++
            movie.genres.forEach(g => {
                stats[country].genres[g] = (stats[country].genres[g] || 0) + 1
            })
            stats[country].languages.add(movie.original_language)
        }
    })

    // Prepare final response
    const finalStats: Record<string, any> = {}
    Object.entries(stats).forEach(([country, data]) => {
        const sortedGenres = Object.entries(data.genres)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(g => g[0])

        finalStats[country] = {
            count: data.count,
            topGenres: sortedGenres,
            languages: Array.from(data.languages).slice(0, 3),
            topMovies: data.topMovies
        }
    })

    return NextResponse.json(finalStats)
}
