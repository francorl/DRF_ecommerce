# Generated by Django 4.2.11 on 2024-04-11 16:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='producto',
            name='quantity',
            field=models.IntegerField(default=0, verbose_name='Cantidad'),
        ),
    ]
