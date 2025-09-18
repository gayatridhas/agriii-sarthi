from rest_framework import serializers
from .models import WeatherLog, CropCalendarEntry, CropRecommendationHistory, DiseaseDetection

class WeatherLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherLog
        fields = "__all__"

class CropCalendarEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = CropCalendarEntry
        fields = "__all__"

class CropRecommendationHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CropRecommendationHistory
        fields = "__all__"

class DiseaseDetectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiseaseDetection
        fields = "__all__"
        read_only_fields = ("predicted_disease", "confidence", "created_at")
