from django.contrib import admin
from .models import Producto, Category
# Register your models here.





class ProductoAdmin(admin.ModelAdmin):
    
    list_display = ('title', 'description', 'image', 'quantity', 'post_category', 'precio_formato')




    #Variable Price formateada a Miles
    def precio_formato(self, obj):

        return "{:,.0f}".format(float(obj.price)).replace(',', '.')

    precio_formato.short_description = 'Precio'

    def post_category(self, obj):
        return ",".join([c.name for c in obj.category.all().order_by("name")])

    post_category.short_description = "Categorias"

admin.site.register(Category)
admin.site.register(Producto, ProductoAdmin)