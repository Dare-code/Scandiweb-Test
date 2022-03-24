export function GetPriceBySymbol(prices, symbol) {
    return prices.filter((price) => {
        return price.currency.symbol === symbol;
    })[0];
}

export function IsProductInCart(cart, product) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === product.id) {
            return true;
        }
    }
    return false;
}
export function GetProductsTotalQuantityFromCart(cart) {
    let total = 0;
    cart.map(product => {
        total += product.quantity;
    })
    return total;
}

export function ShouldUpdateQuantity(cart, product) {
    let shouldUpdate = -1;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === product.id) {
            if (JSON.stringify(cart[i].selectedAttributes) === (JSON.stringify(product.selectedAttributes))) {
                shouldUpdate = i;
            } 
        }
    }
    return shouldUpdate;
}