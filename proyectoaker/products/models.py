from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name = "categoría"
        verbose_name_plural = "categorías"

    def __str__(self):
        return self.name


class Producto(models.Model):
    title = models.CharField(max_length=200, verbose_name="Título")
    description = models.TextField(verbose_name="Descripcion")
    image = models.ImageField(verbose_name="Imagen", null=True, blank=True, upload_to="products")
    category = models.ManyToManyField(Category, verbose_name="Categoria")
    quantity = models.IntegerField(verbose_name="Cantidad", default=0)
    price = models.FloatField(verbose_name="Precio")


    class Meta:
        verbose_name = "Producto"
        verbose_name_plural = "Productos"

    def __str__(self):
        return self.title
