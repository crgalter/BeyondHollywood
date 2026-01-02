"""
Data preprocessing script for Beyond Hollywood
Transforms raw TMDB CSV into optimized JSON files for the web application
"""

import pandas as pd
import numpy as np
import json
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from datetime import datetime

import kagglehub
from kagglehub import KaggleDatasetAdapter

# Configuration
OUTPUT_DIR = '../beyond-hollywood/public/data'
TOP_SIMILAR = 20  # Number of similar movies to pre-compute per movie

def clean_and_parse(df):
    """Clean and parse CSV data"""
    print("Cleaning data...")
    
    # Fill missing values
    df['title'] = df['title'].fillna('Unknown')
    df['original_title'] = df['original_title'].fillna(df['title'])
    df['overview'] = df['overview'].fillna('')
    df['tagline'] = df['tagline'].fillna('')
    df['genres'] = df['genres'].fillna('')
    df['keywords'] = df['keywords'].fillna('')
    df['production_countries'] = df['production_countries'].fillna('')
    df['spoken_languages'] = df['spoken_languages'].fillna('')
    df['original_language'] = df['original_language'].fillna('unknown')
    df['release_date'] = df['release_date'].fillna('')
    
    # Parse release year
    df['year'] = df['release_date'].apply(lambda x: int(x[:4]) if len(str(x)) >= 4 and str(x)[:4].isdigit() else None)
    
    # Filter out movies with no title or ID
    df = df[df['title'] != 'Unknown']
    df = df[df['id'].notna()]
    
    # ===== QUALITY FILTERS TO REDUCE DATASET SIZE =====
    print("Applying quality filters to reduce dataset size...")
    original_count = len(df)
    
    # Filter 0: Exclude adult content
    if 'adult' in df.columns:
        print("Discarding adult content...")
        df['adult'] = df['adult'].astype(str).str.lower()
        df = df[df['adult'] != 'true']
    
    # Filter 1: Minimum vote count (ensures movie has some recognition)
    MIN_VOTES = 20  # Adjust this: 10 (more movies), 50 (fewer, better quality)
    df = df[df['vote_count'] >= MIN_VOTES]
    
    # Filter 2: Must have genres OR keywords (needed for similarity)
    df = df[
        (df['genres'].str.len() > 0) | 
        (df['keywords'].str.len() > 0)
    ]
    
    # Filter 3: Optional - Keep only movies with some popularity
    # Uncomment the next 2 lines if you want even fewer movies:
    MIN_POPULARITY = 2.0
    df = df[df['popularity'] >= MIN_POPULARITY]
    
    filtered_count = len(df)
    print(f"Filtered from {original_count:,} to {filtered_count:,} movies ({(filtered_count/original_count*100):.1f}%)")
    print(f"This will make processing ~{int((original_count/filtered_count)**2)}x faster!\n")
    
    # Convert ID to int
    df['id'] = df['id'].astype(int)
    
    return df

def extract_metadata(df):
    """Extract unique genres, languages, countries"""
    print("Extracting metadata...")
    
    # Extract unique genres
    all_genres = set()
    for genres_str in df['genres'].dropna():
        if genres_str:
            genres = [g.strip() for g in str(genres_str).split(',')]
            all_genres.update(genres)
    
    # Extract unique languages
    all_languages = df['original_language'].unique().tolist()
    
    # Extract unique countries
    all_countries = set()
    for countries_str in df['production_countries'].dropna():
        if countries_str:
            countries = [c.strip() for c in str(countries_str).split(',')]
            all_countries.update(countries)
    
    metadata = {
        'genres': sorted(list(all_genres)),
        'languages': sorted(all_languages),
        'countries': sorted(list(all_countries)),
        'total_movies': len(df),
        'generated_at': datetime.now().isoformat()
    }
    
    return metadata

def compute_similarity_index(df):
    """Pre-compute similarity scores for all movies"""
    print("Computing similarity index...")
    print(f"Processing {len(df)} movies...")
    
    # Combine genres and keywords for content-based similarity
    df['content'] = df['genres'].fillna('') + ' ' + df['keywords'].fillna('')
    
    # Create TF-IDF matrix
    tfidf = TfidfVectorizer(max_features=5000, stop_words='english')
    
    # Filter out empty content
    valid_indices = df['content'].str.len() > 0
    df_valid = df[valid_indices].copy()
    
    if len(df_valid) == 0:
        print("Warning: No valid content for similarity computation")
        return {}
    
    tfidf_matrix = tfidf.fit_transform(df_valid['content'])
    
    print("Computing cosine similarity...")
    # Compute similarity in batches to avoid memory issues
    similarity_index = {}
    batch_size = 100
    
    for i in range(0, len(df_valid), batch_size):
        end_idx = min(i + batch_size, len(df_valid))
        batch_similarities = cosine_similarity(
            tfidf_matrix[i:end_idx], 
            tfidf_matrix
        )
        
        for j, movie_idx in enumerate(range(i, end_idx)):
            movie_id = df_valid.iloc[movie_idx]['id']
            similarities = batch_similarities[j]
            
            # Get top N similar movies (excluding itself)
            similar_indices = similarities.argsort()[::-1][1:TOP_SIMILAR+1]
            similar_movies = []
            
            for idx in similar_indices:
                similar_id = df_valid.iloc[idx]['id']
                score = float(similarities[idx])
                if score > 0.05:  # Only keep meaningful similarities
                    similar_movies.append({
                        'id': int(similar_id),
                        'score': round(score, 4)
                    })
            
            similarity_index[str(movie_id)] = similar_movies
        
        if (i + batch_size) % 1000 == 0:
            print(f"  Processed {min(i + batch_size, len(df_valid))} / {len(df_valid)} movies")
    
    return similarity_index

def create_movie_records(df):
    """Convert dataframe to list of movie records"""
    print("Creating movie records...")
    
    movies = []
    for _, row in df.iterrows():
        movie = {
            'id': int(row['id']),
            'title': row['title'],
            'original_title': row['original_title'],
            'overview': row['overview'],
            'tagline': row['tagline'],
            'vote_average': float(row['vote_average']) if pd.notna(row['vote_average']) else 0,
            'vote_count': int(row['vote_count']) if pd.notna(row['vote_count']) else 0,
            'popularity': float(row['popularity']) if pd.notna(row['popularity']) else 0,
            'release_date': row['release_date'] if pd.notna(row['release_date']) else '',
            'year': int(row['year']) if pd.notna(row['year']) else None,
            'runtime': int(row['runtime']) if pd.notna(row['runtime']) else 0,
            'budget': int(row['budget']) if pd.notna(row['budget']) else 0,
            'revenue': int(row['revenue']) if pd.notna(row['revenue']) else 0,
            'original_language': row['original_language'],
            'genres': [g.strip() for g in str(row['genres']).split(',') if g.strip()] if pd.notna(row['genres']) else [],
            'keywords': [k.strip() for k in str(row['keywords']).split(',') if k.strip()] if pd.notna(row['keywords']) else [],
            'production_countries': [c.strip() for c in str(row['production_countries']).split(',') if c.strip()] if pd.notna(row['production_countries']) else [],
            'spoken_languages': [l.strip() for l in str(row['spoken_languages']).split(',') if l.strip()] if pd.notna(row['spoken_languages']) else [],
            'poster_path': row['poster_path'] if pd.notna(row['poster_path']) else '',
            'backdrop_path': row['backdrop_path'] if pd.notna(row['backdrop_path']) else '',
            'imdb_id': row['imdb_id'] if pd.notna(row['imdb_id']) else '',
            'homepage': row['homepage'] if pd.notna(row['homepage']) else '',
        }
        movies.append(movie)
    
    return movies

def main():
    print("=== Beyond Hollywood Data Preprocessing ===\n")
    
    # Load from Kaggle
    print("Loading dataset from Kaggle...")
    df = kagglehub.load_dataset(
        KaggleDatasetAdapter.PANDAS,
        "asaniczka/tmdb-movies-dataset-2023-930k-movies",
        "TMDB_movie_dataset_v11.csv"
    )
    print(f"Loaded {len(df)} movies\n")
    
    # Clean data
    df = clean_and_parse(df)
    print(f"After cleaning: {len(df)} movies\n")
    
    # Extract metadata
    metadata = extract_metadata(df)
    
    # Create movie records
    movies = create_movie_records(df)
    
    # Compute similarity index
    similarity_index = compute_similarity_index(df)
    
    # Create output directory
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    # Save to JSON files
    print("\nSaving JSON files...")
    
    print("  - movies.json")
    with open(os.path.join(OUTPUT_DIR, 'movies.json'), 'w', encoding='utf-8') as f:
        json.dump(movies, f, ensure_ascii=False, separators=(',', ':'))
    
    print("  - metadata.json")
    with open(os.path.join(OUTPUT_DIR, 'metadata.json'), 'w', encoding='utf-8') as f:
        json.dump(metadata, f, ensure_ascii=False, indent=2)
    
    print("  - similarity_index.json")
    with open(os.path.join(OUTPUT_DIR, 'similarity_index.json'), 'w', encoding='utf-8') as f:
        json.dump(similarity_index, f, ensure_ascii=False, separators=(',', ':'))
    
    print("\n=== Preprocessing Complete ===")
    print(f"Total movies: {len(movies)}")
    print(f"Genres: {len(metadata['genres'])}")
    print(f"Languages: {len(metadata['languages'])}")
    print(f"Countries: {len(metadata['countries'])}")
    print(f"Similarity entries: {len(similarity_index)}")
    print(f"\nOutput directory: {OUTPUT_DIR}")

if __name__ == '__main__':
    main()
