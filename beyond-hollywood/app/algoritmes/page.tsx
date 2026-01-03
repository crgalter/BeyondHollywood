'use client'

import React from 'react'

export default function AlgorithmsPage() {
    // Results will be loaded from backend/evaluation_results.json
    const algorithms = [
        {
            name: 'Content-Based (Beyond Hollywood)',
            precision: 0.630, precisionCI: [0.529, 0.731],
            novelty: 1.000, noveltyCI: [1.000, 1.000],
            diversity: 0.555, diversityCI: [0.520, 0.590],
            coverage: 0.987,
            discovery: 296,
            bhScore: 0.874,
            highlight: true,
            description: 'Motor de Beyond Hollywood basat en anàlisi semàntic de metadades. Soluciona el problema del Cold Start.'
        },
        {
            name: 'Item-Item Collaborative',
            precision: 0.577, precisionCI: [0.465, 0.688],
            novelty: 1.000, noveltyCI: [1.000, 1.000],
            diversity: 0.787, diversityCI: [0.761, 0.813],
            coverage: 0.380,
            discovery: 114,
            bhScore: 0.750,
            description: 'Filtratge col·laboratiu basat en similitud entre items'
        },
        {
            name: 'Hybrid (CB+CF)',
            precision: 0.577, precisionCI: [0.459, 0.694],
            novelty: 1.000, noveltyCI: [1.000, 1.000],
            diversity: 0.755, diversityCI: [0.706, 0.803],
            coverage: 0.387,
            discovery: 116,
            bhScore: 0.746,
            description: 'Combinació de filtratge basat en contingut i col·laboratiu'
        },
        {
            name: 'SVD Matrix Factorization',
            precision: 0.820, precisionCI: [0.739, 0.901],
            novelty: 0.729, noveltyCI: [0.716, 0.743],
            diversity: 0.694, diversityCI: [0.667, 0.720],
            coverage: 0.523,
            discovery: 157,
            bhScore: 0.686,
            description: 'Descomposició matricial amb SVD, estàndard de la indústria'
        },
        {
            name: 'Popularity Baseline',
            precision: 0.750, precisionCI: [0.672, 0.828],
            novelty: 0.682, noveltyCI: [0.675, 0.690],
            diversity: 0.713, diversityCI: [0.696, 0.730],
            coverage: 0.203,
            discovery: 61,
            bhScore: 0.577,
            description: 'Baseline que recomana els items més populars'
        }
    ]

    // Sort by BH Score
    const sortedAlgos = [...algorithms].sort((a, b) => b.bhScore - a.bhScore)

    return (
        <main style={{ padding: '6rem 1.5rem', maxWidth: '1200px', margin: '0 auto', color: '#f1f1f1', fontFamily: 'var(--font-body)' }}>

            {/* Header */}
            <header style={{ textAlign: 'center', marginBottom: '5rem' }}>
                <div style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: 'rgba(233, 69, 96, 0.1)',
                    borderRadius: '2rem',
                    color: '#e94560',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '1.5rem'
                }}>
                    Avaluació Científica
                </div>
                <h1 style={{
                    fontSize: 'clamp(1.5rem, 5vw, 3rem)',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    lineHeight: 1.4
                }}>
                    <span style={{
                        background: 'linear-gradient(to right, #ffffff, #888)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        display: 'inline-block'
                    }}>
                        Comparativa d'Algoritmes de Recomanació
                    </span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#b0b0b0', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
                    Aquesta és la metodologia científica i el procés d'avaluació seguits per seleccionar l'algoritme de recomanació definitiu per a la plataforma <strong>Beyond Hollywood</strong>
                </p>
            </header>

            {/* Beyond Hollywood Score Explanation */}
            <section style={{
                marginBottom: '5rem',
                background: 'linear-gradient(145deg, rgba(6, 255, 165, 0.08) 0%, rgba(10, 10, 15, 0) 100%)',
                padding: '3rem',
                borderRadius: '2rem',
                border: '1px solid rgba(6, 255, 165, 0.15)'
            }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#06ffa5' }}>Beyond Hollywood Score</h2>
                <p style={{ color: '#b0b0b0', lineHeight: 1.8, marginBottom: '2rem' }}>
                    Score multi-objectiu dissenyat per mesurar l'impacte cultural real. A diferència dels sistemes comercials que busquen només la precisió, prioritzem l'originalitat i l'exploració de tot el catàleg:
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                    {[
                        {
                            metric: 'Precisió',
                            weight: '15%',
                            desc: 'Rellevància mínima acceptable segons gustos històrics.',
                            detail: 'Es calcula com el percentatge d\'encert sobre pel·lícules que l\'usuari ja ha valorat positivament (rating ≥ 4.0).',
                            color: '#e94560'
                        },
                        {
                            metric: 'Novelty',
                            weight: '45%',
                            desc: 'Capacitat de descobriment de joies ocultes.',
                            detail: 'Mesura la inversa de la popularitat. Un valor alt indica que l\'algoritme saca a la llum contingut poc conegut (Long Tail).',
                            color: '#06ffa5'
                        },
                        {
                            metric: 'Diversitat',
                            weight: '15%',
                            desc: 'Varietat de gèneres i temàtiques.',
                            detail: 'Basada en la Intra-List Similarity. Evita recomanar títols massa semblants entre sí per promoure el contrast cultural.',
                            color: '#f4a261'
                        },
                        {
                            metric: 'Exploració',
                            weight: '25%',
                            desc: 'Capacitat de buidar el catàleg (Catalog Coverage).',
                            detail: 'Mesura quants ítems únics del total de TMDB és capaç de recomanar el sistema, evitant el biaix cap als "blockbusters".',
                            color: '#2a9d8f'
                        }
                    ].map((item, i) => (
                        <div key={i} style={{
                            background: 'rgba(255, 255, 255, 0.03)',
                            padding: '1.5rem',
                            borderRadius: '1rem',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem'
                        }}>
                            <div style={{ color: item.color, fontWeight: 700, fontSize: '1.1rem' }}>
                                {item.metric} ({item.weight})
                            </div>
                            <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 500 }}>{item.desc}</div>
                            <div style={{ fontSize: '0.8rem', color: '#888', lineHeight: 1.4 }}>{item.detail}</div>
                        </div>
                    ))}
                </div>

                <div style={{
                    marginTop: '2rem',
                    padding: '1.5rem',
                    background: 'rgba(0, 0, 0, 0.3)',
                    borderRadius: '1rem',
                    borderLeft: '4px solid #06ffa5',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                }}>
                    <code style={{ fontSize: '1.1rem', color: '#06ffa5', fontWeight: 700 }}>
                        BH Score = 0.15×Precisió + 0.45×Novelty + 0.15×Diversitat + 0.25×Exploració
                    </code>
                    <p style={{ fontSize: '0.9rem', color: '#aaa', margin: 0 }}>
                        <strong>Per què aquestes ponderacions?</strong> Hem prioritzat la <strong>Novelty (45%)</strong> i l'<strong>Exploració (25%)</strong> perquè la missió de Beyond Hollywood és el descobriment cultural, no la simple repetició de patrons. La <strong>Precisió (15%)</strong> es manté com un factor de control per assegurar la coherència, mentre que la <strong>Diversitat (15%)</strong> evita la saturació de sub-gèneres similars.
                    </p>
                </div>
            </section>

            {/* Tipologia d'Algoritmes - Moved here */}
            <section style={{ marginBottom: '5rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Algoritmes Analitzats</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid rgba(6, 255, 165, 0.1)' }}>
                        <h4 style={{ color: '#06ffa5', marginBottom: '0.75rem' }}>Content-Based (Beyond Hollywood)</h4>
                        <p style={{ fontSize: '0.85rem', color: '#b0b0b0', lineHeight: 1.6 }}>
                            Analitza les característiques semàntiques (gèneres, keywords, budget) per trobar similituds "objectives" sense dependre de vots d'altres usuaris.
                        </p>
                    </div>
                    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <h4 style={{ color: '#f4a261', marginBottom: '0.75rem' }}>Item-Item Collaborative</h4>
                        <p style={{ fontSize: '0.85rem', color: '#b0b0b0', lineHeight: 1.6 }}>
                            "La saviesa de la multitud". Recomana pel·lícules basant-se en patrons de consum d'usuaris amb gustos similars.
                        </p>
                    </div>
                    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <h4 style={{ color: '#2a9d8f', marginBottom: '0.75rem' }}>Matrix SVD</h4>
                        <p style={{ fontSize: '0.85rem', color: '#b0b0b0', lineHeight: 1.6 }}>
                            Tècnica d'àlgebra lineal (Singular Value Decomposition) que descobreix "factors latents" en els gustos per predir la màxima precisió tècnica.
                        </p>
                    </div>
                    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <h4 style={{ color: '#e94560', marginBottom: '0.75rem' }}>Hybrid (CB+CF)</h4>
                        <p style={{ fontSize: '0.85rem', color: '#b0b0b0', lineHeight: 1.6 }}>
                            Combina la potència predictiva del filtratge col·laboratiu amb la capacitat de descobriment del filtratge basat en contingut.
                        </p>
                    </div>
                    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.5rem', borderRadius: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <h4 style={{ color: '#888', marginBottom: '0.75rem' }}>Popularity Baseline</h4>
                        <p style={{ fontSize: '0.85rem', color: '#b0b0b0', lineHeight: 1.6 }}>
                            Punt de control que recomana els títols més vistos. Serveix per mesurar quant valor real afegeixen els algoritmes intel·ligents.
                        </p>
                    </div>
                </div>
            </section>

            {/* Results Table */}
            <section style={{ marginBottom: '5rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Resultats Complets</h2>

                <div style={{
                    overflowX: 'auto',
                    background: 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '1.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid rgba(255, 255, 255, 0.1)' }}>
                                <th style={{ padding: '1.5rem', textAlign: 'left', color: '#f1f1f1', fontWeight: 700 }}>Algoritme</th>
                                <th style={{ padding: '1.5rem', textAlign: 'center', color: '#e94560' }}>Precisió</th>
                                <th style={{ padding: '1.5rem', textAlign: 'center', color: '#06ffa5' }}>Novelty</th>
                                <th style={{ padding: '1.5rem', textAlign: 'center', color: '#f4a261' }}>Diversitat</th>
                                <th style={{ padding: '1.5rem', textAlign: 'center', color: '#2a9d8f' }}>Exploració</th>
                                <th style={{ padding: '1.5rem', textAlign: 'center', color: '#fff', fontWeight: 700 }}>BH Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedAlgos.map((algo, idx) => (
                                <tr key={idx} style={{
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                                    background: algo.highlight ? 'rgba(6, 255, 165, 0.05)' : 'transparent'
                                }}>
                                    <td style={{
                                        padding: '1.25rem',
                                        color: algo.highlight ? '#06ffa5' : '#ccc',
                                        fontWeight: algo.highlight ? 700 : 400,
                                        fontSize: algo.highlight ? '0.95rem' : '0.85rem'
                                    }}>
                                        {algo.name}
                                        {algo.highlight && <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', color: '#06ffa5' }}>★ Recomanat</span>}
                                    </td>
                                    <td style={{ padding: '1.25rem', textAlign: 'center', color: '#888' }}>
                                        <div>{algo.precision.toFixed(3)}</div>
                                        <div style={{ fontSize: '0.65rem', color: '#555' }}>
                                            [{algo.precisionCI[0].toFixed(2)}, {algo.precisionCI[1].toFixed(2)}]
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem', textAlign: 'center', color: '#888' }}>
                                        <div style={{ fontWeight: algo.highlight ? 700 : 400 }}>{algo.novelty.toFixed(3)}</div>
                                        <div style={{ fontSize: '0.65rem', color: '#555' }}>
                                            [{algo.noveltyCI[0].toFixed(2)}, {algo.noveltyCI[1].toFixed(2)}]
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem', textAlign: 'center', color: '#888' }}>
                                        <div>{algo.diversity.toFixed(3)}</div>
                                        <div style={{ fontSize: '0.65rem', color: '#555' }}>
                                            [{algo.diversityCI[0].toFixed(2)}, {algo.diversityCI[1].toFixed(2)}]
                                        </div>
                                    </td>
                                    <td style={{ padding: '1.25rem', textAlign: 'center', color: '#888' }}>
                                        <div>{(algo.coverage * 100).toFixed(1)}%</div>
                                        <div style={{ fontSize: '0.65rem', color: '#555' }}>
                                            {algo.discovery} items
                                        </div>
                                    </td>
                                    <td style={{
                                        padding: '1.25rem',
                                        textAlign: 'center',
                                        color: algo.highlight ? '#06ffa5' : '#fff',
                                        fontWeight: 700,
                                        fontSize: '1rem'
                                    }}>
                                        {algo.bhScore.toFixed(3)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '0.75rem', fontSize: '0.8rem', color: '#666' }}>
                    <strong>Nota metodològica:</strong> Intervals de confiança (95%) calculats sobre una mostra de 30 usuaris de MovieLens Latest Small.
                    Les mètriques representen la mitjana ± marge d'error estadístic.
                </div>
            </section>

            {/* Visual Comparison */}
            <section style={{ marginBottom: '5rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Comparativa Visual</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
                    {/* BH Score Chart */}
                    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '2rem', borderRadius: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#06ffa5' }}>Beyond Hollywood Score</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {sortedAlgos.slice(0, 5).map((algo, i) => (
                                <div key={i}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '0.25rem',
                                        fontSize: '0.75rem',
                                        color: algo.highlight ? '#06ffa5' : '#888'
                                    }}>
                                        <span>{algo.name.substring(0, 35)}</span>
                                        <span style={{ fontWeight: 700 }}>{algo.bhScore.toFixed(3)}</span>
                                    </div>
                                    <div style={{
                                        height: '12px',
                                        width: `${(algo.bhScore / sortedAlgos[0].bhScore) * 100}%`,
                                        background: algo.highlight
                                            ? 'linear-gradient(90deg, #06ffa5, #04cc84)'
                                            : 'linear-gradient(90deg, #444, #666)',
                                        borderRadius: '6px',
                                        boxShadow: algo.highlight ? '0 0 15px rgba(6, 255, 165, 0.3)' : 'none'
                                    }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Novelty Comparison */}
                    <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '2rem', borderRadius: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#06ffa5' }}>Novelty (Originalitat)</h3>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', height: '180px', paddingTop: '20px' }}>
                            {sortedAlgos.slice(0, 5).map((algo, i) => (
                                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                                    <div style={{
                                        width: '100%',
                                        height: `${algo.novelty * 100}%`,
                                        minHeight: '20px',
                                        background: algo.highlight
                                            ? 'linear-gradient(180deg, #06ffa5, #04cc84)'
                                            : 'linear-gradient(180deg, #444, #666)',
                                        borderRadius: '4px 4px 0 0',
                                        position: 'relative',
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        justifyContent: 'center',
                                        paddingTop: '0.25rem'
                                    }}>
                                        <span style={{ fontSize: '0.65rem', color: algo.highlight ? '#000' : '#fff', fontWeight: 700 }}>
                                            {algo.novelty.toFixed(2)}
                                        </span>
                                    </div>
                                    <span style={{
                                        fontSize: '0.6rem',
                                        color: '#666',
                                        marginTop: '0.5rem',
                                        textAlign: 'center',
                                        width: '100%',
                                        display: 'block',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap'
                                    }}>
                                        {algo.name.split(' ')[0]}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: '1.5rem', fontSize: '0.7rem', color: '#666', textAlign: 'center' }}>
                            Més alt = Més capacitat de descobrir joies ocultes
                        </div>
                    </div>
                </div>
            </section>

            {/* Methodology */}
            <section style={{ marginBottom: '5rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Metodologia</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        padding: '2rem',
                        borderRadius: '1.5rem',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: '#e94560' }}>Datasets Utilitzats</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div>
                                <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.5rem' }}>MovieLens Latest Small</h4>
                                <p style={{ color: '#b0b0b0', fontSize: '0.85rem', lineHeight: 1.6 }}>
                                    Dataset acadèmic provinent de GroupLens Research. Conté 100.000 valoracions de 600 usuaris sobre 9.000 pel·lícules.
                                    S'utilitza com a patró d'or per validar matemàticament la precisió del sistema.
                                </p>
                            </div>
                            <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                <h4 style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.5rem' }}>TMDB Production Data</h4>
                                <p style={{ color: '#b0b0b0', fontSize: '0.85rem', lineHeight: 1.6 }}>
                                    Metadades de producció reals extretes per a Beyond Hollywood. Inclou budget, països d'origen, keywords i gèneres
                                    de més de 10.000 títols. Vital per mesurar el descobriment en un entorn real.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        padding: '2rem',
                        borderRadius: '1.5rem',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#06ffa5' }}>Validació</h3>
                        <p style={{ color: '#b0b0b0', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            Mostra aleatòria de 30 usuaris. Intervals de confiança del 95% calculats amb t-distribution.
                            Precision@10 avaluat sobre items rellevants (rating ≥ 4.0).
                        </p>
                    </div>

                </div>
            </section>

            {/* Conclusions */}
            <section style={{
                marginBottom: '4rem',
                padding: '3rem',
                background: 'linear-gradient(145deg, rgba(6, 255, 165, 0.08) 0%, rgba(10, 10, 15, 0) 100%)',
                borderRadius: '2rem',
                border: '1px dashed rgba(6, 255, 165, 0.2)'
            }}>
                <h2 style={{ fontSize: '2rem', color: '#06ffa5', marginBottom: '1.5rem' }}>Conclusions</h2>

                <div style={{ color: '#b0b0b0', lineHeight: 1.8, fontSize: '1.05rem' }}>
                    <p style={{ marginBottom: '1.5rem' }}>
                        L'algoritme <strong style={{ color: '#06ffa5' }}>Content-Based (Beyond Hollywood)</strong> obté un <strong>BH Score superior de 0.874</strong>, consolidant-se com la solució òptima per al foment de la bibliodiversitat cinematogràfica.
                    </p>

                    <p style={{ marginBottom: '1.5rem' }}>
                        Mentre que els models col·laboratius com SVD queden atrapats en el biaix de popularitat (amb una exploració de catàleg de només el 52.3%), el motor de Beyond Hollywood aconsegueix una <strong>Novelty del 1.000</strong> i una <strong>taxa d'exploració del 98.7%</strong>. Això garanteix que cap joia oculta quedi fora de l'abast de l'usuari.
                    </p>

                    <div style={{
                        marginTop: '2rem',
                        padding: '2rem',
                        background: 'rgba(6, 255, 165, 0.1)',
                        borderRadius: '1rem',
                        borderLeft: '4px solid #06ffa5'
                    }}>
                        <h3 style={{ fontSize: '1.25rem', color: '#06ffa5', marginBottom: '1rem' }}>Efectivitat Científica</h3>
                        <p style={{ fontSize: '0.95rem' }}>
                            Aquests resultats validen la hipòtesi del projecte: l'anàlisi semàntic de metadades permet trencar "l'efecte bombolla" dels sistemes tradicionals. Sacrificar un petit percentatge de precisió estadística a canvi de <strong>maximitzar el descobriment</strong> és el trade-off que defineix la identitat de Beyond Hollywood.
                        </p>
                    </div>
                </div>
            </section>

        </main>
    )
}
