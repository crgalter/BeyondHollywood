'use client'

import React, { useState, useEffect } from 'react'
// @ts-ignore
import {
    ComposableMap,
    Geographies,
    Geography,
    ZoomableGroup
} from 'react-simple-maps'
import { scaleThreshold } from 'd3-scale'

// Typical TopoJSON URL for countries
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

interface MapChartProps {
    onCountryClick: (countryName: string, stats: any) => void
    setTooltipContent: (content: string) => void
    beyondHollywood: boolean
    decade: string
}

export default function MapChart({ onCountryClick, setTooltipContent, beyondHollywood, decade }: MapChartProps) {
    const [stats, setStats] = useState<Record<string, any>>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true)
            const params = new URLSearchParams({
                beyondHollywood: beyondHollywood.toString()
            })
            if (decade) params.append('decade', decade)

            try {
                const res = await fetch(`/api/map-stats?${params}`)
                const data = await res.json()
                setStats(data)
            } catch (err) {
                console.error("Map stats error:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [beyondHollywood, decade])

    // Discrete scale to strictly match the legend
    const colorScale = scaleThreshold<number, string>()
        .domain([1, 20, 101, 501])
        .range(["#16213e", "#2d1b3d", "#e94560", "#ff2e63", "#ff00ff"])

    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ComposableMap
                projectionConfig={{
                    scale: 180,
                    center: [-30, 0]
                }}
                style={{ width: '100%', height: 'auto', maxHeight: '100%' }}
            >
                <ZoomableGroup>
                    <Geographies geography={geoUrl}>
                        {({ geographies }: { geographies: any[] }) =>
                            geographies.map((geo: any) => {
                                const countryName = geo.properties.name
                                const countryStats = stats[countryName]
                                const hasMovies = countryStats && countryStats.count > 0

                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        onMouseEnter={() => {
                                            if (hasMovies) {
                                                setTooltipContent(
                                                    `${countryName}: ${countryStats.count} pel·lícules\n` +
                                                    `Gèneres: ${countryStats.topGenres.join(', ')}`
                                                )
                                            } else {
                                                setTooltipContent(countryName)
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            setTooltipContent("")
                                        }}
                                        onClick={() => {
                                            if (hasMovies) {
                                                onCountryClick(countryName, countryStats)
                                            }
                                        }}
                                        style={{
                                            default: {
                                                fill: hasMovies ? colorScale(countryStats.count) : "#16213e",
                                                stroke: "#0f3460",
                                                strokeWidth: 0.5,
                                                outline: "none",
                                                cursor: hasMovies ? "pointer" : "default"
                                            },
                                            hover: {
                                                fill: hasMovies ? "#ff2e63" : "#1a1a2e",
                                                stroke: "#e94560",
                                                strokeWidth: 1,
                                                outline: "none",
                                                cursor: hasMovies ? "pointer" : "default"
                                            },
                                            pressed: {
                                                fill: "#e94560",
                                                outline: "none"
                                            }
                                        }}
                                    />
                                )
                            })
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    )
}
