document.addEventListener("DOMContentLoaded", () => {
  // Placeholder product data
  const products = [
    { id: 1, name: "Apple MacBook Laptop Pro", category: "laptops", price: 1200, popularity: 5 },
    { id: 2, name: "IPhone X", category: "phones", price: 800, popularity: 4 },
    { id: 3, name: "Wireless Earbuds", category: "accessories", price: 150, popularity: 3 },
  ];

  const featuredSection = document.querySelector(".product-cards");
  const productGrid = document.querySelector(".product-grid");

  // Render products dynamically
  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    featuredSection.appendChild(card);
    productGrid.appendChild(card.cloneNode(true));
  });

  // Handle navigation
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll("section").forEach(section => section.classList.add("hidden"));
      document.querySelector(link.getAttribute("href")).classList.remove("hidden");
    });
  });

  // Cart logic
  let cart = [];
  document.addEventListener("click", (e) => {
    if (e.target.matches("button[data-id]")) {
      const id = e.target.dataset.id;
      const product = products.find(p => p.id == id);
      cart.push(product);
      updateCart();
    }
  });

  function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let totalCost = 0;

    cart.forEach(item => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
        <h4>${item.name}</h4>
        <p>Price: $${item.price}</p>
      `;
      cartItems.appendChild(cartItem);
      totalCost += item.price;
    });

    document.getElementById("total-cost").textContent = totalCost.toFixed(2);
  }
});