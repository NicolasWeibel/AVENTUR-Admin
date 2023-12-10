import { validarFormulario } from "./form.js";

const convertirFormatoFecha = (fechaString) => {
  // Divide la cadena original en componentes capitalizados (día de la semana, día y mes)
  const componentes = fechaString.split(" ");

  if (componentes.length === 3) {
    const diaSemana =
      componentes[0][0].toUpperCase() +
      componentes[0].slice(1).replace(",", "");
    const numeroDia = componentes[1];
    const mes = componentes[2][0].toUpperCase() + componentes[2].slice(1);

    return `${diaSemana} ${numeroDia} ${mes}`;
  }

  // Si el formato de entrada es incorrecto, devuelve la cadena original
  return fechaString;
};

const { createApp } = Vue;
createApp({
  data() {
    return {
      paquetes: [],
      // url: "http://localhost:5000/paquetes",
      // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
      url: "https://nico0401.pythonanywhere.com/paquetes", // si ya lo subieron a pythonanywhere
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
          this.paquetes = data;

          const opciones = {
            timeZone: "Europe/London",
            weekday: "short",
            day: "numeric",
            month: "short",
          };

          for (const paquete of this.paquetes) {
            paquete.fecha_salida = convertirFormatoFecha(
              new Date(paquete.fecha_salida).toLocaleDateString(
                "es-AR",
                opciones
              )
            );
            paquete.fecha_regreso = convertirFormatoFecha(
              new Date(paquete.fecha_regreso).toLocaleDateString(
                "es-AR",
                opciones
              )
            );
            paquete.precio = new Intl.NumberFormat("es-ES").format(
              paquete.precio
            );
          }

          this.cargando = false;
        })
        .catch((err) => {
          console.error(err);
          this.error = true;
        });
    },
    eliminar(id) {
      const url = this.url + "/" + id;
      var options = {
        method: "DELETE",
      };
      let confirmacion = confirm("¿Quieres eliminar paquete ID: " + id + "?");

      if (confirmacion) {
        fetch(url, options)
          .then((res) => res.text()) // or res.json()
          .then((res) => {
            alert("Registro Eliminado");
            location.reload(); // recarga el json luego de eliminado el registro
          });
      }
    },
    grabar() {
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
          method: "POST",
          headers: { "Content-Type": "application/json" },
          redirect: "follow",
        };
        fetch(this.url, options)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            alert("Registro grabado");
            window.location.href = "./paquetes.html"; // recarga paquetes.html
          })
          .catch((err) => {
            console.error(err);
            alert("Error al Grabar"); // puedo mostrar el error tambien
          });
      }
    },
  },
  created() {
    this.fetchData(this.url);
  },
}).mount("#app");
