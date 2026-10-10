from django.db import migrations


PROJECTS = [
    {
        "title": "Route & Fuel Optimization API",
        "summary": "A route-aware API that finds practical fuel stops using fuel prices, vehicle range, efficiency, and journey distance.",
        "details": [
            "Connected geocoding and routing services with geospatial processing to discover fuel stations along a route.",
            "Added caching, optimization logic, and structured error handling to keep route requests predictable.",
            "Containerized the service with PostgreSQL for a repeatable development setup.",
        ],
        "stack": ["Django REST Framework", "PostgreSQL", "Geoapify", "Shapely", "Docker"],
        "featured": True,
        "sort_order": 1,
    },
    {
        "title": "College Management System",
        "summary": "A Django platform for academic records and course scheduling, with role-aware access for students, faculty, and administrators.",
        "details": [
            "Designed REST endpoints for academic data, schedules, and student records.",
            "Implemented authentication and role-based access control across user types.",
            "Integrated Razorpay in demo mode as a payment proof of concept.",
        ],
        "stack": ["Django", "SQLite", "REST APIs", "Razorpay"],
        "featured": True,
        "sort_order": 2,
    },
    {
        "title": "LLM Chatbot",
        "summary": "A Python conversational assistant using the OpenAI API and multi-turn conversation history.",
        "details": [
            "Maintained conversation context across turns for more coherent responses.",
            "Kept API credentials in environment variables and handled API errors explicitly.",
        ],
        "stack": ["Python", "OpenAI API", "Conversation state"],
        "featured": False,
        "sort_order": 3,
    },
]

EXPERIENCE = [
    {
        "company": "Indapp",
        "role": "Software Engineer Level 1",
        "period": "October 2025 — Present",
        "location": "India",
        "highlights": [
            "Build and maintain production Django and PostgreSQL services for an application serving thousands of users.",
            "Design JWT-authenticated APIs with role-based access control, and build background workflows with Celery and RabbitMQ.",
            "Improve API and database performance, diagnose production issues, and ship preventive fixes.",
            "Containerize Django, worker, and database services; integrate AWS S3, SQS FIFO, and IAM.",
        ],
        "sort_order": 1,
    },
    {
        "company": "Quest Innovative Solutions",
        "role": "Junior Software Engineer",
        "period": "March 2024 — April 2025",
        "location": "Kochi, Kerala",
        "highlights": [
            "Developed full-stack applications with Django, Angular, Python, and REST APIs.",
            "Mentored interns in web development fundamentals and collaborated across teams to deliver software.",
        ],
        "sort_order": 2,
    },
]


def seed_data(apps, schema_editor):
    Project = apps.get_model("portfolio", "Project")
    Experience = apps.get_model("portfolio", "Experience")
    Project.objects.bulk_create([Project(**project) for project in PROJECTS])
    Experience.objects.bulk_create([Experience(**role) for role in EXPERIENCE])


def remove_seed_data(apps, schema_editor):
    apps.get_model("portfolio", "Project").objects.filter(
        title__in=[project["title"] for project in PROJECTS]
    ).delete()
    apps.get_model("portfolio", "Experience").objects.filter(
        company__in=[role["company"] for role in EXPERIENCE],
        period__in=[role["period"] for role in EXPERIENCE],
    ).delete()


class Migration(migrations.Migration):
    dependencies = [("portfolio", "0001_initial")]

    operations = [migrations.RunPython(seed_data, remove_seed_data)]
