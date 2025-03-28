
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all category cards
    const categoryCards = document.querySelectorAll('.category-card');
    
    // Add click event listeners to each card
    categoryCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Get the href attribute
            const href = this.getAttribute('href');
            
            // If the href exists, navigate to that page
            if (href) {
                // You can add animations or transitions here before navigation
                
                // For demonstration, we'll just log the navigation
                console.log('Navigating to:', href);
                
                // Uncomment this to actually navigate
                // window.location.href = href;
                
                // Prevent default link behavior for demonstration
                e.preventDefault();
                
                // Create a category page dynamically for demonstration
                createCategoryPage(href);
            }
        });
    });
    
    // Function to create a category page dynamically (for demonstration)
    function createCategoryPage(href) {
        // Extract category name from href
        const categorySlug = href.split('/').pop().replace('.html', '');
        const categoryName = getCategoryName(categorySlug);
        
        // Clear the main content
        const main = document.querySelector('main');
        main.innerHTML = '';
        
        // Create category page content
        const categoryPage = document.createElement('div');
        categoryPage.className = 'category-page';
        categoryPage.innerHTML = `
            <a href="#" class="back-link" id="back-to-home">← Назад на главную</a>
            <h1 class="category-heading">${categoryName}</h1>
            <div class="category-content">
                <p>Здесь будут отображаться товары из категории "${categoryName}".</p>
            </div>
        `;
        
        // Append to main
        main.appendChild(categoryPage);
        
        // Add event listener to back button
        document.getElementById('back-to-home').addEventListener('click', function(e) {
            e.preventDefault();
            window.location.reload();
        });
        
        // Update page title
        document.title = `${categoryName} | Продуктовый магазин`;
        
        // Update URL without reloading (for demonstration)
        window.history.pushState({}, '', href);
    }
    
    // Function to get category name from slug
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