// Script.js

window.addEventListener('DOMContentLoaded', () => {
  // if cart not aleady in local storage, create it
  if (localStorage.getItem('cart') === null) {
    let cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // if items not already in local storage, add, create items
  if (localStorage.getItem('items') === null) {
    fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => localStorage.setItem('items', JSON.stringify(data)))
    .then(createItems());
  }
  // if items already in local storage, just create items
  else {
    createItems();
  }
});

function createItems() {
  // get the items
  const items = localStorage.getItem('items');
  const itemsObj = JSON.parse(items);

  // get cart from local storage
  const cart = localStorage.getItem('cart');
  const cartObj = JSON.parse(cart);

  // update cart size based on cart in local storage
  const cartSize = document.getElementById("cart-count");
  cartSize.textContent = Number(cartObj.length);

  // product list
  const ul = document.getElementById("product-list");

  for (let i = 0; i < itemsObj.length; i++) {
    // check whether item is already in cart from before
    let inCart = false;
    for (let j = 0; j < cartObj.length; j++) {
      if (Number(cartObj[j]) === Number(itemsObj[i].id)) {
        inCart = true;
        break;
      }
    }    

    // create new product for each item, appends to product list
    let productItem = new ProductItem(itemsObj[i].id, itemsObj[i].image, itemsObj[i].title, itemsObj[i].price, inCart); 

    // add newly created product item to product list
    ul.appendChild(productItem);
  } 
}