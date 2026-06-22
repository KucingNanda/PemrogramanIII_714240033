# Ringkasan Pembelajaran Proyek Fullstack (Golang + React)

Dokumen ini adalah ringkasan dari semua teknologi, konsep, dan arsitektur yang telah diterapkan di dalam proyek ini. Anda dapat menggunakan dokumen ini sebagai acuan (_cheat sheet_) ketika ingin membangun aplikasi serupa di masa mendatang.

---

## 1. Arsitektur Proyek
Proyek ini mengadopsi arsitektur **Fullstack** modern yang memisahkan antara _Backend_ (API) dan _Frontend_ (UI). Pemisahan ini memungkinkan pengembangan yang lebih modular, skala yang lebih baik, dan kemudahan dalam mencari masalah (debugging).

* **Backend (`my-be`)**: Menyediakan RESTful API, menangani logika bisnis, dan berinteraksi dengan database.
* **Frontend (`my-fe`)**: Berfokus murni pada antarmuka pengguna (UI/UX) dan mengkonsumsi API dari backend.

---

## 2. Backend (Golang)

### Teknologi yang Digunakan:
* **Golang**: Bahasa pemrograman yang sangat cepat dan efisien.
* **Fiber (`gofiber/fiber/v2`)**: *Web framework* untuk Golang yang terinspirasi dari Express.js (Node.js). Sangat ringan dan mempermudah pembuatan routing API.
* **GORM (`gorm.io/gorm`)**: ORM (Object-Relational Mapping) yang memungkinkan kita melakukan query ke database tanpa harus menulis syntax SQL manual (misalnya menggunakan fungsi `.First()`, `.Create()`, `.Updates()`).
* **Supabase (PostgreSQL)**: Database relasional di _cloud_.
* **Godotenv**: Library untuk memuat konfigurasi sistem (seperti URL database) dari file `.env`.

### Struktur Direktori yang Disarankan:
Pemisahan struktur folder yang kita lakukan membuat kode sangat mudah dirawat:
* `config/` -> Mengatur koneksi ke database dan memuat `.env`.
* `model/` -> Mendefinisikan struktur (Struct) data yang merepresentasikan tabel di database.
* `repository/` -> Tempat di mana fungsi-fungsi GORM berada (berinteraksi langsung dengan database).
* `handler/` -> Menerima *request* dari pengguna, memanggil repository, dan mengembalikan *response* JSON.
* `router/` -> Mendaftarkan _endpoints_ (URL) ke fungsi handler yang tepat.

### Pelajaran Penting:
* **Tipe Data**: Memahami cara Golang menangani tipe data khusus PostgreSQL seperti `pq.StringArray` untuk menyimpan daftar (misal: Hobi).
* **Path vs Query Parameter**: Memahami perbedaan cara mengambil data di router (contoh: mengambil `123` dari `/mahasiswa/123` menggunakan `c.Params("npm")`).

---

## 3. Frontend (React + Vite)

### Teknologi yang Digunakan:
* **Vite**: *Build tool* yang jauh lebih cepat daripada Create React App (CRA) untuk menyajikan server lokal.
* **React Router DOM**: Library inti untuk membuat navigasi halaman di React tanpa perlu me-reload keseluruhan halaman (*Single Page Application*).
* **Tailwind CSS**: Framework CSS *utility-first* untuk mempercantik UI secara cepat langsung di dalam class HTML.
* **Axios**: Library untuk melakukan HTTP Request ke Backend API dengan mudah (dibandingkan menggunakan `fetch` bawaan).
* **SweetAlert2**: Library untuk membuat _pop-up_ notifikasi dan konfirmasi (*dialog box*) yang cantik dan interaktif.

### Konsep Atomic Design:
Kita menyusun komponen antarmuka menggunakan prinsip **Atomic Design** yang terbukti sangat rapi untuk proyek berskala menengah hingga besar:
1. **Atoms**: Komponen dasar terkecil yang tidak bisa dipecah lagi (contoh: `Button`, `TextInput`, `SelectInput`).
2. **Molecules**: Gabungan dari beberapa *atoms* (contoh: `FormField` yang menggabungkan Label dan TextInput, `PageTitle`).
3. **Organisms**: Gabungan molekul yang membentuk bagian aplikasi yang fungsional dan relatif kompleks (contoh: `MahasiswaTable`, `MahasiswaForm`, `Sidebar`).
4. **Layouts**: Pembungkus struktur halaman statis seperti Header, Sidebar, Footer.
5. **Pages**: Halaman yang merakit organism dan layout untuk disajikan di rute (URL) tertentu.

### Pelajaran Penting:
* **State Management**: Menggunakan `useState` untuk menyimpan data dan mengendalikan *loading*.
* **Reaktivitas**: Menggunakan `useEffect` untuk memanggil API (*fetch data*) tepat saat halaman baru pertama kali dimuat.
* **Performa**: Menggunakan `useMemo` untuk proses *filter* dan pencarian agar tabel tidak diproses ulang secara tidak perlu (*performance optimization*).
* **Keamanan Tipe Data**: Memahami bahwa Javascript memiliki batas aman angka (`Max Safe Integer`). Oleh karena itu ID unik seperti NPM atau NIK yang panjang tidak boleh diproses sebagai angka mentah (sebaiknya diperlakukan sebagai teks/string untuk mencegah pembulatan).

---

## 4. Pola Implementasi (Workflow) CRUD

Langkah-langkah yang menjadi pola tetap saat membuat fitur Manajemen Data (CRUD) baru:

1. **Siapkan Database**: Buat tabel di PostgreSQL (Supabase).
2. **Backend - Model**: Buat `struct` di Golang yang sesuai dengan tabel tersebut.
3. **Backend - Repository & Handler**: Buat fungsi Create, Read, Update, Delete.
4. **Backend - Router**: Sambungkan fungsi-fungsi handler ke jalur `/api/...` dan tes dengan aplikasi *client* (seperti Postman atau cURL).
5. **Frontend - API Service**: Tambahkan fungsi di `api.js` (menggunakan Axios) untuk menembak endpoint backend tadi.
6. **Frontend - UI**: Buat halaman List (Tabel) dan halaman Form (Tambah/Edit) menggunakan komponen Atomic yang sudah ada.
7. **Frontend - Interaksi**: Hubungkan interaksi klik pengguna dengan pemanggilan fungsi dari API Service.

Dengan menyimpan dan memahami pola ini, Anda akan dengan mudah mengulangi proses yang sama untuk fitur-fitur lainnya seperti entitas Dosen, Mata Kuliah, Jadwal, dsb.
