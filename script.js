const daftarMatkul = [
  { nama: "ARSITEKTUR DAN ORGANISASI KOMPUTER", semester: 2, sks: 2, nilai: "AB", nk: 7.00 },
  { nama: "ALGORITMA DAN STRUKTUR DATA", semester: 2, sks: 3, nilai: "AB", nk: 10.50 },
  { nama: "SISTEM BASIS DATA", semester: 2, sks: 3, nilai: "AB", nk: 10.50 },
  { nama: "INTERAKSI MANUSIA KOMPUTER", semester: 2, sks: 3, nilai: "B", nk: 9.00 },
  { nama: "TEKNOLOGI INFORMASI DAN APLIKASI BISNIS BERKEMBANG", semester: 2, sks: 3, nilai: "B", nk: 9.00 },
  { nama: "PEMROGRAMAN BERORIENTASI OBJEK", semester: 2, sks: 4, nilai: "AB", nk: 14.00 },
  { nama: "STATISTIKA DAN PROBABILITAS", semester: 2, sks: 2, nilai: "A", nk: 8.00 }
];

const hitungAkademik = (data) => {
  let totalSKS = 0;
  let totalNK = 0;

  for (const matkul of data) {
    totalSKS += matkul.sks;
    totalNK += matkul.nk;
  }

  return {
    totalSKS,
    totalNK,
    ipk: totalSKS > 0 ? parseFloat((totalNK / totalSKS).toFixed(2)) : 0
  };
};

const filterMatkulUnggulan = (data, minSks) => {
  const hasil = [];

  data.forEach(matkul => {
    if (matkul.sks >= minSks && (matkul.nilai === "A" || matkul.nilai === "AB")) {
      hasil.push(matkul);
    }
  });

  return hasil;
};

console.log("=== DATA SELURUH MATA KULIAH ===", daftarMatkul);
console.log("\n--- REKAPITULASI TOTAL AKADEMIK ---", hitungAkademik(daftarMatkul));
console.log("\n--- MATA KULIAH UNGGULAN (SKS >= 3 DAN NILAI A/AB) ---", filterMatkulUnggulan(daftarMatkul, 3));