document.addEventListener('DOMContentLoaded', function () {
    // Navbar shrink function
    const navbarShrink = () => {
        const navbar = document.getElementById("mainNav");
        if (!navbar) return;

        // Si la pantalla es menor a 992px, siempre elimina "navbar-transparent"
        if (window.innerWidth < 992) {
            navbar.classList.remove("navbar-transparent");
            navbar.style.backgroundColor = ""; // Restaura el estilo predeterminado si hay uno
            return; // Salimos para no aplicar más cambios
        }

        // Para pantallas mayores o iguales a 992px

        if (window.scrollY === 0) {
            navbar.classList.remove("navbar-shrink", "navbar-default");
            navbar.classList.add("navbar-transparent");
        } else {
            navbar.classList.add("navbar-shrink", "navbar-default");
            navbar.classList.remove("navbar-transparent");
        }
        // Asegurar comportamiento responsive
        if (window.innerWidth >= 992) {
            navbar.style.backgroundColor = window.scrollY === 0 ? "transparent" : "rgba(33, 37, 41, 0.9)"; //rgba(33, 37, 41, 0.9)
        }
    };

    // Run shrink function on page load and scroll
    navbarShrink();
    document.addEventListener("scroll", navbarShrink);

    // Activate Bootstrap scrollspy
    const mainNav = document.getElementById("mainNav");
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.querySelector('.navbar-toggler');
    const responsiveNavItems = document.querySelectorAll('#navbarResponsive .nav-link');
    responsiveNavItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});

//night mode
document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");

    // Consulta de tema: aplica el modo oscuro según la preferencia del sistema
    if (!localStorage.getItem("theme")) {
        const prefersNight = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (prefersNight) {
            document.body.classList.add("night-mode");
            themeToggle.textContent = "☀️";
        }
    } else {
        // Aplica el tema guardado en localStorage
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme === "night") {
            document.body.classList.add("night-mode");
            themeToggle.textContent = "☀️";
        }
    }

    // Escucha el cambio de tema
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("night-mode");
        const isNightMode = document.body.classList.contains("night-mode");

        // Cambia texto del botón
        themeToggle.textContent = isNightMode ? "☀️" : "🌙";

        // Guarda la preferencia
        localStorage.setItem("theme", isNightMode ? "night" : "light");
    });
});

// Manejar el cierre de todos los modales
document.addEventListener('DOMContentLoaded', function () {
    const modals = document.querySelectorAll('.portfolio-modal');
  
    modals.forEach(modal => {
      const closeModal = modal.querySelector('.close-modal');
  
      // Cerrar el modal al hacer clic en el botón de cierre
      if (closeModal) {
        closeModal.addEventListener('click', (e) => {
          e.stopPropagation();
          modal.classList.remove('show');
        });
      }
  
      // Cerrar el modal si se hace clic fuera de la zona activa
      window.addEventListener('click', (e) => {
        if (modal.classList.contains('show') && !modal.querySelector('.modal-dialog').contains(e.target)) {
          modal.classList.remove('show');
        }
      });
    });
  });

//guardar opcion de night mode
  const toggleNightMode = () => {
    document.body.classList.toggle('night-mode');
    localStorage.setItem('nightMode', document.body.classList.contains('night-mode'));
};

// Al cargar la página
if (localStorage.getItem('nightMode') === 'true') {
    document.body.classList.add('night-mode');
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  

// Obtener referencias al formulario y botón
const form = document.getElementById('contactForm');
const submitButton = document.getElementById('submitButton');

// Validación del formulario
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita el envío predeterminado
    let isValid = true;

    // Validar nombre
    const name = document.getElementById('name');
    if (name.value.trim() === '') {
        isValid = false;
        name.classList.add('is-invalid');
    } else {
        name.classList.remove('is-invalid');
    }

    // Validar email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        isValid = false;
        email.classList.add('is-invalid');
    } else {
        email.classList.remove('is-invalid');
    }

    // Validar teléfono
    const phone = document.getElementById('phone');
    if (phone.value.trim() === '') {
        isValid = false;
        phone.classList.add('is-invalid');
    } else {
        phone.classList.remove('is-invalid');
    }

    // Validar mensaje
    const message = document.getElementById('message');
    if (message.value.trim() === '') {
        isValid = false;
        message.classList.add('is-invalid');
    } else {
        message.classList.remove('is-invalid');
    }

    // Si es válido, envía el formulario
    if (isValid) {
        sendFormData();
    }
});

// Verificar todos los campos y habilitar el botón
form.addEventListener('input', () => {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const isFormValid = name && email && phone && message && emailRegex.test(email);

    submitButton.disabled = !isFormValid;  // Deshabilita el botón si el formulario no es válido
});

// Envío del formulario con fetch
function sendFormData() {
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json',
        },
    })
        .then(response => {
            if (response.ok) {
                document.getElementById('submitSuccessMessage').classList.remove('d-none');
                document.getElementById('submitErrorMessage').classList.add('d-none');
                form.reset();
                submitButton.disabled = true; // Deshabilitar el botón tras el envío
                submitButton.innerText = 'Message Sent'; // Cambiar el texto del botón
            } else {
                document.getElementById('submitErrorMessage').classList.remove('d-none');
                document.getElementById('submitSuccessMessage').classList.add('d-none');
            }
        })
        .catch(() => {
            document.getElementById('submitErrorMessage').classList.remove('d-none');
            document.getElementById('submitSuccessMessage').classList.add('d-none');
        });
}


// JavaScript para la interacción del portafolio

// Filtros por categoría
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        document.querySelectorAll('.portfolio-item').forEach(item => {
            const category = item.parentElement.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                item.parentElement.style.display = 'block';
            } else {
                item.parentElement.style.display = 'none';
            }
        });
    });
});

// Búsqueda interactiva
document.getElementById('searchBar').addEventListener('input', (event) => {
    const searchQuery = event.target.value.toLowerCase();
    document.querySelectorAll('.portfolio-item').forEach(item => {
        const heading = item.querySelector('.portfolio-caption-heading').textContent.toLowerCase();
        const subheading = item.querySelector('.portfolio-caption-subheading').textContent.toLowerCase();
        if (heading.includes(searchQuery) || subheading.includes(searchQuery)) {
            item.parentElement.style.display = 'block';
        } else {
            item.parentElement.style.display = 'none';
        }
    });
});


/*
document.addEventListener('DOMContentLoaded', () => {
    const windowWidth = window.innerWidth;
  
    if (windowWidth > 768) { 
      // Cambiar animaciones de fade-up a fade-right en pantallas grandes SOLO para línea del tiempo
      const timelineItems = document.querySelectorAll('.timeline-panel[data-aos="fade-up"]');
      
      timelineItems.forEach(el => {
        el.setAttribute('data-aos', 'fade-right');
      });
    }
  
    // Inicializar AOS después de los cambios
    AOS.init({
      offset: 50, // Ajustar el desplazamiento
      duration: 600, // Duración de las animaciones
      once: true, // Animaciones solo una vez
    });
  });
*/
