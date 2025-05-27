document.addEventListener('DOMContentLoaded', function() {
    // Countdown Timer for Deals Section
    function startCountdown() {
        // Set the target date (4 days, 13 hours, 34 minutes, 56 seconds from now)
        const now = new Date();
        const targetDate = new Date(now);
        targetDate.setDate(now.getDate() + 4);
        targetDate.setHours(now.getHours() + 13);
        targetDate.setMinutes(now.getMinutes() + 34);
        targetDate.setSeconds(now.getSeconds() + 56);

        // Update countdown every second
        const interval = setInterval(function() {
            const currentTime = new Date();
            const diff = targetDate - currentTime;

            // Calculate days, hours, minutes, seconds
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            // Update the HTML elements
            document.getElementById('days').innerText = days < 10 ? '0' + days : days;
            document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
            document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;

            // If the countdown is over, clear the interval
            if (diff < 0) {
                clearInterval(interval);
                document.getElementById('days').innerText = '00';
                document.getElementById('hours').innerText = '00';
                document.getElementById('minutes').innerText = '00';
                document.getElementById('seconds').innerText = '00';
            }
        }, 1000);
    }

    // Start the countdown if the elements exist
    if (document.getElementById('days')) {
        startCountdown();
    }

    // Handle view switcher on product listing page
    const viewButtons = document.querySelectorAll('.view-btn');
    const productList = document.querySelector('.product-list');
    
    if (viewButtons.length > 0 && productList) {
        // Set initial view mode (default to grid view for better product showcase)
        if (!productList.classList.contains('list-view') && !productList.classList.contains('grid-view')) {
            productList.classList.add('grid-view');
            
            // Set the grid view button as active initially
            viewButtons.forEach(btn => {
                if (btn.getAttribute('data-view') === 'grid') {
                    btn.classList.add('active');
                }
            });
        }
        
        viewButtons.forEach(button => {
            button.addEventListener('click', function() {
                const viewMode = this.getAttribute('data-view');
                
                // Remove active class from all buttons
                viewButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Update view mode
                if (viewMode === 'grid') {
                    productList.classList.add('grid-view');
                    productList.classList.remove('list-view');
                } else {
                    productList.classList.add('list-view');
                    productList.classList.remove('grid-view');
                }
            });
        });
    }

    // Handle category filter on product listing page
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    if (category && document.getElementById('currentCategory')) {
        // Update the category title
        const categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
        document.getElementById('currentCategory').textContent = categoryTitle;
        
        // Highlight the active category in the navigation
        const categoryLinks = document.querySelectorAll('.categories-nav a');
        categoryLinks.forEach(link => {
            const linkCategory = link.getAttribute('href').split('=')[1];
            if (linkCategory === category) {
                link.classList.add('active');
                // Remove the active class from the "All Categories" link
                document.querySelector('.categories-nav a[href="products.html"]').classList.remove('active');
            }
        });
    }

    // Handle thumbnail images on product detail page
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Update main image
                const imageSrc = this.getAttribute('data-src');
                mainImage.src = imageSrc;
                
                // Update active thumbnail
                thumbnails.forEach(thumb => thumb.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Handle tabs on product detail page
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length > 0 && tabPanes.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and panes
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to clicked button and corresponding pane
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Handle wish button on product detail page
    const wishBtn = document.getElementById('wishBtn');
    if (wishBtn) {
        wishBtn.addEventListener('click', function() {
            const heartIcon = this.querySelector('i');
            
            if (heartIcon.classList.contains('far')) {
                // Change to filled heart
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                heartIcon.classList.add('filled');
                this.innerHTML = '<i class="fas fa-heart filled"></i> Saved';
            } else {
                // Change back to outline heart
                heartIcon.classList.remove('fas');
                heartIcon.classList.remove('filled');
                heartIcon.classList.add('far');
                this.innerHTML = '<i class="far fa-heart"></i> Save for later';
            }
        });
    }

    // Handle quantity selector in shopping cart
    const quantitySelectors = document.querySelectorAll('.quantity-selector');
    if (quantitySelectors.length > 0) {
        quantitySelectors.forEach(selector => {
            const decreaseBtn = selector.querySelector('.decrease');
            const increaseBtn = selector.querySelector('.increase');
            const quantityInput = selector.querySelector('input');
            
            if (decreaseBtn && increaseBtn && quantityInput) {
                decreaseBtn.addEventListener('click', function() {
                    let value = parseInt(quantityInput.value);
                    if (value > 1) {
                        quantityInput.value = value - 1;
                    }
                });
                
                increaseBtn.addEventListener('click', function() {
                    let value = parseInt(quantityInput.value);
                    quantityInput.value = value + 1;
                });
            }
        });
    }

    // Handle "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                
                // Get product information
                const productCard = this.closest('.product-card-list') || this.closest('.product-detail');
                
                if (productCard) {
                    // Show a small notification
                    const notification = document.createElement('div');
                    notification.className = 'cart-notification';
                    notification.innerHTML = '<i class="fas fa-check-circle"></i> Added to cart!';
                    document.body.appendChild(notification);
                    
                    // Remove notification after 2 seconds
                    setTimeout(() => {
                        notification.remove();
                    }, 2000);
                }
            });
        });
    }

    // Handle sorting dropdown
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            // In a real project, this would trigger a re-fetch of products
            // based on the selected sorting option
            console.log('Sort by:', this.value);
        });
    }

    // Price range slider (for product listing page)
    const sliderMin = document.querySelector('.slider-min');
    const sliderMax = document.querySelector('.slider-max');
    const sliderFill = document.querySelector('.slider-fill');
    const minInput = document.querySelector('.price-input:first-child input');
    const maxInput = document.querySelector('.price-input:last-child input');
    
    if (sliderMin && sliderMax && sliderFill && minInput && maxInput) {
        // Set initial values
        const minValue = parseInt(sliderMin.value);
        const maxValue = parseInt(sliderMax.value);
        const range = sliderMax.max - sliderMin.min;
        
        // Update slider fill
        function updateSliderFill() {
            const minVal = parseInt(sliderMin.value);
            const maxVal = parseInt(sliderMax.value);
            
            sliderFill.style.left = ((minVal - sliderMin.min) / range) * 100 + '%';
            sliderFill.style.width = ((maxVal - minVal) / range) * 100 + '%';
            
            minInput.value = minVal;
            maxInput.value = maxVal;
        }
        
        // Initialize slider fill
        updateSliderFill();
        
        // Event listeners for sliders
        sliderMin.addEventListener('input', function() {
            const minVal = parseInt(sliderMin.value);
            const maxVal = parseInt(sliderMax.value);
            
            if (minVal > maxVal) {
                sliderMin.value = maxVal;
            }
            
            updateSliderFill();
        });
        
        sliderMax.addEventListener('input', function() {
            const minVal = parseInt(sliderMin.value);
            const maxVal = parseInt(sliderMax.value);
            
            if (maxVal < minVal) {
                sliderMax.value = minVal;
            }
            
            updateSliderFill();
        });
        
        // Event listeners for inputs
        minInput.addEventListener('input', function() {
            const minVal = parseInt(minInput.value);
            const maxVal = parseInt(maxInput.value);
            
            if (minVal > maxVal) {
                minInput.value = maxVal;
            }
            
            if (minVal < sliderMin.min) {
                minInput.value = sliderMin.min;
            }
            
            if (minVal > sliderMin.max) {
                minInput.value = sliderMin.max;
            }
            
            sliderMin.value = minInput.value;
            updateSliderFill();
        });
        
        maxInput.addEventListener('input', function() {
            const minVal = parseInt(minInput.value);
            const maxVal = parseInt(maxInput.value);
            
            if (maxVal < minVal) {
                maxInput.value = minVal;
            }
            
            if (maxVal < sliderMax.min) {
                maxInput.value = sliderMax.min;
            }
            
            if (maxVal > sliderMax.max) {
                maxInput.value = sliderMax.max;
            }
            
            sliderMax.value = maxInput.value;
            updateSliderFill();
        });
    }
    // Filter section toggle
    const filterHeaders = document.querySelectorAll('.filter-header');
    
    filterHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const filterSection = this.parentElement;
            const filterList = filterSection.querySelector('.filter-list');
            const icon = this.querySelector('i');
            
            if (filterList.style.display === 'none') {
                filterList.style.display = 'flex';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                filterList.style.display = 'none';
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
    
    // Remove filter tag
    const removeFilterBtns = document.querySelectorAll('.remove-filter');
    
    removeFilterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterTag = this.parentElement;
            filterTag.remove();
        });
    });
    
    // Clear all filters
    const clearFiltersBtn = document.querySelector('.clear-filters');
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const filterTags = document.querySelectorAll('.filter-tag');
            filterTags.forEach(tag => tag.remove());
        });
    }

    // Create folder structure for images
    function createImageFolders() {
        console.log("Note: In a real project, you would need to create the following folders structure:");
        console.log("/images");
        console.log("/images/products");
        console.log("/images/services");
        console.log("And add appropriate images to each folder.");
    }

    createImageFolders();

    // Add CSS classes for proper styling of grid and list views
    function setupProductViewStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .product-list.grid-view {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 20px;
            }
            
            .product-list.list-view .product-card-list {
                display: flex;
                margin-bottom: 20px;
                border: 1px solid #e0e0e0;
                border-radius: 6px;
            }
            
            .product-list.list-view .product-image {
                width: 200px;
                padding: 15px;
            }
            
            .product-list.list-view .product-details {
                flex: 1;
                padding: 15px;
                border-left: 1px solid #e0e0e0;
            }
            
            .product-list.grid-view .product-card-list {
                flex-direction: column;
                border: 1px solid #e0e0e0;
                border-radius: 6px;
                overflow: hidden;
            }
            
            .product-list.grid-view .product-image {
                height: 200px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px;
            }
            
            .product-list.grid-view .product-details {
                padding: 15px;
            }
            
            .product-list.grid-view .product-description {
                display: none;
            }
            
            .view-btn {
                padding: 5px 10px;
                background: #f5f5f5;
                border: 1px solid #ddd;
                cursor: pointer;
                margin-left: 5px;
            }
            
            .view-btn.active {
                background: #0d6efd;
                color: white;
                border-color: #0d6efd;
            }

            .cart-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background-color: #4CAF50;
                color: white;
                padding: 15px 20px;
                border-radius: 4px;
                z-index: 1000;
                animation: fadeInOut 2s ease-in-out;
            }
            
            @keyframes fadeInOut {
                0% { opacity: 0; }
                20% { opacity: 1; }
                80% { opacity: 1; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(styleElement);
    }
    
    setupProductViewStyles();
});