import csv
import locale
import glob
import os
import shutil
import sys

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

# Set Thai locale for standard Thai dictionary sorting (ก-ฮ, leading vowels transposed)
try:
    locale.setlocale(locale.LC_COLLATE, 'th_TH')
except Exception:
    locale.setlocale(locale.LC_COLLATE, 'Thai_Thailand.874')

data_dir = 'data'
species_dir = os.path.join(data_dir, 'species')

csv_files = sorted(glob.glob(os.path.join(data_dir, 'thai_zoo_*.csv')))

for csv_path in csv_files:
    filename = os.path.basename(csv_path)
    with open(csv_path, 'r', encoding='utf-8-sig') as f:
        reader = list(csv.DictReader(f))
        if not reader:
            continue
        fieldnames = list(reader[0].keys())

    # Sort by thai_name using Thai locale collation
    sorted_rows = sorted(reader, key=lambda r: locale.strxfrm(r['thai_name']))

    # Re-assign sequential IDs starting from 1
    for i, row in enumerate(sorted_rows, 1):
        row['id'] = str(i)

    # Write back to data/
    with open(csv_path, 'w', encoding='utf-8-sig', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(sorted_rows)

    # If mirrored file exists in data/species/, update it as well
    species_path = os.path.join(species_dir, filename)
    if os.path.exists(species_dir):
        shutil.copy2(csv_path, species_path)

    print(f"Sorted {filename}: {len(sorted_rows)} rows.")
    print(f"  First 3: {[r['thai_name'] for r in sorted_rows[:3]]}")
    print(f"  Last 3:  {[r['thai_name'] for r in sorted_rows[-3:]]}")
