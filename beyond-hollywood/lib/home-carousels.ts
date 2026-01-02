import { loadMovies, loadMetadata } from './data-loader'
import { Movie } from './types'

const INAPPROPRIATE_KWORDS = ['porn', 'erotic', 'sex', 'sexual', 'hentai', 'xxx', 'hardcore', 'adult']

function isAppropriate(movie: Movie): boolean {
    const title = (movie.title + ' ' + movie.original_title).toLowerCase()
    const overview = (movie.overview || '').toLowerCase()
    const genres = (movie.genres || []).map(g => g.toLowerCase())

    // Check keywords if available
    const keywords = (movie.keywords || []).map(k => k.toLowerCase())

    const hasInappropriate = INAPPROPRIATE_KWORDS.some(word =>
        title.includes(word) ||
        overview.includes(word) ||
        genres.includes(word) ||
        keywords.includes(word)
    )

    return !hasInappropriate
}

export function getHomeCarousels() {
    let allMovies = loadMovies()
    const metadata = loadMetadata()

    // Global filter for inappropriate content (and safety for adult content)
    allMovies = allMovies.filter(isAppropriate)

    // 1. Joies amagades (pocs vots, bona valoració) - Diversity in countries
    const hiddenGemsPool = allMovies
        .filter(m => m.vote_count >= 50 && m.vote_count <= 2000 && m.vote_average >= 7.5)
        .sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 150)

    const hiddenGems: Movie[] = []
    const seenCountries = new Set<string>()

    // Try to get one from each country first
    for (const movie of hiddenGemsPool) {
        if (hiddenGems.length >= 10) break
        const mainCountry = movie.production_countries[0] || 'Unknown'
        if (!seenCountries.has(mainCountry)) {
            hiddenGems.push(movie)
            seenCountries.add(mainCountry)
        }
    }

    // If we don't have enough, fill with the best remaining ones
    if (hiddenGems.length < 10) {
        for (const movie of hiddenGemsPool) {
            if (hiddenGems.length >= 10) break
            if (!hiddenGems.some(m => m.id === movie.id)) {
                hiddenGems.push(movie)
            }
        }
    }

    // 2. Un país, una mirada (cinema d’un país concret)
    const excludedCountries = ['United States', 'United States of America', 'USA']
    const possibleCountries = metadata.countries.filter(c => !excludedCountries.includes(c))

    const countriesWithEnoughMovies = possibleCountries.filter(c =>
        allMovies.filter(m => m.production_countries[0] === c).length >= 10
    )

    const randomCountry = countriesWithEnoughMovies.length > 0
        ? countriesWithEnoughMovies[Math.floor(Math.random() * countriesWithEnoughMovies.length)]
        : 'France'

    const countryMovies = allMovies
        .filter(m => m.production_countries[0] === randomCountry)
        .sort((a, b) => b.vote_count - a.vote_count)
        .slice(0, 10)

    // 3. Cinema independent (pressupost baix)
    const independentCinema = allMovies
        .filter(m => m.budget >= 100000 && m.budget <= 3000000)
        .sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 10)

    // 4. Més enllà dels EUA (produccions no americanes)
    const internationalMovies = allMovies
        .filter(m => !m.production_countries.some(c => excludedCountries.includes(c)))
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 10)

    return {
        hiddenGems,
        countryMovies,
        randomCountry,
        independentCinema,
        internationalMovies
    }
}
