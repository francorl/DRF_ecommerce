```markdown
# 🛍️ DRF E-commerce

A RESTful e-commerce backend built with Django Rest Framework.

This project provides a robust and scalable API for managing products, categories, users, orders, and payments in an e-commerce system.


## About

This project is a RESTful API built using Django Rest Framework (DRF) to power an e-commerce application. It provides endpoints for managing products, categories, users, orders, and payments. The API is designed to be scalable, secure, and easy to integrate with various front-end technologies.

The target audience for this project includes web developers, mobile app developers, and anyone looking to build an e-commerce platform with a robust and flexible backend. It solves the problem of creating a well-structured and maintainable API for e-commerce functionality.

Key technologies used include Python, Django, Django Rest Framework, and PostgreSQL. The architecture follows a standard Model-View-Serializer (MVS) pattern, with DRF handling the API endpoints and serialization/deserialization of data. A unique selling point is its comprehensive set of features and well-documented API, allowing developers to quickly build and customize their e-commerce applications.

## ✨ Features

- 🎯 **Product Management**: Create, read, update, and delete products with detailed information such as name, description, price, and images.
- 🗂️ **Category Management**: Organize products into categories and subcategories for easy navigation.
- 👤 **User Authentication**: Secure user registration, login, and authentication using JWT (JSON Web Tokens).
- 🛒 **Shopping Cart**: Add products to a shopping cart and manage quantities.
- 🧾 **Order Management**: Create and manage orders, track order status, and generate invoices.
- 💳 **Payment Integration**: Integrate with popular payment gateways for secure online transactions (Stripe, PayPal).
- 🔒 **Security**: Implements best practices for API security, including authentication, authorization, and data validation.
- ⚡ **Performance**: Optimized for speed and efficiency, ensuring a smooth user experience.
- 🛠️ **Extensible**: Easily customizable and extensible to meet specific business requirements.

## 🎬 Demo

🔗 **Live Demo**: [https://your-demo-url.com](https://your-demo-url.com)

### Screenshots
![Products List](screenshots/products-list.png)
*A list of available products with details.*

![Product Detail](screenshots/product-detail.png)
*Detailed information about a specific product.*

## 🚀 Quick Start

Clone and run in 3 steps:
```bash
git clone https://github.com/francorl/DRF_ecommerce.git
cd DRF_ecommerce
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Open [http://localhost:8000](http://localhost:8000) to view the API in your browser.

## 📦 Installation

### Prerequisites
- Python 3.8+
- pip
- PostgreSQL

### Steps

```bash
# Clone the repository
git clone https://github.com/francorl/DRF_ecommerce.git
cd DRF_ecommerce

# Create a virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Linux/macOS
venv\Scripts\activate  # On Windows

# Install dependencies
pip install -r requirements.txt

# Configure the database
# Create a PostgreSQL database and update the DATABASE settings in settings.py

# Run migrations
python manage.py migrate

# Create a superuser (admin account)
python manage.py createsuperuser

# Start the development server
python manage.py runserver
```

## 💻 Usage

### Basic Usage

After installing and running the development server, you can access the API endpoints using tools like `curl`, `Postman`, or a web browser.

### Examples

- **Get a list of products:**
  ```bash
  curl http://localhost:8000/api/products/
  ```

- **Create a new product:**
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"name": "New Product", "description": "A new product description", "price": 99.99, "category": 1}' http://localhost:8000/api/products/
  ```

- **Accessing the Django Admin:**
  Navigate to `http://localhost:8000/admin` in your browser and log in with the superuser credentials you created during installation.

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce
DATABASE_SSL=false

# Secret Key
SECRET_KEY=your_django_secret_key

# Debug Mode
DEBUG=True
```

Update your `settings.py` file to read these environment variables.

### Settings File

Key settings to configure in `settings.py`:

- `DEBUG`: Set to `True` for development, `False` for production.
- `SECRET_KEY`: Generate a strong secret key for production.
- `ALLOWED_HOSTS`: List of allowed hostnames for the application.
- `DATABASES`: Database connection settings.
- `STATIC_URL`, `MEDIA_URL`, `STATIC_ROOT`, `MEDIA_ROOT`: Static and media file settings.

## API Reference

The API provides endpoints for managing products, categories, users, orders, and payments.

### Products

- `GET /api/products/`: List all products.
- `POST /api/products/`: Create a new product.
- `GET /api/products/{id}/`: Retrieve a specific product.
- `PUT /api/products/{id}/`: Update a product.
- `DELETE /api/products/{id}/`: Delete a product.

### Categories

- `GET /api/categories/`: List all categories.
- `POST /api/categories/`: Create a new category.
- `GET /api/categories/{id}/`: Retrieve a specific category.
- `PUT /api/categories/{id}/`: Update a category.
- `DELETE /api/categories/{id}/`: Delete a category.

### Users

- `POST /api/register/`: Register a new user.
- `POST /api/login/`: Login an existing user.
- `GET /api/profile/`: Get user profile (requires authentication).
- `PUT /api/profile/`: Update user profile (requires authentication).

### Orders

- `GET /api/orders/`: List all orders.
- `POST /api/orders/`: Create a new order.
- `GET /api/orders/{id}/`: Retrieve a specific order.
- `PUT /api/orders/{id}/`: Update an order.
- `DELETE /api/orders/{id}/`: Delete an order.

## 📁 Project Structure

```
DRF_ecommerce/
├── 📁 core/                  # Core application settings
│   ├── 📄 settings.py       # Django settings
│   ├── 📄 urls.py           # Project URLs
│   └── 📄 wsgi.py           # WSGI configuration
├── 📁 products/              # Products app
│   ├── 📁 migrations/       # Database migrations
│   ├── 📄 models.py         # Data models
│   ├── 📄 serializers.py    # DRF serializers
│   ├── 📄 views.py          # API views
│   ├── 📄 urls.py           # Products app URLs
│   └── 📄 admin.py          # Django admin configuration
├── 📁 categories/            # Categories app
│   ├── ...
├── 📁 users/                 # Users app
│   ├── ...
├── 📁 orders/                # Orders app
│   ├── ...
├── 📁 payments/              # Payments app
│   ├── ...
├── 📄 manage.py              # Django management script
├── 📄 requirements.txt       # Project dependencies
└── 📄 README.md              # Project documentation
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps
1. 🍴 Fork the repository
2. 🌟 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. ✅ Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push to the branch (`git push origin feature/AmazingFeature`)
5. 🔃 Open a Pull Request

### Development Setup
```bash
# Fork and clone the repo
git clone https://github.com/yourusername/DRF_ecommerce.git

# Install dependencies
pip install -r requirements.txt

# Create a new branch
git checkout -b feature/your-feature-name

# Make your changes and test
python manage.py test

# Commit and push
git commit -m "Description of changes"
git push origin feature/your-feature-name
```

### Code Style
- Follow PEP 8 coding standards.
- Use meaningful variable and function names.
- Write clear and concise comments.

## Testing

To run tests:

```bash
python manage.py test
```

## Deployment

### Heroku

1. Create a Heroku account and install the Heroku CLI.
2. Create a new Heroku app.
3. Configure your Heroku app settings, including environment variables.
4. Deploy your application using Git.

### Docker

1. Build a Docker image:
   ```bash
   docker build -t drf_ecommerce .
   ```

2. Run the Docker container:
   ```bash
   docker run -p 8000:8000 drf_ecommerce
   ```

## FAQ

**Q: How do I configure the database?**
A: Update the `DATABASES` setting in `settings.py` with your PostgreSQL connection details.

**Q: How do I create a superuser?**
A: Run `python manage.py createsuperuser` to create an admin account.

**Q: How do I run the tests?**
A: Run `python manage.py test` to execute the test suite.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### License Summary
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

## 💬 Support

- 📧 **Email**: your.email@example.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/francorl/DRF_ecommerce/issues)
- 📖 **Documentation**: [Full Documentation](https://docs.your-site.com)

## 🙏 Acknowledgments

- 🎨 **Design inspiration**: [Dribbble](https://dribbble.com/)
- 📚 **Libraries used**:
  - [Django Rest Framework](https://www.django-rest-framework.org/) - Powerful and flexible toolkit for building Web APIs.
  - [Django](https://www.djangoproject.com/) - High-level Python Web framework that encourages rapid development and clean, pragmatic design.
- 👥 **Contributors**: Thanks to all [contributors](https://github.com/francorl/DRF_ecommerce/contributors)
```
