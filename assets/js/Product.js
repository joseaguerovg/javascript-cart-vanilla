export default class Product {
    constructor(id, name, price, image, qty){
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.qty = qty;
    }

    formatPrice(){
        const formatted = new Intl.NumberFormat('es-CH').format(this.price);
        return `$${formatted}`;
    }

}