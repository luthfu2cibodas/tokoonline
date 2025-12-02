// ================================
// Toko Online Script.js
// ================================

// ================================
// PRODUK: LOAD & SAVE
// ================================
function loadProduk() {
    return JSON.parse(localStorage.getItem("produkList")) || [];
}

function saveProduk(list) {
    localStorage.setItem("produkList", JSON.stringify(list));
}

// ================================
// KERANJANG: LOAD, SAVE, ADD, REMOVE
// ================================
function loadCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(produk) {
    let cart = loadCart();
    cart.push(produk);
    saveCart(cart);
    showPopup("Produk berhasil ditambahkan ke keranjang!");
}

// HAPUS ITEM KERANJANG BERDASARKAN INDEX
function removeFromCart(index) {
    let cart = loadCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
}

// ================================
// POPUP MODAL
// ================================
function showPopup(message) {
    let popup = document.getElementById("popup");
    if (!popup) {
        popup = document.createElement("div");
        popup.id = "popup";
        popup.classList.add("popup");
        popup.innerHTML = `
            <div class="popup-box">
                <h3>Berhasil!</h3>
                <p id="popupMessage">${message}</p>
                <button onclick="closePopup()" class="btn-cart">Tutup</button>
            </div>
        `;
        document.body.appendChild(popup);
    } else {
        document.getElementById("popupMessage").innerText = message;
        popup.classList.add("show");
    }
    popup.classList.add("show");
}

function closePopup() {
    let popup = document.getElementById("popup");
    if (popup) popup.classList.remove("show");
}

// ================================
// ADMIN LOGIN
// ================================
function isAdminLogged() {
    return localStorage.getItem("adminLogged") === "true";
}

function loginAdmin(pin) {
    if (pin === "online021") {
        localStorage.setItem("adminLogged", "true");
        window.location.href = "admin.html";
    } else {
        alert("PIN salah!");
    }
}

function logoutAdmin() {
    localStorage.removeItem("adminLogged");
    window.location.href = "admin-login.html";
}

// ================================
// RENDER KERANJANG OTOMATIS
// ================================
function renderCart() {
    const cart = loadCart();
    const cartList = document.getElementById("keranjangList");
    const totalEl = document.getElementById("totalHarga");

    if (!cartList || !totalEl) return;

    cartList.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartList.innerHTML = `<p class="empty">Keranjang masih kosong</p>`;
        totalEl.innerText = "Rp 0";
        return;
    }

    cart.forEach((item, index) => {
        total += Number(item.harga);
        cartList.innerHTML += `
            <div class="item">
                <img src="${item.gambar}" alt="">
                <div class="item-info">
                    <h4>${item.nama}</h4>
                    <p>Rp ${item.harga.toLocaleString()}</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${index})">Hapus</button>
            </div>
        `;
    });

    totalEl.innerText = "Rp " + total.toLocaleString();
}

// ================================
// DETAIL PRODUK
// ================================
function loadDetail(id) {
    const produkList = loadProduk();
    const produk = produkList.find(p => p.id == id);
    return produk;
}
