// SoleVibe Shoe Store - Main Application Logic

// --- STATE MANAGEMENT ---
let cart = [];

// Initialize application
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadCartFromStorage();
  updateCartUI();
  setupEventListeners();
  
  // Router listener
  window.addEventListener("hashchange", handleRouting);
  // Initial route execution
  handleRouting();
});

// --- THEME MANAGEMENT ---
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const themeBtn = document.getElementById("theme-toggle-btn");
  if (!themeBtn) return;
  if (theme === "light") {
    themeBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
      </svg>`; // Moon icon
  } else {
    themeBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </svg>`; // Sun icon
  }
}

// --- ROUTER ---
function handleRouting() {
  const hash = window.location.hash || "#/";
  const appContainer = document.getElementById("app");
  
  // Close mobile menu on route change
  const navLinks = document.getElementById("nav-links");
  if (navLinks && navLinks.classList.contains("open")) {
    navLinks.classList.remove("open");
  }

  // Scroll to top
  window.scrollTo(0, 0);

  // Update navigation active states
  updateNavActiveState(hash);

  // Route matching
  if (hash === "#/") {
    renderHome(appContainer);
  } else if (hash === "#/about") {
    renderAbout(appContainer);
  } else if (hash === "#/contact") {
    renderContact(appContainer);
  } else if (hash.startsWith("#/category/")) {
    const category = hash.replace("#/category/", "");
    renderCategory(appContainer, category);
  } else if (hash.startsWith("#/product/")) {
    const productId = hash.replace("#/product/", "");
    renderProductDetail(appContainer, productId);
  } else {
    // Fallback to home
    window.location.hash = "#/";
  }
}

function updateNavActiveState(hash) {
  const links = document.querySelectorAll(".nav-links a");
  links.forEach(link => {
    const href = link.getAttribute("href");
    if (href === hash) {
      link.classList.add("active");
    } else if (hash.startsWith("#/category/") && href.includes(hash.split("/").pop())) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// --- SHOPPING CART LOGIC ---
function loadCartFromStorage() {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    try {
      cart = JSON.parse(savedCart);
    } catch (e) {
      cart = [];
    }
  }
}

function saveCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(productId, size, color) {
  const product = shoeProducts.find(p => p.id === productId);
  if (!product) return;

  // Check if item with same size & color already in cart
  const existingItemIndex = cart.findIndex(item => 
    item.id === productId && item.size === size && item.color.name === color.name
  );

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      zhName: product.zhName,
      price: product.price,
      image: product.image,
      size: size,
      color: color,
      quantity: 1
    });
  }

  saveCartToStorage();
  updateCartUI();
  openCartDrawer();
}

function updateQuantity(index, newQty) {
  if (newQty < 1) {
    removeFromCart(index);
    return;
  }
  cart[index].quantity = newQty;
  saveCartToStorage();
  updateCartUI();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCartToStorage();
  updateCartUI();
}

function updateCartUI() {
  // Update floating bubble counts
  const counts = document.querySelectorAll(".cart-count");
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  counts.forEach(el => {
    el.textContent = totalQty;
    el.style.display = totalQty > 0 ? "flex" : "none";
  });

  // Render items inside drawer
  const itemsContainer = document.getElementById("cart-items");
  const totalPriceEl = document.getElementById("cart-total-price");
  
  if (!itemsContainer || !totalPriceEl) return;

  if (cart.length === 0) {
    itemsContainer.innerHTML = `
      <div class="cart-empty-message">
        <span class="cart-empty-icon">🛒</span>
        <p>您的購物車是空的</p>
        <a href="#/category/casual" class="btn btn-secondary btn-sm" onclick="closeCartDrawer()">立即去逛逛</a>
      </div>`;
    totalPriceEl.textContent = "NT$ 0";
  } else {
    itemsContainer.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        <div class="cart-item-img-wrap">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        </div>
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.zhName}</h4>
          <p class="cart-item-options">規格: ${item.size} / ${item.color.name}</p>
          <div class="cart-item-price-qty">
            <span class="cart-item-price">NT$ ${item.price.toLocaleString()}</span>
            <div class="qty-control">
              <span class="qty-btn" onclick="appUpdateQty(${idx}, ${item.quantity - 1})">-</span>
              <span class="qty-number">${item.quantity}</span>
              <span class="qty-btn" onclick="appUpdateQty(${idx}, ${item.quantity + 1})">+</span>
            </div>
          </div>
        </div>
        <span class="cart-item-remove-btn" onclick="appRemoveItem(${idx})">✕</span>
      </div>
    `).join("");

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceEl.textContent = `NT$ ${totalPrice.toLocaleString()}`;
  }
}

// Global bridges for inline onclick attributes
window.appUpdateQty = (idx, qty) => updateQuantity(idx, qty);
window.appRemoveItem = (idx) => removeFromCart(idx);

function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer-overlay");
  if (drawer) drawer.classList.add("open");
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer-overlay");
  if (drawer) drawer.classList.remove("open");
}

window.closeCartDrawer = closeCartDrawer;

// --- GLOBAL EVENT LISTENERS ---
function setupEventListeners() {
  // Theme Toggle Button
  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", toggleTheme);
  }

  // Cart Toggle Buttons
  const cartBtn = document.getElementById("cart-btn");
  if (cartBtn) {
    cartBtn.addEventListener("click", openCartDrawer);
  }

  const closeCartBtn = document.getElementById("cart-close-btn");
  if (closeCartBtn) {
    closeCartBtn.addEventListener("click", closeCartDrawer);
  }

  const overlay = document.getElementById("cart-drawer-overlay");
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeCartDrawer();
    });
  }

  // Mobile Menu Toggler
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }
}

// --- RENDER HOME PAGE ---
function renderHome(container) {
  // Get 3 featured items (one from casual, running, basketball)
  const featured = [
    shoeProducts.find(p => p.id === "casual_3"),
    shoeProducts.find(p => p.id === "running_1"),
    shoeProducts.find(p => p.id === "basketball_3")
  ].filter(Boolean);

  container.innerHTML = `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-grid">
        <div class="hero-content">
          <span class="hero-tag">2026 全新防護進化</span>
          <h1>穿上 <span>SoleVibe</span><br>定義你的潮流律動</h1>
          <p>結合頂級科技避震與極致街頭美學，專為追求極致腳感與卓越外觀的您量身打造。探索我們全新的休閒、慢跑與實戰籃球系列。</p>
          <div class="hero-btns">
            <a href="#/category/casual" class="btn btn-primary">立即選購</a>
            <a href="#/about" class="btn btn-secondary">探索品牌</a>
          </div>
        </div>
        <div class="hero-img-wrap">
          <div class="hero-circle-bg"></div>
          <img src="assets/images/running_1.svg" alt="ApexRunner Evo" class="hero-shoe-img">
        </div>
      </div>
    </section>

    <!-- Category Portal Section -->
    <section class="section">
      <div class="section-title-wrap">
        <h2 class="section-title">熱門商品分類</h2>
        <p class="section-subtitle">尋找最適合您生活場景的專屬鞋款</p>
      </div>
      <div class="category-home-grid">
        <div class="category-card" onclick="window.location.hash='#/category/casual'">
          <span class="category-card-icon">👟</span>
          <h3>日常休閒款</h3>
          <p>經典版型與頂級面料，打造輕奢休閒感</p>
          <span class="category-card-link">探索休閒鞋 🡒</span>
        </div>
        <div class="category-card" onclick="window.location.hash='#/category/running'">
          <span class="category-card-icon">⚡</span>
          <h3>專業慢跑款</h3>
          <p>高效回彈中底，釋放您向前邁步的無極限動力</p>
          <span class="category-card-link">探索慢跑鞋 🡒</span>
        </div>
        <div class="category-card" onclick="window.location.hash='#/category/basketball'">
          <span class="category-card-icon">🏀</span>
          <h3>實戰籃球款</h3>
          <p>強悍包裹與足踝安全防護，稱霸禁區與外線</p>
          <span class="category-card-link">探索籃球鞋 🡒</span>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="section">
      <div class="section-title-wrap">
        <h2 class="section-title">編輯強烈推薦</h2>
        <p class="section-subtitle">本季最受矚目與熱銷的明星級鞋款</p>
      </div>
      <div class="home-featured-grid">
        ${featured.map(product => generateProductCardHTML(product)).join("")}
      </div>
    </section>

    <!-- Brand Value Stats -->
    <section class="section stats-section">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-number">98.3%</div>
          <div class="stat-title">顧客極佳好評</div>
          <div class="stat-desc">源自全球數千位跑者與潮流達人的真實反饋。</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">100%</div>
          <div class="stat-title">原創匠心設計</div>
          <div class="stat-desc">融合運動力學與現代美學，自主研發科技中底。</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">24/7</div>
          <div class="stat-title">尊榮客戶服務</div>
          <div class="stat-desc">提供全天候諮詢與專業退換貨保障，讓您購物無憂。</div>
        </div>
      </div>
    </section>
  `;
}

// --- RENDER ABOUT PAGE ---
function renderAbout(container) {
  container.innerHTML = `
    <section class="section">
      <div class="about-hero">
        <h1>關於 SoleVibe</h1>
        <p>「源於對極致行走的渴望，以美學重新定義每一次躍動。」</p>
      </div>
      
      <div class="about-grid">
        <div class="about-img-wrap">
          <img src="assets/images/logo.svg" alt="SoleVibe Logo" class="about-logo-svg">
        </div>
        <div class="about-content">
          <h2>我們的品牌故事</h2>
          <p>SoleVibe 創立於 2022 年，總部坐落於設計美學與科技交織的城市中心。我們最初由一群熱愛跑步的力學工程師與街頭視覺設計師共同發起。我們發現，市場上許多鞋款在追求強悍運動性能時，往往妥協了美感；而極具設計感的潮鞋，卻又缺乏長時間穿著的舒適度。</p>
          <p>因此，SoleVibe 誕生了。我們的宗旨就是打破這道隔閡——「將先進工程避震科技融入極簡美學」。我們研發出超臨界發泡中底 Evo-Foam 與一體化無縫針織鞋面，確保每雙鞋不仅是一件藝術品，更是給您足部最完美的守護者。</p>
          <p>不論您是穿梭都市的大底上班族、自我挑戰的馬拉松跑者，還是在球場上急停變向的運動健將，SoleVibe 都能以專屬的潮流律動，陪伴您邁出自信的每一步。</p>
        </div>
      </div>

      <div class="about-values">
        <div class="section-title-wrap">
          <h2 class="section-title">品牌核心價值</h2>
          <p class="section-subtitle">我們在每個細節中堅守的理念與執著</p>
        </div>
        <div class="values-grid">
          <div class="value-card">
            <span class="value-icon">🔬</span>
            <h3>科技引領 (Innovation)</h3>
            <p>我們與運動防護醫學实验室深度合作，精準量測足底壓力曲線，研發能最有效釋放關節壓力的避震系統。</p>
          </div>
          <div class="value-card">
            <span class="value-icon">🎨</span>
            <h3>極美外觀 (Aesthetics)</h3>
            <p>拒絕庸俗色彩。我們採用精緻流線、微弱漸層、冷峻的高雅色調，讓每款鞋款都具備強烈的高級感與百搭性。</p>
          </div>
          <div class="value-card">
            <span class="value-icon">🌱</span>
            <h3>永續發展 (Sustainability)</h3>
            <p>我們致力於綠色環保。鞋面編織材料中高達 40% 採用回收海洋廢棄塑料纖維，包裝全面採用 100% 可回收牛皮紙盒。</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

// --- RENDER CONTACT PAGE ---
function renderContact(container) {
  container.innerHTML = `
    <section class="section">
      <div class="section-title-wrap">
        <h2 class="section-title">聯絡我們</h2>
        <p class="section-subtitle">有任何尺碼、配送問題或合作提案？歡迎隨時與我們取得聯繫</p>
      </div>

      <div class="contact-grid">
        <div class="contact-info-wrap">
          <div class="contact-info-card">
            <h3>聯絡資訊</h3>
            <div class="contact-methods">
              <div class="contact-method-item">
                <span class="method-icon">📍</span>
                <div class="method-details">
                  <h4>品牌旗艦體驗中心</h4>
                  <p>台北市信義區信義路五段 7 號 88 樓 (台北 101 大樓)</p>
                </div>
              </div>
              <div class="contact-method-item">
                <span class="method-icon">📞</span>
                <div class="method-details">
                  <h4>客服專線</h4>
                  <p>+886 (2) 8101-8989 (週一至週五 09:00 - 18:00)</p>
                </div>
              </div>
              <div class="contact-method-item">
                <span class="method-icon">✉</span>
                <div class="method-details">
                  <h4>電子郵件</h4>
                  <p>support@solevibe-premium.com (合作洽談: info@solevibe.com)</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Simulated Map -->
          <div class="contact-map-sim">
            <div class="map-grid-pattern"></div>
            <span class="map-marker">📍</span>
            <h4 style="font-weight: 800; margin-bottom: 0.5rem; z-index: 2;">SoleVibe 信義旗艦總部</h4>
            <p style="font-size: 0.85rem; z-index: 2;">捷運台北 101/世貿站 4 號出口直達</p>
          </div>
        </div>

        <div class="contact-form-card">
          <h3>發送訊息</h3>
          <div id="form-success" class="form-success-alert">
            ✓ 訊息已成功送出！我們將於 24 小時內回覆您。
          </div>
          <form id="contact-form" onsubmit="event.preventDefault(); handleContactSubmit();">
            <div class="form-group">
              <label class="form-label" for="contact-name">您的姓名 *</label>
              <input type="text" id="contact-name" class="form-input" required placeholder="例如: 廖先生">
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-email">電子信箱 *</label>
              <input type="email" id="contact-email" class="form-input" required placeholder="email@example.com">
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-subject">主旨 *</label>
              <select id="contact-subject" class="form-input" required>
                <option value="" disabled selected>請選擇諮詢類別</option>
                <option value="order">訂單與配送諮詢</option>
                <option value="size">尺碼與商品庫存問題</option>
                <option value="cooperate">品牌商業合作</option>
                <option value="feedback">建議與意見回饋</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-message">詳細內容 *</label>
              <textarea id="contact-message" class="form-input" required placeholder="請寫下您要諮詢的詳細內容..."></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">送出表單</button>
          </form>
        </div>
      </div>
    </section>
  `;
}

// Global form submission handler
window.handleContactSubmit = () => {
  const name = document.getElementById("contact-name").value;
  const email = document.getElementById("contact-email").value;
  const subject = document.getElementById("contact-subject").value;
  const message = document.getElementById("contact-message").value;

  if (name && email && subject && message) {
    // Show success alert
    const alert = document.getElementById("form-success");
    alert.style.display = "block";
    
    // Reset form
    document.getElementById("contact-form").reset();
    
    // Auto hide alert after 5 seconds
    setTimeout(() => {
      alert.style.display = "none";
    }, 5000);

    // Open premium success modal popup
    openSuccessModal("表單送出成功", `親愛的 ${name} 您好，我們已收到您的諮詢信件。客服人員將儘快寄送回覆至 ${email}，感謝您的耐心等待。`);
  }
};

function openSuccessModal(title, text) {
  const overlay = document.getElementById("global-modal-overlay");
  const titleEl = document.getElementById("modal-title");
  const textEl = document.getElementById("modal-text");
  
  if (overlay && titleEl && textEl) {
    titleEl.textContent = title;
    textEl.textContent = text;
    overlay.classList.add("open");
  }
}

window.closeGlobalModal = () => {
  const overlay = document.getElementById("global-modal-overlay");
  if (overlay) overlay.classList.remove("open");
};

// --- RENDER CATEGORY PAGES (商品列表分頁) ---
function renderCategory(container, categoryId) {
  // Translate category id to title
  const catNames = {
    casual: { title: "休閒鞋系列", desc: "兼具街頭潮流美感與全天候舒適腳感" },
    running: { title: "慢跑鞋系列", desc: "專為極致性能與全方位避震設計" },
    basketball: { title: "籃球鞋系列", desc: "強大防護支撐，助您稱霸球場" },
    accessories: { title: "潮流配件", desc: "精緻護鞋工具與運動襪套，完善您的裝備" },
    others: { title: "其它精選類別", desc: "防水鞋套與恢復拖鞋，豐富您的日常細節" }
  };

  // Maps category slug to data field
  const categoryMap = {
    casual: "casual",
    running: "running",
    basketball: "basketball",
    accessories: "accessory",
    others: "other"
  };

  const currentCat = catNames[categoryId] || { title: "所有商品", desc: "探索 SoleVibe 的全系列產品" };
  const targetCategory = categoryMap[categoryId] || null;

  // Filter products by base category
  let filteredProducts = targetCategory 
    ? shoeProducts.filter(p => p.category === targetCategory)
    : shoeProducts;

  container.innerHTML = `
    <section class="section">
      <div class="section-title-wrap">
        <h2 class="section-title">${currentCat.title}</h2>
        <p class="section-subtitle">${currentCat.desc}</p>
      </div>

      <div class="store-layout">
        <!-- Sidebar Filters -->
        <aside class="filter-sidebar">
          <div class="search-input-wrap">
            <span class="search-icon">🔍</span>
            <input type="text" id="store-search" class="search-input" placeholder="搜尋商品名稱..." oninput="applyStoreFilters()">
          </div>
          
          <div class="filter-group">
            <h4 class="filter-title">價格區間</h4>
            <ul class="filter-options">
              <li class="filter-option">
                <input type="checkbox" name="price-filter" id="price-1" value="0-1000" onchange="applyStoreFilters()">
                <label for="price-1">NT$ 1,000 以下</label>
              </li>
              <li class="filter-option">
                <input type="checkbox" name="price-filter" id="price-2" value="1000-3000" onchange="applyStoreFilters()">
                <label for="price-2">NT$ 1,000 - $3,000</label>
              </li>
              <li class="filter-option">
                <input type="checkbox" name="price-filter" id="price-3" value="3000-4500" onchange="applyStoreFilters()">
                <label for="price-3">NT$ 3,000 - $4,500</label>
              </li>
              <li class="filter-option">
                <input type="checkbox" name="price-filter" id="price-4" value="4500-10000" onchange="applyStoreFilters()">
                <label for="price-4">NT$ 4,500 以上</label>
              </li>
            </ul>
          </div>

          <div class="filter-group">
            <h4 class="filter-title">評分篩選</h4>
            <ul class="filter-options">
              <li class="filter-option">
                <input type="checkbox" name="rating-filter" id="rating-4.8" value="4.8" onchange="applyStoreFilters()">
                <label for="rating-4.8">4.8 顆星以上 ⭐</label>
              </li>
              <li class="filter-option">
                <input type="checkbox" name="rating-filter" id="rating-4.6" value="4.6" onchange="applyStoreFilters()">
                <label for="rating-4.6">4.6 顆星以上 ⭐</label>
              </li>
            </ul>
          </div>
        </aside>

        <!-- Product Content Area -->
        <div class="store-content-wrap">
          <div class="store-toolbar">
            <span class="product-count" id="filtered-count">共 ${filteredProducts.length} 件商品</span>
            <select id="store-sort" class="sort-select" onchange="applyStoreFilters()">
              <option value="featured">推薦商品</option>
              <option value="price-asc">價格: 低到高</option>
              <option value="price-desc">價格: 高到低</option>
              <option value="rating-desc">顧客評分</option>
            </select>
          </div>

          <div class="products-grid" id="category-products-grid">
            ${filteredProducts.map(product => generateProductCardHTML(product)).join("")}
          </div>
        </div>
      </div>
    </section>
  `;

  // Save reference of products under local window context for dynamic filtering
  window.currentStoreCategory = targetCategory;
}

// --- DYNAMIC STORE FILTERING ---
window.applyStoreFilters = () => {
  const query = document.getElementById("store-search").value.toLowerCase();
  const sortVal = document.getElementById("store-sort").value;
  
  // Filter category products
  let products = window.currentStoreCategory
    ? shoeProducts.filter(p => p.category === window.currentStoreCategory)
    : shoeProducts;

  // 1. Text Search Filter
  if (query) {
    products = products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.zhName.toLowerCase().includes(query)
    );
  }

  // 2. Price Filter
  const priceCheckboxes = document.querySelectorAll('input[name="price-filter"]:checked');
  if (priceCheckboxes.length > 0) {
    const ranges = Array.from(priceCheckboxes).map(cb => cb.value.split('-').map(Number));
    products = products.filter(p => {
      return ranges.some(range => p.price >= range[0] && p.price <= range[1]);
    });
  }

  // 3. Rating Filter
  const ratingCheckboxes = document.querySelectorAll('input[name="rating-filter"]:checked');
  if (ratingCheckboxes.length > 0) {
    const minRating = Math.min(...Array.from(ratingCheckboxes).map(cb => Number(cb.value)));
    products = products.filter(p => p.rating >= minRating);
  }

  // 4. Sorting
  if (sortVal === "price-asc") {
    products.sort((a, b) => a.price - b.price);
  } else if (sortVal === "price-desc") {
    products.sort((a, b) => b.price - a.price);
  } else if (sortVal === "rating-desc") {
    products.sort((a, b) => b.rating - a.rating);
  } else {
    // default/featured: sort by id
    products.sort((a, b) => a.id.localeCompare(b.id));
  }

  // Update UI count
  const countEl = document.getElementById("filtered-count");
  if (countEl) countEl.textContent = `共 ${products.length} 件商品`;

  // Render cards
  const grid = document.getElementById("category-products-grid");
  if (grid) {
    if (products.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 4rem 2rem; color: var(--text-secondary);">
          <span style="font-size: 2.5rem; display: block; margin-bottom: 1rem;">🔍</span>
          <p>找不到符合篩選條件的商品，請嘗試其他關鍵字或清除條件。</p>
        </div>
      `;
    } else {
      grid.innerHTML = products.map(product => generateProductCardHTML(product)).join("");
    }
  }
};

// HTML Template Helper for Product Card
function generateProductCardHTML(product) {
  const badgeHTML = product.tag ? `<span class="product-card-tag">${product.tag}</span>` : "";
  const originalPriceHTML = product.originalPrice 
    ? `<span class="product-original-price">NT$ ${product.originalPrice.toLocaleString()}</span>` 
    : "";

  return `
    <div class="product-card" onclick="handleCardClick(event, '${product.id}')">
      ${badgeHTML}
      <div class="product-card-img-wrap">
        <img src="${product.image}" alt="${product.name}" class="product-card-img">
      </div>
      <div class="product-card-info">
        <span class="product-card-cat">${product.categoryZh}</span>
        <h3 class="product-card-title">${product.zhName}</h3>
        <div class="product-card-rating">
          ★ ${product.rating.toFixed(1)} <span>(${product.reviewsCount})</span>
        </div>
        <div class="product-card-footer">
          <div class="product-card-prices">
            <span class="product-price">NT$ ${product.price.toLocaleString()}</span>
            ${originalPriceHTML}
          </div>
          <button type="button" class="product-add-cart-btn" onclick="quickAddCart(event, '${product.id}')">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Handle navigating to detail page on card click, preventing trigger on buttons
window.handleCardClick = (e, productId) => {
  if (e.target.closest('.product-add-cart-btn')) return;
  window.location.hash = `#/product/${productId}`;
};

// Fast add to cart from list view
window.quickAddCart = (e, productId) => {
  e.stopPropagation();
  const product = shoeProducts.find(p => p.id === productId);
  if (product) {
    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0];
    addToCart(productId, defaultSize, defaultColor);
  }
};

// --- RENDER PRODUCT DETAIL PAGE (產品瀏覽頁面) ---
function renderProductDetail(container, productId) {
  const product = shoeProducts.find(p => p.id === productId);
  if (!product) {
    container.innerHTML = `
      <section class="section" style="text-align: center;">
        <h2 style="font-size: 2rem; margin-bottom: 1rem;">找不到此商品</h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem;">您尋找的商品可能已下架或網址不正確。</p>
        <a href="#/" class="btn btn-primary">返回首頁</a>
      </section>
    `;
    return;
  }

  // Get related products (same category, excluding current product)
  const related = shoeProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Initialize selected size and color state for this detail view
  let selectedSize = product.sizes[0];
  let selectedColor = product.colors[0];

  container.innerHTML = `
    <section class="section">
      <!-- Breadcrumbs -->
      <div style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 2.5rem; display: flex; gap: 0.5rem; align-items: center;">
        <a href="#/">首頁</a> 🡒 
        <a href="#/category/${getCategorySlug(product.category)}">${product.categoryZh}</a> 🡒 
        <span style="color: var(--text-primary); font-weight: 600;">${product.name}</span>
      </div>

      <div class="product-detail-layout">
        <!-- Image Section -->
        <div class="detail-img-gallery">
          <img src="${product.image}" alt="${product.name}" id="detail-shoe-img" class="detail-main-img">
        </div>

        <!-- Info / Actions Section -->
        <div class="detail-info">
          ${product.tag ? `<span class="detail-tag">${product.tag}</span>` : ""}
          <h1 class="detail-zhName">${product.zhName}</h1>
          <div class="detail-enName">${product.name}</div>
          
          <div class="detail-rating-reviews">
            <span class="detail-rating">★ ${product.rating.toFixed(1)}</span>
            <span class="detail-reviews">${product.reviewsCount} 則顧客滿意評價</span>
          </div>

          <div class="detail-prices-wrap">
            <span class="detail-price">NT$ ${product.price.toLocaleString()}</span>
            ${product.originalPrice ? `<span class="detail-original-price">NT$ ${product.originalPrice.toLocaleString()}</span>` : ""}
          </div>

          <p class="detail-desc">${product.description}</p>

          <!-- Colors Selector -->
          <div class="detail-options-group">
            <span class="detail-options-title">顏色選擇：<strong id="selected-color-label">${selectedColor.name}</strong></span>
            <ul class="detail-colors-list">
              ${product.colors.map((color, idx) => `
                <li class="color-swatch ${idx === 0 ? 'active' : ''}" 
                    style="border-color: ${idx === 0 ? 'var(--accent-color)' : 'transparent'}"
                    onclick="selectDetailColor(this, '${color.name}', '${color.hex}', '${product.id}')"
                    data-color-name="${color.name}"
                    data-color-hex="${color.hex}">
                  <span class="color-swatch-inner" style="background-color: ${color.hex}"></span>
                </li>
              `).join("")}
            </ul>
          </div>

          <!-- Sizes Selector -->
          <div class="detail-options-group">
            <span class="detail-options-title">選擇尺寸：<strong id="selected-size-label">${selectedSize}</strong></span>
            <ul class="detail-sizes-list">
              ${product.sizes.map((size, idx) => `
                <li>
                  <button type="button" class="size-btn ${idx === 0 ? 'active' : ''}" 
                          onclick="selectDetailSize(this, '${size}')">
                    ${size}
                  </button>
                </li>
              `).join("")}
            </ul>
          </div>

          <!-- Action Buttons -->
          <div class="detail-actions">
            <button type="button" class="btn btn-primary" onclick="addDetailToCart('${product.id}')">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:0.5rem">
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              加入購物車
            </button>
          </div>

          <!-- Features list -->
          <div class="detail-features-list">
            <h4>商品特點與材質細節</h4>
            <ul>
              ${product.features.map(f => `<li>${f}</li>`).join("")}
            </ul>
          </div>
        </div>
      </div>

      <!-- Related Section -->
      ${related.length > 0 ? `
        <div class="related-products-wrap">
          <div class="section-title-wrap" style="text-align: left; margin-bottom: 2.5rem;">
            <h2 class="section-title" style="font-size: 1.8rem;">您可能也會喜歡</h2>
            <p class="section-subtitle" style="margin: 0;">與此商品同系列的最佳搭配推薦</p>
          </div>
          <div class="home-featured-grid">
            ${related.map(p => generateProductCardHTML(p)).join("")}
          </div>
        </div>
      ` : ""}
    </section>
  `;

  // Create scoped selectors closure inside window context
  window.detailState = {
    size: selectedSize,
    color: selectedColor
  };
}

// Scoped detail selectors
window.selectDetailColor = (element, colorName, colorHex, productId) => {
  // Update swatches active state class
  const swatches = document.querySelectorAll(".color-swatch");
  swatches.forEach(sw => {
    sw.classList.remove("active");
    sw.style.borderColor = "transparent";
  });
  element.classList.add("active");
  element.style.borderColor = "var(--accent-color)";

  // Update label
  document.getElementById("selected-color-label").textContent = colorName;

  // Save selected color state
  window.detailState.color = { name: colorName, hex: colorHex };

  // Premium dynamic color overlay animation effect!
  const shoeImg = document.getElementById("detail-shoe-img");
  if (shoeImg) {
    shoeImg.style.transition = "transform 0.4s ease, filter 0.4s ease";
    shoeImg.style.transform = "scale(0.9) rotate(-10deg)";
    shoeImg.style.filter = "brightness(0.6) blur(2px)";
    
    setTimeout(() => {
      // In a real product we might change image source.
      // Here, since we have SVGs, we can just apply a CSS shadow or subtle hue-rotate filter based on color choice!
      // This is a premium touch.
      if (colorName.includes("黑") || colorName.includes("曜")) {
        shoeImg.style.filter = "brightness(0.8) contrast(1.15)";
      } else if (colorName.includes("白") || colorName.includes("雪")) {
        shoeImg.style.filter = "brightness(1.1) contrast(0.9)";
      } else if (colorName.includes("紅") || colorName.includes("橙")) {
        shoeImg.style.filter = "hue-rotate(330deg) saturate(1.2)";
      } else if (colorName.includes("藍") || colorName.includes("紫") || colorName.includes("金")) {
        shoeImg.style.filter = "hue-rotate(240deg) saturate(1.1)";
      } else {
        shoeImg.style.filter = "none";
      }
      shoeImg.style.transform = "scale(1.02) rotate(-3deg)";
      
      setTimeout(() => {
        shoeImg.style.transform = "rotate(-3deg)";
      }, 200);
    }, 300);
  }
};

window.selectDetailSize = (element, sizeValue) => {
  // Update buttons active class
  const sizeBtns = document.querySelectorAll(".size-btn");
  sizeBtns.forEach(btn => btn.classList.remove("active"));
  element.classList.add("active");

  // Update label
  document.getElementById("selected-size-label").textContent = sizeValue;

  // Save selected size state
  window.detailState.size = sizeValue;
};

window.addDetailToCart = (productId) => {
  const state = window.detailState;
  addToCart(productId, state.size, state.color);
};

// Helper to match category slugs
function getCategorySlug(category) {
  const mapping = {
    casual: "casual",
    running: "running",
    basketball: "basketball",
    accessory: "accessories",
    other: "others"
  };
  return mapping[category] || "";
}
