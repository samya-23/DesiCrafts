<!-- README.md for DesiCrafts -->

<h1 align="center">DesiCrafts 🛍️</h1>
<p align="center">
  <b>Empowering Villagers & Local Artisans to Showcase and Sell Handmade Products</b><br>
  <i>Your platform for authentic, handcrafted treasures from rural India</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Backend-Django-blue?logo=django" alt="Django Backend">
  <img src="https://img.shields.io/badge/Frontend-React-61DAFB?logo=react" alt="React Frontend">
  <img src="https://img.shields.io/badge/Payments-Stripe-635bff?logo=stripe" alt="Stripe Payments">
</p>

<hr>

<h2>🌟 About DesiCrafts</h2>
<p>
DesiCrafts is a full-stack e-commerce platform designed to empower villagers and local artisans by providing them with a modern, user-friendly platform to showcase and sell their unique, handmade products. Our mission is to bridge the gap between rural talent and global customers, promoting authentic crafts and supporting local economies.
</p>

<ul>
  <li>🌱 <b>For Artisans:</b> Effortlessly list and manage handmade products.</li>
  <li>🛒 <b>For Customers:</b> Discover and purchase authentic crafts with secure payments.</li>
  <li>🔒 <b>Secure Payments:</b> Powered by Stripe for safe transactions.</li>
  <li>👤 <b>User Accounts:</b> Seamless registration, login, and account management.</li>
</ul>

<hr>

<h2>📋 Table of Contents</h2>
<ul>
  <li><a href="#features">Features Overview</a></li>
  <li><a href="#screens">Functionality</a></li>
  <li><a href="#installation">Installation & Setup</a></li>
  <li><a href="#tech-stack">Tech Stack</a></li>
</ul>

<hr>

<h2 id="features">✨ Features Overview</h2>
<ul>
  <li>Browse a curated list of handmade products</li>
  <li>Detailed product pages with images and descriptions</li>
  <li>Secure Stripe-powered checkout and payment</li>
  <li>User registration, login, and account management</li>
  <li>Order tracking for users and admin</li>
  <li>Address and card management</li>
  <li>Admin dashboard for managing products and orders</li>
  <li>JWT-based authentication for robust security</li>
</ul>

<hr>

<h2 id="screens">🛠️ Functionality</h2>

<h3>Product Browsing</h3>
<ul>
  <li><b>Products List:</b> Explore all available handmade products.</li>
  <li><b>Product Details:</b> View detailed information, images, and purchase options.</li>
</ul>

<h3>For Artisans/Admins</h3>
<ul>
  <li><b>Add Product:</b> List new handmade items with images and descriptions.</li>
  <li><b>Edit Product:</b> Update product details, images, and stock status.</li>
  <li><b>Delete Product:</b> Remove products from the platform.</li>
</ul>

<h3>Shopping & Payments</h3>
<ul>
  <li><b>Checkout:</b> Review selected products, choose address, and pay via Stripe.</li>
  <li><b>Payment Confirmation:</b> Confirm payment details before processing.</li>
  <li><b>Payment Success:</b> Get instant order confirmation and summary.</li>
</ul>

<h3>Order Management</h3>
<ul>
  <li><b>User Orders:</b> View all personal orders with details.</li>
  <li><b>Admin Orders:</b> Admins can view and manage all orders, update delivery status, and search orders by customer or product.</li>
</ul>

<h3>Account & Settings</h3>
<ul>
  <li><b>Address Management:</b> Add, edit, or delete delivery addresses.</li>
  <li><b>Card Management:</b> Save, update, or delete payment cards.</li>
  <li><b>User Profile:</b> View and update account details, reset password, or delete account.</li>
</ul>

<h3>Security</h3>
<ul>
  <li>JWT authentication for protected routes</li>
  <li>Strict validation during card creation and payments</li>
</ul>

<hr>

<h2 id="installation">🚀 Installation & Setup</h2>

<h3>Prerequisites</h3>
<ul>
  <li>Python 3.8+</li>
  <li>Node.js & npm</li>
  <li>Stripe Account for API keys</li>
</ul>

<h3>Backend (Django)</h3>
<ol>
  <li>Navigate to the <code>backend</code> directory:</li>
  <pre><code>cd backend</code></pre>
  <li>Create and activate a virtual environment:</li>
  <pre><code>python3 -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate</code></pre>
  <li>Install dependencies:</li>
  <pre><code>pip install -r requirements.txt</code></pre>
  <li>
    Set your Stripe API keys in your Django settings:
    <ul>
      <li><code>STRIPE_SECRET_KEY</code></li>
      <li><code>STRIPE_PUBLISHABLE_KEY</code></li>
    </ul>
  </li>
  <li>Run migrations and start the server:</li>
  <pre><code>python manage.py migrate
python manage.py runserver</code></pre>
</ol>

<h3>Frontend (React)</h3>
<ol>
  <li>Navigate to the <code>frontend</code> directory:</li>
  <pre><code>cd frontend</code></pre>
  <li>Install dependencies:</li>
  <pre><code>npm install</code></pre>
  <li>Start the React development server:</li>
  <pre><code>npm start</code></pre>
</ol>

<h3>Usage</h3>
<ul>
  <li>Open <code>http://localhost:3000</code> in your browser to access DesiCrafts.</li>
  <li>Register as a user or admin, explore products, and experience the platform!</li>
</ul>

<hr>

<h2 id="tech-stack">🛠️ Tech Stack</h2>
<ul>
  <li><b>Backend:</b> Django, Django REST Framework</li>
  <li><b>Frontend:</b> React, Redux</li>
  <li><b>Authentication:</b> JWT (JSON Web Tokens)</li>
  <li><b>Payments:</b> Stripe API</li>
  <li><b>Database:</b> SQLite (default), can be configured for PostgreSQL/MySQL</li>
</ul>

<hr>

<p align="center">
  <b>DesiCrafts – Celebrate Local Artisans. Discover Handcrafted Excellence.</b>
</p>
