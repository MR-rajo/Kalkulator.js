const tombolBuka = document.getElementById('bButton');
const kartu = document.getElementById('areakal');
const tombolTutup = document.getElementById('close');
const tampilanHasil = document.getElementById('hasil');
const tombol = document.querySelectorAll('.nominal .item');
const tampilanSoal = document.createElement('div');
const tombolHapus = document.getElementById('hapus');
const lop = document.getElementById('hasilnya');


tampilanSoal.id = 'soal';
tampilanSoal.style.fontSize = '25px';
tampilanSoal.style.textAlign = 'right';
tampilanSoal.textContent = '';
kartu.insertBefore(tampilanSoal, tampilanHasil.parentElement);

tombolBuka.addEventListener('click', function() {
    kartu.classList.add('show');
    tombolBuka.style.display = 'none';
});

tombolTutup.addEventListener('click', function() {
    kartu.classList.remove('show');
    tombolBuka.style.display = 'block';
});


tombolHapus.addEventListener('click', function(){
    bersihkanHasil();
});



let inputSaatIni = '';
let inputSebelumnya = '';
let operator = '';
let hasil = '';

tombol.forEach(tombol => {
    tombol.addEventListener('click', () => {
        const nilai = tombol.value;

        if (nilai === 'C') {
            bersihkanHasil();
        } else if (nilai === '=') {
            hitung();
        } else if (nilai === '+/-') {
            ubahTanda();
        } else if (nilai === '%') {
            konversiKePersentase();
        } else if (nilai === ',' || nilai === '.') {
            tambahkanDesimal();
        } else if (['+', '-', 'x', '/'].includes(nilai)) {
            tetapkanOperator(nilai);
        } else {
            tambahkanAngka(nilai);
        }
    });
});

function bersihkanHasil() {
    inputSaatIni = '';
    inputSebelumnya = '';
    operator = '';
    hasil = '';
    tampilanSoal.textContent = '';
    perbaruiTampilan('0');
}

function hitung() {
    if (operator && inputSaatIni && inputSebelumnya) {
        switch (operator) {
            case '+':
                hasil = parseFloat(inputSebelumnya) + parseFloat(inputSaatIni);
                break;
            case '-':
                hasil = parseFloat(inputSebelumnya) - parseFloat(inputSaatIni);
                break;
            case 'x':
                hasil = parseFloat(inputSebelumnya) * parseFloat(inputSaatIni);
                break;
            case '/':
                hasil = parseFloat(inputSebelumnya) / parseFloat(inputSaatIni);
                break;
        }
        tampilanSoal.textContent = `${inputSebelumnya} ${operator} ${inputSaatIni} =`;
        perbaruiTampilan(hasil);
        inputSaatIni = hasil;
        inputSebelumnya = '';
        operator = '';
    }
}

function ubahTanda() {
    if (inputSaatIni) {
        inputSaatIni = (parseFloat(inputSaatIni) * -1).toString();
        perbaruiTampilan(inputSaatIni);
    }
}

function konversiKePersentase() {
    if (inputSaatIni) {
        inputSaatIni = (parseFloat(inputSaatIni) / 100).toString();
        perbaruiTampilan(inputSaatIni);
    }
}

function tambahkanDesimal() {
    if (!inputSaatIni.includes('.')) {
        inputSaatIni += '.';
        perbaruiTampilan(inputSaatIni);
    }
}

function tetapkanOperator(op) {
    if (inputSaatIni) {
        if (operator) {
            hitung();
        }
        operator = op;
        inputSebelumnya = inputSaatIni;
        inputSaatIni = '';
        tampilanSoal.textContent = `${inputSebelumnya} ${operator}`;
        perbaruiTampilan(`${inputSebelumnya} ${operator}`);
    } else if (hasil) {
        operator = op;
        inputSebelumnya = hasil;
        hasil = '';
        tampilanSoal.textContent = `${inputSebelumnya} ${operator}`;
        perbaruiTampilan(`${inputSebelumnya} ${operator}`);
    }
}

function tambahkanAngka(angka) {
    if (operator && inputSebelumnya && !inputSaatIni) {
        inputSaatIni = angka;
        perbaruiTampilan(`${inputSebelumnya} ${operator} ${inputSaatIni}`);
    } else {
        if (inputSaatIni === '0') {
            inputSaatIni = angka;
        } else {
            inputSaatIni += angka;
        }
        perbaruiTampilan(operator ? `${inputSebelumnya} ${operator} ${inputSaatIni}` : inputSaatIni);
    }
}

function perbaruiTampilan(nilai) {
    tampilanHasil.textContent = nilai;
}
