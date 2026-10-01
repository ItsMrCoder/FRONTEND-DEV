let products = [
    {
        name: 'Iphone 18',
        price: 3000000000,
        category: "Electronics",
        img: './item-1.png'
    },
    {
        name: 'BolaPSD',
        price: 1200000,
        category: "Fashion",
        img: "./item-2.png"
    },
    {
        name: 'Gucci Bag',
        price: 60000,
        category: "Bags",
        img: "./item-3.png"
    },
];

let productContainer = document.querySelector('#product')

products.forEach((product, index)=>{
    productContainer.innerHTML += `
    <div class = "product-card">
        <h2>${product['name']}</h2>
        <p>${product['price']}</p>
        <p>${product['category']}</p>
        <p><img src="${product['img']}" alt="${product['name']}"></p> 
        <button> Buy Now </button>
    </div>
    `
})    
number = 0
number += 1