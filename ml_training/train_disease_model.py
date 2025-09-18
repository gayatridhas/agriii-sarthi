"""
Train a simple CNN for plant disease classification and export to ../ml_models/disease_model.h5

Two options:
1) Use your dataset organized as:
   dataset_root/
     Healthy/
     Blight/
     Rust/
     Leaf Spot/
   Run:
     python ml_training/train_disease_model.py --data dataset_root

2) If no --data is given, this script creates a tiny synthetic dataset for demo.

The label order saved must match DISEASE_LABELS in the app.
"""

import argparse
from pathlib import Path
import json

import numpy as np
import tensorflow as tf


DEFAULT_LABELS = ["Healthy", "Blight", "Rust", "Leaf Spot"]


def make_synthetic_dataset(num_per_class: int = 50, img_size: int = 128, labels=None):
    if labels is None:
        labels = DEFAULT_LABELS
    num_classes = len(labels)
    X = []
    y = []
    rng = np.random.default_rng(0)
    for class_index in range(num_classes):
        for _ in range(num_per_class):
            img = rng.random((img_size, img_size, 3), dtype=np.float32)
            X.append(img)
            y.append(class_index)
    X = np.stack(X)
    y = np.array(y)
    return X, y, labels


def build_model(img_size: int, num_classes: int) -> tf.keras.Model:
    inputs = tf.keras.Input(shape=(img_size, img_size, 3))
    x = tf.keras.layers.Conv2D(32, 3, activation="relu")(inputs)
    x = tf.keras.layers.MaxPooling2D()(x)
    x = tf.keras.layers.Conv2D(64, 3, activation="relu")(x)
    x = tf.keras.layers.MaxPooling2D()(x)
    x = tf.keras.layers.Conv2D(128, 3, activation="relu")(x)
    x = tf.keras.layers.GlobalAveragePooling2D()(x)
    x = tf.keras.layers.Dropout(0.3)(x)
    outputs = tf.keras.layers.Dense(num_classes, activation="softmax")(x)
    model = tf.keras.Model(inputs, outputs)
    model.compile(optimizer="adam", loss="sparse_categorical_crossentropy", metrics=["accuracy"])
    return model


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--data", type=str, default=None, help="Path to dataset root (subfolders per class)")
    parser.add_argument("--img_size", type=int, default=128)
    parser.add_argument("--epochs", type=int, default=5)
    parser.add_argument("--batch", type=int, default=32)
    parser.add_argument("--outdir", type=str, default=str(Path(__file__).resolve().parents[1] / "ml_models"))
    args = parser.parse_args()

    outdir = Path(args.outdir)
    outdir.mkdir(parents=True, exist_ok=True)

    if args.data:
        ds_train = tf.keras.preprocessing.image_dataset_from_directory(
            args.data,
            labels="inferred",
            label_mode="int",
            image_size=(args.img_size, args.img_size),
            batch_size=args.batch,
            validation_split=0.2,
            subset="training",
            seed=123,
        )
        ds_val = tf.keras.preprocessing.image_dataset_from_directory(
            args.data,
            labels="inferred",
            label_mode="int",
            image_size=(args.img_size, args.img_size),
            batch_size=args.batch,
            validation_split=0.2,
            subset="validation",
            seed=123,
        )
        class_names = list(ds_train.class_names)
        num_classes = len(class_names)
        autotune = tf.data.AUTOTUNE
        ds_train = ds_train.cache().prefetch(buffer_size=autotune)
        ds_val = ds_val.cache().prefetch(buffer_size=autotune)

        model = build_model(args.img_size, num_classes)
        model.fit(ds_train, validation_data=ds_val, epochs=args.epochs)
    else:
        X, y, class_names = make_synthetic_dataset(img_size=args.img_size)
        model = build_model(args.img_size, num_classes=len(class_names))
        model.fit(X, y, validation_split=0.2, epochs=args.epochs, batch_size=args.batch)

    model_path = outdir / "disease_model.h5"
    model.save(model_path)
    print(f"Saved model → {model_path}")

    labels_path = outdir / "disease_labels.json"
    labels_path.write_text(json.dumps(class_names, indent=2))
    print(f"Saved labels → {labels_path}")


if __name__ == "__main__":
    main()




