class Cart {
    constructor(title,price,imageSrc) {
        this.title = title;
        this.price = price;
        this.imageSrc = imageSrc;
    }
}

class UI {
    static displayItems() {
        const items = Store.getItems();
        console.log(items);
        // const books = StoreBooks;
        // console.log(books);
        items.forEach((item) => {
            UI.addItemToCart(item);
        })

        UI.updateCartTotal();
    }

    static addItemToCart(item) {
        const cartRow = document.createElement('div');
        cartRow.classList.add('cart-row');
        const cartItems = document.querySelector('.cart-items');
        const cartItemsNames = cartItems.querySelector('.cart-item-title');

        const cartRowContents = `
            <div class="cart-item cart-column">
            <img class="cart-item-image" src="${item.imageSrc}" width="100" height="100">
            <span class="cart-item-title">${item.title}</span>
            </div>
            <span class="cart-price cart-column">${item.price}</span>
            <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
            </div>
        `;
        cartRow.innerHTML = cartRowContents;
        cartItems.append(cartRow);
    }

    static removeCartItem(event) {
        if (event.classList.contains('btn-danger')) {
            event.parentElement.parentElement.remove();
        }
        UI.updateCartTotal();
    }

    static quantityChanged(event) {
        if (isNaN(event.value) || event.value <= 0) {
            event.value = 1;
        }
        UI.updateCartTotal();
    }

    static updateCartTotal() {
        const cartItemContainer = document.querySelector('.cart-items');
        const cartRows = cartItemContainer.querySelectorAll('.cart-row');
        let total = 0;

        cartRows.forEach(el => {
            const priceEl = el.querySelector('.cart-price');
            const quantity = el.querySelector('.cart-quantity-input');
            const price = parseFloat(priceEl.innerText.replace('$', ''));
            const newquantity = quantity.value;
            total = total + (price * newquantity);
        })
        
        total = Math.round(total * 100) / 100;
        document.querySelector('.cart-total-price').innerText = '$' + total;
    }
}

class Store {
    static getItems() {
        let items;
        if(localStorage.getItem('items') === null) {
            items = [];
        } else {
            items = JSON.parse(localStorage.getItem('items'));
        }
        return items;
    }

    static addItems(item) {
        const items = Store.getItems();
        console.log(items);
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
        console.log(items);
    }

    static removeItem(price) {
        const items = Store.getItems();
        items.forEach((item, index) => {
          if(item.price === price ) {
            items.splice(index, 1);
          }
        });
        console.log(items);
        localStorage.setItem('items', JSON.stringify(items));

        
      }
}

const addtocart = document.querySelectorAll('.shop-item .shop-item-button');
addtocart.forEach((el, index) => {
    el.addEventListener('click', (e) => {
        const shopitem = el.parentElement.parentElement;
        const title = shopitem.querySelector('.shop-item-price').textContent;
        const price = shopitem.querySelector('.shop-item-title').textContent;
        const img = shopitem.querySelector('.shop-item-image').src;

        const item = new Cart(price,title,img);
        UI.addItemToCart(item);
        UI.updateCartTotal(item);

        Store.addItems(item);
    })
})

UI.displayItems();

const cartItems = document.querySelector('.cart-items');
const btnItme = cartItems.querySelector('.cart-quantity .btn-danger');

// btnItme.forEach(el => {
//     el.addEventListener('click', (e) => {
//         const element = e.target;
//     UI.removeCartItem(el);
//     const price = el.parentElement.previousElementSibling.textContent;
//     })
// })


cartItems.addEventListener('click', (e) => {
    const el = e.target;
    UI.removeCartItem(el);
    const price = el.parentElement.previousElementSibling.textContent;

    console.log(price);

    Store.removeItem(price);
})


// cartItems.addEventListener('change', (ele) => {
//     const element = ele.target;
//     UI.quantityChanged(element);
// })


// Event: Display Books



var qtyinput = cartItems.querySelector('.cart-quantity-input');


    qtyinput.addEventListener('change', (element) => {
        const event = element.target;
        UI.quantityChanged(element);
    })

