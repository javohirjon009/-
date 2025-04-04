document.addEventListener("DOMContentLoaded", () => {
  const catalogContainer = document.querySelector(".catalog-content");

  const localProducts = [
      {
          href: "./product.html",
          image: "images/dorem.png",
          alt: "Dorelli product",
          price: "139.99 ₽",
          title: "Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»",
          rating: 5,
      },
      {
          href: "./product.html",
          image: "images/yogurt.png",
          alt: "Dorelli product",
          price: "69,99 ₽",
          title: "Молоко ПРОСТОКВАШИНО паст. питьевое цельное",
          rating: 5,
      },
      {
          href: "./product.html",
          image: "images/moloko.png",
          alt: "Dorelli product",
          price: "77,99 ₽",
          title: "Молоко сгущенное РОГАЧЕВ Егорка, цельное с сахаром...",
          rating: 5,
      }
  ];

  catalogContainer.innerHTML = localProducts.map(product => `
      <div class="product-card">
          <a href="${product.href}">
              <img src="${product.image}" alt="${product.alt}" class="product-image">
          </a>
          <h3 class="product-title">${product.title}</h3>
          <p class="product-price">${product.price}</p>
          <button class="add-to-cart">Добавить в корзину</button>
      </div>
  `).join("");

  fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(apiProducts => {
          const apiProductsHtml = apiProducts.map(product => `
              <div class="product-card">
                  <a href="./product.html">
                      <img src="${product.image}" alt="${product.title}" class="product-image">
                  </a>
                  <h3 class="product-title">${product.title}</h3>
                  <p class="product-price">${product.price} ₽</p>
                  <button class="add-to-cart">Добавить в корзину</button>
              </div>
          `).join("");

          catalogContainer.innerHTML += apiProductsHtml; 
      })
      .catch(error => console.error("API-dan mahsulotlarni yuklashda xatolik:", error));
});
