document.addEventListener("DOMContentLoaded", () => {

    let productosGlobales = [];

    fetch("https://dummyjson.com/products")
        .then(response => response.json())
        .then(data => {
            productosGlobales = data.products;
            mostrarProductos(productosGlobales);
        })
        .catch(error => console.error("Error al cargar los productos: ", error));

        function mostrarProductos(productos) {
            console.log("Mostrando productos en la web...");
            console.log(productos);
            const resultsContainer = document.getElementById("results");
            resultsContainer.innerHTML="";
        
            productos.forEach(producto =>{
                const productoHTML = `
                <div class="card" style="width: 16.5rem;">
                    <img src="${producto.thumbnail}" class="card-img-top" alt="${producto.title}">
                    <div class="card-body">
                        <h5 class="card-title">${producto.title}</h5>
                        <p class="card-text">${producto.category} - $${producto.price}</p>
                        <button class="btn btn-primary add-to-cart" data-id="${producto.id}"
                        data-price="${producto.price}" data-title="${producto.title}">
                        Añadir al carrito
                        </button>
                    </div>
                `;
        
                resultsContainer.innerHTML+=productoHTML;
            });
        }    

    document.getElementById("apply-filters").addEventListener("click", () => {
        aplicarFiltros(productosGlobales);
    });

    function aplicarFiltros(productos) {
        const precioMin = document.getElementById("precio-min").value;
        const categoria = document.getElementById("categoria").value.toLowerCase();
        const marca = document.getElementById("marca").value.toLowerCase();
    
        const productosFiltrados = productos.filter( producto => {
            return (
                (precioMin === "" || producto.price >= parseFloat(precioMin)) &&
                (categoria === "" || producto.category && producto.category.toLowerCase().includes(categoria)) &&
                (marca === "" || producto.brand && producto.brand.toLowerCase().includes(marca))
            );
        });
    
        mostrarProductos(productosFiltrados);
    }


    let carrito = [];

    document.addEventListener("click",(event) => {
        if (event.target.classList.contains("add-to-cart")) {
            const id = event.target.dataset.id;
            const title = event.target.dataset.title;
            const price = parseFloat(event.target.dataset.price);

            const productoEnCarrito = carrito.find(item => item.id === id);

            if (productoEnCarrito) {
                productoEnCarrito.cantidad++;
            } else {
                carrito.push({id,title,price,cantidad:1});
            }

            actualizarCarrito();
        }
    });


    function actualizarCarrito() {
        const cartList = document.getElementById("cart-list");
        cartList.innerHTML = "";

        carrito.forEach (producto => {
            const itemHTML = `
            <li>${producto.title} - $${producto.price} x ${producto.cantidad}</li>
            `;
            cartList.innerHTML += itemHTML;
        })
    }

    document.getElementById("purchase").addEventListener("click", () => {
        if (carrito.length === 0) {
            Swal.fire("Carrito vacío", "No has añadido productos al carrito.", "warning");
            return;
        }

        const total = carrito.reduce((sum, item) => sum + item.price * item.cantidad, 0);

        Swal.fire({
            title: "Confirmar compra",
            text: `Vas a realizar una compra por valor de $${total.toFixed(2)}. ¿Estás seguro?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Sí, comprar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                carrito = [];
                actualizarCarrito();
                Swal.fire("Compra realizada", "Gracias por tu compra.", "success");
            }
        });
        
    });

});
