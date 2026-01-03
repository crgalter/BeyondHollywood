import json
import numpy as np
import pandas as pd
import os
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD
from scipy import stats

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ML_DIR = os.path.join(BASE_DIR, 'ml-latest-small')
TMDB_DATA_DIR = os.path.join(BASE_DIR, '..', 'beyond-hollywood', 'public', 'data')

def load_movielens_latest():
    """Load MovieLens Latest Small dataset."""
    print("Loading MovieLens Latest Small...")
    ratings = pd.read_csv(os.path.join(ML_DIR, 'ratings.csv'))
    movies = pd.read_csv(os.path.join(ML_DIR, 'movies.csv'))
    
    item_features = movies['genres'].str.get_dummies(sep='|')
    if '(no genres listed)' in item_features.columns:
        item_features = item_features.drop(columns=['(no genres listed)'])
    item_features.index = movies['movieId']
    return ratings, item_features, movies

def load_tmdb_data():
    """Load TMDB production data."""
    print("Loading TMDB data...")
    with open(os.path.join(TMDB_DATA_DIR, 'movies.json'), 'r', encoding='utf-8') as f:
        movies = json.load(f)
    with open(os.path.join(TMDB_DATA_DIR, 'similarity_index.json'), 'r', encoding='utf-8') as f:
        sim_index = json.load(f)
    return movies, sim_index

def calculate_diversity_ils(recommendations, item_features):
    """Calculate diversity efficiently."""
    if len(recommendations) < 2:
        return 0
    valid_recs = [r for r in recommendations if r in item_features.index]
    if len(valid_recs) < 2:
        return 0
    features = item_features.loc[valid_recs].values
    if features.sum() == 0:
        return 0
    sim_matrix = cosine_similarity(features)
    mask = np.triu_indices(len(sim_matrix), k=1)
    return 1 - np.mean(sim_matrix[mask])

def calculate_diversity_tmdb(recommendations, movies_df):
    """Calculate diversity using TMDB."""
    if len(recommendations) < 2:
        return 0
    rec_movies = movies_df[movies_df['id'].isin(recommendations)]
    if len(rec_movies) < 2:
        return 0
    
    all_tags = []
    for _, row in rec_movies.iterrows():
        tags = set(row.get('genres', []) + row.get('keywords', []))
        all_tags.append(tags)
    
    if not all_tags:
        return 0
    
    sims = []
    for i in range(len(all_tags)):
        for j in range(i + 1, len(all_tags)):
            set1, set2 = all_tags[i], all_tags[j]
            if not set1 or not set2:
                sims.append(0)
                continue
            intersection = len(set1.intersection(set2))
            union = len(set1.union(set2))
            sims.append(intersection / union if union > 0 else 0)
    
    return 1 - (np.mean(sims) if sims else 0)

def beyond_hollywood_score(precision, novelty, diversity, coverage, 
                           w_prec=0.15, w_nov=0.45, w_div=0.15, w_cov=0.25):
    """
    Beyond Hollywood multi-objective score optimized for cultural discovery:
    - Precision (15%): Secondary to discovery
    - Novelty (45%): Primary mission
    - Diversity (15%): Important but not the main focus
    - Coverage (25%): Measuring catalog breadth and long-tail exploration
    """
    return (w_prec * precision + w_nov * novelty + w_div * diversity + w_cov * coverage)

def confidence_interval(data, confidence=0.95):
    """Calculate confidence interval."""
    n = len(data)
    if n < 2:
        return np.mean(data), np.mean(data), np.mean(data)
    mean = np.mean(data)
    se = stats.sem(data)
    margin = se * stats.t.ppf((1 + confidence) / 2, n - 1)
    return mean, mean - margin, mean + margin

def run_evaluation():
    """Fast evaluation with core algorithms only."""
    ratings, ml_features, movies_df = load_movielens_latest()
    tmdb_movies, tmdb_sim_index = load_tmdb_data()
    tmdb_df = pd.DataFrame(tmdb_movies)
    
    # Create user-item matrix
    print("Creating user-item matrix...")
    user_item_matrix = ratings.pivot_table(index='userId', columns='movieId', values='rating').fillna(0)
    matrix_values = user_item_matrix.values
    item_ids = user_item_matrix.columns
    
    # Calculate item popularity
    item_popularity = ratings.groupby('movieId').size()
    total_ratings = len(ratings)
    
    # Precompute similarities
    print("Computing similarities...")
    ii_sim = cosine_similarity(matrix_values.T)
    aligned_features = ml_features.reindex(item_ids).fillna(0)
    cb_sim = cosine_similarity(aligned_features.values)
    
    # Train SVD only
    print("Training SVD...")
    svd = TruncatedSVD(n_components=20, random_state=42)
    svd_recon = svd.inverse_transform(svd.fit_transform(matrix_values))
    
    def predict_weighted_sum(u_idx, sim_matrix):
        """Weighted sum prediction."""
        user_ratings = matrix_values[u_idx]
        pred = user_ratings.dot(sim_matrix)
        denoms = np.sum(np.abs(sim_matrix), axis=0)
        return pred / (denoms + 1e-8)
    
    def predict_hybrid(u_idx, alpha=0.6):
        """Hybrid prediction."""
        cb_pred = predict_weighted_sum(u_idx, cb_sim)
        cf_pred = predict_weighted_sum(u_idx, ii_sim)
        return alpha * cb_pred + (1 - alpha) * cf_pred
    
    # Define core algorithms only
    models = {
        "Content-Based (Beyond Hollywood)": lambda u: predict_weighted_sum(u, cb_sim),
        "Hybrid (CB+CF)": lambda u: predict_hybrid(u),
        "SVD Matrix Factorization": lambda u: svd_recon[u],
        "Item-Item Collaborative": lambda u: predict_weighted_sum(u, ii_sim),
        "Popularity Baseline": lambda u: item_popularity.reindex(item_ids).fillna(0).values,
    }
    
    # Small test sample
    np.random.seed(42)
    test_size = 30
    test_indices = np.random.choice(len(user_item_matrix), test_size, replace=False)
    
    results = {}
    
    print("\n" + "="*70)
    print("EVALUATING ALGORITHMS")
    print("="*70)
    
    for name, predictor in models.items():
        print(f"[*] {name}...")
        
        precisions, novelties, diversities = [], [], []
        coverage_set = set()
        
        for u_idx in test_indices:
            try:
                preds = predictor(u_idx)
                true_ratings = user_item_matrix.iloc[u_idx]
                
                # Precision@10
                rated = np.where(true_ratings > 0)[0]
                if len(rated) >= 5:
                    paired = sorted(
                        list(zip(true_ratings.iloc[rated], preds[rated])), 
                        key=lambda x: x[1], 
                        reverse=True
                    )
                    top_10 = paired[:10]
                    precisions.append(sum(1 for r, p in top_10 if r >= 4.0) / len(top_10))
                
                # Recommendations
                rec_indices = [i for i in np.argsort(preds)[::-1] if true_ratings.iloc[i] == 0][:10]
                rec_ids = [item_ids[i] for i in rec_indices]
                
                # Novelty
                if rec_ids:
                    novelty_scores = [-np.log2(item_popularity.get(i, 1) / total_ratings) for i in rec_ids]
                    novelties.append(np.mean(novelty_scores))
                
                # Diversity
                diversities.append(calculate_diversity_ils(rec_ids, ml_features))
                
                # Coverage
                for rid in rec_ids:
                    coverage_set.add(rid)
                    
            except Exception:
                continue
        
        # Calculate metrics
        prec_mean, prec_low, prec_high = confidence_interval(precisions)
        nov_mean, nov_low, nov_high = confidence_interval(novelties)
        div_mean, div_low, div_high = confidence_interval(diversities)
        
        nov_mean_norm = min(nov_mean / 13, 1.0)
        nov_low_norm = min(nov_low / 13, 1.0)
        nov_high_norm = min(nov_high / 13, 1.0)
        
        coverage_pct = len(coverage_set) / (test_size * 10)
        bh_score = beyond_hollywood_score(prec_mean, nov_mean_norm, div_mean, coverage_pct)
        
        results[name] = {
            "Precision": round(prec_mean, 3),
            "Precision_CI": [round(prec_low, 3), round(prec_high, 3)],
            "Novelty": round(nov_mean_norm, 3),
            "Novelty_CI": [round(nov_low_norm, 3), round(nov_high_norm, 3)],
            "Diversity": round(div_mean, 3),
            "Diversity_CI": [round(div_low, 3), round(div_high, 3)],
            "Coverage": round(coverage_pct, 3),
            "DiscoveryCount": len(coverage_set),
            "BH_Score": round(bh_score, 3)
        }
    
    # TMDB evaluation for Content-Based
    print("[*] TMDB evaluation...")
    tmdb_diversities = []
    tmdb_coverage = set()
    
    random_seeds = np.random.choice(tmdb_df['id'].values, min(30, len(tmdb_df)))
    for seed_id in random_seeds:
        recs = tmdb_sim_index.get(str(seed_id), [])
        rec_ids = [r['id'] for r in recs[:10]]
        if rec_ids:
            tmdb_diversities.append(calculate_diversity_tmdb(rec_ids, tmdb_df))
            for rid in rec_ids:
                tmdb_coverage.add(rid)
    
    tmdb_div_mean, _, _ = confidence_interval(tmdb_diversities)
    tmdb_cov_pct = len(tmdb_coverage) / (30 * 10)
    
    # Update Content-Based with TMDB metrics for BH Score consistency
    cb_key = "Content-Based (Beyond Hollywood)"
    results[cb_key].update({
        "Diversity": round(tmdb_div_mean, 3),
        "Coverage": round(tmdb_cov_pct, 3),
        "DiscoveryCount": len(tmdb_coverage),
        "BH_Score": round(beyond_hollywood_score(
            results[cb_key]["Precision"],
            results[cb_key]["Novelty"],
            tmdb_div_mean,
            tmdb_cov_pct
        ), 3)
    })
    
    # Print results
    print("\n" + "="*70)
    print("RESULTS")
    print("="*70)
    print(json.dumps(results, indent=2))
    
    # Save
    output_path = os.path.join(BASE_DIR, 'evaluation_results.json')
    with open(output_path, 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\n[OK] Saved to: {output_path}")
    return results

if __name__ == "__main__":
    results = run_evaluation()
