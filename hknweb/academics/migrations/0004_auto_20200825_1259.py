# Generated by Django 2.2.8 on 2020-08-25 19:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('academics', '0003_auto_20200723_0053'),
    ]

    operations = [
        migrations.AlterField(
            model_name='icsr',
            name='icsr_course',
            field=models.ForeignKey(db_constraint=False, on_delete=django.db.models.deletion.PROTECT, related_name='icsr_course', to='academics.Course'),
        ),
        migrations.AlterField(
            model_name='icsr',
            name='icsr_department',
            field=models.ForeignKey(db_constraint=False, on_delete=django.db.models.deletion.PROTECT, related_name='icsr_department', to='academics.Department'),
        ),
        migrations.AlterField(
            model_name='icsr',
            name='icsr_instructor',
            field=models.ForeignKey(db_constraint=False, on_delete=django.db.models.deletion.PROTECT, related_name='icsr_instructor', to='academics.Instructor'),
        ),
        migrations.AlterField(
            model_name='icsr',
            name='icsr_semester',
            field=models.ForeignKey(db_constraint=False, on_delete=django.db.models.deletion.PROTECT, related_name='icsr_semester', to='academics.Semester'),
        ),
    ]