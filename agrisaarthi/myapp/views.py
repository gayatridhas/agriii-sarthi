from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.conf import settings
from django.core.files.storage import default_storage

import joblib
import os
import tensorflow as tf
import numpy as np
from PIL import Image

from .models import WeatherLog, CropCalendarEntry, CropRecommendationHistory, DiseaseDetection
from .serializers import (
    WeatherLogSerializer,
    CropCalendarEntrySerializer,
    CropRecommendationHistorySerializer,
    DiseaseDetectionSerializer
)

# -------------------------
# 1. Weather Logs (CRUD)
# -------------------------
class WeatherLogViewSet(viewsets.ModelViewSet):
    queryset = WeatherLog.objects.all().order_by("-timestamp")
    serializer_class = WeatherLogSerializer

# -------------------------
# 2. Crop Calendar (CRUD)
# -------------------------
class CropCalendarEntryViewSet(viewsets.ModelViewSet):
    queryset = CropCalendarEntry.objects.all().order_by("sowing_date")
    serializer_class = CropCalendarEntrySerializer

# -------------------------
# 3. Crop Recommendation
# -------------------------
# Load ML model once at startup
# ml_models directory sits next to manage.py at the workspace root
CROP_MODEL_PATH = os.path.join(settings.BASE_DIR.parent, "ml_models", "crop_recommendation.pkl")
crop_model = joblib.load(CROP_MODEL_PATH) if os.path.exists(CROP_MODEL_PATH) else None

@api_view(["POST"])
def recommend_crop(request):
    """
    Expects JSON:
    {
      "N": 90,
      "P": 42,
      "K": 43,
      "temperature": 23.5,
      "humidity": 80,
      "ph": 6.5,
      "rainfall": 200
    }
    """
    if not crop_model:
        return Response({"error": "Crop model not found"}, status=500)

    try:
        data = request.data
        required_fields = ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"]
        missing = [f for f in required_fields if f not in data]
        if missing:
            return Response({"error": f"Missing fields: {', '.join(missing)}"}, status=400)

        try:
            features = [
                float(data.get("N")),
                float(data.get("P")),
                float(data.get("K")),
                float(data.get("temperature")),
                float(data.get("humidity")),
                float(data.get("ph")),
                float(data.get("rainfall")),
            ]
        except (TypeError, ValueError):
            return Response({"error": "All fields must be numeric"}, status=400)
        prediction = crop_model.predict([features])[0]
        # if classifier supports predict_proba
        confidence = None
        if hasattr(crop_model, "predict_proba"):
            confidence = float(np.max(crop_model.predict_proba([features])))

        history = CropRecommendationHistory.objects.create(
            user=request.user if request.user.is_authenticated else None,
            input_features=data,
            recommended_crop=prediction,
            confidence=confidence,
        )

        return Response({
            "recommended_crop": prediction,
            "confidence": confidence
        })

    except Exception as e:
        return Response({"error": str(e)}, status=400)

# -------------------------
# 4. Disease Detection (CNN)
# -------------------------
DISEASE_MODEL_PATH = os.path.join(settings.BASE_DIR.parent, "ml_models", "disease_model.h5")
disease_model = tf.keras.models.load_model(DISEASE_MODEL_PATH) if os.path.exists(DISEASE_MODEL_PATH) else None
DISEASE_LABELS = ["Healthy", "Blight", "Rust", "Leaf Spot"]  # adjust to your dataset

@api_view(["POST"])
def detect_disease(request):
    """
    Expects multipart/form-data with 'image'
    """
    if not disease_model:
        return Response({"error": "Disease model not found"}, status=500)

    file = request.FILES.get("image")
    if not file:
        return Response({"error": "No image uploaded"}, status=400)

    try:
        file.seek(0)
        img = Image.open(file).resize((128, 128))  # adjust size to your model
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)

        preds = disease_model.predict(img_array)
        pred_index = int(np.argmax(preds))
        confidence = float(np.max(preds))
        predicted_disease = DISEASE_LABELS[pred_index]

        detection = DiseaseDetection.objects.create(
            user=request.user if request.user.is_authenticated else None,
            image=file,
            predicted_disease=predicted_disease,
            confidence=confidence,
            metadata={"raw_preds": preds.tolist()}
        )

        serializer = DiseaseDetectionSerializer(detection)
        return Response(serializer.data)

    except Exception as e:
        return Response({"error": str(e)}, status=400)

