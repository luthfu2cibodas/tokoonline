// produk.js - tampilkan produk & tombol tambah ke keranjang
function loadProduk(){
return JSON.parse(localStorage.getItem('produkList')) || [];
}
function saveCart(cart){
localStorage.setItem('keranjang', JSON.stringify(cart));
updateCartCount();
}
function loadCart(){
return JSON.parse(localStorage.getItem('keranjang')) || [];
}


function addToCart(id){
const cart = loadCart();
const item = cart.find(i => i.id === id);
if(item) item.qty++;
else cart.push({ id, qty: 1 });
saveCart(cart);
alert('Produk ditambahkan ke keranjang');
}


function renderProduk(){
const list = loadProduk();
const container = document.getElementById('produkList');
if(!container) return;
if(list.length === 0){
container.innerHTML = '<p class="small">Belum ada produk. Tambahkan lewat admin.</p>';
return;
}
container.innerHTML = list.map(p => `
<div class="card">
<img src="${p.img}" alt="${p.nama}">
<h3>${p.nama}</h3>
<p>Rp ${Number(p.harga).toLocaleString('id-ID')}</p>
<div style="display:flex;gap:8px;margin-top:8px">
<button onclick="addToCart(${p.id})" class="btn">Tambah ke Keranjang</button>
<a href="detail.html?id=${p.id}" class="btn">Lihat Detail</a>
</div>
</div>
`).join('');
}


function updateCartCount(){
const countEl = document.getElementById('cart-count');
const cart = loadCart();
const total = cart.reduce((s,i)=>s+i.qty,0);
if(countEl