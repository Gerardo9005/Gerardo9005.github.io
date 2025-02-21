// Obtén el botón de scroll al inicio
let scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Cuando el usuario se desplaza hacia abajo 20px desde la parte superior del documento, muestra el botón
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

// Cuando el usuario hace clic en el botón, desplázate hasta la parte superior del documento
scrollToTopBtn.addEventListener("click", function () {
  // Para Chrome, Safari y Opera
  document.body.scrollTop = 0;

  // Para Firefox
  document.documentElement.scrollTop = 0;
});

// Espera a que el DOM esté completamente cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", function () {
  // Código para el pop-up
  const openPopupButton = document.getElementById("openPopupButton");

  fetch("popup.html")
    .then((response) => response.text())
    .then((html) => {
      document.body.insertAdjacentHTML("beforeend", html);

      const popup = document.getElementById("popup");
      const overlay = document.getElementById("overlay");
      const closePopupButton = document.getElementById("closePopupButton");

      function showPopup() {
        popup.style.display = "block";
        overlay.style.display = "block";
      }

      function hidePopup() {
        popup.style.display = "none";
        overlay.style.display = "none";
      }

      openPopupButton.addEventListener("click", showPopup);
      closePopupButton.addEventListener("click", hidePopup);
      overlay.addEventListener("click", hidePopup);
    });
});

// Código para mostrar/ocultar campos de empresa
const selectOrganizacion = document.getElementById("organizacion");
const camposEmpresa = document.getElementById("campos-empresa");

if (selectOrganizacion) {
  selectOrganizacion.addEventListener("change", function () {
    if (this.value === "si") {
      camposEmpresa.style.display = "block";
    } else {
      camposEmpresa.style.display = "none";
    }
  });
}

// Código para el envío del formulario
const form = document.getElementById("contact-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const nombre = formData.get("nombre");
  const correo = formData.get("correo");
  const telefono = formData.get("telefono");
  const organizacion = formData.get("organizacion");
  const nombre_empresa = formData.get("nombre_empresa");
  const puesto_empresa = formData.get("puesto_empresa");
  const dia1 = formData.get("dia1");
  const hora1 = formData.get("hora1");
  const dia2 = formData.get("dia2");
  const hora2 = formData.get("hora2");
  const dia3 = formData.get("dia3");
  const hora3 = formData.get("hora3");
  const asunto = formData.get("asunto");
  const mensaje = formData.get("mensaje");

  const cuerpoMensaje = `
    Nombre: ${nombre}\n
    Correo electrónico: ${correo}\n
    Teléfono: ${telefono}\n
    ¿Pertenece a alguna organización laboral?: ${organizacion}\n
    ${
      organizacion === "si"
        ? `Nombre de la empresa: ${nombre_empresa}\nPuesto dentro de la empresa: ${puesto_empresa}\n`
        : ""
    }
    Día 1: ${dia1} - Hora 1: ${hora1}\n
    ${dia2 ? `Día 2: ${dia2} - Hora 2: ${hora2}\n` : ""}
    ${dia3 ? `Día 3: ${dia3} - Hora 3: ${hora3}\n` : ""}
    Mensaje: ${mensaje}
  `;

  const enlaceCorreo = `mailto:ggonzalezr@safetygek.com?subject=${asunto}&body=${cuerpoMensaje}`;
  window.location.href = enlaceCorreo;

  // Mostrar ventana de "Gracias"
  setTimeout(() => {
    window.location.href = "gracias.html";
  }, 2000); // Esperar 2 segundos antes de mostrar la ventana de "Gracias"
});
