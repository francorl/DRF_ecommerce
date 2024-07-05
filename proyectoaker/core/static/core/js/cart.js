document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('ventanaModal');
    const modalContent = modal.querySelector('.boxCarro');
    const closeModal = modal.querySelector('.cerrar');
    const seguirComprandoBtn = modal.querySelector('#seguirComprando');
    document.querySelector('#vaciarCarrito').addEventListener('click', vaciarCarrito);

    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.forEach(item => {
            const productHtml = `
                <div class="boxCarrito" data-id="${item.id}">
                    <img src="${item.image}" class="imgCarrito"/>
                    <p class="textCarrito">${item.name}</p>
                    <div class="quantityCarrito">
                        <label class="textQuantityCarrito">Cantidad</label>
                        <input type="number" min="1" value="${item.quantity}" class="numberQuantityCarrito"/>
                    </div>
                    <p class="priceCarrito">${item.price}</p>
                    <button class="remove-btn">Quitar</button>
                </div>
            `;
            modalContent.insertAdjacentHTML('beforeend', productHtml);
        });
        updateItemCountDisplay();
        calculateTotal();  // Calcula el total al cargar el carrito
        addQuantityChangeListeners(); // Añadir listeners para los campos de cantidad
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateItemCountDisplay();
        calculateTotal();  // Calcula el total después de guardar el carrito
    }

       function removeItemFromCart(productId) {
           Swal.fire({
               title: "Esta seguro que quiere quitar sus productos?",
               text: "Esto eliminará todos los productos",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               cancelButtonText: "Cancelar",
               confirmButtonText: "Confirmar"
           }).then((result) => {
               if (result.isConfirmed) {
                   let cart = JSON.parse(localStorage.getItem('cart')) || [];
                   cart = cart.filter(item => item.id !== productId);
                   saveCart(cart);
                   document.querySelector(`.boxCarrito[data-id="${productId}"]`).remove();
                   updateItemCountDisplay();
                   calculateTotal();  // Calcula el total después de quitar un ítem
                   Swal.fire({
                       title: "Su producto/s han sido eliminados con exito!",
                       icon: "success"
                   });

               }
           });

       }

       updateItemCountDisplay();



    function updateCartItemQuantity(productId, newQuantity) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity = newQuantity;
            saveCart(cart);

            // Actualizar cantidad en el DOM
            const itemElement = document.querySelector(`.boxCarrito[data-id="${productId}"] .numberQuantityCarrito`);
            if (itemElement) {
                itemElement.value = newQuantity;
            }
            calculateTotal();  // Calcula el total después de cambiar la cantidad
        }
    }



    function getItemCountInCart() {
        const itemsInCart = document.querySelectorAll('.boxCarrito').length;
        return itemsInCart;
    }

    function updateItemCountDisplay() {
    const itemCount = getItemCountInCart();
    const itemCountDisplay = document.getElementById('itemCountDisplay');
    if (itemCount > 0) {
        itemCountDisplay.textContent = `${itemCount}`;
        itemCountDisplay.style.display = 'block'; // Mostrar el elemento
    } else {
        itemCountDisplay.style.display = 'none'; // Ocultar el elemento
    }
}


    function calculateTotal() {
        let total = 0;
        const cartItems = document.querySelectorAll('.boxCarrito');
        cartItems.forEach(item => {
            const priceElement = item.querySelector('.priceCarrito');
            const quantityElement = item.querySelector('.numberQuantityCarrito');
            const price = parseFloat(priceElement.textContent) || 0;
            const quantity = parseInt(quantityElement.value) || 0;
            total += price * quantity;
        });
        const totalDisplay = document.getElementById('totalDisplay');
        if (totalDisplay) {
            totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
        } else {
            // Si el elemento no existe, crearlo
            const newTotalDisplay = document.createElement('div');
            newTotalDisplay.id = 'totalDisplay';
            newTotalDisplay.textContent = `Total: $${total.toFixed(2)}`;
            modalContent.appendChild(newTotalDisplay);
        }
    }

    function addQuantityChangeListeners() {
        const quantityInputs = document.querySelectorAll('.numberQuantityCarrito');
        quantityInputs.forEach(input => {
            input.addEventListener('input', function () {
                const productId = this.closest('.boxCarrito').getAttribute('data-id');
                const newQuantity = parseInt(this.value) || 1;
                updateCartItemQuantity(productId, newQuantity);
                calculateTotal();  // Recalcula el total al cambiar la cantidad
            });
        });
    }

    updateItemCountDisplay();

    function vaciarCarrito() {
    Swal.fire({
        title: "¿Estás seguro de vaciar el carrito?",
        text: "Esta acción eliminará todos los productos del carrito",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, vaciar carrito"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('cart');
            const modalContent = document.querySelector('.boxCarro');
            modalContent.innerHTML = '';
            updateItemCountDisplay();
            calculateTotal();
            Swal.fire({
                title: "Carrito vacío",
                icon: "success",
                text: "Todos los productos han sido eliminados del carrito"
            });
        }
    });
}


    document.querySelectorAll('.comprar-btn').forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.getAttribute('data-id');
            const productName = this.getAttribute('data-name');
            const productPrice = parseFloat(this.getAttribute('data-price')); // Convertir a número
            const productImage = this.getAttribute('data-image');

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let existingProduct = cart.find(item => item.id === productId);

            if (existingProduct) {
                // Si el producto ya está en el carrito, incrementa su cantidad
                existingProduct.quantity++;
                updateCartItemQuantity(productId, existingProduct.quantity);
                 Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Se ha añadido éxito!",
                        showConfirmButton: false,
                        timer: 2000
                    });
            } else {
                // Si el producto no está en el carrito, agrégalo con cantidad 1
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    image: productImage,
                    quantity: 1
                });
                saveCart(cart);
                 Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Se ha añadido éxito!",
                        showConfirmButton: false,
                        timer: 2000
                    });

                // Insertar nuevo elemento en el DOM
                const productHtml = `
                    <div class="boxCarrito" data-id="${productId}">
                        <img src="${productImage}" class="imgCarrito"/>
                        <p class="textCarrito">${productName}</p>
                        <div class="quantityCarrito">
                            <label class="textQuantityCarrito">Cantidad</label>
                            <input type="number" min="1" value="1" class="numberQuantityCarrito"/>
                        </div>
                        <p class="priceCarrito">${productPrice}</p>
                        <button class="remove-btn">Quitar</button>
                    </div>
                `;
                modalContent.insertAdjacentHTML('beforeend', productHtml);

                // Añadir event listener al nuevo botón de quitar
                document.querySelector(`.boxCarrito[data-id="${productId}"] .remove-btn`).addEventListener('click', function () {
                    removeItemFromCart(productId);
                });

                // Añadir event listener al nuevo campo de cantidad
                document.querySelector(`.boxCarrito[data-id="${productId}"] .numberQuantityCarrito`).addEventListener('input', function () {
                    const newQuantity = parseInt(this.value) || 1;
                    updateCartItemQuantity(productId, newQuantity);
                    calculateTotal();  // Recalcula el total al cambiar la cantidad
                });
            }

            updateItemCountDisplay();
            calculateTotal();  // Calcula el total después de agregar un ítem
            //modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', function () {
        modal.style.display = 'none';
        updateItemCountDisplay();
        calculateTotal();  // Calcula el total después de cerrar el modal
    });

    seguirComprandoBtn.addEventListener('click', function () {
        modal.style.display = 'none';
        updateItemCountDisplay();
        calculateTotal();  // Calcula el total después de seguir comprando
    });

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            updateItemCountDisplay();
            calculateTotal();  // Calcula el total después de cerrar el modal con clic afuera
        }
    });

    loadCart();

    // Add event listeners for remove buttons on page load
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function () {
            const productId = this.closest('.boxCarrito').getAttribute('data-id');
            removeItemFromCart(productId);
        });
    });
});
