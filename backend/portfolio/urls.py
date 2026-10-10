from django.urls import path

from .views import ContactMessageCreateView, PortfolioView

urlpatterns = [
    path("portfolio/", PortfolioView.as_view(), name="portfolio"),
    path("contact/", ContactMessageCreateView.as_view(), name="contact"),
]
