const menu = document.getElementById('menu')
const cartBtn = document.getElementById('cart-btn')
const cartModal = document.getElementById('Cart')
const cartItems = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const concluirBtn = document.getElementById('finalizar-btn')
const closeBtn = document.getElementById('close-btn')
const cartCounter = document.getElementById('cart-count')
const addressInput = document.getElementById('address')

let cart = []

// Abre o carrinho
cartBtn.addEventListener('click', function() {
    cartModal.style.display = 'flex'
})

// Fecha o carrinho
cartModal.addEventListener('click', function(evt) {
    if(evt.target === cartModal){
        cartModal.style.display = 'none'
    }
})

closeBtn.addEventListener('click', function() {
    cartModal.style.display = 'none'
})

menu.addEventListener('click', function(evt) {
    let parentButton = evt.target.closest('.Pedir')
    if(parentButton){
        const nome = parentButton.getAttribute('data-name')
        const preço = parseFloat(parentButton.getAttribute('data-price'))

        // adicionar no carrinho
        addCart(nome, preço)

    }
})

function addCart(nome, preço) {

    const itenExt = cart.find(item => item.nome === nome)

    if(itenExt){
        itenExt.quantidade += 1
        return
    }
    cart.push({
        nome,
        preço,
        quantidade: 1
    })
}

