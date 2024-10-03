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
    atualizarCart()
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

    if (itenExt){
        itenExt.quantidade += 1
        return
    } else{
      cart.push({
        nome,
        preço,
        quantidade: 1
      })
    }
    atualizarCart()
}

// Atualizar carrinho

function atualizarCart() {
    cartItems.innerHTML = ''
    let total = 0

    cart.forEach(item => {
        const criarItem = document.createElement('div')
        criarItem.classList.add('estilo-cart')

        criarItem.innerHTML = `
        <div>
          <div>
            <p>${item.nome}</p>
            <p>(${item.quantidade})</p>
            <p>R$ ${item.preço.toFixed(2)}</p>
          </div>
          <div>
            <button class="remove-btn" data-name="${item.nome}">Remover</button>
          </div>
        </div>`

        total += item.preço * item.quantidade

        cartItems.appendChild(criarItem)
    })

    cartTotal.textContent = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    cartCounter.innerHTML = cart.length
}

cartItems.addEventListener('click', function (evt) {
    if(evt.target.classList.contains('remove-btn')){
        const nome = evt.target.getAttribute('data-name')

        removeCart(nome)
    }
})

function removeCart(nome) {
    const index = cart.findIndex(item => item.nome === nome)

    if(index !== -1) {
        const item = cart[index]

        if(item.quantidade > 1) {
            item.quantidade -= 1
            atualizarCart()
            return
        }
        cart.splice(index, 1)
        atualizarCart()
    }
}


