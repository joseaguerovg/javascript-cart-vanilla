import Product from "./Product.js";

export default class Cart{
    constructor(){
        if(localStorage.getItem("shopping-cart")){
            this.products = JSON.parse(localStorage.getItem("shopping-cart"));
        }else{
            this.products = [];
        }
    }

    addProduct(element){
        const newObject = this.createProductObject(element.target.parentElement);
        const elementId = parseInt(element.target.dataset.id);
        const exist = this.existsInCart(elementId);
        if(exist >= 0){
            this.products[exist].qty += 1;
        }else{
            this.products.push(newObject);
        }

        localStorage.setItem("shopping-cart", this.getJson());

        return this.products;
    }

    createProductObject(product){
        const newProduct = new Product(
            parseInt(product.querySelector('.add-to-cart').dataset.id),
            product.querySelector('.name').textContent,
            parseInt(product.querySelector('.price').textContent.replace('$', '').replace('.', '')),
            product.querySelector('.picture img').getAttribute('src'),
            1
        )

        return newProduct;
    }

    getJson(){
        return JSON.stringify(this.products);
    }

    getTotalProducts(){
        if(this.products.length > 0){
            return this.products.reduce((acc, element) => acc + element.qty, 0);
        }

        return 0;
    }

    existsInCart(id){
        return this.products.findIndex(el => el.id === id);
    }

}