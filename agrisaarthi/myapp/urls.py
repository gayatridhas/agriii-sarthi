from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    WeatherLogViewSet,
    CropCalendarEntryViewSet,
    recommend_crop,
    detect_disease,
)

router = DefaultRouter()
router.register("weather", WeatherLogViewSet, basename="weather")
router.register("calendar", CropCalendarEntryViewSet, basename="calendar")

urlpatterns = [
    path("", include(router.urls)),
    path("recommend_crop/", recommend_crop, name="recommend_crop"),
    path("detect_disease/", detect_disease, name="detect_disease"),
]
