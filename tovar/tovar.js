

document.addEventListener('DOMContentLoaded', function() {
  
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            
            thumbnails.forEach(t => t.classList.remove('active'));
            
            this.classList.add('active');
            
            console.log('Thumbnail clicked, would change main image');
        });
    });
    
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn, .add-to-cart-small');
    const cartCount = document.querySelector('.cart-count');
    let count = 1; 
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            count++;
            cartCount.textContent = count;
            
            button.textContent = 'Добавлено!';
            button.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                button.textContent = 'В корзину';
                if (button.classList.contains('add-to-cart-btn')) {
                    button.style.backgroundColor = '#ff6633';
                } else {
                    button.style.backgroundColor = '#70c05b';
                }
            }, 1000);
        });
    });
    
    const favoriteButtons = document.querySelectorAll('.favorite-btn, .favorite-icon');
    
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

    const priceInfo = document.querySelector('.price-info');
    
    if (priceInfo) {
        priceInfo.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'price-tooltip';
            tooltip.textContent = 'Цена указана за единицу товара';
            tooltip.style.position = 'absolute';
            tooltip.style.backgroundColor = '#333';
            tooltip.style.color = '#fff';
            tooltip.style.padding = '5px 10px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '12px';
            tooltip.style.zIndex = '100';
            
            this.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = '25px';
            tooltip.style.left = '0';
        });
        
        priceInfo.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.price-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    }

    const catalogBtn = document.querySelector('.catalog-btn button');
    
    if (catalogBtn) {
        catalogBtn.addEventListener('click', function() {
            alert('Каталог товаров будет открыт здесь');
        });
    }
});