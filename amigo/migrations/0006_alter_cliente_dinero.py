# Generated by Django 5.0.3 on 2024-04-18 13:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('amigo', '0005_fotografia_imagenbase64_fotografia_prioridad_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cliente',
            name='dinero',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
    ]
