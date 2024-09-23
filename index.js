// ambil data dari local storage
let dataKontak = JSON.parse(localStorage.getItem("dataKontak")) || [];

// interaksi elemen dengan DOM
let tambahNama = document.getElementById("nama-tambah");
let tambahTelpon = document.getElementById("telpon-tambah");
let tambahEmail = document.getElementById("email-tambah");
let editKode = document.getElementById("kode-edit");
let editNama = document.getElementById("nama-edit");
let editTelpon = document.getElementById("telpon-edit");
let editEmail = document.getElementById("email-edit");
let inputPart = document.getElementById("input");
let editPart = document.getElementById("edit");
let tabel = document.getElementById("tabel-display");
let cari = document.getElementById("cari");

// function untuk menutup panel
let tutupPanel = () => {
  inputPart.style = "display: none";
  editPart.style = "display: none";
};

// function mengosongkan kolom input setelah interaksi
let bersihkanInput = () => {
  document.querySelectorAll("input").forEach((input) => (input.value = ""));
};

// function untuk membuat kode kontak secara acak
let acakKode = () => {
  let angka = "";

  for (digit = 0; digit < 10; digit++) {
    angka += Math.floor(Math.random() * 10);
  }

  return angka;
};

// function untuk menampilkan data kontak ke tabel
let listKontak = () => {
  let list = dataKontak
    .map(
      (kontak) => `<tr class="baris" onclick="gantiInput('${kontak.kode}')">
          <th>${kontak.nama}</th>
          <th><a href="tel:${kontak.telpon}">${kontak.telpon}</a></th>
          <th class="hllang"><a href="mailto:${kontak.email}">${kontak.email}</a></th>
        </tr>`
    )
    .join("");

  tabel.innerHTML =
    `<tr style="background: #000; color: #fff">
          <th>Nama</th>
          <th>Telpon</th>
          <th class="hllang">Email</th>
        </tr>` + list;
};

// function untuk mengambil dan menampilkan data kontak dari local storage
let ambilData = () => {
  bersihkanInput();
  listKontak();
  console.log(dataKontak);
};

// function berganti ke mode input tambah data kontak
let tambahBaru = () => {
  inputPart.style = "display: block";
  editPart.style = "display: none";
  bersihkanInput();
};

// function untuk memasukan data kontak ke local storage
let simpanLocalStorage = () => {
  localStorage.setItem("dataKontak", JSON.stringify(dataKontak));
  tambahBaru();
  cari.value !== "" ? cariKontak() : ambilData();
};

// function untuk menambahkan data kontak
let tambahKontak = () => {
  dataKontak.push({
    kode: acakKode(),
    nama: tambahNama.value,
    telpon: tambahTelpon.value,
    email: tambahEmail.value,
  });
  simpanLocalStorage();
};

// function untuk mengubah panel input menjadi mode edit
let gantiInput = (kode) => {
  let kontak = dataKontak.find((kontak) => kontak.kode === kode);

  if (kontak) {
    editKode.value = kontak.kode;
    editNama.value = kontak.nama;
    editTelpon.value = kontak.telpon;
    editEmail.value = kontak.email;
  }

  inputPart.style = "display: none;";
  editPart.style = "display: block;";
};

// function untuk mengedit data kontak berdasarkan isi dari kolom input di mode edit
let editKontak = () => {
  let index = dataKontak.findIndex((kontak) => kontak.kode === editKode.value);
  if (index !== -1) {
    dataKontak[index] = {
      ...dataKontak[index],
      kode: editKode.value,
      nama: editNama.value,
      telpon: editTelpon.value,
      email: editEmail.value,
    };
    simpanLocalStorage();
  }
};

// function untuk menghapus data kontak
let hapusKontak = () => {
  let kode = editKode.value;
  dataKontak = dataKontak.filter((kontak) => kontak.kode !== kode);
  simpanLocalStorage();
  tambahBaru();
};

// function untuk mencari data kontak
let cariKontak = () => {
  let kata = cari.value;
  let kunci = kata.toString().toLowerCase();

  if (kata !== "") {
    let datas = dataKontak.filter(
      (kontak) =>
        kontak.nama.toLowerCase().includes(kunci) ||
        kontak.telpon.toLowerCase().includes(kunci) ||
        kontak.email.toLowerCase().includes(kunci)
    );

    let list = datas
      .map(
        (kontak) => `<tr class="baris" onclick="gantiInput('${kontak.kode}')">
          <th>${kontak.nama}</th>
          <th><a href="tel:${kontak.telpon}">${kontak.telpon}</a></th>
          <th class="hllang"><a href="mailto:${kontak.email}">${kontak.email}</a></th>
        </tr>`
      )
      .join("");

    tabel.innerHTML =
      `<tr style="background: #000; color: #fff">
          <th>Nama</th>
          <th>Telpon</th>
          <th class="hllang">Email</th>
        </tr>` + list;
  } else {
    ambilData();
  }
};

// memanggil function ambilData()
cari.value !== "" ? cariKontak() : ambilData();
