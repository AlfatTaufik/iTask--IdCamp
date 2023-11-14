const newElement = document.createElement("li");
newElement.innerHTML = "selamat menikmati";

const daftar = document.getElementById("daftar");
daftar.appendChild(newElement);

const awalElement = document.createElement('li');
awalElement.innerHTML = "Nyalakan kompor";

const indexPertama = document.getElementById('awal');
daftar.insertBefore(awalElement, indexPertama)