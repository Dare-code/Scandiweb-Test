export function GetPriceBySymbol(prices, symbol) {
    return prices.filter(price => {
        return price.currency.symbol === symbol
    })[0]
}

export function IsProductInCart(cart, product) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === product.id) {
            return true;
        }
    }
    return false;
}