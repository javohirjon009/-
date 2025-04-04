

document.addEventListener("DOMContentLoaded", () => {
  const catalogContainer = document.querySelector(".catalog-content");
  const categoriesGrid = document.querySelector(".categories-grid");
console.log(document.querySelector(".catalog-content"));
console.log(document.querySelector(".categories-grid"));


  fetch("https://fakestoreapi.com/products")
      .then(response => response.json())
      .then(products => {
          catalogContainer.innerHTML = products.map(product => `
              <div class="product-card">
                  <img src="${product.image}" alt="${product.title}" class="product-image">
                  <h3 class="product-title">${product.title}</h3>
                  <p class="product-price">$${product.price}</p>
                  <button class="add-to-cart">Добавить в корзину</button>
              </div>
          `).join("");
      })
      .catch(error => console.error("Mahsulotlarni yuklashda xatolik: ", error));

  const categories = [
      { id: 1, name: "Молоко, сыр, яйца", image: "./img/img.png" },
      { id: 2, name: "Хлеб", image: "./img/img (1).png" },
      { id: 3, name: "Фрукты и овощи", image: "./img/img (2).png" },
      { id: 4, name: "Замороженные продукты", image: "./img/img (3).png" },
      { id: 5, name: "Напитки", image: "./img/img (4).png" }
  ];

  categoriesGrid.innerHTML = categories.map(category => `
      <a href="#" class="category-item">
          <div class="category-image">
              <img src="${category.image}" alt="${category.name}">
              <div class="category-overlay"></div>
              <h2 class="category-title">${category.name}</h2>
          </div>
      </a>
  `).join("");
});
