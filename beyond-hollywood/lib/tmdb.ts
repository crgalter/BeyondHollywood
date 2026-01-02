/**
 * TMDB API Utilities
 */

export async function getTranslatedMovieDetails(movieId: number) {
    const apiKey = process.env.TMDB_API_KEY
    if (!apiKey) return null

    try {
        // Fetch in Catalan
        const responseCa = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=ca-ES`,
            { next: { revalidate: 86400 } }
        )
        const dataCa = await responseCa.json()

        // If Catalan overview is missing, try English
        if (!dataCa.overview) {
            const responseEn = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`,
                { next: { revalidate: 86400 } }
            )
            const dataEn = await responseEn.json()
            if (dataEn.overview) dataCa.overview = dataEn.overview
        }

        return dataCa
    } catch (error) {
        console.error('Error fetching translated details:', error)
        return null
    }
}

export async function getWatchProviders(movieId: number) {
    const apiKey = process.env.TMDB_API_KEY
    if (!apiKey) return null

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${apiKey}`,
            { next: { revalidate: 86400 } }
        )
        const data = await response.json()
        return data.results?.ES || null
    } catch (error) {
        console.error('Error fetching watch providers:', error)
        return null
    }
}

export async function getMovieDirector(movieId: number) {
    const apiKey = process.env.TMDB_API_KEY
    if (!apiKey) return null

    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`,
            { next: { revalidate: 86400 } }
        )
        const data = await response.json()
        const director = data.crew?.find((person: any) => person.job === 'Director')
        return director ? director.name : null
    } catch (error) {
        console.error('Error fetching movie director:', error)
        return null
    }
}
