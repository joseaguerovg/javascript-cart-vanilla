import Cart from './Cart.js';

const d = document,
    w = window,
    shoppingCart = d.querySelector('.shopping-cart');

const cart = new Cart();

const openCart = () => {
    shoppingCart.classList.add('open-cart');
}

const closeCart = () => {
    shoppingCart.classList.remove('open-cart');
}

const addProductToCart = (element) => {
    console.log(cart.addProduct(element));
    openCart();
}

d.addEventListener("click", (e) => {
    if (e.target.matches(".add-to-cart")) {
        addProductToCart(e);
    }

    if (shoppingCart.classList.contains('open-cart') && !e.target.matches('.add-to-cart')) {
        closeCart();
    }

    if(e.target.matches("#button-cart") || e.target.matches("#button-cart *")){
        openCart();
    }

})

shoppingCart.addEventListener('click', (e) => {
    e.stopPropagation();
});

d.addEventListener("DOMContentLoaded", (e) => {
    const $cartQuantity = d.querySelector('.qty-cart');
    $cartQuantity.textContent = cart.getTotalProducts();
})