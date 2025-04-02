// Simulated database
const categories = [
    {
      id: 1,
      name: "Молоко, сыр, яйцо",
      slug: "dairy",
      image: "https://via.placeholder.com/300x200"
    },
    {
      id: 2,
      name: "Хлеб",
      slug: "bread",
      image: "https://via.placeholder.com/300x200"
    },
    {
      id: 3,
      name: "Фрукты и овощи",
      slug: "fruits",
      image: "https://via.placeholder.com/300x200"
    },
    {
      id: 4,
      name: "Замороженные продукты",
      slug: "frozen",
      image: "https://via.placeholder.com/300x200"
    },
    {
      id: 5,
      name: "Напитки",
      slug: "beverages",
      image: "https://via.placeholder.com/300x200"
    },
    {
      id: 6,
      name: "Кондитерские изделия",
      slug: "confectionery",
      image: "https://via.placeholder.com/300x200"
    },
    {
      id: 7,
      name: "Чай, кофе",
      slug: "tea-coffee",
      image: "https://via.placeholder.com/300x200"
    },
    {
      id: 8,
      name: "Бакалея",
      slug: "grocery",
      image: "https://via.placeholder.com/300x200"
    },
    {
      id: 9,
      name: "Здоровое питание",
      slug: "healthy",
      image: "https://via.placeholder.com/300x200"
    }
  ];
  
  const products = [
    {
      id: 1,
      name: "Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»",
      price: 77.99,
      oldPrice: 100.5,
      image: "https://via.placeholder.com/200x200",
      category: "Молоко, сыр, яйцо",
      categoryId: 1,
      rating: 4.5,
      reviewCount: 12,
      brand: "ДЕСНА-ПОЛЕСЬЕ",
      country: "Россия",
      packaging: "180 г"
    },
    {
      id: 2,
      name: "Масло ПРОСТОКВАШИНО сливочное в/с 82% фольга без змж, Россия, 180 г",
      price: 192.69,
      oldPrice: null,
      image: "https://via.placeholder.com/200x200",
      category: "Молоко, сыр, яйцо",
      categoryId: 1,
      rating: 4.8,
      reviewCount: 32,
      brand: "ПРОСТОКВАШИНО",
      country: "Россия",
      packaging: "180 г"
    },
    {
      id: 3,
      name: "Молоко сгущенное РОГ ИЗОБИЛИЯ Варёное цельное с сахаром, 370 г",
      price: 77.99,
      oldPrice: 108.99,
      image: "https://via.placeholder.com/200x200",
      category: "Молоко, сыр, яйцо",
      categoryId: 1,
      rating: 4.2,
      reviewCount: 8,
      brand: "РОГ ИЗОБИЛИЯ",
      country: "Россия",
      packaging: "370 г"
    },
    {
      id: 4,
      name: "Колбаса сырокопченая МИРАТОРГ Салями Экстра, нарезка, 100 г",
      price: 44.5,
      oldPrice: null,
      image: "https://via.placeholder.com/200x200",
      category: "Мясо, птица, колбаса",
      categoryId: 10,
      rating: 4.0,
      reviewCount: 5,
      brand: "МИРАТОРГ",
      country: "Россия",
      packaging: "100 г"
    },
    {
      id: 5,
      name: "Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»",
      price: 159.99,
      oldPrice: null,
      image: "https://via.placeholder.com/200x200",
      category: "Мясо, птица, колбаса",
      categoryId: 10,
      rating: 4.7,
      reviewCount: 15,
      brand: "ДЕСНА-ПОЛЕСЬЕ",
      country: "Россия",
      packaging: "300 г"
    },
    {
      id: 6,
      name: "Комбайн КЗС-1218 «ДЕСНА-ПОЛЕСЬЕ GS12»",
      price: 49.39,
      oldPrice: null,
      image: "https://via.placeholder.com/200x200",
      category: "Молоко, сыр, яйцо",
      categoryId: 1,
      rating: 4.3,
      reviewCount: 9,
      brand: "ДЕСНА-ПОЛЕСЬЕ",
      country: "Россия",
      packaging: "930 мл"
    }
  ];
  
  // Cart Context
  class Cart {
    constructor() {
      this.items = [];
      this.loadFromLocalStorage();
      this.updateUI();
    }
  
    loadFromLocalStorage() {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          this.items = JSON.parse(savedCart);
        } catch (error) {
          console.error('Failed to parse cart from localStorage:', error);
          this.items = [];
        }
      }
    }
  
    saveToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
  
    getItemById(productId) {
      return this.items.find(item => item.productId === productId);
    }
  
    addItem(productId, quantity = 1) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            const product = products.find(p => p.id === productId);
            if (!product) {
              throw new Error('Product not found');
            }
  
            const existingItem = this.getItemById(productId);
            if (existingItem) {
              existingItem.quantity += quantity;
            } else {
              this.items.push({
                productId,
                quantity,
                product
              });
            }
  
            this.saveToLocalStorage();
            this.updateUI();
            resolve();
          } catch (error) {
            console.error('Error adding to cart:', error);
            reject(error);
          }
        }, 300);
      });
    }
  
    removeItem(productId) {
      this.items = this.items.filter(item => item.productId !== productId);
      this.saveToLocalStorage();
      this.updateUI();
    }
  
    updateQuantity(productId, quantity) {
      if (quantity <= 0) {
        this.removeItem(productId);
        return;
      }
  
      const item = this.getItemById(productId);
      if (item) {
        item.quantity = quantity;
        this.saveToLocalStorage();
        this.updateUI();
      }
    }
  
    getTotalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    }
  
    getTotalPrice() {
      return this.items.reduce((total, item) => {
        return total + (item.product.price * item.quantity);
      }, 0);
    }
  
    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
      this.updateUI();
    }
  
    updateUI() {
      const counter = document.querySelector('.cart-counter');
      if (counter) {
        const totalItems = this.getTotalItems();
        counter.textContent = totalItems;
        counter.style.display = totalItems > 0 ? 'flex' : 'none';
      }
    }
  }
  
  // Favorites Context
  class Favorites {
    constructor() {
      this.items = [];
      this.loadFromLocalStorage();
      this.updateUI();
    }
  
    loadFromLocalStorage() {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        try {
          this.items = JSON.parse(savedFavorites);
        } catch (error) {
          console.error('Failed to parse favorites from localStorage:', error);
          this.items = [];
        }
      }
    }
  
    saveToLocalStorage() {
      localStorage.setItem('favorites', JSON.stringify(this.items));
    }
  
    addItem(productId) {
      if (!this.items.includes(productId)) {
        this.items.push(productId);
        this.saveToLocalStorage();
        this.updateUI();
      }
    }
  
    removeItem(productId) {
      this.items = this.items.filter(id => id !== productId);
      this.saveToLocalStorage();
      this.updateUI();
    }
  
    toggleItem(productId) {
      if (this.items.includes(productId)) {
        this.removeItem(productId);
      } else {
        this.addItem(productId);
      }
    }
  
    isFavorite(productId) {
      return this.items.includes(productId);
    }
  
    updateUI() {
      const counter = document.querySelector('.favorites-counter');
      if (counter) {
        const totalItems = this.items.length;
        counter.textContent = totalItems;
        counter.style.display = totalItems > 0 ? 'flex' : 'none';
      }
    }
  }
  
  // Initialize cart and favorites
  const cart = new Cart();
  const favorites = new Favorites();
  
  // Helper functions
  function formatCurrency(price) {
    return price.toFixed(2) + ' ₽';
  }
  
  function calculateDiscountPercentage(oldPrice, newPrice) {
    return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
  }
  
  function displayStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
  
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push('<svg class="star-icon" width="16" height="16" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor"/></svg>');
      } else if (i === fullStars && hasHalfStar) {
        stars.push('<svg class="star-icon" width="16" height="16" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor" opacity="0.5"/></svg>');
      } else {
        stars.push('<svg class="star-icon" width="16" height="16" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor" opacity="0.2"/></svg>');
      }
    }
    
    return stars.join('');
  }
  
  // DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    // Load categories on main page
    const categoryGrid = document.getElementById('categoryGrid');
    if (categoryGrid) {
      loadCategories(categoryGrid);
    }
  
    // Check if we're on a category page
    const categorySlug = new URLSearchParams(window.location.search).get('category');
    if (categorySlug) {
      loadCategoryPage(categorySlug);
    }
  
    // Check if we're on a product page
    const productId = new URLSearchParams(window.location.search).get('product');
    if (productId) {
      loadProductPage(parseInt(productId));
    }
  
    // Check if we're on the cart page
    if (window.location.pathname.includes('cart.html')) {
      loadCartPage();
    }
  
    // Check if we're on the favorites page
    if (window.location.pathname.includes('favorites.html')) {
      loadFavoritesPage();
    }
  });
  
  // Function to load categories
  function loadCategories(container) {
    setTimeout(() => {
      container.innerHTML = '';
      
      categories.forEach(category => {
        const categoryElement = document.createElement('a');
        categoryElement.href = `category.html?category=${category.slug}`;
        categoryElement.className = 'category-item';
        categoryElement.innerHTML = `
          <img src="${category.image}" alt="${category.name}" class="category-image">
          <div class="category-overlay"></div>
          <h3 class="category-name">${category.name}</h3>
        `;
        container.appendChild(categoryElement);
      });
    }, 800);
  }
  
  // Function to load category page
  function loadCategoryPage(categorySlug) {
    const category = categories.find(c => c.slug === categorySlug);
    if (!category) {
      window.location.href = 'index.html';
      return;
    }
  
    document.title = `${category.name} - Северяночка`;
    
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
      pageTitle.textContent = category.name;
    }
  
    const breadcrumbs = document.querySelector('.breadcrumbs');
    if (breadcrumbs) {
      breadcrumbs.innerHTML = `
        <span>Главная</span>
        <span>&gt;</span>
        <span>Каталог</span>
        <span>&gt;</span>
        <span>${category.name}</span>
      `;
    }
  
    const productsContainer = document.getElementById('productGrid');
    if (productsContainer) {
      loadProducts(productsContainer, category.id);
    }
  }
  
  // Function to load products
  function loadProducts(container, categoryId) {
    // Get filter values
    const minPrice = parseFloat(document.getElementById('minPrice')?.value || 0);
    const maxPrice = parseFloat(document.getElementById('maxPrice')?.value || 1000);
  
    // Filter products
    let filteredProducts = products.filter(product => product.categoryId === categoryId);
    
    if (!isNaN(minPrice)) {
      filteredProducts = filteredProducts.filter(product => product.price >= minPrice);
    }
    
    if (!isNaN(maxPrice)) {
      filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    }
  
    setTimeout(() => {
      container.innerHTML = '';
      
      if (filteredProducts.length === 0) {
        container.innerHTML = `
          <div class="no-products">
            <h3>Товары не найдены</h3>
            <p>Попробуйте изменить параметры фильтрации</p>
          </div>
        `;
        return;
      }
      
      filteredProducts.forEach(product => {
        const discountPercentage = product.oldPrice 
          ? calculateDiscountPercentage(product.oldPrice, product.price)
          : 0;
        
        const isFavorite = favorites.isFavorite(product.id);
        
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
          <div class="product-favorite" data-product-id="${product.id}">
            <svg class="favorite-icon ${isFavorite ? 'active' : ''}" width="20" height="20" viewBox="0 0 24 24">
              <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" />
            </svg>
          </div>
          ${discountPercentage > 0 ? `<div class="product-discount">-${discountPercentage}%</div>` : ''}
          <a href="product.html?product=${product.id}" class="product-image">
            <img src="${product.image}" alt="${product.name}">
          </a>
          <div class="product-info">
            <div class="product-price">
              <span class="current-price">${formatCurrency(product.price)}</span>
              ${product.oldPrice ? `<span class="old-price">${formatCurrency(product.oldPrice)}</span>` : ''}
            </div>
            <h3 class="product-name">
              <a href="product.html?product=${product.id}">${product.name}</a>
            </h3>
            <div class="product-rating">
              <div class="rating-stars">
                ${displayStars(product.rating)}
              </div>
              <span class="review-count">${product.reviewCount} отзывов</span>
            </div>
          </div>
          <button class="add-to-cart" data-product-id="${product.id}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z" fill="currentColor"/>
            </svg>
            В корзину
          </button>
        `;
        container.appendChild(productElement);
        
        // Add event listeners
        const addToCartBtn = productElement.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', function() {
          const productId = parseInt(this.dataset.productId);
          addToCartBtn.textContent = 'Добавление...';
          addToCartBtn.disabled = true;
          
          cart.addItem(productId)
            .then(() => {
              addToCartBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z" fill="currentColor"/>
                </svg>
                В корзину
              `;
              addToCartBtn.disabled = false;
              
              // Show toast notification
              showToast('Товар добавлен в корзину');
            })
            .catch(() => {
              addToCartBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z" fill="currentColor"/>
                </svg>
                В корзину
              `;
              addToCartBtn.disabled = false;
              
              showToast('Ошибка при добавлении товара', true);
            });
        });
        
        const favoriteBtn = productElement.querySelector('.product-favorite');
        favoriteBtn.addEventListener('click', function() {
          const productId = parseInt(this.dataset.productId);
          favorites.toggleItem(productId);
          
          const icon = this.querySelector('.favorite-icon');
          if (favorites.isFavorite(productId)) {
            icon.classList.add('active');
            icon.innerHTML = '<path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor" stroke="currentColor" />';
            showToast('Товар добавлен в избранное');
          } else {
            icon.classList.remove('active');
            icon.innerHTML = '<path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="none" stroke="currentColor" />';
            showToast('Товар удален из избранного');
          }
        });
      });
    }, 800);
  }
  
  // Function to load product page
  function loadProductPage(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
      window.location.href = 'index.html';
      return;
    }
  
    document.title = `${product.name} - Северяночка`;
    
    const productDetail = document.getElementById('productDetail');
    if (productDetail) {
      const discountPercentage = product.oldPrice 
        ? calculateDiscountPercentage(product.oldPrice, product.price)
        : 0;
        
      const isFavorite = favorites.isFavorite(product.id);
      
      productDetail.innerHTML = `
        <div class="breadcrumbs">
          <span>Главная</span>
          <span>&gt;</span>
          <span>Каталог</span>
          <span>&gt;</span>
          <span>${product.category}</span>
          <span>&gt;</span>
          <span>${product.name}</span>
        </div>
  
        <h1 class="product-title">${product.name}</h1>
  
        <div class="product-detail">
          <div class="product-gallery">
            <div class="main-image">
              ${discountPercentage > 0 ? `<div class="product-discount">-${discountPercentage}%</div>` : ''}
              <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="thumbnail-list">
              <div class="thumbnail"><img src="${product.image}" alt="${product.name} thumbnail 1"></div>
              <div class="thumbnail"><img src="${product.image}" alt="${product.name} thumbnail 2"></div>
              <div class="thumbnail"><img src="${product.image}" alt="${product.name} thumbnail 3"></div>
              <div class="thumbnail"><img src="${product.image}" alt="${product.name} thumbnail 4"></div>
            </div>
          </div>
  
          <div class="product-info-detail">
            <div class="product-meta">
              <div class="product-rating">
                <div class="rating-stars">
                  ${displayStars(product.rating)}
                </div>
                <span class="review-count">${product.reviewCount} отзывов</span>
              </div>
              <button class="share-button">Поделиться</button>
              <div class="product-favorite" data-product-id="${product.id}">
                <svg class="favorite-icon ${isFavorite ? 'active' : ''}" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" />
                </svg>
              </div>
            </div>
  
            <div class="product-price-section">
              <div class="product-price">
                <span class="current-price">${formatCurrency(product.price)}</span>
                ${product.oldPrice ? `<span class="old-price">${formatCurrency(product.oldPrice)}</span>` : ''}
              </div>
              <button class="add-to-cart large" data-product-id="${product.id}">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z" fill="currentColor"/>
                </svg>
                В корзину
              </button>
            </div>
  
            <div class="product-details">
              <h3 class="details-title">Детали</h3>
              <div class="details-grid">
                <div class="details-label">Бренд</div>
                <div>${product.brand}</div>
                <div class="details-label">Страна производитель</div>
                <div>${product.country}</div>
                <div class="details-label">Упаковка</div>
                <div>${product.packaging}</div>
              </div>
            </div>
          </div>
        </div>
  
        <div class="related-products">
          <h2>С этим товаром покупают</h2>
          <div class="product-grid" id="relatedProductsGrid"></div>
        </div>
      `;
  
      // Load related products
      const relatedProductsGrid = document.getElementById('relatedProductsGrid');
      if (relatedProductsGrid) {
        const relatedProducts = products
          .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
          .slice(0, 4);
        
        setTimeout(() => {
          relatedProductsGrid.innerHTML = '';
          
          relatedProducts.forEach(relProduct => {
            const discountPercentage = relProduct.oldPrice 
              ? calculateDiscountPercentage(relProduct.oldPrice, relProduct.price)
              : 0;
            
            const isFavorite = favorites.isFavorite(relProduct.id);
            
            const productElement = document.createElement('div');
            productElement.className = 'product-card';
            productElement.innerHTML = `
              <div class="product-favorite" data-product-id="${relProduct.id}">
                <svg class="favorite-icon ${isFavorite ? 'active' : ''}" width="20" height="20" viewBox="0 0 24 24">
                  <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="${isFavorite ? 'currentColor' : 'none'}" stroke="currentColor" />
                </svg>
              </div>
              ${discountPercentage > 0 ? `<div class="product-discount">-${discountPercentage}%</div>` : ''}
              <a href="product.html?product=${relProduct.id}" class="product-image">
                <img src="${relProduct.image}" alt="${relProduct.name}">
              </a>
              <div class="product-info">
                <div class="product-price">
                  <span class="current-price">${formatCurrency(relProduct.price)}</span>
                  ${relProduct.oldPrice ? `<span class="old-price">${formatCurrency(relProduct.oldPrice)}</span>` : ''}
                </div>
                <h3 class="product-name">
                  <a href="product.html?product=${relProduct.id}">${relProduct.name}</a>
                </h3>
                <div class="product-rating">
                  <div class="rating-stars">
                    ${displayStars(relProduct.rating)}
                  </div>
                  <span class="review-count">${relProduct.reviewCount} отзывов</span>
                </div>
              </div>
              <button class="add-to-cart" data-product-id="${relProduct.id}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z" fill="currentColor"/>
                </svg>
                В корзину
              </button>
            `;
            relatedProductsGrid.appendChild(productElement);
          });
        }, 800);
      }
  
      // Add event listeners
      setTimeout(() => {
        // Add to cart button
        const addToCartBtn = document.querySelector('.add-to-cart.large');
        if (addToCartBtn) {
          addToCartBtn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            addToCartBtn.textContent = 'Добавление...';
            addToCartBtn.disabled = true;
            
            cart.addItem(productId)
              .then(() => {
                addToCartBtn.innerHTML = `
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z" fill="currentColor"/>
                  </svg>
                  В корзину
                `;
                addToCartBtn.disabled = false;
                
                showToast('Товар добавлен в корзину');
              })
              .catch(() => {
                addToCartBtn.innerHTML = `
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z" fill="currentColor"/>
                  </svg>
                  В корзину
                `;
                addToCartBtn.disabled = false;
                
                showToast('Ошибка при добавлении товара', true);
              });
          });
        }
        
        // Favorite button
        const favoriteBtn = document.querySelector('.product-favorite');
        if (favoriteBtn) {
          favoriteBtn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            favorites.toggleItem(productId);
            
            const icon = this.querySelector('.favorite-icon');
            if (favorites.isFavorite(productId)) {
              icon.classList.add('active');
              icon.innerHTML = '<path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor" stroke="currentColor" />';
              showToast('Товар добавлен в избранное');
            } else {
              icon.classList.remove('active');
              icon.innerHTML = '<path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="none" stroke="currentColor" />';
              showToast('Товар удален из избранного');
            }
          });
        }
      }, 800);
    }
  }
  
  // Function to load cart page
  function loadCartPage() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    
    if (cartItemsContainer && cartSummary) {
      updateCartPage();
    }
  }
  
  // Function to update cart page
  function updateCartPage() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    
    if (!cartItemsContainer || !cartSummary) return;
    
    if (cart.items.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart">
          <h2>Ваша корзина пуста</h2>
          <p>Добавьте товары в корзину, чтобы оформить заказ</p>
          <a href="index.html" class="return-btn">Перейти в каталог</a>
        </div>
      `;
    } else {
      cartItemsContainer.innerHTML = '';
      
      cart.items.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
          <div class="item-image">
            <img src="${item.product.image}" alt="${item.product.name}">
          </div>
          <div class="item-details">
            <h3 class="item-name">${item.product.name}</h3>
            <div class="item-controls">
              <div class="quantity-control">
                <button class="quantity-btn decrease" data-product-id="${item.productId}">-</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-product-id="${item.productId}">
                <button class="quantity-btn increase" data-product-id="${item.productId}">+</button>
              </div>
              <div class="item-price">
                <span class="current-price">${formatCurrency(item.product.price * item.quantity)}</span>
                ${item.product.oldPrice ? `<span class="old-price">${formatCurrency(item.product.oldPrice * item.quantity)}</span>` : ''}
              </div>
              <button class="remove-item" data-product-id="${item.productId}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>
        `;
        cartItemsContainer.appendChild(cartItem);
      });
      
      // Add event listeners
      const decreaseBtns = cartItemsContainer.querySelectorAll('.quantity-btn.decrease');
      decreaseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const productId = parseInt(this.dataset.productId);
          const item = cart.getItemById(productId);
          if (item) {
            cart.updateQuantity(productId, item.quantity - 1);
            updateCartPage();
          }
        });
      });
      
      const increaseBtns = cartItemsContainer.querySelectorAll('.quantity-btn.increase');
      increaseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const productId = parseInt(this.dataset.productId);
          const item = cart.getItemById(productId);
          if (item) {
            cart.updateQuantity(productId, item.quantity + 1);
            updateCartPage();
          }
        });
      });
      
      const quantityInputs = cartItemsContainer.querySelectorAll('.quantity-input');
      quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
          const productId = parseInt(this.dataset.productId);
          const quantity = parseInt(this.value) || 1;
          cart.updateQuantity(productId, quantity);
          updateCartPage();
        });
      });
      
      const removeBtns = cartItemsContainer.querySelectorAll('.remove-item');
      removeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const productId = parseInt(this.dataset.productId);
          cart.removeItem(productId);
          updateCartPage();
          showToast('Товар удален из корзины');
        });
      });
    }
    
    // Update summary
    const totalPrice = cart.getTotalPrice();
    cartSummary.innerHTML = `
      <h3 class="summary-title">Итого</h3>
      <div class="summary-row">
        <span class="summary-label">Товары (${cart.getTotalItems()})</span>
        <span>${formatCurrency(totalPrice)}</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Скидка</span>
        <span class="discount-value">- 0.00 ₽</span>
      </div>
      <div class="summary-row">
        <span class="summary-label">Доставка</span>
        <span>0.00 ₽</span>
      </div>
      <div class="summary-divider"></div>
      <div class="summary-total">
        <span>К оплате</span>
        <span>${formatCurrency(totalPrice)}</span>
      </div>
      <button class="checkout-btn" ${cart.items.length === 0 ? 'disabled' : ''}>Оформить заказ</button>
    `;
    
    // Add checkout event listener
    const checkoutBtn = cartSummary.querySelector('.checkout-btn');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', function() {
        if (cart.items.length === 0) {
          showToast('Корзина пуста', true);
          return;
        }
        
        checkoutBtn.textContent = 'Оформление...';
        checkoutBtn.disabled = true;
        
        // Simulate checkout process
        setTimeout(() => {
          cart.clearCart();
          showToast('Заказ успешно оформлен!');
          updateCartPage();
        }, 2000);
      });
    }
  }
  
  // Function to load favorites page
  function loadFavoritesPage() {
    const favoritesContainer = document.getElementById('favoritesContainer');
    
    if (favoritesContainer) {
      updateFavoritesPage();
    }
  }
  
  // Function to update favorites page
  function updateFavoritesPage() {
    const favoritesContainer = document.getElementById('favoritesContainer');
    
    if (!favoritesContainer) return;
    
    if (favorites.items.length === 0) {
      favoritesContainer.innerHTML = `
        <div class="empty-favorites">
          <h2>У вас нет избранных товаров</h2>
          <p>Добавьте товары в избранное, чтобы они отображались здесь</p>
          <a href="index.html" class="return-btn">Перейти в каталог</a>
        </div>
      `;
    } else {
      favoritesContainer.innerHTML = '<div class="product-grid" id="favoritesGrid"></div>';
      const favoritesGrid = document.getElementById('favoritesGrid');
      
      // Get favorite products
      const favoriteProducts = [];
      for (const productId of favorites.items) {
        const product = products.find(p => p.id === productId);
        if (product) {
          favoriteProducts.push(product);
        }
      }
      
      // Render products
      if (favoritesGrid) {
        favoriteProducts.forEach(product => {
          const discountPercentage = product.oldPrice 
            ? calculateDiscountPercentage(product.oldPrice, product.price)
            : 0;
          
          const productElement = document.createElement('div');
          productElement.className = 'product-card';
          productElement.innerHTML = `
            <div class="product-favorite active" data-product-id="${product.id}">
              <svg class="favorite-icon active" width="20" height="20" viewBox="0 0 24 24">
                <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor" stroke="currentColor" />
              </svg>
            </div>
            ${discountPercentage > 0 ? `<div class="product-discount">-${discountPercentage}%</div>` : ''}
            <a href="product.html?product=${product.id}" class="product-image">
              <img src="${product.image}" alt="${product.name}">
            </a>
            <div class="product-info">
              <div class="product-price">
                <span class="current-price">${formatCurrency(product.price)}</span>
                ${product.oldPrice ? `<span class="old-price">${formatCurrency(product.oldPrice)}</span>` : ''}
              </div>
              <h3 class="product-name">
                  : ''}
              </div>
              <h3 class="product-name">
                <a href="product.html?product=${product.id}">${product.name}</a>
              </h3>
              <div class="product-rating">
                <div class="rating-stars">
                  ${displayStars(product.rating)}
                </div>
                <span class="review-count">${product.reviewCount} отзывов</span>
              </div>
            </div>
            <button class="add-to-cart" data-product-id="${product.id}">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z" fill="currentColor"/>
              </svg>
              В корзину
            </button>
          `;
          favoritesGrid.appendChild(productElement);
        });
        
        // Add event listeners
        const favoriteBtns = favoritesGrid.querySelectorAll('.product-favorite');
        favoriteBtns.forEach(btn => {
          btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            favorites.removeItem(productId);
            showToast('Товар удален из избранного');
            updateFavoritesPage();
          });
        });
        
        const addToCartBtns = favoritesGrid.querySelectorAll('.add-to-cart');
        addToCartBtns.forEach(btn => {
          btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.productId);
            btn.textContent = 'Добавление...';
            btn.disabled = true;
            
            cart.addItem(productId)
              .then(() => {
                btn.innerHTML = `
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z" fill="currentColor"/>
                  </svg>
                  В корзину
                `;
                btn.disabled = false;
                
                showToast('Товар добавлен в корзину');
              })
              .catch(() => {
                btn.innerHTML = `
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM1 2V4H3L6.6 11.59L5.25 14.04C5.09 14.32 5 14.65 5 15C5 16.1 5.9 17 7 17H19V15H7.42C7.28 15 7.17 14.89 7.17 14.75L7.2 14.63L8.1 13H15.55C16.3 13 16.96 12.59 17.3 11.97L20.88 5.48C20.96 5.34 21 5.17 21 5C21 4.45 20.55 4 20 4H5.21L4.27 2H1ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18Z" fill="currentColor"/>
                  </svg>
                  В корзину
                `;
                btn.disabled = false;
                
                showToast('Ошибка при добавлении товара', true);
              });
          });
        });
      }
    }
  }
  
  // Function to show toast notification
  function showToast(message, isError = false) {
    // Check if toast container exists, if not, create it
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toastContainer';
      toastContainer.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 1000;';
      document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${isError ? 'toast-error' : 'toast-success'}`;
    toast.style.cssText = `
      background-color: ${isError ? '#ef4444' : '#10b981'};
      color: white;
      padding: 12px 16px;
      border-radius: 4px;
      margin-top: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      transition: opacity 0.3s, transform 0.3s;
      opacity: 0;
      transform: translateY(10px);
    `;
    toast.textContent = message;
    
    // Add to container
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    }, 10);
    
    // Hide toast after 3 seconds
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }
  
  // Apply price filter
  function applyPriceFilter() {
    const minPrice = parseFloat(document.getElementById('minPrice').value);
    const maxPrice = parseFloat(document.getElementById('maxPrice').value);
    
    const categorySlug = new URLSearchParams(window.location.search).get('category');
    if (categorySlug) {
      const category = categories.find(c => c.slug === categorySlug);
      if (category) {
        const productsContainer = document.getElementById('productGrid');
        if (productsContainer) {
          loadProducts(productsContainer, category.id);
        }
      }
    }
  }
  
  // Initialize price filter if it exists
  const applyFilterBtn = document.getElementById('applyFilter');
  if (applyFilterBtn) {
    applyFilterBtn.addEventListener('click', applyPriceFilter);
  }
  
  // Initialize price slider if it exists
  const priceSlider = document.getElementById('priceSlider');
  if (priceSlider) {
    priceSlider.addEventListener('input', function() {
      document.getElementById('minPrice').value = this.value;
    });
  }