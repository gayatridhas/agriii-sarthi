"""
Train a simple crop recommendation model and export to ../ml_models/crop_recommendation.pkl

Usage examples:
  python ml_training/train_crop_recommendation.py --csv path/to/data.csv
  python ml_training/train_crop_recommendation.py  # uses synthetic demo data

CSV schema (header names must match exactly):
  N,P,K,temperature,humidity,ph,rainfall,crop
"""

import argparse
import os
from pathlib import Path
import json

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib


FEATURE_ORDER = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]


def generate_synthetic_data(num_rows: int = 500) -> pd.DataFrame:
    rng = np.random.default_rng(42)
    df = pd.DataFrame({
        "N": rng.integers(0, 150, size=num_rows),
        "P": rng.integers(0, 150, size=num_rows),
        "K": rng.integers(0, 150, size=num_rows),
        "temperature": rng.normal(25, 5, size=num_rows).round(2),
        "humidity": rng.integers(30, 100, size=num_rows),
        "ph": rng.uniform(4.5, 8.5, size=num_rows).round(2),
        "rainfall": rng.integers(0, 400, size=num_rows),
    })
    # Toy rule-based labels for demo
    conditions = []
    for _, row in df.iterrows():
        if row["rainfall"] > 250 and row["ph"] < 7:
            conditions.append("rice")
        elif row["temperature"] < 20:
            conditions.append("wheat")
        else:
            conditions.append("maize")
    df["crop"] = conditions
    return df


def load_dataset(csv_path: str | None) -> tuple[pd.DataFrame, pd.Series]:
    if csv_path and os.path.exists(csv_path):
        df = pd.read_csv(csv_path)
    else:
        df = generate_synthetic_data()

    missing = [c for c in FEATURE_ORDER + ["crop"] if c not in df.columns]
    if missing:
        raise ValueError(f"CSV missing columns: {missing}")
    X = df[FEATURE_ORDER]
    y = df["crop"].astype(str)
    return X, y


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--csv", type=str, default=None, help="Path to training CSV. If omitted, uses synthetic data.")
    parser.add_argument("--outdir", type=str, default=str(Path(__file__).resolve().parents[1] / "ml_models"), help="Output directory for model artifacts")
    args = parser.parse_args()

    outdir = Path(args.outdir)
    outdir.mkdir(parents=True, exist_ok=True)

    X, y = load_dataset(args.csv)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    model = RandomForestClassifier(n_estimators=200, random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    print(classification_report(y_test, y_pred))

    # Save model
    model_path = outdir / "crop_recommendation.pkl"
    joblib.dump(model, model_path)
    print(f"Saved model → {model_path}")

    # Save feature order for reference
    feature_order_path = outdir / "feature_order.json"
    feature_order_path.write_text(json.dumps(FEATURE_ORDER, indent=2))
    print(f"Saved feature order → {feature_order_path}")


if __name__ == "__main__":
    main()


