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
            themeToggle.textContent = "☀️ Light Mode";
        }
    } else {
        // Aplica el tema guardado en localStorage
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme === "night") {
            document.body.classList.add("night-mode");
            themeToggle.textContent = "☀️ Light Mode";
        }
    }

    // Escucha el cambio de tema
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("night-mode");
        const isNightMode = document.body.classList.contains("night-mode");

        // Cambia texto del botón
        themeToggle.textContent = isNightMode ? "☀️ Light Mode" : "🌙 Night Mode";

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
  

