from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from .models import Hero, About, Skill, Project, Experience, Education, BlogPost, Contact

def index(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        if name and email and subject and message:
            Contact.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message
            )
            
            # Send Email
            email_subject = f"New Portfolio Message: {subject}"
            
            from django.template.loader import render_to_string
            from django.utils.html import strip_tags
            
            html_message = render_to_string('myapp/email_template.html', {
                'name': name,
                'email': email,
                'subject': subject,
                'message': message,
            })
            plain_message = strip_tags(html_message)
            
            try:
                send_mail(
                    email_subject,
                    plain_message,
                    settings.EMAIL_HOST_USER,
                    [settings.DEFAULT_FROM_EMAIL],
                    html_message=html_message,
                    fail_silently=False,
                )
            except Exception as e:
                print(f"Error sending email: {e}")

            messages.success(request, 'Your message has been sent successfully!')
            return redirect('index')

    context = {
        'hero': Hero.objects.first(),
        'about': About.objects.first(),
        'skills': Skill.objects.all(),
        'projects': Project.objects.all(),
        'experiences': Experience.objects.all().order_by('-start_date'),
        'educations': Education.objects.all().order_by('-passing_year'),
        'blogs': BlogPost.objects.all().order_by('-created_at'),
    }
    return render(request, 'myapp/index.html', context)

def project_detail(request, pk):
    project = get_object_or_404(Project, pk=pk)
    return render(request, 'myapp/project_detail.html', {'project': project})

def blog_detail(request, pk):
    blog = get_object_or_404(BlogPost, pk=pk)
    return render(request, 'myapp/blog_detail.html', {'blog': blog})
