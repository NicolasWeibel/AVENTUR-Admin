import { validarFormulario } from "./form.js";

console.log(location.search); // lee los argumentos pasados a este formulario

const params = new URLSearchParams(location.search);
var id = parseInt(params.get("id"));
console.log(id);

const { createApp } = Vue;
createApp({
  data() {
    return {
      url: "http://localhost:5000/paquetes/" + id,
      // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
      // url: "http://marcerda.pythonanywhere.com/paquetes/" + id, // si ya lo subieron a pythonanywhere
      error: false,
      cargando: true,
      /*atributos para el guardar los valores del formulario */
      id: 0,
      titulo: "",
      descripcion: "",
      fecha_salida: "",
      fecha_regreso: "",
      dias: null,
      noches: null,
      lugar_partida: "Buenos Aires",
      destinos: "",
      excursiones: null,
      seguro: true,
      traslado: false,
      alquiler_auto: false,
      precio: null,
      stock: null,
      imagen: "",
    };
  },
  methods: {
    fetchData(url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.id = data.id;
          this.titulo = data.titulo;
          this.descripcion = data.descripcion;
          this.fecha_salida = data.fecha_salida;
          this.fecha_regreso = data.fecha_regreso;
          this.dias = data.dias;
          this.noches = data.noches;
          this.lugar_partida = data.lugar_partida;
          this.destinos = data.destinos;
          this.excursiones = data.excursiones;
          this.seguro = data.seguro;
          this.traslado = data.traslado;
          this.alquiler_auto = data.alquiler_auto;
          this.precio = data.precio;
          this.stock = data.stock;
          this.imagen = data.imagen;
          this.cargando = false;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },
    modificar() {
      if (
        validarFormulario(
          this.titulo,
          this.descripcion,
          this.fecha_salida,
          this.fecha_regreso,
          this.dias,
          this.noches,
          this.lugar_partida,
          this.destinos,
          this.excursiones,
          this.precio,
          this.stock,
          this.imagen
        )
      ) {
        let paquete = {
          titulo: this.titulo,
          descripcion: this.descripcion,
          fecha_salida: this.fecha_salida,
          fecha_regreso: this.fecha_regreso,
          dias: this.dias,
          noches: this.noches,
          lugar_partida: this.lugar_partida,
          destinos: this.destinos,
          excursiones: this.excursiones,
          seguro: this.seguro,
          traslado: this.traslado,
          alquiler_auto: this.alquiler_auto,
          precio: this.precio,
          stock: this.stock,
          imagen: this.imagen,
        };
        var options = {
          body: JSON.stringify(paquete),
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          redirect: "follow",
        };
        fetch(this.url, options)
          .then(function () {
            alert("Registro modificado");
            window.location.href = "./paquetes.html"; // navega a paquetes.html
          })
          .catch((err) => {
            console.error(err);
            alert("Error al Modificar");
          });
      }
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount("#app");
