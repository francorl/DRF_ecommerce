# Generated by Django 4.2.11 on 2024-04-15 00:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0002_producto_quantity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='producto',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='products', verbose_name='Imagen'),
        ),
    ]
