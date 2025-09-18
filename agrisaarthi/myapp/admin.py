from django.contrib import admin
from .models import WeatherLog, CropCalendarEntry, CropRecommendationHistory, DiseaseDetection

# Register your models here.
@admin.register(WeatherLog)
class WeatherLogAdmin(admin.ModelAdmin):
    list_display = ['location_name', 'timestamp', 'temperature_c', 'humidity', 'rainfall_mm']
    list_filter = ['timestamp', 'location_name']
    search_fields = ['location_name']

@admin.register(CropCalendarEntry)
class CropCalendarEntryAdmin(admin.ModelAdmin):
    list_display = ['crop_name', 'sowing_date', 'transplant_date', 'harvest_date', 'user']
    list_filter = ['sowing_date', 'crop_name']
    search_fields = ['crop_name', 'user__username']

@admin.register(CropRecommendationHistory)
class CropRecommendationHistoryAdmin(admin.ModelAdmin):
    list_display = ['recommended_crop', 'confidence', 'requested_at', 'user']
    list_filter = ['requested_at', 'recommended_crop']
    search_fields = ['recommended_crop', 'user__username']

@admin.register(DiseaseDetection)
class DiseaseDetectionAdmin(admin.ModelAdmin):
    list_display = ['predicted_disease', 'confidence', 'created_at', 'user']
    list_filter = ['predicted_disease', 'created_at']
    search_fields = ['predicted_disease', 'user__username']
