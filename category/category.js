

document.addEventListener('DOMContentLoaded', function() {
    // Price Range Slider
    const sliderMin = document.getElementById('slider-min');
    const sliderMax = document.getElementById('slider-max');
    const inputMin = document.getElementById('min-price');
    const inputMax = document.getElementById('max-price');
    const sliderColor = document.querySelector('.slider-color');
    
    // Initialize slider positions
    updateSliderColor();
    
    // Update slider color on input change
    function updateSliderColor() {
        const min = parseInt(sliderMin.value);
        const max = parseInt(sliderMax.value);
        const minPercent = ((min - sliderMin.min) / (sliderMin.max - sliderMin.min)) * 100;
        const maxPercent = ((max - sliderMax.min) / (sliderMax.max - sliderMax.min)) * 100;
        
        sliderColor.style.left = minPercent + '%';
        sliderColor.style.width = (maxPercent - minPercent) + '%';
    }
    
    // Slider min input event
    sliderMin.addEventListener('input', function() {
        const minValue = parseInt(sliderMin.value);
        const maxValue = parseInt(sliderMax.value);
        
        if (minValue > maxValue) {
            sliderMin.value = maxValue;
            inputMin.value = maxValue;
        } else {
            inputMin.value = minValue;
        }
        
        updateSliderColor();
        filterProducts();
    });
    
    // Slider max input event
    sliderMax.addEventListener('input', function() {
        const minValue = parseInt(sliderMin.value);
        const maxValue = parseInt(sliderMax.value);
        
        if (maxValue < minValue) {
            sliderMax.value = minValue;
            inputMax.value = minValue;
        } else {
            inputMax.value = maxValue;
        }
        
        updateSliderColor();
        filterProducts();
    });
    
    // Min price input event
    inputMin.addEventListener('input', function() {
        const minValue = parseInt(inputMin.value);
        const maxValue = parseInt(inputMax.value);
        
        if (minValue > maxValue) {
            inputMin.value = maxValue;
        }
        
        sliderMin.value = inputMin.value;
        updateSliderColor();
        filterProducts();
    });
    
    // Max price input event
    inputMax.addEventListener('input', function() {
        const minValue = parseInt(inputMin.value);
        const maxValue = parseInt(inputMax.value);
        
        if (maxValue < minValue) {
            inputMax.value = minValue;
        }
        
        sliderMax.value = inputMax.value;
        updateSliderColor();
        filterProducts();
    });
    
    // Reset filter button
    const resetBtn = document.querySelector('.reset-btn');
    resetBtn.addEventListener('click', function() {
        inputMin.value = sliderMin.min;
        inputMax.value = sliderMax.max;
        sliderMin.value = sliderMin.min;
        sliderMax.value = sliderMax.max;
        updateSliderColor();
        filterProducts();
    });
    
    // Filter products based on price range
    function filterProducts() {
        const minPrice = parseInt(inputMin.value);
        const maxPrice = parseInt(inputMax.value);
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const priceText = card.querySelector('.product-price').textContent;
            const price = parseInt(priceText.replace(/[^\d]/g, ''));
            
            if (price >= minPrice && price <= maxPrice) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartCount = document.querySelector('.cart-count');
    let count = 1; // Starting with 1 item in cart
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            count++;
            cartCount.textContent = count;
            
            // Animation effect
            button.textContent = 'Добавлено!';
            button.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                button.textContent = 'В корзину';
                button.style.backgroundColor = '#70c05b';
            }, 1000);
        });
    });
    
    // Favorite button functionality
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    
    favoriteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#ff6633';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
            }
        });
    });
    
    // Pagination functionality
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('active') && !this.classList.contains('prev') && !this.classList.contains('next')) {
                document.querySelector('.pagination-btn.active').classList.remove('active');
                this.classList.add('active');
                
                // Simulate page change (in a real app, this would fetch new products)
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
    
    // Load more button
    const loadMoreBtn = document.getElementById('load-more-btn');
    
    loadMoreBtn.addEventListener('click', function() {
        // Simulate loading more products
        this.textContent = 'Загрузка...';
        
        setTimeout(() => {
            // In a real app, this would append new products to the grid
            this.textContent = 'Показать еще';
            alert('В реальном приложении здесь бы загрузились дополнительные товары');
        }, 1000);
    });
    
    // Mobile catalog button
    const catalogBtn = document.querySelector('.catalog-btn button');
    
    catalogBtn.addEventListener('click', function() {
        alert('Каталог товаров будет открыт здесь');
    });
});