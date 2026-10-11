let daftarMatkul = [
  { nama: "ARSITEKTUR DAN ORGANISASI KOMPUTER", semester: 2, sks: 2, nilai: "AB", nk: 7.00 },
  { nama: "ALGORITMA DAN STRUKTUR DATA", semester: 2, sks: 3, nilai: "AB", nk: 10.50 },
  { nama: "SISTEM BASIS DATA", semester: 2, sks: 3, nilai: "AB", nk: 10.50 },
  { nama: "INTERAKSI MANUSIA KOMPUTER", semester: 2, sks: 3, nilai: "B", nk: 9.00 },
  { nama: "TEKNOLOGI INFORMASI DAN APLIKASI BISNIS BERKEMBANG", semester: 2, sks: 3, nilai: "B", nk: 9.00 },
  { nama: "PEMROGRAMAN BERORIENTASI OBJEK", semester: 2, sks: 4, nilai: "AB", nk: 14.00 },
  { nama: "STATISTIKA DAN PROBABILITAS", semester: 2, sks: 2, nilai: "A", nk: 8.00 }
];

const containerTabel = document.getElementById("container-tabel");
const formMatkul = document.getElementById("form-matkul");
const inputCari = document.getElementById("input-cari");
const selectUrut = document.getElementById("select-urut");

const bobotNilai = { "A": 4, "AB": 3.5, "B": 3, "BC": 2.5, "C": 2, "D": 1, "E": 0 };

const renderTabel = (data) => {
    if (data.length === 0) {
        containerTabel.innerHTML = `<p class="text-center text-muted my-4">Data mata kuliah tidak ditemukan.</p>`;
        return;
    }

    let barisTabel = '';
    data.forEach((matkul, index) => {
        barisTabel += `
            <tr class="baris-matkul">
                <td>${index + 1}.</td>
                <td class="nama-matkul">${matkul.nama}</td>
                <td>${matkul.semester}</td>
                <td>${matkul.sks}</td>
                <td>${matkul.nilai}</td>
                <td>${matkul.nk.toFixed(2)}</td>
                <td class="text-center">
                    <button class="btn-delete" onclick="hapusMatkul(${index})" title="Hapus">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    const strukturTabel = `
        <table class="custom-table">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Nama Matakuliah</th>
                    <th>Semester</th>
                    <th>SKS</th>
                    <th>Nilai</th>
                    <th>N.K.</th>
                    <th class="text-center">Aksi</th>
                </tr>
            </thead>
            <tbody id="body-tabel">
                ${barisTabel}
            </tbody>
        </table>
    `;

    containerTabel.innerHTML = strukturTabel;
};

window.hapusMatkul = (index) => {
    daftarMatkul.splice(index, 1);
    renderTabel(daftarMatkul);
    inputCari.value = '';
};

renderTabel(daftarMatkul);

formMatkul.addEventListener("submit", function(event) {
    event.preventDefault();

    const inputNama = document.getElementById("input-nama").value.trim();
    const inputSemester = parseInt(document.getElementById("input-semester").value);
    const inputSks = parseInt(document.getElementById("input-sks").value);
    const inputNilai = document.getElementById("input-nilai").value.trim().toUpperCase();
    const inputNk = parseFloat(document.getElementById("input-nk").value);

    const pesanError = $("#pesan-error");
    const pesanSukses = $("#pesan-sukses");

    // Sembunyikan pesan error dan sukses di awal validasi menggunakan jQuery hide()
    pesanError.hide().removeClass("shake-animation");
    pesanSukses.hide();

    if (!inputNama || isNaN(inputSemester) || isNaN(inputSks) || !inputNilai || isNaN(inputNk)) {
        // Munculkan pesan error dengan efek fadeIn jQuery dan animasi shake
        pesanError.fadeIn(400, function() {
            $(this).addClass("shake-animation");
        });
        return;
    }

    const matkulBaru = {
        nama: inputNama,
        semester: inputSemester,
        sks: inputSks,
        nilai: inputNilai,
        nk: inputNk
    };

    daftarMatkul.push(matkulBaru);
    renderTabel(daftarMatkul);

    // Munculkan pesan sukses dengan efek slideDown jQuery
    pesanSukses.slideDown(500);
    formMatkul.reset();
    
    // Sembunyikan pesan sukses setelah 3 detik dengan efek slideUp jQuery
    setTimeout(() => {
        pesanSukses.slideUp(500);
    }, 3000);
});

inputCari.addEventListener("input", function(event) {
    const kataKunci = event.target.value.toLowerCase();
    const semuaBaris = document.querySelectorAll(".baris-matkul");

    semuaBaris.forEach(baris => {
        const teksNamaMatkul = baris.querySelector(".nama-matkul").textContent.toLowerCase();
        if (teksNamaMatkul.includes(kataKunci)) {
            baris.classList.remove("d-none");
        } else {
            baris.classList.add("d-none");
        }
    });
});

selectUrut.addEventListener("change", function(event) {
    const pilihan = event.target.value;
    let dataTerurut = [...daftarMatkul];

    if (pilihan === "sks") {
        dataTerurut.sort((a, b) => b.sks - a.sks);
    } else if (pilihan === "nilai") {
        dataTerurut.sort((a, b) => (bobotNilai[b.nilai] || 0) - (bobotNilai[a.nilai] || 0));
    } else if (pilihan === "nk") {
        dataTerurut.sort((a, b) => b.nk - a.nk);
    }

    renderTabel(dataTerurut);
    inputCari.value = '';
});