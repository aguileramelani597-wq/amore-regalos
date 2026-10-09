// ==========================================
// AMORE REGALOS - SCRIPT PRINCIPAL
// ==========================================


// ==========================================
// PRODUCTOS
// ==========================================

const productos = [

    {
        id: 1,
        nombre: "Taza de Cerámica Artesanal",
        precio: 7500,
        categoria: "Tazas",
        imagen: "taza1.jpeg",
        etiqueta: "Popular"
    },

    {
        id: 2,
        nombre: "Taza Corazón",
        precio: 6800,
        categoria: "Tazas",
        imagen: "taza2.jpeg",
        etiqueta: ""
    },

    {
        id: 3,
        nombre: "Taza Personalizada",
        precio: 8200,
        categoria: "Tazas",
        imagen: "taza3.jpeg",
        etiqueta: "Nuevo"
    },

    {
        id: 4,
        nombre: "Taza con Frase",
        precio: 7200,
        categoria: "Tazas",
        imagen: "taza4.jpeg",
        etiqueta: ""
    },

    {
        id: 5,
        nombre: "Oso de Peluche",
        precio: 12500,
        categoria: "Peluches",
        imagen: "peluche1.jpeg",
        etiqueta: "Popular"
    },

    {
        id: 6,
        nombre: "Peluche Osito",
        precio: 14500,
        categoria: "Peluches",
        imagen: "peluche2.jpeg",
        etiqueta: ""
    },

    {
        id: 7,
        nombre: "Peluche Corazón",
        precio: 11000,
        categoria: "Peluches",
        imagen: "peluche3.jpeg",
        etiqueta: "Nuevo"
    },

    {
        id: 8,
        nombre: "Peluche Suave",
        precio: 13500,
        categoria: "Peluches",
        imagen: "peluche4.jpeg",
        etiqueta: ""
    },

    {
        id: 9,
        nombre: "Caja de Regalo",
        precio: 15000,
        categoria: "Regalos",
        imagen: "regalo1.jpeg",
        etiqueta: "Popular"
    },

    {
        id: 10,
        nombre: "Desayuno Sorpresa",
        precio: 18000,
        categoria: "Regalos",
        imagen: "regalo2.jpeg",
        etiqueta: ""
    },

    {
        id: 11,
        nombre: "Box Romántico",
        precio: 22000,
        categoria: "Regalos",
        imagen: "regalo3.jpeg",
        etiqueta: "Nuevo"
    },

    {
        id: 12,
        nombre: "Set Especial",
        precio: 19500,
        categoria: "Regalos",
        imagen: "regalo4.jpeg",
        etiqueta: ""
    },

    {
        id: 13,
        nombre: "Llavero Personalizado",
        precio: 4500,
        categoria: "Accesorios",
        imagen: "accesorio1.jpeg",
        etiqueta: ""
    },

    {
        id: 14,
        nombre: "Pulsera",
        precio: 5500,
        categoria: "Accesorios",
        imagen: "accesorio2.jpeg",
        etiqueta: ""
    },

    {
        id: 15,
        nombre: "Collar",
        precio: 7500,
        categoria: "Accesorios",
        imagen: "accesorio3.jpeg",
        etiqueta: "Popular"
    },

    {
        id: 16,
        nombre: "Llaverito",
        precio: 4000,
        categoria: "Accesorios",
        imagen: "accesorio4.jpeg",
        etiqueta: ""
    },

    {
        id: 17,
        nombre: "Pulsera Especial",
        precio: 6500,
        categoria: "Accesorios",
        imagen: "accesorio5.jpeg",
        etiqueta: ""
    },

    {
        id: 18,
        nombre: "Accesorio Personalizado",
        precio: 8500,
        categoria: "Accesorios",
        imagen: "accesorio6.jpeg",
        etiqueta: "Nuevo"
    }

];


// ==========================================
// VARIABLES
// ==========================================

let carrito = [];
let favoritos = [];

let categoriaActual = "Todos";


// ==========================================
// INICIO
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    cargarCarrito();
    cargarFavoritos();

    mostrarProductos(productos);

    actualizarCarrito();
    actualizarContadorFavoritos();

});


// ==========================================
// MOSTRAR PRODUCTOS
// ==========================================

function mostrarProductos(lista) {

    const contenedor =
        document.getElementById("lista-productos");

    const sinProductos =
        document.getElementById("sin-productos");


    if (!contenedor) {

        console.error(
            "No se encontró #lista-productos"
        );

        return;
    }


    contenedor.innerHTML = "";


    if (lista.length === 0) {

        if (sinProductos) {
            sinProductos.style.display = "block";
        }

        return;

    } else {

        if (sinProductos) {
            sinProductos.style.display = "none";
        }

    }


    lista.forEach(producto => {

        const esFavorito =
            favoritos.includes(producto.id);


        const tarjeta =
            document.createElement("article");


        tarjeta.className = "producto-card";


        tarjeta.innerHTML = `

            <div class="producto-imagen">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                >

                ${
                    producto.etiqueta
                    ?
                    `<span class="etiqueta">
                        ${producto.etiqueta}
                    </span>`
                    :
                    ""
                }

                <button
                    class="btn-favorito ${esFavorito ? "activo" : ""}"
                    onclick="alternarFavorito(${producto.id})"
                    type="button"
                >

                    <i class="${
                        esFavorito
                        ?
                        "fa-solid fa-heart"
                        :
                        "fa-regular fa-heart"
                    }"></i>

                </button>

            </div>


            <div class="producto-info">

                <span class="categoria-producto">
                    ${producto.categoria}
                </span>

                <h3>
                    ${producto.nombre}
                </h3>

                <strong class="precio">
                    $${formatearPrecio(producto.precio)}
                </strong>


                <button
                    class="btn-agregar"
                    onclick="agregarAlCarrito(${producto.id})"
                    type="button"
                >

                    <i class="fa-solid fa-cart-plus"></i>

                    Agregar al carrito

                </button>

            </div>

        `;


        contenedor.appendChild(tarjeta);

    });

}


// ==========================================
// PRECIO
// ==========================================

function formatearPrecio(precio) {

    return Number(precio).toLocaleString("es-AR");

}


// ==========================================
// CARRITO
// ==========================================

function agregarAlCarrito(id) {

    const producto =
        productos.find(p => p.id === id);


    if (!producto) {
        return;
    }


    const existente =
        carrito.find(item => item.id === id);


    if (existente) {

        existente.cantidad++;

    } else {

        carrito.push({

            id: id,

            cantidad: 1

        });

    }


    guardarCarrito();

    actualizarCarrito();


    // ABRIR AUTOMÁTICAMENTE
    abrirCarrito();

}


// ==========================================
// ABRIR CARRITO
// ==========================================

function abrirCarrito() {

    const fondo =
        document.getElementById("fondo-carrito");


    if (!fondo) {

        console.error(
            "No se encontró #fondo-carrito"
        );

        return;

    }


    fondo.classList.add("abierto");

    document.body.style.overflow = "hidden";

}


// ==========================================
// CERRAR CARRITO
// ==========================================

function cerrarCarrito() {

    const fondo =
        document.getElementById("fondo-carrito");


    if (!fondo) {
        return;
    }


    fondo.classList.remove("abierto");

    document.body.style.overflow = "";

}


// ==========================================
// ACTUALIZAR CARRITO
// ==========================================

function actualizarCarrito() {

    const contenedor =
        document.getElementById("productos-carrito");

    const carritoVacio =
        document.getElementById("carrito-vacio");

    const resumen =
        document.getElementById("resumen-carrito");

    const totalElemento =
        document.getElementById("total-carrito");

    const contador =
        document.getElementById("contador-carrito");


    // CONTADOR
    if (contador) {

        const cantidad =
            carrito.reduce(
                (total, item) =>
                    total + item.cantidad,
                0
            );

        contador.textContent = cantidad;

    }


    if (!contenedor) {
        return;
    }


    contenedor.innerHTML = "";


    // CARRITO VACÍO
    if (carrito.length === 0) {

        if (carritoVacio) {
            carritoVacio.style.display = "flex";
        }

        if (resumen) {
            resumen.style.display = "none";
        }

        return;
    }


    // CON PRODUCTOS
    if (carritoVacio) {
        carritoVacio.style.display = "none";
    }

    if (resumen) {
        resumen.style.display = "block";
    }


    let total = 0;


    carrito.forEach(item => {

        const producto =
            productos.find(
                p => p.id === item.id
            );


        if (!producto) {
            return;
        }


        const subtotal =
            producto.precio * item.cantidad;


        total += subtotal;


        const elemento =
            document.createElement("div");


        elemento.className =
            "item-carrito";


        elemento.innerHTML = `

            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
            >


            <div>

                <h4>
                    ${producto.nombre}
                </h4>

                <p>
                    $${formatearPrecio(producto.precio)}
                </p>


                <div class="cantidad">

                    <button
                        type="button"
                        onclick="cambiarCantidad(${producto.id}, -1)"
                    >
                        −
                    </button>

                    <span>
                        ${item.cantidad}
                    </span>

                    <button
                        type="button"
                        onclick="cambiarCantidad(${producto.id}, 1)"
                    >
                        +
                    </button>

                </div>

            </div>


            <button
                class="eliminar"
                type="button"
                onclick="eliminarDelCarrito(${producto.id})"
            >

                <i class="fa-solid fa-trash"></i>

            </button>

        `;


        contenedor.appendChild(elemento);

    });


    if (totalElemento) {

        totalElemento.textContent =
            "$" + formatearPrecio(total);

    }

}


// ==========================================
// CAMBIAR CANTIDAD
// ==========================================

function cambiarCantidad(id, cambio) {

    const item =
        carrito.find(
            producto => producto.id === id
        );


    if (!item) {
        return;
    }


    item.cantidad += cambio;


    if (item.cantidad <= 0) {

        carrito =
            carrito.filter(
                producto => producto.id !== id
            );

    }


    guardarCarrito();

    actualizarCarrito();

}


// ==========================================
// ELIMINAR DEL CARRITO
// ==========================================

function eliminarDelCarrito(id) {

    carrito =
        carrito.filter(
            producto => producto.id !== id
        );


    guardarCarrito();

    actualizarCarrito();

}


// ==========================================
// VACIAR CARRITO
// ==========================================

function vaciarCarrito() {

    carrito = [];

    guardarCarrito();

    actualizarCarrito();

}


// ==========================================
// FAVORITOS
// ==========================================

function alternarFavorito(id) {

    if (favoritos.includes(id)) {

        favoritos =
            favoritos.filter(
                favorito => favorito !== id
            );

    } else {

        favoritos.push(id);

    }


    guardarFavoritos();

    actualizarContadorFavoritos();

    mostrarProductos(
        obtenerProductosActuales()
    );

}


// ==========================================
// CONTADOR FAVORITOS
// ==========================================

function actualizarContadorFavoritos() {

    const contador =
        document.getElementById(
            "contador-favoritos"
        );


    if (contador) {

        contador.textContent =
            favoritos.length;

    }

}


// ==========================================
// MOSTRAR FAVORITOS
// ==========================================

function mostrarFavoritos() {

    const modal =
        document.getElementById(
            "modal-favoritos"
        );


    const lista =
        document.getElementById(
            "lista-favoritos"
        );


    if (!modal || !lista) {
        return;
    }


    lista.innerHTML = "";


    if (favoritos.length === 0) {

        lista.innerHTML = `

            <div class="favoritos-vacio">

                <i class="fa-regular fa-heart"></i>

                <h3>
                    No tienes favoritos todavía
                </h3>

                <p>
                    Tocá el corazón de un producto
                    para agregarlo.
                </p>

            </div>

        `;

    } else {

        favoritos.forEach(id => {

            const producto =
                productos.find(
                    p => p.id === id
                );


            if (!producto) {
                return;
            }


            const item =
                document.createElement("div");


            item.className =
                "item-favorito";


            item.innerHTML = `

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                >


                <div class="item-favorito-info">

                    <h3>
                        ${producto.nombre}
                    </h3>

                    <p>
                        $${formatearPrecio(producto.precio)}
                    </p>

                </div>


                <button
                    class="btn-favorito-carrito"
                    type="button"
                    onclick="agregarAlCarrito(${producto.id})"
                >

                    <i class="fa-solid fa-cart-plus"></i>

                </button>


                <button
                    class="btn-favorito-eliminar"
                    type="button"
                    onclick="alternarFavorito(${producto.id}); mostrarFavoritos();"
                >

                    <i class="fa-solid fa-trash"></i>

                </button>

            `;


            lista.appendChild(item);

        });

    }


    modal.classList.add("activo");

}


// ==========================================
// CERRAR FAVORITOS
// ==========================================

function cerrarFavoritos() {

    const modal =
        document.getElementById(
            "modal-favoritos"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove("activo");

}


// ==========================================
// BUSCAR
// ==========================================

function buscarProductos() {

    const input =
        document.getElementById("buscador");


    if (!input) {
        return;
    }


    const texto =
        input.value
            .toLowerCase()
            .trim();


    const lista =
        productos.filter(producto => {

            return (

                producto.nombre
                    .toLowerCase()
                    .includes(texto)

                ||

                producto.categoria
                    .toLowerCase()
                    .includes(texto)

            );

        });


    mostrarProductos(lista);

}


// ==========================================
// FILTRAR CATEGORÍAS
// ==========================================

function filtrarProductos(categoria, boton) {

    categoriaActual = categoria;


    // Cambiar botón activo

    document
        .querySelectorAll(".categoria")
        .forEach(btn => {

            btn.classList.remove("activa");

        });


    if (boton) {

        boton.classList.add("activa");

    }


    let lista;


    if (categoria === "Todos") {

        lista = productos;

    } else {

        lista =
            productos.filter(
                producto =>
                    producto.categoria === categoria
            );

    }


    mostrarProductos(lista);

}


// ==========================================
// PRODUCTOS ACTUALES
// ==========================================

function obtenerProductosActuales() {

    if (categoriaActual === "Todos") {

        return productos;

    }


    return productos.filter(
        producto =>
            producto.categoria === categoriaActual
    );

}


// ==========================================
// LIMPIAR BUSCADOR
// ==========================================

function limpiarBusqueda() {

    const input =
        document.getElementById("buscador");


    if (input) {
        input.value = "";
    }


    categoriaActual = "Todos";


    document
        .querySelectorAll(".categoria")
        .forEach((boton, indice) => {

            boton.classList.remove("activa");

            if (indice === 0) {
                boton.classList.add("activa");
            }

        });


    mostrarProductos(productos);

}


// ==========================================
// PEDIDO POR WHATSAPP
// ==========================================

function realizarPedido() {

    if (carrito.length === 0) {

        alert(
            "Tu carrito está vacío."
        );

        return;

    }


    let mensaje =
        "Hola Amore Regalos 💕\n\n" +
        "Quiero realizar el siguiente pedido:\n\n";


    let total = 0;


    carrito.forEach(item => {

        const producto =
            productos.find(
                p => p.id === item.id
            );


        if (!producto) {
            return;
        }


        const subtotal =
            producto.precio * item.cantidad;


        total += subtotal;


        mensaje +=
            "• " +
            producto.nombre +
            " x" +
            item.cantidad +
            " - $" +
            formatearPrecio(subtotal) +
            "\n";

    });


    mensaje +=
        "\nTotal: $" +
        formatearPrecio(total);


    const url =
        "https://wa.me/5492646061764?text=" +
        encodeURIComponent(mensaje);


    window.open(
        url,
        "_blank"
    );

}


// ==========================================
// GUARDAR CARRITO
// ==========================================

function guardarCarrito() {

    localStorage.setItem(
        "amoreCarrito",
        JSON.stringify(carrito)
    );

}


// ==========================================
// CARGAR CARRITO
// ==========================================

function cargarCarrito() {

    try {

        const datos =
            localStorage.getItem(
                "amoreCarrito"
            );


        if (datos) {

            carrito =
                JSON.parse(datos);

        }

    } catch (error) {

        carrito = [];

    }

}


// ==========================================
// GUARDAR FAVORITOS
// ==========================================

function guardarFavoritos() {

    localStorage.setItem(
        "amoreFavoritos",
        JSON.stringify(favoritos)
    );

}


// ==========================================
// CARGAR FAVORITOS
// ==========================================

function cargarFavoritos() {

    try {

        const datos =
            localStorage.getItem(
                "amoreFavoritos"
            );


        if (datos) {

            favoritos =
                JSON.parse(datos);

        }

    } catch (error) {

        favoritos = [];

    }

}


// ==========================================
// CERRAR AL HACER CLIC AFUERA
// ==========================================

document.addEventListener("click", function(event) {

    const fondo =
        document.getElementById(
            "fondo-carrito"
        );


    if (!fondo) {
        return;
    }


    if (
        event.target === fondo &&
        fondo.classList.contains("abierto")
    ) {

        cerrarCarrito();

    }

});


// ==========================================
// ESCAPE
// ==========================================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        cerrarCarrito();

        cerrarFavoritos();

    }

});
