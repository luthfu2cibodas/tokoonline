// admin.js - tambah & hapus produk
function loadProduk(){
return JSON.parse(localStorage.getItem('produkList')) || [];
}
function saveProduk(list){
localStorage.setItem('produkList', JSON.stringify(list));
}


function renderAdmin(){
const tbody = document.getElementById('listProduk');
const list = loadProduk();
if(!tbody) return;
tbody.innerHTML = list.map(p => `
<tr>
<td>${p.nama}</td>
<td>Rp ${Number(p.harga).toLocaleString('id-ID')}</td>
<td><img src="${p.img}" alt="" width="60"></td>
<td>
<button onclick="hapusProduk(${p.id})" class="btn danger">Hapus</button>
</td>
</tr>
`).join('');
}


function tambahProduk(e){
e.preventDefault();
const nama = document.getElementById('nama').value.trim();
const harga = Number(document.getElementById('harga').value);
const img = document.getElementById('img').value.trim();
const deskripsi = document.getElementById('deskripsi').value.trim();


if(!nama || !harga || !img){
alert('Isi semua field: nama, harga, img');
return;
}


const list = loadProduk();
list.push({ id: Date.now(), nama, harga, img, deskripsi });
saveProduk(list);
document.getElementById('formAdd').reset();
renderAdmin();
}


function hapusProduk(id){
if(!confirm('Hapus produk ini?')) return;
let list = loadProduk();
list = list.filter(p => p.id !== id);
saveProduk(list);
renderAdmin();
}


// attach
const form = document.getElementById('formAdd');
if(form) form.addEventListener('submit', tambahProduk);
renderAdmin();