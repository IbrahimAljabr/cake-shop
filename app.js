'use strict';

// fake data \\

const fakeData = [
  { id: 1, img: './img/cake-2.jpeg', price: 10.0, name: 'Cake' },
  { id: 2, img: './img/cake-3.jpeg', price: 15.0, name: 'Cake' },
  { id: 3, img: './img/cupcake-2.jpeg', price: 11.0, name: 'Cup Cake' },
  { id: 3, img: './img/cupcake-3.jpeg', price: 20.0, name: 'Cup Cake ' },
  { id: 4, img: './img/doughnut-1.jpeg', price: 30.0, name: 'Doughnut ' },
  { id: 5, img: './img/doughnut-2.jpeg', price: 16.0, name: 'Doughnut Sugar' },
  { id: 6, img: './img/doughnut-3.jpeg', price: 14.0, name: 'Doughnut Choco' },
  { id: 7, img: './img/headerBcg.jpeg', price: 12.0, name: 'Sweet' },
  { id: 8, img: './img/sweets-2.jpeg', price: 10.0, name: 'Sweets' },
  { id: 9, img: './img/sweets-3.jpeg', price: 12.0, name: 'sweet Free' },
];

let cartListItems = [];

// html elements \\

const btnAll = document.getElementById('all');
const btnCake = document.getElementById('cake');
const btnCup = document.getElementById('cupcakes');
const btnSweets = document.getElementById('sweets');
const btnNuts = document.getElementById('dohghnuts');
const btnSearch = document.getElementById('btn-search');
const txtSearch = document.getElementById('txt-search');
const btnCart = document.getElementById('btn-cart');
const cartList = document.getElementById('cart-list');
const btnClear = document.getElementById('btn-clear');
const btnMenu = document.getElementById('btn-menu');
const menuList = document.getElementById('menu-list');

let listNumber = document.getElementById('nav-items');
let listPrice = document.getElementById('cart-price');
let listPriceTotal = document.getElementById('cart-total-price');

//first time render cards \\

const renderData = (data, idx) => {
  const root = document.getElementById('items');

  while (root.hasChildNodes()) {
    root.removeChild(root.firstChild);
  }

  data.map((item, index) => {
    const card = document.createElement('div');
    const cardImg = document.createElement('div');
    const cardText = document.createElement('div');
    const img = document.createElement('img');
    const price = document.createElement('p');
    const name = document.createElement('p');
    const shipping = document.createElement('span');
    const cartButton = document.createElement('button');

    card.setAttribute('class', 'card');
    cardImg.setAttribute('class', 'card-img');
    cardText.setAttribute('class', 'card-text');
    cartButton.setAttribute('class', 'btn-span');
    cartButton.setAttribute('id', item.id);

    root.append(card);
    card.append(cardImg);
    card.append(cardText);
    cardImg.append(img);
    cardImg.append(shipping);
    shipping.append(cartButton);
    cardText.append(name);
    cardText.append(price);
    cartButton.innerHTML = ' <i class="fas fa-shopping-cart icon"></i>';

    img.src = item.img;
    name.innerHTML = item.name;
    price.innerHTML = `$ ${item.price}`;
  });
};
renderData(fakeData);

// render the data in cart \\

const renderCartData = (item) => {
  if (!item.id) {
    cartListItems = [...item];
  } else {
    cartListItems.push({ ...item });
  }
  const root = document.getElementById('cart-add-items');

  while (root.hasChildNodes()) {
    root.removeChild(root.firstChild);
  }
  let totalPrice = 0;
  cartListItems?.map((value, index) => {
    totalPrice += value.price;
    value.elementId = index;
    const card = document.createElement('div');
    const cardDiv = document.createElement('div');
    const cardImg = document.createElement('img');
    const cardText = document.createElement('div');
    const cartButton = document.createElement('button');
    const cartName = document.createElement('p');
    const cartPrice = document.createElement('p');

    card.setAttribute('class', 'card-cart');
    cardImg.setAttribute('class', 'card-cart-img');
    cardDiv.setAttribute('class', 'card-div-img');
    cardText.setAttribute('class', 'card-cart-text');
    cartButton.setAttribute('class', 'btn-delete');
    cartButton.setAttribute('id', `card-delete-${index}`);

    root.append(card);
    card.append(cardDiv);
    cardDiv.append(cardImg);
    card.append(cardText);
    cardText.append(cartName);
    cardText.append(cartPrice);
    card.append(cartButton);

    cardImg.src = value.img;
    cartName.innerHTML = value.name;
    cartPrice.innerHTML = `$ ${value.price}`;
    cartButton.innerHTML = '<i class="fas fa-trash"></i>';
  });
  listNumber.innerHTML = `${cartListItems.length} Items`;
  listPriceTotal.innerHTML = `$ ${totalPrice}`;
  listPrice.innerHTML = `$ ${totalPrice}`;
};

// buttons for filters \\

btnAll.onclick = () => {
  renderData(fakeData);
};
btnCake.onclick = () => {
  let cake = fakeData.filter((item) => {
    return item.name.toUpperCase().includes('CAKE');
  });
  renderData(cake);
};
btnCup.onclick = () => {
  let cupcake = fakeData.filter((item) => {
    return item.name.toUpperCase().includes('CUP');
  });
  renderData(cupcake);
};
btnSweets.onclick = () => {
  let sweets = fakeData.filter((item) => {
    return item.name.toUpperCase().includes('SWEET');
  });
  renderData(sweets);
};
btnNuts.onclick = () => {
  let nuts = fakeData.filter((item) => {
    return item.name.toUpperCase().includes('NUT');
  });
  renderData(nuts);
};
btnSearch.onclick = () => {
  let search = [];
  fakeData.map((item) => {
    if (item.name.toUpperCase().search(txtSearch.value.toUpperCase()) >= 0) {
      search.push(item);
    }
  });
  renderData(search);
};
txtSearch.onchange = () => {
  let search = [];
  fakeData.map((item) => {
    if (item.name.toUpperCase().search(txtSearch.value.toUpperCase()) >= 0) {
      search.push(item);
    }
  });
  renderData(search);
};
btnClear.onclick = () => {
  renderCartData([]);
};

//  cart  \\
let displayCart = true;
btnCart.onclick = () => {
  if (displayCart) {
    cartList.style.transform = 'rotateY(1turn)';
    cartList.style.right = '0';
    cartList.style.width = '20rem';
    setTimeout(() => {
      cartList.style.position = 'absolute';
    }, 1000);
    displayCart = !displayCart;
  } else {
    cartList.style.transform = 'rotateY(0turn)';
    cartList.style.right = '-20rem';
    cartList.style.width = '0';
    cartList.style.position = 'fixed';
    displayCart = !displayCart;
  }
};

// menu \\

let displayMenu = true;
btnMenu.onclick = () => {
  if (displayMenu) {
    menuList.style.height = '10rem';
    displayMenu = !displayMenu;
  } else {
    menuList.style.height = '0';
    displayMenu = !displayMenu;
  }
};

// add to cart \\

addEventListener('click', (e) => {
  if (e.target.parentElement.id - 1 >= 0) {
    renderCartData(fakeData[e.target.parentElement.id - 1]);
    alert('Item Added To The Cart');
  }
});

// remove from cart \\

addEventListener('click', (e) => {
  if (e.target.parentElement.id.includes('card-delete-')) {
    let index = e.target.parentElement.id.charAt(e.target.parentElement.id.length - 1);
    cartListItems = cartListItems.filter((item, idx) => {
      if (index != item.elementId) {
        return item;
      }
    });
    renderCartData(cartListItems);
  }
});
