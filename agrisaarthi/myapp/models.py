from django.db import models

# Create your models here.

from django.contrib.auth import get_user_model

User = get_user_model()

class WeatherLog(models.Model):
    location_name = models.CharField(max_length=200)
    timestamp = models.DateTimeField(auto_now_add=True)
    temperature_c = models.FloatField()
    humidity = models.FloatField()
    rainfall_mm = models.FloatField(null=True, blank=True)
    raw_json = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"{self.location_name} @ {self.timestamp}"

class CropCalendarEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    crop_name = models.CharField(max_length=100)
    sowing_date = models.DateField()
    transplant_date = models.DateField(null=True, blank=True)
    harvest_date = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.crop_name} - {self.sowing_date}"

class CropRecommendationHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    requested_at = models.DateTimeField(auto_now_add=True)
    input_features = models.JSONField()
    recommended_crop = models.CharField(max_length=100)
    confidence = models.FloatField(null=True, blank=True)

    def __str__(self):
        return f"{self.recommended_crop} @ {self.requested_at}"

class DiseaseDetection(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    image = models.ImageField(upload_to="disease_images/")
    predicted_disease = models.CharField(max_length=200, blank=True)
    confidence = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    metadata = models.JSONField(null=True, blank=True)

    def __str__(self):
        return f"{self.predicted_disease} ({self.confidence})"
