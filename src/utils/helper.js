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
  cart.map((product) => {
    return (total += product.quantity);
  });
  return total;
}

export function ShouldUpdateQuantity(cart, product) {
  let shouldUpdate = -1;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === product.id) {
      if (
        cart[i].selectedAttributes &&
        product.selectedAttributes &&
        cart[i].selectedAttributes.length === product.selectedAttributes.length
      ) {
        const keys = Object.keys(cart[i].selectedAttributes);
        for (let j = 0; j < keys.length; j++) {
          if (
            cart[i].selectedAttributes[keys[j]] &&
            product.selectedAttributes[keys[j]] &&
            cart[i].selectedAttributes[keys[j]].option ===
            product.selectedAttributes[keys[j]].option
          ) {
            return i;
          }
        }
      }
    }
  }
  return shouldUpdate;
}

export function getDefaultAttributesForProduct(product) {
  const attributes = {};
  product.attributes &&
    product.attributes.map((attributesGroup) => {
      if (attributesGroup.items && attributesGroup.items.length) {
        attributes[attributesGroup.name] = {
          option: attributesGroup.items[0].value,
          type: attributesGroup.type,
        };
      }
      return false;
    });

  return attributes;
}
