const limpiarValidadores = (elementos) => {
  for (let elemento of elementos) {
    elemento.textContent = "";
  }
};

export const validarFormulario = (
  titulo,
  descripcion,
  fecha_salida,
  fecha_regreso,
  dias,
  noches,
  lugar_partida,
  destinos,
  excursiones,
  precio,
  stock,
  imagen
) => {
  let error = false;

  const $titulo = document.getElementById("titulo");
  const $descripcion = document.getElementById("descripcion");
  const $fechaSalida = document.getElementById("fecha_salida");
  const $fechaRegreso = document.getElementById("fecha_regreso");
  const $dias = document.getElementById("dias");
  const $noches = document.getElementById("noches");
  const $lugarPartida = document.getElementById("lugar_partida");
  const $destinos = document.getElementById("destinos");
  const $excursiones = document.getElementById("excursiones");
  const $precio = document.getElementById("precio");
  const $stock = document.getElementById("stock");
  const $imagen = document.getElementById("imagen");

  const $validarTitulo = document.getElementById("validar-titulo");
  const $validarDescripcion = document.getElementById("validar-descripcion");
  const $validarFechaSalida = document.getElementById("validar-fecha_salida");
  const $validarFechaRegreso = document.getElementById("validar-fecha_regreso");
  const $validarDias = document.getElementById("validar-dias");
  const $validarNoches = document.getElementById("validar-noches");
  const $validarLugarPartida = document.getElementById("validar-lugar_partida");
  const $validarDestinos = document.getElementById("validar-destinos");
  const $validarExcursiones = document.getElementById("validar-excursiones");
  const $validarPrecio = document.getElementById("validar-precio");
  const $validarStock = document.getElementById("validar-stock");
  const $validarImagen = document.getElementById("validar-imagen");

  limpiarValidadores([
    $validarTitulo,
    $validarDescripcion,
    $validarFechaSalida,
    $validarFechaRegreso,
    $validarDias,
    $validarNoches,
    $validarLugarPartida,
    $validarDestinos,
    $validarExcursiones,
    $validarPrecio,
    $validarStock,
    $validarImagen,
  ]);

  const regexDestinos = /^[a-zA-ZáéíóúüÁÉÍÓÚÜ]+(?: - [a-zA-ZáéíóúüÁÉÍÓÚÜ]+)*$/; // Expresión regular de destinos

  if (!excursiones) {
    $validarExcursiones.textContent = "Inserte un valor.";
    $excursiones.focus();
    error = true;
  }

  if (imagen.length > 400) {
    $validarImagen.textContent =
      "La url debe contener un máximo de 400 caracteres.";
    $imagen.focus();
    error = true;
  }

  if (!stock) {
    $validarStock.textContent = "Inserte un valor.";
    $stock.focus();
    error = true;
  }

  if (!precio) {
    $validarPrecio.textContent = "Inserte un valor.";
    $precio.focus();
    error = true;
  }

  if (!destinos) {
    $validarDestinos.textContent = "Inserte un valor.";
    $destinos.focus();
    error = true;
  } else if (!regexDestinos.test(destinos)) {
    $validarDestinos.textContent =
      'Cada destino debe estar separado por " - ". Por ejemplo, "Miami - Orlando".';
    $destinos.focus();
    error = true;
  } else if (destinos.length > 200) {
    $validarDestinos.textContent =
      "El texto debe contener un máximo de 200 caracteres.";
    $destinos.focus();
    error = true;
  }

  if (!lugar_partida) {
    $validarLugarPartida.textContent = "Inserte un valor.";
    $lugarPartida.focus();
    error = true;
  } else if (lugar_partida.length > 50) {
    $validarLugarPartida.textContent =
      "El lugar de partida debe contener un máximo de 50 caracteres.";
    $lugarPartida.focus();
    error = true;
  }

  if (!noches) {
    $validarNoches.textContent = "Inserte un valor.";
    $noches.focus();
    error = true;
  }

  if (!dias) {
    $validarDias.textContent = "Inserte un valor.";
    $dias.focus();
    error = true;
  }

  if (!fecha_regreso) {
    $validarFechaRegreso.textContent = "Inserte un valor.";
    $fechaRegreso.focus();
    error = true;
  }

  if (!fecha_salida) {
    $validarFechaSalida.textContent = "Inserte un valor.";
    $fechaSalida.focus();
    error = true;
  }

  if (descripcion.length > 2000) {
    $validarDescripcion.textContent =
      "La descripción debe contener un máximo de 2000 caracteres.";
    $descripcion.focus();
    error = true;
  }

  if (!titulo) {
    $validarTitulo.textContent = "Inserte un valor.";
    $titulo.focus();
    error = true;
  } else if (titulo.length > 100) {
    $validarTitulo.textContent =
      "El título debe contener un máximo de 100 caracteres.";
    $titulo.focus();
    error = true;
  }

  return !error;
};
