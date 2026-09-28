# Teknologi Blockchain — Course Hub

Portal perkuliahan **Teknologi Blockchain ITTS** untuk Semester Ganjil 2026/2027.

## Kelas

- **TI229 — Teknologi Blockchain (Eksekutif)**  
  Senin, 19:00–21:30 WIB — Zoom
- **IF235 — Teknologi Blockchain (Reguler)**  
  Selasa, 09:45–12:00 WIB — Ruang Kelas 1
- **IF235 — Teknologi Blockchain (Eksekutif)**  
  Jumat, 19:00–20:20 WIB — Zoom

## Isi Portal

- Informasi tiga kelas
- Semester plan 16 pertemuan
- Learning material & hands-on mapping
- Kuis dan tugas
- UTS & UAS
- Bobot penilaian
- Referensi utama

## Learning Path

1. Pengenalan Teknologi Blockchain
2. Arsitektur Blockchain dan Distributed Ledger
3. Perbandingan Model dan Platform Blockchain
4. Kriptografi dalam Blockchain
5. Mekanisme Konsensus Blockchain
6. Implementasi Blockchain Sederhana
7. Perancangan Solusi Berbasis Blockchain
8. UTS
9. Smart Contract dan Perancangan Aplikasi Blockchain
10. Pengembangan Prototipe Blockchain
11. Platform Ethereum dan Ekosistem DApp
12. Enterprise Blockchain dengan Hyperledger Fabric
13. Keamanan Blockchain dan Smart Contract
14. Skalabilitas dan Interoperabilitas Blockchain
15. Studi Kasus dan Evaluasi Solusi Blockchain
16. UAS

## Struktur File Materi

Portal sudah menampilkan **nama file yang diharapkan** untuk setiap PPTX dan PDF hands-on. Bila ingin menyediakan tombol download langsung, simpan file pada folder misalnya:

```
materials/
  week-01/
    Materi_Pertemuan_1_Blockchain_Technology_ITTS.pptx
    Hands-on_Pertemuan_1_Blockchain_Technology_ITTS.pdf
```

Lalu tambahkan URL file tersebut pada `course-data.js`.

## Deploy ke Vercel

Website ini **static, tanpa dependency build**. Cara termudah:

1. Import repository `taufikiqbalr/teknologi-blockchain` di Vercel.
2. Framework Preset: **Other**.
3. Build Command: kosong.
4. Output Directory: kosong / root.
5. Deploy.

Setiap push berikutnya ke branch `main` dapat memicu deployment baru bila Git integration diaktifkan.

## Local Preview

Gunakan web server lokal apa pun, misalnya:

```bash
python -m http.server 8000
```

Lalu buka `http://localhost:8000`.
