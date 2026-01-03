export default function AboutPage() {
    return (
        <div style={{
            minHeight: '100vh',
            background: '#0a0a0f',
            color: '#f1f1f1',
            fontFamily: 'var(--font-body)'
        }}>
            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(to bottom, #1a1a2e, #0a0a0f)',
                padding: '4rem 1.5rem',
                textAlign: 'center',
                borderBottom: '1px solid rgba(233, 69, 96, 0.2)'
            }}>
                <h1 style={{
                    fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                    fontWeight: 700,
                    marginBottom: '1rem',
                    lineHeight: 1.4
                }}>
                    <span style={{
                        background: 'linear-gradient(135deg, #e94560, #ff6b6b)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        display: 'inline-block'
                    }}>
                        Sobre Beyond Hollywood
                    </span>
                </h1>
                <p style={{
                    fontSize: '1.25rem',
                    color: '#b0b0b0',
                    maxWidth: '800px',
                    margin: '0 auto'
                }}>
                    Explorant noves fronteres en la recomanació cinematogràfica personalitzada
                </p>
            </div>

            {/* Content */}
            <div style={{
                maxWidth: '900px',
                margin: '0 auto',
                padding: '3rem 1.5rem'
            }}>
                {/* Sobre el Projecte */}
                <section style={{
                    marginBottom: '4rem',
                    padding: '2.5rem',
                    background: 'rgba(97, 49, 59, 0.4)',
                    borderRadius: '1rem',
                    border: '1px solid rgba(233, 69, 96, 0.1)'
                }}>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        marginBottom: '1.5rem',
                        color: '#e94560'
                    }}>
                        Sobre el Projecte
                    </h2>

                    <p style={{
                        fontSize: '1.125rem',
                        lineHeight: 1.8,
                        color: '#e0e0e0',
                        marginBottom: '2rem'
                    }}>
                        Aquest projecte ha estat desenvolupat com a <strong style={{ color: '#e94560' }}>Treball de Fi de Grau (TFG)</strong> de la <strong style={{ color: '#e94560' }}>Universitat Oberta de Catalunya (UOC)</strong> per <strong style={{ color: '#e94560' }}>Cristina Galter</strong>.
                        L'objectiu principal del treball és la recerca i implementació d'algoritmes avançats per millorar el descobriment de contingut cinematogràfic.
                    </p>

                    <h3 style={{
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        marginBottom: '1.25rem',
                        color: '#f1f1f1'
                    }}>
                        Objectius del Treball
                    </h3>

                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0
                    }}>
                        {[
                            'Dur a terme un anàlisi sociològic que explori els biaixos culturals, lingüístics i geogràfics presents en els sistemes de recomanació de pel·lícules.',
                            'Comparar l\'eficàcia de diferents algoritmes de recomanació (Content-Based, Metadata, Collaborative Filtering i Hybrid)',
                            'Dissenyar una interfície d\'usuari cinemàtica que prioritzi l\'experiència visual i el descobriment actiu de cinema menys conegut',
                            'Optimitzar l\'exploració mitjançant metadades avançades i filtres de nínxol'
                        ].map((item, index) => (
                            <li key={index} style={{
                                marginBottom: '1rem',
                                paddingLeft: '1.5rem',
                                position: 'relative',
                                lineHeight: 1.7,
                                color: '#e0e0e0'
                            }}>
                                <span style={{
                                    position: 'absolute',
                                    left: 0,
                                    color: '#e94560',
                                    fontWeight: 'bold'
                                }}>✓</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* El Filtre Beyond Hollywood */}
                <section style={{
                    marginBottom: '4rem',
                    padding: '2.5rem',
                    background: 'rgba(233, 69, 96, 0.05)',
                    borderRadius: '1rem',
                    border: '1px solid rgba(233, 69, 96, 0.2)'
                }}>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        marginBottom: '1.5rem',
                        color: '#f1f1f1'
                    }}>
                        El Filtre Beyond<span style={{ color: '#e94560' }}>Hollywood</span>
                    </h2>

                    <p style={{
                        fontSize: '1.125rem',
                        lineHeight: 1.8,
                        color: '#e0e0e0',
                        marginBottom: '2rem'
                    }}>
                        El core d'aquest projecte és la democratització de l'accés a la cultura cinematogràfica global. El filtre <strong style={{ color: '#e94560' }}>Beyond Hollywood</strong> és una eina dissenyada per trencar les bombolles de recomanació comercials.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem'
                    }}>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '1rem' }}>
                            <h3 style={{ color: '#e94560', fontSize: '1.25rem', marginBottom: '1rem' }}>Què exclou?</h3>
                            <p style={{ color: '#b0b0b0', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                Descarta les grans superproduccions comercials produïdes als Estats Units (els anomenats <em>blockbusters</em>). Pel·lícules d'alt pressupost que ja dominen les cartelleres i els sistemes de recomanació tradicionals.
                            </p>
                        </div>
                        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '1rem' }}>
                            <h3 style={{ color: '#e94560', fontSize: '1.25rem', marginBottom: '1rem' }}>Què inclou?</h3>
                            <p style={{ color: '#b0b0b0', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                <strong>Cinema Internacional:</strong> Tota la producció mundial que no provingui dels EUA.<br />
                                <strong>Cinema Independent US:</strong> Hem inclòs un algorisme que detecta pel·lícules americanes amb un <strong style={{ color: '#f1f1f1' }}>pressupost inferior a 10M$</strong>, permetent descobrir el cinema d'autor i independent nord-americà.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Sistema de Recomanacions */}
                <section style={{
                    marginBottom: '4rem',
                    padding: '2.5rem',
                    background: 'rgba(18, 18, 26, 0.4)',
                    borderRadius: '1rem',
                    border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: 700,
                        marginBottom: '2rem',
                        color: '#e94560'
                    }}>
                        Sistema de Recomanacions
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                        <div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: 600,
                                color: '#f1f1f1',
                                marginBottom: '1rem',
                                borderLeft: '4px solid #e94560',
                                paddingLeft: '1rem'
                            }}>
                                L'Algoritme: Content-Based Filtering
                            </h3>
                            <p style={{ color: '#b0b0b0', lineHeight: 1.8, fontSize: '1.1rem' }}>
                                El nucli del sistema utilitza tècniques de processament de llenguatge natural per analitzar les sinopsis i metadades.
                                Mitjançant <strong style={{ color: '#f1f1f1' }}>TF-IDF</strong> convertim el text en vectors numèrics, permetent calcular la <strong style={{ color: '#f1f1f1' }}>Similitud Cosinus</strong> entre milers de pel·lícules per trobar connexions temàtiques i narratives profundes.
                            </p>
                        </div>

                        <div>
                            <h3 style={{
                                fontSize: '1.5rem',
                                fontWeight: 600,
                                color: '#f1f1f1',
                                marginBottom: '1rem',
                                borderLeft: '4px solid #e94560',
                                paddingLeft: '1rem'
                            }}>
                                El Procediment
                            </h3>
                            <p style={{ color: '#b0b0b0', lineHeight: 1.8, fontSize: '1.1rem' }}>
                                Les dades es processen en dues fases. Primer, un motor de preprocessament en Python filtra i estructura el dataset per garantir la qualitat.
                                Segon, es generen índexs de similitud precalculats que permeten que la web ofereixi recomanacions en qüestió de mil·lisegons, combinant velocitat i precisió.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Tecnologies i Característiques */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '2rem',
                    marginBottom: '4rem'
                }}>
                    <section>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            marginBottom: '1.5rem',
                            color: '#e94560'
                        }}>
                            Tecnologies
                        </h2>
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.75rem'
                        }}>
                            {['Next.js 16', 'TypeScript', 'Python', 'Pandas', 'Scikit-learn', 'TF-IDF', 'TMDB API'].map((tech, index) => (
                                <span key={index} style={{
                                    padding: '0.5rem 1rem',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    borderRadius: '0.5rem',
                                    fontSize: '0.9rem',
                                    color: '#b0b0b0',
                                    border: '1px solid rgba(255, 255, 255, 0.1)'
                                }}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            marginBottom: '1.5rem',
                            color: '#e94560'
                        }}>
                            Característiques
                        </h2>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            {[
                                'Filtre BeyondHollywood per descobrir cinema no comercial',
                                'Cerca intel·ligent integrada a la navegació amb autocompletat',
                                'Mapa interactiu (Mapamundi) per explorar el cinema per països',
                                'Mode "Sorprèn-me" amb recomanacions aleatòries d\'alta qualitat',
                                'Traduccions automàtiques de sinopsis i dades via API de TMDB',
                                'Visualització de plataformes de visionat (Watch Providers) en temps real'
                            ].map((feature, index) => (
                                <li key={index} style={{
                                    marginBottom: '0.75rem',
                                    paddingLeft: '1.5rem',
                                    position: 'relative',
                                    color: '#b0b0b0',
                                    fontSize: '0.95rem',
                                    lineHeight: 1.5
                                }}>
                                    <span style={{ position: 'absolute', left: 0, color: '#e94560' }}>▸</span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Dataset */}
                <section style={{
                    padding: '2.5rem',
                    background: 'rgba(18, 18, 26, 0.4)',
                    borderRadius: '1rem',
                    border: '1px solid rgba(233, 69, 96, 0.1)'
                }}>
                    <h2 style={{
                        fontSize: '1.875rem',
                        fontWeight: 700,
                        marginBottom: '1.5rem',
                        color: '#e94560'
                    }}>
                        Font de Dades
                    </h2>
                    <p style={{
                        fontSize: '1.125rem',
                        lineHeight: 1.8,
                        color: '#e0e0e0',
                        marginBottom: '1.5rem'
                    }}>
                        El sistema utilitza el <strong>TMDB Movies Dataset 2024</strong> de Kaggle, que conté més de 1.2 milions de pel·lícules. D'aquest corpus, seleccionem unes <strong style={{ color: '#e94560' }}>200,000 obres de qualitat</strong> per garantir resultats rellevants.
                    </p>


                    <div style={{
                        padding: '1.5rem',
                        background: 'rgba(0, 0, 0, 0.2)',
                        borderRadius: '0.75rem',
                        borderLeft: '4px solid #e94560',
                        marginTop: '1.5rem'
                    }}>
                        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: '#b0b0b0' }}>
                            <strong style={{ color: '#f1f1f1' }}>Per què un dataset local i no l'API de TMDB?</strong>
                        </p>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0
                        }}>
                            {[
                                { title: 'Processament offline eficient', desc: 'El càlcul de la matriu de similitud cosinus requereix accés a totes les pel·lícules simultàniament. Amb el dataset local, el preprocessing es fa una sola vegada en 2-5 minuts, generant índexs precalculats que permeten recomanacions instantànies' },
                                { title: 'Construcció de vectors TF-IDF', desc: 'L\'algorisme TF-IDF necessita analitzar tot el corpus de pel·lícules per calcular la freqüència inversa de documents. Això no és viable amb crides successives a l\'API, però és trivial amb un dataset complet en format CSV' },
                                { title: 'Sense limitacions d\'API', desc: 'Evitem rate limits, quotes de peticions i costs associats. El dataset permet experimentar i iterar lliurement amb diferents configuracions de filtres i paràmetres de l\'algoritme' },
                                { title: 'Rendiment òptim', desc: 'Les recomanacions es serveixen instantàniament des dels índexs precalculats, sense necessitat de fer múltiples crides a APIs externes en temps real' },
                                { title: 'Reproducibilitat científica', desc: 'Dataset estàtic que garanteix resultats consistents i reproducibles, essencial per a l\'avaluació i comparació d\'algoritmes en un context acadèmic' },
                                { title: 'Metadades estructurades', desc: 'Format CSV optimitzat amb pandas i numpy per processar grans volums de dades, ideal per operacions vectorials i matricials necessàries per TF-IDF i similitud cosinus' }
                            ].map((reason, index) => (
                                <li key={index} style={{
                                    marginBottom: '1rem',
                                    paddingLeft: '1.5rem',
                                    position: 'relative'
                                }}>
                                    <span style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        color: '#e94560',
                                        fontWeight: 'bold'
                                    }}>▸</span>
                                    <strong style={{ color: '#e94560' }}>{reason.title}:</strong>{' '}
                                    <span style={{ color: '#b0b0b0' }}>{reason.desc}</span>
                                </li>
                            ))}
                        </ul>
                        <p style={{ marginTop: '0.5rem', textAlign: 'center' }}>
                            <a
                                href="https://www.kaggle.com/datasets/asaniczka/tmdb-movies-dataset-2023-930k-movies"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: '#e94560',
                                    textDecoration: 'none',
                                    borderBottom: '1px solid rgba(233, 69, 96, 0.3)',
                                    fontSize: '0.9rem'
                                }}
                            >
                                Accedir al dataset a Kaggle
                            </a>
                        </p>
                    </div>

                    <div style={{
                        padding: '1.5rem',
                        background: 'rgba(0, 0, 0, 0.2)',
                        borderRadius: '0.75rem',
                        borderLeft: '4px solid #e94560',
                        marginTop: '1.5rem'
                    }}>
                        <p style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', lineHeight: 1.7, color: '#b0b0b0' }}>
                            <strong style={{ color: '#f1f1f1' }}>Ús de l'API de TMDB:</strong> Malgrat utilitzar un dataset local per a l'algoritme, el projecte es connecta en temps real a l'API de <strong style={{ color: '#e94560' }}>The Movie Database</strong> per a:
                        </p>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                            <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative', color: '#b0b0b0', fontSize: '0.9rem' }}>
                                <span style={{ position: 'absolute', left: 0, color: '#e94560' }}>•</span>
                                <strong style={{ color: '#f1f1f1' }}>Imatges i Crèdits:</strong> Obtenció de posters, backdrops i informació del director/a.
                            </li>
                            <li style={{ marginBottom: '0.5rem', paddingLeft: '1.5rem', position: 'relative', color: '#b0b0b0', fontSize: '0.9rem' }}>
                                <span style={{ position: 'absolute', left: 0, color: '#e94560' }}>•</span>
                                <strong style={{ color: '#f1f1f1' }}>Disponibilitat:</strong> Consulta de Watch Providers (streaming, lloguer i compra) per saber on visualitzar cada obra.
                            </li>
                        </ul>
                        <p style={{ marginTop: '0.5rem', textAlign: 'center' }}>
                            <a
                                href="https://www.themoviedb.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: '#e94560',
                                    textDecoration: 'none',
                                    borderBottom: '1px solid rgba(233, 69, 96, 0.3)',
                                    fontSize: '0.9rem'
                                }}
                            >
                                Accedir a TMDB
                            </a>
                        </p>
                    </div>

                </section>
            </div>
        </div>
    )
}
