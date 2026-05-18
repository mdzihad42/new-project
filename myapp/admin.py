from django.contrib import admin
from .models import Hero, About, Skill, Project, ProjectScreenshot, Experience, Education, Contact, BlogCategory, BlogPost, Recommendation

admin.site.register(Hero)
admin.site.register(About)
admin.site.register(Skill)
admin.site.register(Experience)
admin.site.register(Education)
admin.site.register(Contact)
admin.site.register(BlogCategory)
admin.site.register(BlogPost)
admin.site.register(Recommendation)

class ProjectScreenshotInline(admin.TabularInline):
    model = ProjectScreenshot
    extra = 1

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    inlines = [ProjectScreenshotInline]
    list_display = ('title', 'category')
