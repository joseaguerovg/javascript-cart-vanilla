import Cart from './Cart.js';
import Product from './Product.js';
import {formatPrice} from './helpers.js';

const d = document,
    w = window,
    shoppingCart = d.querySelector('.shopping-cart');

const cart = new Cart();

const UICartProducts = () => {
    const $productsCart = d.getElementById('products-cart');
    const $totalPrices = d.querySelector('.total-cart-checkout .total');
    if(cart.getTotalProducts() == 0){
        $productsCart.innerHTML = `<h4>No hay productos agregados.</h4>`;
    }else{
        const products = cart.getProductsStorage();

        const $fragment = d.createDocumentFragment();

        $productsCart.innerHTML = '';

        products.forEach((product) => {
            const $itemRow = d.createElement('div');
            $itemRow.classList.add('item-row');
            $itemRow.innerHTML = `
            <div class="picture">
                <img src="${product.image}">
            </div>

            <div class="info-actions">
                <div class="name">${product.name}</div>
                <div class="price">$${formatPrice(product.price)}</div>

                <div class="box-qty">
                    <button type="button" class="remove-qty">-</button>
                    <span class="qty">${product.qty}</span>
                    <button type="button" class="add-qty">+</button>
                </div>
            </div>
            `;

            $fragment.appendChild($itemRow);

        })

        $productsCart.appendChild($fragment);
    }

    $totalPrices.textContent = `Total: $${cart.getTotalPricesList()}`;
}

const openCart = () => {
    shoppingCart.classList.add('open-cart');
    UICartProducts();
}

const closeCart = () => {
    shoppingCart.classList.remove('open-cart');
}

const getTotalCartItems = () => {
    const $cartQuantity = d.querySelector('.qty-cart');
    $cartQuantity.textContent = cart.getTotalProducts();
}

const addProductToCart = (element) => {
    cart.addProduct(element);
    getTotalCartItems();
    UICartProducts();
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
    getTotalCartItems();
    UICartProducts();
})