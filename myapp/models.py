from django.db import models

# Hero Section Model
class Hero(models.Model):
    full_name = models.CharField(max_length=100)
    short_title = models.CharField(max_length=100)
    short_intro = models.TextField()
    profile_photo = models.ImageField(upload_to='hero/')
    resume = models.FileField(upload_to='resumes/')
    github_link = models.URLField(blank=True, null=True)
    linkedin_link = models.URLField(blank=True, null=True)
    facebook_link = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.full_name

# About Section Model
class About(models.Model):
    profile_image = models.ImageField(upload_to='about/')
    long_bio = models.TextField()
    date_of_birth = models.DateField()
    address = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    languages = models.CharField(max_length=255, help_text="Comma-separated languages")
    hobbies = models.CharField(max_length=255, help_text="Comma-separated hobbies")
    cv_download_link = models.URLField()

    def __str__(self):
        return "About Section"

# Skill Model
class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('Frontend', 'Frontend'),
        ('Backend', 'Backend'),
        ('Tools', 'Tools'),
    ]
    name = models.CharField(max_length=100)
    level = models.IntegerField(help_text="Skill level in percentage (0-100)")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    icon_class = models.CharField(max_length=50, help_text="FontAwesome class (e.g., 'fab fa-python')", default='fas fa-code')

    def __str__(self):
        return self.name

# Project Model
class Project(models.Model):
    CATEGORY_CHOICES = [
        ('Web App', 'Web App'),
        ('UI Design', 'UI Design'),
        ('API', 'API'),
        ('Other', 'Other'),
    ]
    title = models.CharField(max_length=200)
    thumbnail = models.ImageField(upload_to='projects/thumbnails/')
    description = models.TextField()
    tech_stack = models.CharField(max_length=255, help_text="Comma-separated technologies")
    live_demo_link = models.URLField(blank=True, null=True)
    github_link = models.URLField(blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

    def __str__(self):
        return self.title

# Project Screenshots Model
class ProjectScreenshot(models.Model):
    project = models.ForeignKey(Project, related_name='screenshots', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='projects/screenshots/')

    def __str__(self):
        return f"Screenshot for {self.project.title}"

# Experience Model
class Experience(models.Model):
    job_title = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    company_logo = models.ImageField(upload_to='experience/')
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    responsibilities = models.TextField()

    def __str__(self):
        return f"{self.job_title} at {self.company_name}"

# Education Model
class Education(models.Model):
    institution_name = models.CharField(max_length=100)
    degree = models.CharField(max_length=100)
    passing_year = models.IntegerField()
    institute_logo = models.ImageField(upload_to='education/')
    description = models.TextField()

    def __str__(self):
        return f"{self.degree} from {self.institution_name}"

# Contact Model
class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}"

# Blog Category Model
class BlogCategory(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# Blog Post Model
class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    category = models.ForeignKey(BlogCategory, on_delete=models.CASCADE)
    thumbnail = models.ImageField(upload_to='blog/')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
