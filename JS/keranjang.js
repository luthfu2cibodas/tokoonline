<!doctype html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Keranjang - TokoKu</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<header class="nav">
<a href="index.html" class="brand">TokoKu</a>
<nav>
<a href="index.html">Beranda</a>
<a href="produk.html">Produk</a>
<a href="admin.html">Admin</a>
</nav>
</header>


<main class="container">
<h2>Keranjang Belanja</h2>
<table class="cart-table">
<thead>
<tr><th>Produk</th><th>Qty</th><th>Subtotal</th><th>Aksi</th></tr>
</thead>
<tbody id="cartList"></tbody>
</table>


<div class="cart-footer">
<p id="totalHarga">Total: Rp 0</p>
<button id="checkoutBtn" class="btn">Checkout</button>
</div>
</main>


<script src="js/keranjang.js"></script>
</body>
</html>