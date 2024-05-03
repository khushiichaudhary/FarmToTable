const products = [
    { id: 1, name: "Tomato", price: 30, availability: "In Stock", image: "tomato.jpg", description: "Fresh and organic tomatoes" },
    { id: 2, name: "Potato", price: 40, availability: "In Stock", image: "potato.jpg", description: "High-quality potatoes" },
    { id: 3, name: "Carrot", price: 80, availability: "In Stock", image: "carrot.jpg", description: "Sweet and crunchy carrots" },
    { id: 4, name: "Onion", price: 60, availability: "In Stock", image: "onion.jpg", description: "Versatile cooking ingredient" },
    { id: 5, name: "Lettuce", price: 70, availability: "In Stock", image: "lettuce.jpg", description: "Fresh and crispy lettuce leaves" },
    { id: 6, name: "Cucumber", price: 80, availability: "In Stock", image: "cucumber.jpg", description: "Cool and refreshing cucumbers" },
    { id: 7, name: "Bell Pepper", price: 30, availability: "In Stock", image: "bell_pepper.jpg", description: "Colorful and nutritious bell peppers" },
    { id: 8, name: "Broccoli", price: 70, availability: "In Stock", image: "broccoli.jpg", description: "Nutrient-rich green vegetable" },
    { id: 9, name: "Spinach", price: 78, availability: "In Stock", image: "spinach.jpg", description: "Iron-rich leafy greens" },
    { id: 10, name: "Apple", price: 40, availability: "In Stock", image: "apple.jpg", description: "Juicy and sweet apples" },
    { id: 11, name: "Banana", price: 20, availability: "In Stock", image: "banana.jpg", description: "Energy-packed yellow fruit" },
    { id: 12, name: "Orange", price: 47, availability: "In Stock", image: "orange.jpg", description: "Vitamin C-rich citrus fruit" },
    { id: 13, name: "Grapes", price: 69, availability: "In Stock", image: "grapes.jpg", description: "Plump and juicy grapes" },
    { id: 14, name: "Strawberry", price: 78, availability: "In Stock", image: "strawberry.jpg", description: "Delicious and sweet strawberries" },
    { id: 15, name: "Watermelon", price:75, availability: "In Stock", image: "watermelon.jpg", description: "Refreshing summer fruit" },
    { id: 16, name: "Pineapple", price: 98, availability: "In Stock", image: "pineapple.jpg", description: "Tropical and tangy pineapple" },
    { id: 17, name: "Mango", price: 72.0, availability: "In Stock", image: "mango.jpg", description: "Exotic and flavorful mangoes" },
    { id: 18, name: "Peach", price: 31.8, availability: "In Stock", image: "peach.jpg", description: "Sweet and juicy peaches" },
    { id: 19, name: "Pear", price: 81.5, availability: "In Stock", image: "pear.jpg", description: "Firm and flavorful pears" },
    { id: 20, name: "Cherry", price: 43.5, availability: "In Stock", image: "cherry.jpg", description: "Small and succulent cherries" },
    { id: 21, name: "Blueberry", price: 74.0, availability: "In Stock", image: "blueberry.jpg", description: "Nutrient-rich blueberries" },
    { id: 22, name: "Raspberry", price: 73.5, availability: "In Stock", image: "raspberry.jpg", description: "Tart and flavorful raspberries" },
    { id: 23, name: "Blackberry", price: 43.0, availability: "In Stock", image: "blackberry.jpg", description: "Dark and juicy blackberries" },
    { id: 24, name: "Kiwi", price: 72.0, availability: "In Stock", image: "kiwi.jpg", description: "Tangy and exotic kiwifruit" },
    { id: 25, name: "Avocado", price: 112.5, availability: "In Stock", image: "avocado.jpg", description: "Creamy and nutritious avocado" },
    { id: 26, name: "Eggplant", price: 871.8, availability: "In Stock", image: "eggplant.jpg", description: "Versatile purple vegetable" },
    { id: 27, name: "Zucchini", price: 751.5, availability: "In Stock", image: "zucchini.jpg", description: "Mild-flavored summer squash" },
    { id: 28, name: "Sweet Potato", price: 532.0, availability: "In Stock", image: "sweet_potato.jpg", description: "Nutrient-rich root vegetable" },
    { id: 29, name: "Cabbage", price: 451.2, availability: "In Stock", image: "cabbage.jpg", description: "Crunchy and nutritious cabbage" },
    { id: 30, name: "Celery", price: 4781.5, availability: "In Stock", image: "celery.jpg", description: "Crunchy and low-calorie celery stalks" }
  ];
  
  
  const cartItems = [];
  
  function renderProducts() {
    const productList = document.querySelector('.product-list');
    productList.innerHTML = '';
  
    products.forEach(product => {
      const productItem = document.createElement('div');
      productItem.classList.add('product-item');
      
      productItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>Price: Rs. ${product.price}</p>
        <p>${product.availability}</p>
        <p>${product.description}</p>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      
      productList.appendChild(productItem);
    });
  }
  
  function sortProducts(sortBy) {
    products.sort((a, b) => {
      if (sortBy === 'price') {
        return a.price - b.price;
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'availability') {
        return a.availability.localeCompare(b.availability);
      }
    });
    
    renderProducts();
  }
  
  function addToCart(productId) {
    const productToAdd = products.find(product => product.id === productId);
    if (productToAdd) {
      cartItems.push(productToAdd);
      renderCart();
    }
  }
  
  function renderCart() {
    const cartItemsList = document.querySelector('.cart-items');
    cartItemsList.innerHTML = '';
  
    cartItems.forEach(item => {
      const cartItem = document.createElement('li');
      cartItem.classList.add('cart-item');
      
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <span>${item.name}</span>
        <span>$${item.price}</span>
      `;
      
      cartItemsList.appendChild(cartItem);
    });
  }
  
  renderProducts();
  
  document.getElementById('sort').addEventListener('change', function() {
    const sortBy = this.value;
    sortProducts(sortBy);
  });
  