-- ============================
-- Tabel users
-- ============================
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- Tabel kategori
-- ============================
CREATE TABLE IF NOT EXISTS kategori (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(50) NOT NULL,
  tipe ENUM('pemasukan','pengeluaran') NOT NULL,
  warna VARCHAR(20) DEFAULT '#3b82f6'
);

-- ============================
-- Tabel transaksi
-- ============================
CREATE TABLE IF NOT EXISTS transaksi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  kategori_id INT NOT NULL,
  tipe ENUM('pemasukan','pengeluaran') NOT NULL,
  jumlah DECIMAL(15,2) NOT NULL,
  keterangan TEXT,
  tanggal DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (kategori_id) REFERENCES kategori(id)
);

-- ============================
-- Tabel aset (saham, emas, reksadana, tabungan)
-- ============================
CREATE TABLE IF NOT EXISTS aset (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  jenis ENUM('saham','emas','reksadana','tabungan') NOT NULL,
  nama VARCHAR(100) NOT NULL,
  jumlah_unit DECIMAL(15,4) DEFAULT 0,
  harga_beli DECIMAL(15,2) DEFAULT 0,
  harga_sekarang DECIMAL(15,2) DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);