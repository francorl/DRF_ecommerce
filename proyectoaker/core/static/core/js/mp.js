  document.addEventListener('DOMContentLoaded', function () {
        const mp = new MercadoPago('TEST-8cad5548-4264-44a2-9a63-33335796bc23'); // Reemplaza con tu Public Key

        // Función para obtener los items del carrito desde localStorage
        function getCartItems() {
            const items = JSON.parse(localStorage.getItem('cart')) || [];
            return items;
        }

        // Función para validar cada item del carrito
        function validateCartItem(item) {
            return item.id && typeof item.id === 'string' &&
                   item.name && typeof item.name === 'string' &&
                   item.price && !isNaN(parseFloat(item.price)) &&
                   item.quantity && !isNaN(parseInt(item.quantity));
        }

        // Función para validar todos los items del carrito
        function validateItems(items) {
            return items.every(item => validateCartItem(item));
        }

        // Función para manejar errores y mostrar un mensaje
        function handleErrors(error) {
            console.error('Error en la preferencia de pago:', error);
            alert(`Hubo un problema al crear la preferencia de pago: ${error.message || 'Error desconocido'}`);
        }

        // Función para crear la preferencia de pago con la API de Mercado Pago
        async function createPreference() {
            const cartItems = getCartItems();

            if (!cartItems.length) {
                alert('El carrito está vacío. Agrega productos antes de proceder con el pago.');
                return;
            }

            if (!validateItems(cartItems)) {
                alert('Los productos en el carrito no son válidos. Verifica los detalles e intenta nuevamente.');
                return;
            }

            // Mapear items del carrito al formato requerido por la API de Mercado Pago
            const items = cartItems.map(item => ({
                id: item.id,
                title: item.name,
                unit_price: parseFloat(item.price),
                quantity: parseInt(item.quantity),
                currency_id: "ARS"
            }));

            try {
                console.log('Datos a enviar a la API de Mercado Pago:', items);

                // Hacer la solicitud para crear la preferencia
                const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer TEST-7897069340129005-051614-0acddfb61c7e82b7bedab0412a071d94-185383299" // Reemplaza con tu Access Token
                    },
                    body: JSON.stringify({
                        items: items,
                        back_urls: {
                            success: "https://www.example.com/success",
                            failure: "https://www.example.com/failure",
                            pending: "https://www.example.com/pending"
                        },
                        auto_return: "approved",
                        payer: {
                            email: "test_user_12345678@testuser.com"
                        }
                    })
                });

                const preference = await response.json();

                if (preference && preference.id) {
                    console.log('ID de la preferencia:', preference.id);
                    initializeWalletComponent(preference.id);
                } else {
                    handleErrors({ message: 'No se obtuvo un ID de preferencia.' });
                }

            } catch (error) {
                handleErrors(error);
            }
        }

        // Función para inicializar el componente wallet con el preferenceId
        function initializeWalletComponent(preferenceId) {
            mp.bricks().create("wallet", "wallet_container", {
                initialization: {
                    preferenceId: preferenceId,
                },
                customization: {
                    texts: {
                        valueProp: 'smart_option',
                    },
                },
            });
        }

        // Agregar event listener al botón de checkout
        document.getElementById('checkoutButton').addEventListener('click', createPreference);
    });

