let pathname = window.location.pathname;
let headerContent;
let inicioClass = "";
let paquetesClass = "";

if (pathname == "/index.html" || pathname == "/") {
  inicioClass = "active";
} else if (pathname == "/paquetes.html") {
  paquetesClass = "active";
}

document.getElementById("header").innerHTML = ` 
<div class="logo">
  <a href="index.html">AVENTUR Admin</a>
</div>
<button id="abrir" class="abrir-menu"><i class="bi bi-list"></i></button>
<nav>
  <button class="cerrar-menu" id="cerrar"><i class="bi bi-x"></i></button>
  <ul>
    <li><a class="${inicioClass}" href="index.html"> Inicio </a></li>
    <li><a class="${paquetesClass}" href="paquetes.html"> CRUD Paquetes </a></li>
  </ul>
</nav>
`;
