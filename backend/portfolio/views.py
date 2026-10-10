from rest_framework import generics, throttling
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Experience, Project
from .serializers import ContactMessageSerializer, ExperienceSerializer, ProjectSerializer


class PortfolioView(APIView):
    def get(self, request):
        return Response(
            {
                "profile": {
                    "name": "Issac Paul",
                    "role": "Backend-focused Software Engineer",
                    "location": "Ernakulam, Kerala, India",
                    "email": "issacpaul45@gmail.com",
                    "phone": "+91 8547016405",
                    "github": "https://github.com/issacpaul45",
                    "summary": (
                        "I build dependable backend services, thoughtful APIs, and asynchronous "
                        "workflows that keep production applications moving."
                    ),
                },
                "projects": ProjectSerializer(Project.objects.all(), many=True).data,
                "experience": ExperienceSerializer(Experience.objects.all(), many=True).data,
                "skills": {
                    "Backend": ["Python", "Django", "Django REST Framework", "Flask", "REST APIs"],
                    "Data & queues": ["PostgreSQL", "MySQL", "SQLite", "Celery", "RabbitMQ"],
                    "Cloud & tools": ["Docker", "AWS S3", "AWS SQS", "Git", "Linux"],
                },
            }
        )


class ContactMessageCreateView(generics.CreateAPIView):
    serializer_class = ContactMessageSerializer
    throttle_classes = [throttling.AnonRateThrottle]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": "Thanks for reaching out. Your message is on its way."}, status=201)
