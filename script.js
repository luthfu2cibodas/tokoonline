// ===============================
// DATA PRODUK DEFAULT
// ===============================
const defaultProduk = [
    { id: 1, nama: "Sepatu Sport", harga: 250000, img: "https://picsum.photos/300?random=1" },
    { id: 2, nama: "Tas Slempang", harga: 150000, img: "https://picsum.photos/300?random=2" },
    { id: 3, nama: "Jam Tangan", harga: 180000, img: "https://picsum.photos/300?random=3" },
    { id: 4, nama: "Kemeja Pria", harga: 120000, img: "https://picsum.photos/300?random=4" },
];

// ===============================
// FUNCTION LOAD & SAVE PRODUK
// ===============================
function loadProduk() {
    const data = JSON.parse(localStorage.getItem("produkList"));
    if (!data) {
        localStorage.setItem("produkList", JSON.stringify(defaultProduk));
        return defaultProduk;
    }
    return data;
}

function saveProduk(data) {
    localStorage.setItem("produkList", JSON.stringify(data));
}

// ===============================
// RENDER PRODUK untuk index & produk.html
// ===============================
function renderProduk() {
    const box = document.getElementById("productList");
    if (!box) return;

    const produk = loadProduk();
    box.innerHTML = "";

    produk.forEach((p) => {
        box.innerHTML += `
            <div class="card">
                <img src="${p.img}">
                <h3>${p.nama}</h3>
                <div class="price">Rp ${p.harga.toLocaleString()}</div>
                <button class="btn" onclick="addToCart(${p.id})">
                    Tambah ke Keranjang
                </button>
            </div>
        `;
    });
}

// ===============================
// KERANJANG
// ===============================
function loadCart() {
    return JSON.parse(localStorage.getItem("keranjang")) || [];
}

function saveCart(data) {
    localStorage.setItem("keranjang", JSON.stringify(data));
}

function addToCart(id) {
    const produk = loadProduk();
    const item = produk.find(p => p.id === id);

    let cart = loadCart();
    const cek = cart.find(x => x.id === id);

    if (cek) {
        cek.qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }

    saveCart(cart);
    alert("Produk ditambahkan ke keranjang!");
}

// ===============================
// RENDER KERANJANG
// ===============================
function renderKeranjang() {
    const tbody = document.getElementById("cartList");
    const totalEl = document.getElementById("totalHarga");
    if (!tbody) return;

    let cart = loadCart();
    tbody.innerHTML = "";
    let total = 0;

    cart.forEach((item, i) => {
        total += item.harga * item.qty;

        tbody.innerHTML += `
            <tr>
                <td>${item.nama}</td>
                <td>${item.qty}</td>
                <td>Rp ${item.harga.toLocaleString()}</td>
                <td>Rp ${(item.harga * item.qty).toLocaleString()}</td>
                <td>
                    <button onclick="hapusItem(${i})" class="btn-hapus">Hapus</button>
                </td>
            </tr>
        `;
    });

    totalEl.innerHTML = "Rp " + total.toLocaleString();
}

function hapusItem(i) {
    let cart = loadCart();
    cart.splice(i, 1);
    saveCart(cart);
    renderKeranjang();
}

// ===============================
// CHECKOUT WHATSAPP
// ===============================
function checkoutWA() {
    const nama = document.getElementById("nama").value;
    const alamat = document.getElementById("alamat").value;
    const telp = document.getElementById("telp").value;

    let cart = loadCart();
    if (cart.length === 0) {
        alert("Keranjang kosong!");
        return;
    }

    let pesan = `*ORDER BARU*\nNama: ${nama}\nAlamat: ${alamat}\nTelp: ${telp}\n\n*Detail Pesanan:*`;

    cart.forEach((item) => {
        pesan += `\n- ${item.nama} x${item.qty} = Rp ${(item.harga * item.qty).toLocaleString()}`;
    });

    const url = "https://wa.me/6281567632308?text=" + encodeURIComponent(pesan);
    window.open(url, "_blank");
}

// ===============================
// ADMIN LOGIN
// ===============================
function adminLogin() {
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;

    if (user === "admin" && pass === "admin123") {
        localStorage.setItem("adminLogin", "true");
        window.location = "admin.html";
    } else {
        alert("Login gagal!");
    }
}

function cekAdmin() {
    const logged = localStorage.getItem("adminLogin");
    if (!logged) {
        window.location = "admin-login.html";
    }
}

function adminLogout() {
    localStorage.removeItem("adminLogin");
    window.location = "index.html";
}

// ===============================
// ADMIN - RENDER TABEL PRODUK
// ===============================
function renderAdminTable() {
    const tbody = document.getElementById("adminProdukList");
    if (!tbody) return;

    const produk = loadProduk();
    tbody.innerHTML = "";

    produk.forEach((p, i) => {
        tbody.innerHTML += `
            <tr>
                <td>${p.nama}</td>
                <td>Rp ${p.harga.toLocaleString()}</td>
                <td><img src="${p.img}" width="60"></td>
                <td>
                    <button onclick="editProduk(${p.id})" class="btn-edit">Edit</button>
                    <button onclick="hapusProduk(${i})" class="btn-hapus">Hapus</button>
                </td>
            </tr>
        `;
    });
}

// ===============================
// ADMIN - HAPUS PRODUK
// ===============================
function hapusProduk(i) {
    let produk = loadProduk();
    produk.splice(i, 1);
    saveProduk(produk);
    renderAdminTable();
}

// ===============================
// ADMIN - TAMBAH PRODUK
// ===============================
function tambahProduk() {
    const nama = document.getElementById("pNama").value;
    const harga = parseInt(document.getElementById("pHarga").value);
    const img = document.getElementById("pImg").value;

    let produk = loadProduk();

    produk.push({
        id: Date.now(),
        nama,
        harga,
        img
    });

    saveProduk(produk);
    alert("Produk ditambahkan!");
    window.location.reload();
}


