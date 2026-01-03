import urllib.request
import zipfile
import os

url = "https://files.grouplens.org/datasets/movielens/ml-latest-small.zip"
backend_dir = os.path.join(os.getcwd(), "backend")
zip_path = os.path.join(backend_dir, "ml-latest-small.zip")

print(f"Downloading MovieLens Latest Small from {url}...")
if not os.path.exists(backend_dir):
    os.makedirs(backend_dir)

urllib.request.urlretrieve(url, zip_path)

print("Extracting...")
with zipfile.ZipFile(zip_path, 'r') as zip_ref:
    zip_ref.extractall(backend_dir)

print("Done. MovieLens Latest Small downloaded.")
os.remove(zip_path)
