
document.addEventListener('DOMContentLoaded', function() {

    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function(e) {

            const href = this.getAttribute('href');
            
            if (href) {
                console.log('Navigating to:', href)
                e.preventDefault();
                createCategoryPage(href);
            }
        });
    });
    
    function createCategoryPage(href) {
        const categorySlug = href.split('/').pop().replace('.html', '');
        const categoryName = getCategoryName(categorySlug);
    
        const main = document.querySelector('main');
        main.innerHTML = '';
        
        const categoryPage = document.createElement('div');
        categoryPage.className = 'category-page';
        categoryPage.innerHTML = `
            <a href="#" class="back-link" id="back-to-home">← Назад на главную</a>
            <h1 class="category-heading">${categoryName}</h1>
            <div class="category-content">
                <p>Здесь будут отображаться товары из категории "${categoryName}".</p>
            </div>
        `;

        main.appendChild(categoryPage);
        
        document.getElementById('back-to-home').addEventListener('click', function(e) {
            e.preventDefault();
            window.location.reload();
        });
        
        document.title = `${categoryName} | Продуктовый магазин`;
        
        window.history.pushState({}, '', href);
    }

    function getCategoryName(slug) {
        const categories = {
            'dairy': 'Молоко, сыр, яйца',
            'bread': 'Хлеб',
            'produce': 'Фрукты и овощи',
            'frozen': 'Замороженные продукты',
            'beverages': 'Напитки',
            'confectionery': 'Кондитерские изделия',
            'tea-coffee': 'Чай, кофе',
            'bakery': 'Выпечка',
            'healthy': 'Здоровое питание',
            'pet-supplies': 'Зоотовары',
            'baby-food': 'Детское питание',
            'meat': 'Мясо, птица, колбаса',
            'non-food': 'Непродовольственные товары'
        };
        
        return categories[slug] || 'Категория';
    }
});

 