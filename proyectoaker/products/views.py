from django.http import request
from django.shortcuts import render, get_object_or_404, redirect

from .models import Producto, Category
from django.db.models import Q
from django.views.generic import (
    TemplateView,
    ListView,
    DetailView,
)



#def category(request):
# Obtener todas las categorías
#       categorias = Category.objects.all()


# Ver listado de productos #
class productsListView(ListView):
    template_name = "core/products.html"
    model = Producto

    def get_context_data(self):
        context = super(productsListView, self).get_context_data()
        context['categories'] = Category.objects.all()
        context['products'] = Producto.objects.all()

        return context





# Filtrado de productos por letras #
class productsListByKword(ListView):
    template_name = "core/search-products.html"
    context_object_name = "productos"
    model = Producto

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        context['products'] = Producto.objects.all()
        return context

    def get_queryset(self):
        queryset = Producto.objects.all()

        palabra_clave = self.request.GET.get("kword", '')
        categoria = self.request.GET.get("categoria", '')
        selectBox = self.request.GET.get("selectBox", '')

        if palabra_clave:
            queryset = queryset.filter(
                Q(title__icontains=palabra_clave) | Q(description__icontains=palabra_clave))

        if categoria:
            queryset = queryset.filter(category__name__icontains=categoria)

        if selectBox:
            if selectBox == 'value1':
                queryset = queryset.order_by('price')
            elif selectBox == 'value2':
                queryset = queryset.order_by('-price')
            elif selectBox == 'value3':
                queryset = queryset.order_by('title')
            elif selectBox == 'value4':
                queryset = queryset.order_by('-title')

        return queryset

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        palabra_clave = self.request.GET.get("kword", '')

        if not queryset.exists() and palabra_clave:
            # Si no hay resultados y se proporcionó una palabra clave, redirige a una página de error
            return redirect('404-error')

        return super().get(request, *args, **kwargs)


#View del detalle de cada producto
class productDetail(DetailView):
    template_name = "core/product-detail.html"
    model = Producto

    def get_context_data(self, **kwargs):
        context = super(productDetail, self).get_context_data(**kwargs)
        context['title'] = 'Keto'

        return context

#View para error 404
class errorView(TemplateView):
    template_name = "core/404-error.html"

    def get_context_data(self):
        context = super(errorView, self).get_context_data()
        context['categories'] = Category.objects.all()
        context['products'] = Producto.objects.all()

        return context


