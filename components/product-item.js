// product-item.js

class ProductItem extends HTMLElement {
  constructor(id, imageSrc, title, price, inCart) {
    super();
    this.id = id;
    this.imageSrc = imageSrc;
    this.title = title;
    this.price = price;
    this.inCart = inCart;

    // shadow root
    this.attachShadow({mode: 'open'});

    // create new list element this product, set class name
    const li = document.createElement('li');
    li.setAttribute('class', 'product');

    // create image for this product, set src & alt
    const img = document.createElement('img');
    img.src = this.imageSrc;
    img.alt = this.title;
    li.appendChild(img);

    // create title for this product
    const pTitle = document.createElement('p');
    pTitle.setAttribute('class', 'title');
    pTitle.textContent = this.title;
    li.appendChild(pTitle);

    // create price for this product
    const pPrice = document.createElement('p');
    pPrice.setAttribute('class', 'price');
    pTitle.textContent = this.price;
    li.appendChild(pPrice);

    // create button for this product
    const button = document.createElement('button');

    // update button text based on whether already in cart
    if (this.inCart == false) {
      button.textContent = "Add to Cart";
    }
    else {
      button.textContent = "Remove from Cart";
    }

    // number of items in cart
    let cartCount = document.getElementById("cart-count");

    button.addEventListener("click", () => {
      // cart from local storage
      let cart = localStorage.getItem('cart');
      let cartObj = JSON.parse(cart);

      if (button.textContent == "Add to Cart") {
        // change button title 
        button.textContent = "Remove from Cart";

        // increment cart count
        let newCartCount = Number(cartCount.textContent) + 1;
        cartCount.textContent = newCartCount;

        // add item to the cart
        cartObj.push(this.id);

        // alert that item was added
        alert('Added to Cart!')
      }
      else {
        // change button title
        button.textContent = "Add to Cart";

        // decrement cart count
        let newCartCount = Number(cartCount.textContent) - 1;
        cartCount.textContent = newCartCount;

        // remove item from the cart
        for (let i = 0; i < cartObj.length; i++) {
          if (Number(cartObj[i]) === Number(this.id)) {
            cartObj.splice(i, 1);
          }
        }
      }

      // update cart in local storage
      localStorage.setItem('cart', JSON.stringify(cartObj));
    });

    // apply external styles to shadow dom
    // attach create element to the shadow dom
    const linkElem = document.createElement('link');
    linkElem.rel = 'stylesheet';
    linkElem.href = './styles/styles.css';
    this.shadowRoot.appendChild(linkElem);

    // add button to product item
    li.appendChild(button);

    // append to shadow root
    this.shadowRoot.appendChild(li);
  }
}

customElements.define('product-item', ProductItem);