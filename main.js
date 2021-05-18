console.log('conectados')


const listado = document.getElementById('items')
const tablaPedido = document.querySelector('.tbody')
const input = tablaPedido.getElementsByClassName('inputCantidad')

// Recuperar desde localStorage
window.onload = function(){
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if(storage){
    carrito = storage;
    mostrarCarrito()
  }
}


let carrito = []

// Recuperar desde localStorage
const crearProducto = (event) => { 
  const button = event.target
  const item = button.closest('.products-container')
  const nombreProducto = item.querySelector('.product-title').textContent;
  const precioProducto = item.querySelector('.prodcut-price').textContent;
  const idProducto = event.target.getAttribute('id')

  const nuevoProducto = {
    id: idProducto,
    title: nombreProducto,
    precio: precioProducto,
    cantidad: 1
  }

  agregarItem(nuevoProducto)

}

// Mostrar los prodcutos desde la "base de datos"
const cargarProductos = () => {
  base.forEach(item => {
      const divPrincipal = document.createElement('div')
      divPrincipal.classList.add('products-container', 'my-3', 'col-4')
      divPrincipal.innerHTML = `
      <img src="${item.imagen}" class="img-fluid" alt="${item.nombre}">
      <div class="card-body shadow-lg">
        <h5 class="product-title">${item.nombre}</h5>
        <p class="prodcut-price">${item.precio}</p>
        <button class="btn btn-primary float-end" id="${item.id}">agregar</button>
      </div>
      `
      listado.appendChild(divPrincipal)
      divPrincipal.querySelector(".btn-primary").addEventListener('click', crearProducto)
  })
}
cargarProductos()

// Agregar items al carro
const agregarItem = (nuevoProducto) => {
  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].id === nuevoProducto.id){
      carrito[i].cantidad ++;
      const valorInput = input[i]
      valorInput.value++;
      valorTotal()
      return null;
    }
  }
  
  carrito.push(nuevoProducto)
  mostrarCarrito()
} 

// Mostrar carrito en el dom
const mostrarCarrito = () => {
  tablaPedido.innerHTML = ''
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('itemsCarrito')
    const contenidoTabla = `
      <td class="productos">
        <h6 class="nombre">${item.title}</h6>
      </td>
      <td>
        <p>${item.precio}</p>
      </td>
      <td>
        <input type="number" min="1" value=${item.cantidad} class="inputCantidad">
          <button class="borrar btn btn-danger">x</button>
      </td>
    `
    tr.innerHTML = contenidoTabla;
    tablaPedido.append(tr)

    console.log(item.cantidad)

    tr.querySelector(".borrar").addEventListener('click', eliminarProducto)
    tr.querySelector(".inputCantidad").addEventListener('change', cantidadProductos)
  })
  valorTotal()
}

// Eliminar producto del carrito
const eliminarProducto = (event) => {
  const buttonDelete = event.target
  const tr = buttonDelete.closest(".itemsCarrito")
  const title = tr.querySelector('.nombre').textContent;
  for(let i=0; i<carrito.length ; i++){

    if(carrito[i].title === title){
      carrito.splice(i, 1)
    }
  }
  tr.remove()
  valorTotal()
}



const cantidadProductos = (event) => {
  const sumarInput  = event.target
  const tr = document.querySelector(".itemsCarrito")
  const title = document.querySelector('.nombre').textContent;
  carrito.forEach(item => {
    if(item.title === title ){
      sumarInput.value < 1 ?  (sumarInput.value = 1) : sumarInput.value;
      item.cantidad = sumarInput.value;

      console.log(item.cantidad)
      valorTotal()
    }
  })
}

// Calcular el valor final
const valorTotal = () => {
  let total = 0;
  const totalCarrito = document.querySelector('.totalCarrito')
  carrito.forEach((item) => {
    total = total + item.precio*item.cantidad
  })
  totalCarrito.innerHTML = `Total $${total}`
  guardarStorage()
}

const guardarStorage = () => {
 return localStorage.setItem('carrito', JSON.stringify(carrito))
}





$(document).ready(function() {

  $('.alert').hide()

  // $('.btn-primary').click( function() {
  //   console.log('añadiste un producto')
  //   $('.alert-success').fadeIn('300')
  //   $('.alert-success').delay(1000).fadeOut(800)

  // })

  // $('.btn-danger').click( function() {
  //   console.log('eliminaste un producto')
  //   $('.alert-warning').fadeIn('300')
  //   $('.alert-warning').delay(1000).fadeOut(800)

  // })

  $('.btn-show').click( () => {
    $('.carro').toggle()
  })

})


