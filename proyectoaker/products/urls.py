from django.urls import path

from . import views


urlpatterns = [
    path("products/", views.productsListView.as_view(), name="products"),
    path("search-products/", views.productsListByKword.as_view(), name="search-products"),
    path("detail/<pk>/", views.productDetail.as_view(), name="detail"),
    path("404-error/", views.errorView.as_view(), name="404-error"),
    #path("filter/", views.productsFilter.as_view(), name="filter"),
]

