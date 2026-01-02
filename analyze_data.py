import pandas as pd
import os

file_path = 'TMDB_movie_dataset_v11.csv'

if not os.path.exists(file_path):
    print(f"Error: File {file_path} not found.")
    exit(1)

try:
    # Read only the first 1000 rows for quick analysis if the file is huge, 
    # but for full stats we might need more. The file is ~500MB, so reading all might take a moment but is feasible.
    # Let's read all but be mindful of memory. 500MB is fine for most modern machines.
    df = pd.read_csv(file_path)
    
    with open('analysis_results.txt', 'w', encoding='utf-8') as f:
        f.write("--- Dataframe Info ---\n")
        df.info(buf=f)
        
        f.write("\n\n--- First 5 Rows ---\n")
        f.write(df.head().to_string())
        
        f.write("\n\n--- Column Statistics ---\n")
        f.write(df.describe(include='all').to_string())
        
        f.write("\n\n--- Missing Values ---\n")
        f.write(df.isnull().sum().to_string())
        
        f.write("\n\n--- Field Analysis ---\n")
        columns = df.columns.tolist()
        f.write(f"Available columns: {columns}\n")
        
    print("Analysis complete. Results written to analysis_results.txt")
    
except Exception as e:
    print(f"An error occurred: {e}")
